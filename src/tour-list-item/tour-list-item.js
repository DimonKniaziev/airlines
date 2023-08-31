import React, {useState, useEffect} from "react";
import "./tour-list-item.css";
import { getImage } from "../airlines-data-service";

const TourListItem = ({label, price, stars, country, city, image_id, placesNeed, onOpenDetails}) => {
    const [image, setImage] = useState();

    const loadImage = async () => {        
        setImage(await getImage(image_id));
        console.log(image);
    }

    useEffect(() => {
        loadImage()
    }, [])


    return (        
        <div className="tour-list" onClick={onOpenDetails} style={{height: "145px", overflow: "hidden"}}>
            <div className="tour-list-item">               
                <img src={image} alt="hotel"/>
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