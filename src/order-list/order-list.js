import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { useOrderFilter, useUsers } from "../store";
import { getFirestoreData, getFirestoreDatabyRef } from "../airlines-data-service";
import { collection, query as firestoreQuery, where, and, doc } from "firebase/firestore";
import { firestore } from "../firebase";
import { Timestamp } from "firebase/firestore";
import "./order-list.css";

const OrderList = () => {
    const [toursList, setToursList] = useState([]);
    const [usersList, setUsersList] = useState([]);
    const [ordersList, setOrdersList] = useState([]);
    const [onLoading, setOnLoading] = useState(true);    

    const autorizedUser = useUsers((state) => state.autorizedUser);
    const periodFilter = useOrderFilter((state) => state.periodFilter);
    const sortingTerm = useOrderFilter((state) => state.sortingTerm);

    const loadOrdersData = async () => {
        setOrdersList(await getFirestoreData(formOrdersQuery())
            .then(async(list) => {
                const tourIds = list.map((item) => {
                    return item.tour_id;
                });
                setToursList(await getTours(tourIds));

                const userIds = list.map((item) => {
                    return item.user_id;
                });
                setUsersList(await getUsers(userIds));

                return list;
            })
        );
        setOnLoading(false);
    }

    useEffect(() => {
        setOnLoading(true);
        loadOrdersData();
    }, [periodFilter])

    const getTours = async(Ids) => {
        const tours = await Promise.all(Ids.map(async (id) => {
            return await getFirestoreDatabyRef(doc(firestore, "tours", id));
        }));

        return tours;
    }

    const getUsers = async(Ids) => {
        const tours = await Promise.all(Ids.map(async (id) => {
            return await getFirestoreDatabyRef(doc(firestore, "users", id));
        }));

        return tours;
    }

    const formOrdersQuery = () => {
        let ordersQuery = firestoreQuery(collection(firestore, 'orders'));

        if (periodFilter === 'lastMonth') {            
            const today = new Date();
            const lastMonthDate = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;

            ordersQuery = firestoreQuery(ordersQuery, and(where('date', '>', Timestamp.fromDate(new Date(lastMonthDate))), where('date', '<', Timestamp.fromDate(new Date()))));
        }
        else if (periodFilter === 'lastYear') {
            const today = new Date();
            const lastYearDate = `${today.getFullYear()-1}-${today.getMonth() + 1}-${today.getDate()}`;

            ordersQuery = firestoreQuery(ordersQuery, and(where('date', '>', Timestamp.fromDate(new Date(lastYearDate))), where('date', '<', Timestamp.fromDate(new Date()))));
        }
        return ordersQuery;
    }

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
        );
    }

    const orderItemsInfo = ordersList.map(order => {
        const user = usersList.find(user => user.id === order.user_id);
        const userName = `${user?.surname} ${user?.name.charAt(0)}. ${user?.patronymic.charAt(0)}.`;
        const tourLabel = toursList.find(tour => tour.id === order.tour_id)?.label;

        return {...order, userName, tourLabel};
    });

    if (sortingTerm === 'hotel') {
        orderItemsInfo.sort((a, b) => a.tourLabel < b.tourLabel ? -1 : 1);
    }
    else if (sortingTerm === 'date') {
        orderItemsInfo.sort((a, b) => a.date > b.date ? -1 : 1);
    }
    else if (sortingTerm === 'price') {
        orderItemsInfo.sort((a, b) => a.totalPrice > b.totalPrice ? -1 : 1);
    }
    else if (sortingTerm === 'client') {
        orderItemsInfo.sort((a, b) => a.userName > b.userName ? -1 : 1);
    }

    if (orderItemsInfo.length < 1) {
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
        const orderItems = orderItemsInfo.map((order) => {       
            return (
                <tr key={order.id}>
                    <td>{formatDate(order.date)}</td>
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

const formatDate = (timeStamp) => {
    const date = new Date(timeStamp.seconds * 1000 + timeStamp.nanoseconds / 1000000);
    const year    = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}

export default OrderList;