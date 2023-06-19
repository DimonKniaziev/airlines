import React from "react";
import { Link } from "react-router-dom";
import { useOrders, useUsers, useOrderFilter, useTours } from "../store";
import "./order-list.css";

const OrderList = () => {
    const orders = useOrders((state) => state.orders);
    const users = useUsers((state) => state.users);
    const tours = useTours((state) => state.tours);
    const periodFilter = useOrderFilter((state) => state.periodFilter);
    const sortingTerm = useOrderFilter((state) => state.sortingTerm);

    const orderItemsInfo = orders.map(order => {
        const user = users.find(user => user.id === order.user_id);
        const userName = `${user.surname} ${user.name.charAt(0)}. ${user.patronymic.charAt(0)}.`;
        const tourLabel = tours.find(tour => tour.id === order.tour_id).label;

        return {...order, userName, tourLabel};
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
        else if (sortingTerm === "client"){
            filteredItems.sort((a, b) => a.userName.localeCompare(b.userName));
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
                    <td>{order.userName}</td>
                    <td>{order.tourLabel}</td>
                    <td>{order.totalPrice}</td>
                    <td>
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
                                <td>Замовник</td>
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

export default OrderList;