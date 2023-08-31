import React, { useState, useEffect } from "react";
import { useReportCategory } from "../store";
import { getAllDataByName } from "../airlines-data-service";
import "./report-template.css";
import "./report-template.scss"

const ReportTemplate = () => {
    const [toursList, setToursList] = useState([]);
    const [ordersList, setOrdersList] = useState([]);
    const [onLoading, setOnLoading] = useState(true);

    const loadData = async () => {
        setToursList(await getAllDataByName("tours"));
        setOrdersList(await getAllDataByName("orders"));
        setOnLoading(false);        
    }

    useEffect(() => {
        loadData()
    }, [])

    const reportPeriod = useReportCategory((state) => state.reportPeriod);
    const reportCategory = useReportCategory((state) => state.reportCategory); 

    if (onLoading) {
        return (
            <div className="loading-message-container">
                <div>
                    <h1>
                        Завантажую...
                    </h1>
                </div>
            </div>
        );
    }

    const ordersInfo = ordersList.map((item) => {
        const tour = toursList.find((tour) => tour.id === item.tour_id);
        const hotel = tour.label;
        const country = tour.country;
        return {...item, hotel, country};
    })

    const today = new Date();
    const day = today.getDate().toString().padStart(2, '0');
    const currentDate = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${day}`;
    const lastMonthDate = `${today.getFullYear()}-${(today.getMonth()).toString().padStart(2, '0')}-${day}`;
    const lastYearDate = `${today.getFullYear()-1}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${day}`;
    
    const startDate = reportPeriod === "lastMonth" ? lastMonthDate : reportPeriod === "lastYear" ? lastYearDate : null;

    const templateHeader = startDate? (
        <h4 className="report-template-header">
            Звіт зі зроблених замовлень у турагенції "WWTour" <br/>
            у період з {startDate} по {currentDate}<br/>
            Дата формування: {currentDate}
        </h4>
    ) : (
        <h4 className="report-template-header">
            Звіт зі зроблених замовлень у турагенції "WWTour" <br/>
            за весь час<br/>
            Дата формування: {currentDate}
        </h4>
    )

    const dateFilter = (items) => {
        let filteredItems = items;

        if (reportPeriod === "lastMonth") {
            filteredItems = filteredItems.filter(item => new Date(item.date) <= new Date(currentDate) && new Date(item.date) >= new Date(lastMonthDate));
        }
        else if (reportPeriod === "lastYear") {
            filteredItems = filteredItems.filter(item => new Date(item.date) <= new Date(currentDate) && new Date(item.date) >= new Date(lastYearDate));
        }
        
        return filteredItems;
    }

    const visibleItems = dateFilter(ordersInfo);

    let hotelOrders = [];

    visibleItems.map((item) => hotelOrders.find((order) => order.hotel === item.hotel) ? (
        hotelOrders[hotelOrders.findIndex(order => order.hotel === item.hotel)] = {
            ...hotelOrders[hotelOrders.findIndex(order => order.hotel === item.hotel)],
            ordersNumber: hotelOrders[hotelOrders.findIndex(order => order.hotel === item.hotel)].ordersNumber + 1,
            totalCurrency: hotelOrders[hotelOrders.findIndex(order => order.hotel === item.hotel)].totalCurrency + item.totalPrice          
        }
    ) : (
        hotelOrders.push({
            ordersNumber: 1,
            totalCurrency: item.totalPrice,
            hotel: item.hotel
        })
    ))

    let countryOrders = [];

    visibleItems.map((item) => countryOrders.find((order) => order.country === item.country) ? (
        countryOrders[countryOrders.findIndex(order => order.country === item.country)] = {
            ...countryOrders[countryOrders.findIndex(order => order.country === item.country)],
            ordersNumber: countryOrders[countryOrders.findIndex(order => order.country === item.country)].ordersNumber + 1,
            totalCurrency: countryOrders[countryOrders.findIndex(order => order.country === item.country)].totalCurrency + item.totalPrice            
        }
    ) : (
        countryOrders.push({
            ordersNumber: 1,
            totalCurrency: item.totalPrice,
            country: item.country
        })
    ))

    const hotelOrdersList = hotelOrders.map((item) => {
        return (
            <React.Fragment key={item.hotel}>
                {item.hotel}: <br/>
                - Кількість замовлень: {item.ordersNumber} <br/>
                - Обсяг продажів: {item.totalCurrency} грн <br/>
                <br/>
            </React.Fragment>
        )
    })

    const countryOrdersList = countryOrders.map((item) => {
        return (
            <React.Fragment key={item.country}>
                {item.country}: <br/>
                - Кількість замовлень: {item.ordersNumber} <br/>
                - Обсяг продажів: {item.totalCurrency} грн <br/>
                <br/>
            </React.Fragment>
        )
    })

    const overallCurrency = visibleItems.reduce((total, item) => total + item.totalPrice, 0);
    
    const templateBody = reportCategory === 'popularHotel' ? (
            <h4 className="report-template-body">
                Загальна інформація: <br/>
                - Загальна кількість замовлень: {visibleItems.length} <br/>
                - Загальний обсяг продажів: {overallCurrency} грн <br/>
                <br/>
                Готелі: <br/>
                <br/>
                {hotelOrdersList}
            </h4>
        ) : (
        <h4 className="report-template-body">
            {countryOrdersList}
        </h4>
    )

    const mostPopularHotel = hotelOrders.reduce((maxItem, currentItem) => {
        if (currentItem.ordersNumber > maxItem.ordersNumber) {
          return currentItem;
        }
        return maxItem;
      }, hotelOrders[0]);

    const ordersPercent = (100/visibleItems.length) * (mostPopularHotel ? mostPopularHotel.ordersNumber : 0);

    const templateFooter = reportCategory === 'popularHotel' ? (
        <h4 className="report-template-footer">
            Найпопулярнішим готелем за останній місяць є {mostPopularHotel ? mostPopularHotel.hotel : 'не знайдено'}, що становить {Math.floor(ordersPercent ? ordersPercent : 0)}% від загальної кількості замовлень.
        </h4> 
    ) : (
        <h4 className="report-template-footer">
            Загальна кількість замовлень за останній рік: {visibleItems.length}. <br/>
            Загальний обсяг продаж: {overallCurrency} грн.
        </h4>
    )

    const templateContent = visibleItems.length > 0 ? (
        <React.Fragment>
            {templateBody}
            {templateFooter}
        </React.Fragment>        
    ) : (
        <h4>
            За вказаний період не було зроблено жодного замовлення
        </h4>
    )

    return (
        <div className="report-template-container">
            <div className="report-template">
                {templateHeader}
                {templateContent}
            </div>
        </div>
    )
}

export default ReportTemplate;