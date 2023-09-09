import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TourListItem from "../tour-list-item";
import { useTourFilter } from "../store";
import { getFirestoreData } from "../airlines-data-service";
import { collection, query as firestoreQuery, where, or } from "firebase/firestore";
import { firestore } from "../firebase";
import "./tour-list.css"

const TourList = () => {
    const searchTerm = useTourFilter((state) => state.searchTerm);
    const countryFilter = useTourFilter((state) => state.countryFilter);
    const starsFilter = useTourFilter((state) => state.starsFilter);
    const placesNeedFilter = useTourFilter((state) => state.placesNeedFilter); 
    const transportFilter = useTourFilter((state) => state.transportFilter); 
    const minPriceFilter = useTourFilter((state) => state.minPriceFilter);
    const maxPriceFilter = useTourFilter((state) => state.maxPriceFilter);

    const [toursList, setToursList] = useState([]);
    const [onLoading, setOnLoading] = useState(true);

    const loadToursList = async () => {        
        setToursList(await getFirestoreData(formToursQuerry()));
        setOnLoading(false);
    }

    useEffect(() => {
        setOnLoading(true);
        loadToursList();
    }, [searchTerm, countryFilter, starsFilter, transportFilter, minPriceFilter, maxPriceFilter])
    
    const formToursQuerry = () => {
        let filteredQuery = firestoreQuery(collection(firestore, 'tours'));

        if (searchTerm) {
            filteredQuery = firestoreQuery(filteredQuery, where('label', '==', searchTerm));
        }

        if (countryFilter) {
            filteredQuery = firestoreQuery(filteredQuery, where('country', '==', countryFilter));
        }

        filteredQuery = firestoreQuery(filteredQuery, where('stars', 'in', starsFilter));
        
        if (transportFilter) {
            filteredQuery = firestoreQuery(filteredQuery, where('transport', '==', transportFilter));
        }
        else {
            filteredQuery = firestoreQuery(filteredQuery, or(
                where('transport', '==', 'Літак'),
                or(
                    where('transport', '==', 'Автобус'),
                    where('transport', '==', 'Без Транспорту')
                )
            ));
        }

        if (minPriceFilter) {
            filteredQuery = firestoreQuery(filteredQuery, where('price', '>=', parseInt(minPriceFilter)));
        }
        else {
            filteredQuery = firestoreQuery(filteredQuery, where('price', '>', 0));
        }

        if (maxPriceFilter) {
            filteredQuery = firestoreQuery(filteredQuery, where('price', '<=', parseInt(maxPriceFilter)));
        }
        else {
            filteredQuery = firestoreQuery(filteredQuery, where('price', '<', 99999999999999999999999));
        }

        return filteredQuery;
    }

    if (onLoading) {
        return (
            <div className="loading-message-container">
                <div>
                    <h1>
                        Завантажую...
                    </h1>
                </div>
            </div>                  
        );
    }

    else if (toursList?.length < 1) {
        return (
            <div className="no-tours-message-container">
                <div>
                    <h1>
                        Жодного туру не знайдено
                    </h1>
                    <h3>
                        Спробуйте змінити параметри пошуку, наприклад тип транспорту.
                    </h3> 
                </div>
            </div>                  
        );
    }
    else {
        const tourItems = toursList?.map((item) => {
            const {id, ...itemProps} = item;
          
            return (
                <Link to={`/tour-details?id=${id}`} key={id}>
                    <TourListItem {...itemProps} placesNeed={placesNeedFilter}/>
                </Link>                 
            );
        });
        return (
            <div className="tour-list">                                
                {tourItems}
            </div>        
        )
    }
}

export default TourList;