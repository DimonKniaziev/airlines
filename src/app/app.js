import React from "react";
import Header from "../header";
import TourListPage from "../tour-list-page";
import RegistrationForm from "../registration-form";
import LoginForm from "../login-form";
import "./app.css";

const App = () => {
  
  return (
    <div className="App">
      <Header/>
      <TourListPage/>
      <LoginForm/>
    </div>
  );
}

export default App;
