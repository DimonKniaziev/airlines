import React from "react";
import { useSearchParams } from "react-router-dom";
import { useTours, useOrders, useUsers } from "../store";
import "./order-details.css"

const OrderDetails = () => {
    let [searchParams] = useSearchParams();

    const tours = useTours((state) => state.tours);
    const users = useUsers((state) => state.users);
    const orders = useOrders((state) => state.orders);
    const order = orders.find(order => String(order.id) === searchParams.get('id'));
    
    const getOrderDetails = () => {
        const user = users.find(user => user.id === order.user_id);
        const userName = `${user.surname} ${user.name} ${user.patronymic}`;
        const tour = tours.find(tour => tour.id === order.tour_id);
        const tourLabel = tour.label;
        const tourTransport = tour.transport;
        const tourCountry = tour.country;
        const tourCity = tour.city;

        return {...order, userName, tourLabel, tourTransport, tourCountry, tourCity};
    }

    const orderDetails = getOrderDetails();

    return (
        <div className="order-details-container">
            <div className="order-details">
                <div className="order-details-header">
                    <h1>ДЕТАЛІ ЗАМОВЛЕННЯ</h1>
                </div>
                <div className="order-details-body">
                    <div className="order-details-table">
                        <table>
                            <tbody>
                                <tr>
                                    <td className="td1">
                                        Туристи
                                    </td>
                                    <td className="td2">
                                        {orderDetails.places}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="td1">
                                        Дата відправлення
                                    </td>
                                    <td className="td2">
                                        {orderDetails.start}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="td1">
                                        Тривалість Туру
                                    </td>
                                    <td className="td2">
                                        {orderDetails.duration}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="td1">
                                        Транспорт
                                    </td>
                                    <td className="td2">
                                        {orderDetails.tourTransport}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="td1">
                                        Замовник
                                    </td>
                                    <td className="td2">
                                        {orderDetails.userName}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="td1">
                                        Повна Ціна
                                    </td>
                                    <td className="td2">
                                        {orderDetails.totalPrice} ГРН
                                    </td>
                                </tr>
                                <tr>
                                    <td className="td1">
                                        Готель
                                    </td>
                                    <td className="td2">
                                        {orderDetails.tourLabel}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="td1">
                                        Країна
                                    </td>
                                    <td className="td2">
                                        {orderDetails.tourCountry}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="td1">
                                        Місто
                                    </td>
                                    <td className="td2">
                                        {orderDetails.tourCity}
                                    </td>
                                </tr>
                            </tbody>                        
                        </table>
                    </div>           
                </div>
            </div>
        </div>
    );
}

export default OrderDetails;