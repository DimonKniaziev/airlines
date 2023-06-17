import React from "react";
import { Link } from "react-router-dom";
import { useUsers } from "../store";
import "./header.css"

const Header = () => {
    const users = useUsers(state => state.users);
    const autorizedUser = useUsers(state => state.autorizedUser);
    let userName = autorizedUser.id ? users.find(user => user.id === autorizedUser.id).login : 'Увійти';

    return (
        <div className="header">            
            <h1>
                <Link to="/">WWTour</Link>
            </h1>
            <h2>
                <Link to="/tours">Тури</Link>
            </h2>
            <h3 className="logIn-link">
                <Link to="/login">{userName}</Link>
            </h3>                      
        </div>
    )
}

export default Header;