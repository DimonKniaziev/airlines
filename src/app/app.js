import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "../header";
import MainPage from "../main-page";
import TourListPage from "../tour-list-page";
import OrderListPage from "../order-list-page";
import MyOrdersPage from "../my-orders-page";
import TourDetails from "../tour-details";
import OrderForm from "../order-form";
import RegistrationForm from "../registration-form";
import LoginForm from "../login-form";
import UserDetails from "../user-details";
import OrderDetails from "../order-details";
import "./app.css";

const App = () => {
  
  return (
    <div className="App">
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path="/" element={<MainPage/>}/>
          <Route path="/tours" element={<TourListPage/>}/>
          <Route path="/orders-list" element={<OrderListPage/>}/>
          <Route path="/my-orders" element={<MyOrdersPage/>}/>
          <Route path="/login" element={<LoginForm/>}/>
          <Route path="/registration" element={<RegistrationForm/>}/>
          <Route path="/tour-details" element={<TourDetails/>}/>
          <Route path="/order-form" element={<OrderForm/>}/>
          <Route path="/order-details" element={<OrderDetails/>}/>
          <Route path="/user-details" element={<UserDetails/>}/>
        </Routes>
      </BrowserRouter>      
    </div>
  );
}

export default App;
