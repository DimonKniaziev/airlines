import React from "react";
import ReportGeneratorFilter from "../report-generator-filter";
import ReportTemplate from "../report-template";
import "./report-generator-page.css"

const ReportGeneratorPage = () => {
    return (
        <div className="report-generator-page">
            <div className="filter-list-container">
                <ReportGeneratorFilter/>                
                <ReportTemplate/>
            </div>
        </div>
    )
}

export default ReportGeneratorPage;