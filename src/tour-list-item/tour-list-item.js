import React from "react";
import "./tour-list-item.css"
import Images from "../image-store";

const TourListItem = ({label, price, stars, country, city, image_id, placesNeed, onOpenDetails}) => {
    return (        
        <div className="tour-list" onClick={onOpenDetails} style={{height: "145px", overflow: "hidden"}}>
            <div className="tour-list-item">               
                <img src={Images[image_id]} alt="hotel"/>
                <div className="tour-list-item-info-container">
                    <div className="tour-list-item-name-container">
                        <span className="tour-list-item-name">{label}</span>
                        <span className="tour-list-item-stars">{'*'.repeat(stars)}</span>
                    </div>
                    <div className="tour-list-item-location-container">
                        <span className="tour-list-item-container">{`${country}, ${city}`}</span>
                    </div>
                    <div className="tour-list-item-price-container">
                        <span className="tour-list-item-price">{price*placesNeed} грн</span><br/>
                        <span className="tour-list-item-places">за {placesNeed} місць</span>
                    </div>            
                </div>
            </div>
        </div>
    )
}

export default TourListItem;