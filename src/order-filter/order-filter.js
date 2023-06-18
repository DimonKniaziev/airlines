import React, {useState} from "react";
import { useOrderFilter } from "../store";
import "./order-filter.css";

const OrderFilter = () => {
    const periodFilter = useOrderFilter((state) => state.periodFilter);
    const sortingTerm = useOrderFilter((state) => state.sortingTerm);

    const setPeriodFilter = useOrderFilter((state) => state.setPeriodFilter);
    const setSortingTerm = useOrderFilter((state) => state.setSortingTerm);

    const onSetPeriodFilter = (e) => {
        setPeriodFilter(e.target.value);
    }
    const onSetSortingTerm = (e) => {
        setSortingTerm(e.target.value);
    }

    return (
        <div className="order-filter">            
            <div className="filter-row-container">
                <h3>Пошук Замовлень</h3>
            </div>
            <div id="filter-radio-container">
                <input type="radio" id="radioLastYear" name="period" value="all" onChange={onSetPeriodFilter} defaultChecked={true}/>
                <label htmlFor="radioLastYear">Всі</label>
            </div>
            <div id="filter-radio-container">
                <input type="radio" id="radioLastMonth" name="period" value="lastMonth" onChange={onSetPeriodFilter}/>
                <label htmlFor="radioLastMonth">За останній місяць</label>
            </div>
            <div id="filter-radio-container">
                <input type="radio" id="radioLastQarter" name="period" value="lastQuarter" onChange={onSetPeriodFilter}/>
                <label htmlFor="radioLastQarter">За останній квартал</label>
            </div>

            <div className="filter-row-container">
                <h3>Сортувати</h3>
            </div>
            <div id="filter-radio-container">
                <input type="radio" id="radioHotel" name="sorting" value="hotel" onChange={onSetSortingTerm}/>
                <label htmlFor="radioLastYear">За готелями</label>
            </div>
            <div id="filter-radio-container">
                <input type="radio" id="radioDate" name="sorting" value="date" onChange={onSetSortingTerm}/>
                <label htmlFor="radioLastMonth">За датою</label>
            </div>
            <div id="filter-radio-container">
                <input type="radio" id="radioPrice" name="sorting" value="price" onChange={onSetSortingTerm}/>
                <label htmlFor="radioLastQarter">За ціною</label>
            </div>
            <div id="filter-radio-container">
                <input type="radio" id="radioClient" name="sorting" value="client" onChange={onSetSortingTerm}/>
                <label htmlFor="radioLastQarter">За клієнтами</label>
            </div>
            <input type="button" value="Сформувати Звіт" id="report-create-button"/>
        </div>
    );
}

export default OrderFilter;