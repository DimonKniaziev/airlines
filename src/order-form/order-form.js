import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useTourFilter, useUsers, useOrders } from "../store";
import { useSearchParams } from "react-router-dom";
import { getAllDataByName, addDataByName } from "../airlines-data-service";
import "./order-form.css";

const OrderForm = () => {    
    let [searchParams] = useSearchParams();
    const [tour, setTour] = useState([]);
    const [orderWasCreated, setOrderWasCreated] = useState(false);

    const loadTour = async () => {
        const tours = await getAllDataByName("tours")    
        setTour(tours.find(tour => String(tour.id) === searchParams.get('id')));
    }

    useEffect(() => {
        loadTour();
    }, []);

    const placesNeedFilter = useTourFilter(state => state.placesNeedFilter);
    const startDateFilter = useTourFilter(state => state.startDateFilter);
    const tourDurationFilter = useTourFilter(state => state.tourDurationFilter);
    const autorizedUser = useUsers(state => state.autorizedUser);

    const repeatedFormItems = Array.from({ length: placesNeedFilter }, (_, index) => (
        <div className="order-form-item" key={index}>
            <h3>Турист №{index+1}</h3>
            <div className="order-form-item-name-row">
                <div className="order-form-item-field-container">
                    <span>Прізвище</span><br/>
                    <input type="text" id={`surname${index}`} required={true}/>
                </div>
                <div className="order-form-item-field-container">
                    <span>Ім'я</span><br/>
                    <input type="text" id={`name${index}`} required={true}/>
                </div>
                <div className="order-form-item-field-container">
                    <span>По-батькові</span><br/>
                    <input type="text" id={`patronymic${index}`} required={true}/>
                </div>
            </div>
            <div className="order-form-item-name-row">
                <div className="order-form-item-field-container">
                    <span>Номер телефону</span><br/>
                    <input type="tel" id={`phone${index}`} required={true}/>
                </div>
                <div className="order-form-item-field-container">
                    <span>Дата народження</span><br/>
                    <input type="date" id={`date${index}`} required={true}/>
                </div>
            </div>
        </div>           
    ))

    const onSubmitForm = (e) => {
        e.preventDefault();
        let tourists = [];

        for (let i = 0; i < placesNeedFilter; i++) {
            const surname = document.getElementById(`surname${i}`).value;
            const name = document.getElementById(`name${i}`).value;
            const patronymic = document.getElementById(`patronymic${i}`).value;
            const phone = document.getElementById(`phone${i}`).value;
            const date = document.getElementById(`date${i}`).value;
            tourists.push({id: i, surname, name, patronymic, phone, date});
        }
        const newOrder = {
            tour_id: tour.id,
            user_id: autorizedUser.id,
            date: formatDate(new Date()),
            start: startDateFilter,
            duration: tourDurationFilter,
            places: tourists.length,
            totalPrice: tourists.length * tour.price,
            tourists: tourists
        }
        addDataByName("orders", newOrder);
        setOrderWasCreated('true');
    }

    if (!autorizedUser.id) {
        return <Navigate to="/"/>;
    }

    if (orderWasCreated) {
        return (
            <div className="order-created-message">
                <div>
                    <h1>
                        Ви успішно оформили замовлення на тур!
                    </h1>
                    <h2>
                        Переглянути деталі замовлення ви можете у вкладці "Мої замовлення"
                    </h2>
                </div>
            </div>
        );
    }

    return (
        <div className="order-form-container">
            <div className="order-form-header">
                <h1 className="hotel-name">{tour.label}</h1>
                <h1 className="country-name">{tour.country}</h1>
                <h2 className="order-date">{startDateFilter}</h2>
            </div>            
            <form className="order-form" onSubmit={onSubmitForm}>           
                {repeatedFormItems}
                <div className="submit-button-container">
                    <input type="submit" value="ЗАМОВИТИ" id="order-form-submit-button"/>
                </div>
            </form>
        </div>
    );
}

function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
  }

export default OrderForm;