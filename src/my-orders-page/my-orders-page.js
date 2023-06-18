import React from "react";
import OrderFilter from "../order-filter";
import MyOrders from "../my-orders/my-orders";
import "./my-orders-page.css";

const MyOrdersPage = () => {
    return (
        <div className="my-orders-page">
            <OrderFilter/>
            <MyOrders/>
        </div>
    );
}

export default MyOrdersPage;