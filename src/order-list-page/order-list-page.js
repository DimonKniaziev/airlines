import React from "react";
import { useSearchHistory } from "../store";
import OrderFilter from "../order-filter";
import OrderList from "../order-list/order-list";
import "./order-list-page.css";

const OrderListPage = () => {
    const setLastPage = useSearchHistory(state => state.setLastPage);
    setLastPage('/tours');
      
    return (
        <div className="order-list-page">
            <div className="filter-list-container">
                <OrderFilter/>
                <OrderList/>
            </div>
        </div>        
    );
}

export default OrderListPage;