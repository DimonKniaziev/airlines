import React from "react";
import Header from "../header";
import TourList from "../tour-list";
import TourSearchPanel from "../tour-search-panel";
import TourFilter from "../tour-filter";
import RegistrationForm from "../registration-form";
import LoginForm from "../login-form";
import "./app.css";

const App = () => {
  
  return (
    <div className="App">
      <Header/>
      <TourSearchPanel/>
      <div className="filter-list-container">
        <TourFilter/>
        <TourList/>
      </div>
    </div>
  );
}

export default App;
