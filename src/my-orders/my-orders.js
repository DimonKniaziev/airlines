import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { useUsers, useOrderFilter } from "../store";
import { getAllDataByName } from "../airlines-data-service";
import "./my-orders.css";

const MyOrders = () => {
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
       
    const autorizedUser = useUsers((state) => state.autorizedUser);
    const periodFilter = useOrderFilter((state) => state.periodFilter);
    const sortingTerm = useOrderFilter((state) => state.sortingTerm);

    if (!autorizedUser.id) {
        return <Navigate to="/"/>;
    }

    if (onLoading) {
        return (
            <div className="loading-message-container">
                <div>
                    <h1>
                        Завантажую...
                    </h1>
                </div>
            </div> 
        )
    }

    const myOrders = ordersList.filter(order => order.user_id === autorizedUser.id);
    const orderItemsInfo = myOrders.map(order => {
        const tourLabel = toursList.find(tour => tour.id === order.tour_id).label;

        return {...order, tourLabel};
    });

    const filter = (items) => {
        let filteredItems = items;

        if (periodFilter === "lastMonth") {
            const currentDate = new Date();
            const currentMonth = currentDate.getMonth();
            const currentYear = currentDate.getFullYear();
            filteredItems = filteredItems.filter(item => new Date(item.date).getMonth() === currentMonth && new Date(item.date).getFullYear() === currentYear);
        }
        else if (periodFilter === "lastQuarter") {
            const currentDate = new Date();
            const currentQuarter = Math.floor((currentDate.getMonth() / 3));

            filteredItems = filteredItems.filter(item => {
                const quarter = Math.floor((new Date(item.date).getMonth() / 3));
                return quarter === currentQuarter;
            });
        }

        if (sortingTerm === "date") {
            filteredItems.sort((a, b) => new Date(b.date) - new Date(a.date));
        }
        else if (sortingTerm === "hotel") {
            filteredItems.sort((a, b) => a.tourLabel.localeCompare(b.tourLabel));
        }
        else if (sortingTerm === "price") {
            filteredItems.sort((a, b) => b.totalPrice - a.totalPrice);
        }

        return filteredItems;
    }

    const visibleItems = filter(orderItemsInfo);

    if (visibleItems.length < 1) {
        return (
            <div className="no-tours-message-container">
                <div>
                    <h1>
                        Жодного замовлення не знайдено
                    </h1>
                    <h3>
                        Спробуйте збільшити обсяг пошуку.
                    </h3> 
                </div>
            </div>                  
        );
    }
    else {
        const orderItems = visibleItems.map((order) => {       
            return (
                <tr key={order.id}>
                    <td>{order.date}</td>
                    <td>{order.places}</td>
                    <td>{order.tourLabel}</td>
                    <td>{order.totalPrice}</td>
                    <td id="td-detail-button">
                        <Link to={`/order-details?id=${order.id}`}>
                            Детальніше
                        </Link> 
                    </td>                    
                </tr>   
            );
        });
    
        return (
            <div className="order-list-container">
                <div className="order-list-table">
                    <table>
                        <tbody>
                            <tr>
                                <td>Дата</td>
                                <td>Туристів</td>
                                <td>Готель</td>
                                <td>Вартість</td>
                                <td><span></span></td>
                            </tr>
                            {orderItems}
                        </tbody>                        
                    </table>
                </div>
            </div>
        );
    }
}

export default MyOrders;