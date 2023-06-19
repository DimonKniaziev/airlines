import React from "react";
import { useSearchHistory } from "../store";
import OrderFilter from "../order-filter";
import MyOrders from "../my-orders/my-orders";
import "./my-orders-page.css";

const MyOrdersPage = () => {
    const setLastPage = useSearchHistory(state => state.setLastPage);
    setLastPage('/my-orders');
    
    return (
        <div className="my-orders-page">
            <OrderFilter/>
            <MyOrders/>
        </div>
    );
}

export default MyOrdersPage;