import React from "react";
import TourSearchPanel from "../tour-search-panel";
import TourFilter from "../tour-filter";
import TourList from "../tour-list/tour-list";
import "./tour-list-page.css";

const TourListPage = () => {
  
    return (
      <div className="tour-list-page">        
        <TourSearchPanel/>
        <div className="filter-list-container">
          <TourFilter/>
          <TourList/>
        </div>
      </div>
    );
  }
  
  export default TourListPage;