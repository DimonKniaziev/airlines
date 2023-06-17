import React from "react";
import { useSearchParams } from "react-router-dom";
import "./order-form.css";

const OrderForm = () => {    
    let [searchParams, setSearchParams] = useSearchParams();
    setSearchParams({tourId: 1,})

    return (
        <div className="order-form-container">
            <div className="order-form-header">
                <h1 className="hotel-name">Some Hotel</h1>
                <h1 className="country-name">Country</h1>
                <h2 className="order-date">12-14-2020</h2>
            </div>            
            <form className="order-form">
                <div className="order-form-item">
                    <h3>Турист №1</h3>
                    <div className="order-form-item-name-row">
                        <div className="order-form-item-field-container">
                            <span>Прізвище</span><br/>
                            <input type="text"/>
                        </div>
                        <div className="order-form-item-field-container">
                            <span>Ім'я</span><br/>
                            <input type="text"/>
                        </div>
                        <div className="order-form-item-field-container">
                            <span>По-батькові</span><br/>
                            <input type="text"/>
                        </div>
                    </div>
                    <div className="order-form-item-name-row">
                        <div className="order-form-item-field-container">
                            <span>Номер телефону</span><br/>
                            <input type="text"/>
                        </div>
                        <div className="order-form-item-field-container">
                            <span>Дата народження</span><br/>
                            <input type="date"/>
                        </div>
                    </div>
                </div>

                <div className="order-form-item">
                    <h3>Турист №1</h3>
                    <div className="order-form-item-name-row">
                        <div className="order-form-item-field-container">
                            <span>Прізвище</span><br/>
                            <input type="text"/>
                        </div>
                        <div className="order-form-item-field-container">
                            <span>Ім'я</span><br/>
                            <input type="text"/>
                        </div>
                        <div className="order-form-item-field-container">
                            <span>По-батькові</span><br/>
                            <input type="text"/>
                        </div>
                    </div>
                    <div className="order-form-item-name-row">
                        <div className="order-form-item-field-container">
                            <span>Номер телефону</span><br/>
                            <input type="text"/>
                        </div>
                        <div className="order-form-item-field-container">
                            <span>Дата народження</span><br/>
                            <input type="date"/>
                        </div>
                    </div>
                </div>
                <div className="submit-button-container">
                    <input type="submit" value="ЗАМОВИТИ" id="order-form-submit-button"/>
                </div>
            </form>
        </div>
    );
}

export default OrderForm;