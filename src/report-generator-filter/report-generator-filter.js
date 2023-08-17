import React from "react";
import { Link } from "react-router-dom";
import { useReportCategory } from "../store";
import "./report-generator-filter.css";

const ReportGeneratorFilter = () => {
    const reportPeriod = useReportCategory((state) => state.reportPeriod);
    const reportCategory = useReportCategory((state) => state.reportCategory);

    const setReportPeriod = useReportCategory((state) => state.setReportPeriod);
    const setReportCategory = useReportCategory((state) => state.setReportCategory);

    const onSetReportPeriod = (e) => {
        setReportPeriod(e.target.value);
    }
    const onSetReportCategory = (e) => {
        setReportCategory(e.target.value);
    }

    return (
        <div className="report-generator-filter">            
            <div className="filter-row-container">
                <h3>Сформувати звіт</h3>
            </div>
            <div id="filter-radio-container">
                <input type="radio" id="radioMonth" name="period" value="lastMonth" onChange={onSetReportPeriod} defaultChecked={reportPeriod === 'lastMonth'}/>
                <label htmlFor="radioMonth">За останній місяць</label>
            </div>
            <div id="filter-radio-container">
                <input type="radio" id="radioYear" name="period" value="lastYear" onChange={onSetReportPeriod} defaultChecked={reportPeriod === 'lastYear'}/>
                <label htmlFor="radioYear">За останній рік</label>
            </div>
            <div id="filter-radio-container">
                <input type="radio" id="radioAll" name="period" value="allTime" onChange={onSetReportPeriod} defaultChecked={reportPeriod === 'allTime'}/>
                <label htmlFor="radioAll">За весь час</label>
            </div>

            <div className="filter-row-container">
                <h3>За категорією</h3>
            </div>
            <div id="filter-radio-container">
                <input type="radio" id="radioallOrders" name="category" value="allOrders" onChange={onSetReportCategory} defaultChecked={reportCategory === 'allOrders'}/>
                <label htmlFor="radioallOrders">Всі замовлення</label>
            </div>
            <div id="filter-radio-container">
                <input type="radio" id="radioPopularHotel" name="category" value="popularHotel" onChange={onSetReportCategory} defaultChecked={reportCategory === 'popularHotel'}/>
                <label htmlFor="radioPopularHotel">Найпопулярніший готель</label>
            </div>
            <Link to="/report-generator">
                <input type="button" value="CФОРМУВАТИ" id="report-create-button"/>
            </Link>
        </div>
    );
}

export default ReportGeneratorFilter;