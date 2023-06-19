import React from "react";
import { useTourFilter, useTours, useUsers, useOrders } from "../store";
import { useSearchParams } from "react-router-dom";
import "./order-form.css";

const OrderForm = () => {    
    let [searchParams] = useSearchParams();    
    const placesNeedFilter = useTourFilter(state => state.placesNeedFilter);
    const startDateFilter = useTourFilter(state => state.startDateFilter);
    const tourDurationFilter = useTourFilter(state => state.tourDurationFilter);
    const addOrder = useOrders(state => state.addOrder);
    const tours = useTours(state => state.tours);
    const autorizedUser = useUsers(state => state.autorizedUser);

    const tour = tours.find(tour => String(tour.id) === searchParams.get('id'));

    const repeatedFormItems = Array.from({ length: placesNeedFilter }, (_, index) => (
        <div className="order-form-item" key={index}>
            <h3>Турист №{index+1}</h3>
            <div className="order-form-item-name-row">
                <div className="order-form-item-field-container">
                    <span>Прізвище</span><br/>
                    <input type="text" id={`surname${index}`} required={true}/>
                </div>
                <div className="order-form-item-field-container">
                    <span>Ім'я</span><br/>
                    <input type="text" id={`name${index}`} required={true}/>
                </div>
                <div className="order-form-item-field-container">
                    <span>По-батькові</span><br/>
                    <input type="text" id={`patronymic${index}`} required={true}/>
                </div>
            </div>
            <div className="order-form-item-name-row">
                <div className="order-form-item-field-container">
                    <span>Номер телефону</span><br/>
                    <input type="tel" id={`phone${index}`} required={true}/>
                </div>
                <div className="order-form-item-field-container">
                    <span>Дата народження</span><br/>
                    <input type="date" id={`date${index}`} required={true}/>
                </div>
            </div>
        </div>           
    ))

    const onSubmitForm = (e) => {
        e.preventDefault();
        let tourists = [];

        for (let i = 0; i < placesNeedFilter; i++) {
            const surname = document.getElementById(`surname${i}`).value;
            const name = document.getElementById(`name${i}`).value;
            const patronymic = document.getElementById(`patronymic${i}`).value;
            const phone = document.getElementById(`phone${i}`).value;
            const date = document.getElementById(`date${i}`).value;
            tourists.push({id: i, surname, name, patronymic, phone, date});
        }
        const newOrder = {
            tour_id: tour.id,
            user_id: autorizedUser.id,
            date: formatDate(new Date()),
            start: startDateFilter,
            duration: tourDurationFilter,
            places: tourists.length,
            totalPrice: tourists.length * tour.price,
            tourists: tourists
        }
        addOrder(newOrder);
    }

    return (
        <div className="order-form-container">
            <div className="order-form-header">
                <h1 className="hotel-name">{tour.label}</h1>
                <h1 className="country-name">{tour.country}</h1>
                <h2 className="order-date">{startDateFilter}</h2>
            </div>            
            <form className="order-form" onSubmit={onSubmitForm}>           
                {repeatedFormItems}
                <div className="submit-button-container">
                    <input type="submit" value="ЗАМОВИТИ" id="order-form-submit-button"/>
                </div>
            </form>
        </div>
    );
}

function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
  }

export default OrderForm;