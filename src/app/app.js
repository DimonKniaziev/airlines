import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "../header";
import TourListPage from "../tour-list-page";
import RegistrationForm from "../registration-form";
import LoginForm from "../login-form";
import "./app.css";

const App = () => {
  
  return (
    <div className="App">
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path="/tours" element={<TourListPage/>}/>
          <Route path="/login" element={<LoginForm/>}/>
        </Routes>
      </BrowserRouter>      
    </div>
  );
}

export default App;
