import React from "react";
import OrderFilter from "../order-filter";
import OrderList from "../order-list/order-list";
import "./order-list-page.css";

const OrderListPage = () => {
    return (
        <div className="order-list-page">
            <OrderFilter/>
            <OrderList/>
        </div>
    );
}

export default OrderListPage;