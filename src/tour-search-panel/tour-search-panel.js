import React from "react";
import { useFilter } from "../store";
import "./tour-search-panel.css"

const TourSearchPanel = () => {
  const searchTerm = useFilter((state) => state.searchTerm)
  const setSearchTerm = useFilter((state) => state.setSearchTerm);

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