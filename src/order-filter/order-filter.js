import React, {useState} from "react";
import { Link } from "react-router-dom";
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
                <input type="radio" id="radioLastYear" name="period" value="all" onChange={onSetPeriodFilter} defaultChecked={periodFilter === 'all'}/>
                <label htmlFor="radioLastYear">Всі</label>
            </div>
            <div id="filter-radio-container">
                <input type="radio" id="radioLastMonth" name="period" value="lastMonth" onChange={onSetPeriodFilter} defaultChecked={periodFilter === 'lastMonth'}/>
                <label htmlFor="radioLastMonth">За останній місяць</label>
            </div>
            <div id="filter-radio-container">
                <input type="radio" id="radioLastQarter" name="period" value="lastQuarter" onChange={onSetPeriodFilter} defaultChecked={periodFilter === 'lastQuarter'}/>
                <label htmlFor="radioLastQarter">За останній квартал</label>
            </div>

            <div className="filter-row-container">
                <h3>Сортувати</h3>
            </div>
            <div id="filter-radio-container">
                <input type="radio" id="radioHotel" name="sorting" value="hotel" onChange={onSetSortingTerm} defaultChecked={sortingTerm === 'hotel'}/>
                <label htmlFor="radioHotel">За готелями</label>
            </div>
            <div id="filter-radio-container">
                <input type="radio" id="radioDate" name="sorting" value="date" onChange={onSetSortingTerm} defaultChecked={sortingTerm === 'date'}/>
                <label htmlFor="radioDate">За датою</label>
            </div>
            <div id="filter-radio-container">
                <input type="radio" id="radioPrice" name="sorting" value="price" onChange={onSetSortingTerm}  defaultChecked={sortingTerm === 'price'}/>
                <label htmlFor="radioPrice">За ціною</label>
            </div>
            <div id="filter-radio-container">
                <input type="radio" id="radioClient" name="sorting" value="client" onChange={onSetSortingTerm}  defaultChecked={sortingTerm === 'client'}/>
                <label htmlFor="radioClient">За клієнтами</label>
            </div>
            <Link to="/report-generator">
                <input type="button" value="Сформувати Звіт" id="report-create-button"/>
            </Link>
        </div>
    );
}

export default OrderFilter;