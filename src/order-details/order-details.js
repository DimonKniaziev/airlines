import React, { useState, useEffect } from "react";
import { useSearchParams, Navigate } from "react-router-dom";
import { useUsers } from "../store";
import { doc } from "firebase/firestore";
import { getFirestoreDatabyRef } from "../airlines-data-service";
import { firestore } from "../firebase";
import "./order-details.css"

const OrderDetails = () => {
    const [tour, setTour] = useState();
    const [user, setUser] = useState();
    const [order, setOrder] = useState();
    const [onLoading, setOnLoading] = useState(true);

    const loadData = async () => {
        const order = await getFirestoreDatabyRef(doc(firestore, "orders", searchParams.get('id')))
            .then(async(order) => {
                setTour(await getFirestoreDatabyRef(doc(firestore, "tours", order.tour_id)));
                setUser(await getFirestoreDatabyRef(doc(firestore, "users", order.user_id)));
                return order;
            })
        setOrder(order);
        setOnLoading(false);        
    }

    useEffect(() => {
        loadData()
    }, [])

    let [searchParams] = useSearchParams();
    const autorizedUser = useUsers(state => state.autorizedUser);

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

    const getOrderDetails = () => {
        const userName = `${user?.surname} ${user?.name} ${user?.patronymic}`;
        const tourLabel = tour?.label;
        const tourTransport = tour?.transport;
        const tourCountry = tour?.country;
        const tourCity = tour?.city;

        return {...order, userName, tourLabel, tourTransport, tourCountry, tourCity};
    }

    const orderDetails = getOrderDetails();

    const touristsList = order?.tourists.map((item) => {
        return (            
            <tr key={item.id}>
                <td>{item.surname}</td>
                <td>{item.name}</td>
                <td>{item.patronymic}</td>
                <td>{item.phone}</td>
                <td>{formatDate(item.date)}</td>
            </tr>
        );
    });

    if (!autorizedUser.id) {
        return <Navigate to="/"/>
    }

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
                                        {formatDate(orderDetails.start)}
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

                <div className="order-details-header">
                    <h1>ТУРИСТИ</h1>
                </div>

                <div className="order-details-body">
                    <div className="order-details-table">
                        <table>
                            <tbody>
                                <tr>
                                    <td>Прізвище</td>
                                    <td>Ім'я</td>
                                    <td>По-батькові</td>
                                    <td>Телефон</td>
                                    <td>Дата народження</td>
                                </tr>
                                {touristsList}                               
                            </tbody>                        
                        </table>
                    </div>
                </div>                     
            </div>
        </div>
    );
}

const formatDate = (timeStamp) => {
    const date = new Date(timeStamp.seconds * 1000 + timeStamp.nanoseconds / 1000000);
    const year    = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}

export default OrderDetails;