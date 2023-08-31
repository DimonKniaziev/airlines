import React from "react";
import { Link } from "react-router-dom";
import { useUsers } from "../store";
import "./header.css"

const Header = () => {
    const autorizedUser = useUsers(state => state.autorizedUser);

    let loginLink;
    
    if (autorizedUser.user_id) {
        loginLink = (
            <h3 className="logIn-link">
                <Link to="/user-details">{autorizedUser.email}</Link>
            </h3>
        );
    }
    else {
        loginLink = (
            <h3 className="logIn-link">
                <Link to="/login">Увійти</Link>
                /
                <Link to="/registration">Зареєструватися</Link>
            </h3>
        );
    }

    let roleLink;

    if (autorizedUser.role === 'admin') {
        roleLink = (
            <Link to="/orders-list">Замовлення</Link>
        );
    }
    else if (autorizedUser.role === 'client') {
        roleLink = (
            <Link to="/my-orders">Мої замовлення</Link>
        );
    }

    return (
        <div className="header">            
            <h1>
                <Link to="/">WWTour</Link>
            </h1>
            <h2>
                <Link to="/tours">Тури</Link>
            </h2>
            <h2>
                {roleLink}
            </h2>
            {loginLink}
        </div>
    )
}

export default Header;