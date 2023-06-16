import React from "react";
import "./header.css"

const Header = () => {
    return (
        <div className="header">
            <ul className="navBar">
                <h1>WWTour</h1>
                <h2>Тури</h2>
                <h3 className="logIn-link">DimKniaz</h3>
            </ul>            
        </div>
    )
}

export default Header;