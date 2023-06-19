import React from "react";
import { useSearchHistory } from "../store";

import "./main-page.css"

const MainPage = () => {
    const setLastPage = useSearchHistory(state => state.setLastPage);
    setLastPage('/')
    return (
        <div className="main-page">
            <div>
                <h1>
                    Ласкаво просимо на сайт WWTour
                </h1>
            </div>
        </div>        
    );
}

export default MainPage;