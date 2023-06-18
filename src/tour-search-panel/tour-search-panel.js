import React from "react";
import { useTourFilter } from "../store";
import "./tour-search-panel.css"

const TourSearchPanel = () => {
  const searchTerm = useTourFilter((state) => state.searchTerm)
  const setSearchTerm = useTourFilter((state) => state.setSearchTerm);

  const onSearch = (e) => {
    setSearchTerm(e.target.value);
  }

  return (
    <div className="tour-search-panel">
      <input placeholder="ШУКАТИ ГОТЕЛЬ" value={searchTerm} onChange={onSearch}/>
    </div>
  );
}

export default TourSearchPanel;