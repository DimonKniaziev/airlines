import React from "react";
import { Link } from "react-router-dom";
import { useUsers } from "../store";
import "./header.css"

const Header = () => {
    const users = useUsers(state => state.users);
    const autorizedUser = useUsers(state => state.autorizedUser);
    let loginLink;
    
        if (autorizedUser.id) {
            loginLink = (
                <h3 className="logIn-link">
                    <Link to="/login">{users.find(user => user.id === autorizedUser.id).login}</Link>
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

    return (
        <div className="header">            
            <h1>
                <Link to="/">WWTour</Link>
            </h1>
            <h2>
                <Link to="/tours">Тури</Link>
            </h2>
            {loginLink}
        </div>
    )
}

export default Header;