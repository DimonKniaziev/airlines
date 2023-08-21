import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import ReportGeneratorFilter from "../report-generator-filter";
import ReportTemplate from "../report-template";
import "./report-generator-page.css"

const ReportGeneratorPage = () => {
    const componentRef = useRef();
    const handleCreateReport = useReactToPrint({
        content: () => componentRef.current
    });
    return (
        <div className="report-generator-page">
            <div className="filter-list-container">
                <ReportGeneratorFilter onCreateReport = {handleCreateReport}/>
                <div ref={componentRef}>
                    <ReportTemplate/>
                </div>
            </div>
        </div>
    )
}

export default ReportGeneratorPage;