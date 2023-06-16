import React from "react";
import { useUsers } from "../store";
import "./header.css"

const Header = () => {
    const users = useUsers(state => state.users);
    const autorizedUser = useUsers(state => state.autorizedUser);
    let userName = autorizedUser.id ? users.find(user => user.id === autorizedUser.id).login : 'Увійти';

    console.log (autorizedUser);

    return (
        <div className="header">            
            <h1>WWTour</h1>
            <h2>Тури</h2>
            <h3 className="logIn-link">{userName}</h3>                      
        </div>
    )
}

export default Header;