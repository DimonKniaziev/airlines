import React from "react";
import { Link } from "react-router-dom";
import TourListItem from "../tour-list-item";
import { useTours, useTourFilter } from "../store";
import "./tour-list.css"

const TourList = () => {
    const tours = useTours((state) => state.tours);

    const searchterm = useTourFilter((state) => state.searchTerm);

    const countryFilter = useTourFilter((state) => state.countryFilter);
    const startDateFilter = useTourFilter((state) => state.startDateFilter);
    const tourDurationFilter = useTourFilter((state) => state.tourDurationFilter);
    const starsFilter1 = useTourFilter((state) => state.starsFilter1);
    const starsFilter2 = useTourFilter((state) => state.starsFilter2);
    const starsFilter3 = useTourFilter((state) => state.starsFilter3);
    const starsFilter4 = useTourFilter((state) => state.starsFilter4);
    const starsFilter5 = useTourFilter((state) => state.starsFilter5);
    const placesNeedFilter = useTourFilter((state) => state.placesNeedFilter); 
    const transportFilter = useTourFilter((state) => state.transportFilter); 
    const minPriceFilter = useTourFilter((state) => state.minPriceFilter);
    const maxPriceFilter = useTourFilter((state) => state.maxPriceFilter);  

    const search = (items, searchterm) => {
        if (searchterm.length === 0) {
            return items;
        }
        
        return items.filter((item) => {
            return item.label.toLowerCase().indexOf(searchterm.toLowerCase()) > -1;
        })
    }

    const filter = (items) => {
        let filteredItems = items;

        if (countryFilter) {
            filteredItems = filteredItems.filter((item) => item.country.toLowerCase().indexOf(countryFilter.toLowerCase()) > -1);
        }
        if (filteredItems.length > 0) {
            filteredItems = filteredItems.filter((item) => (
                item.stars === 1 && starsFilter1)||
                (item.stars === 2 && starsFilter2)||
                (item.stars === 3 && starsFilter3)||
                (item.stars === 4 && starsFilter4)||
                (item.stars === 5 && starsFilter5));
        }        

        if (transportFilter) {
            filteredItems = filteredItems.filter((item) => item.transport === transportFilter);
        }

        if (minPriceFilter) {
            filteredItems = filteredItems.filter((item) => item.price >= minPriceFilter);
        }

        if (maxPriceFilter) {
            filteredItems = filteredItems.filter((item) => item.price <= maxPriceFilter);
        }    

        return filteredItems;
    }

    const visibleItems = filter(search(tours, searchterm));

    if (visibleItems.length < 1) {
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
        const tourItems = visibleItems.map((item) => {
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