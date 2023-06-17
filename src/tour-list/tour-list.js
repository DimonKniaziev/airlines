import React from "react";
import { Link } from "react-router-dom";
import TourListItem from "../tour-list-item";
import { useTours, useFilter } from "../store";
import "./tour-list.css"

const TourList = () => {
    const tours = useTours((state) => state.tours);

    const searchterm = useFilter((state) => state.searchTerm);

    const countryFilter = useFilter((state) => state.countryFilter);
    const startDateFilter = useFilter((state) => state.startDateFilter);
    const tourDurationFilter = useFilter((state) => state.tourDurationFilter);
    const starsFilter1 = useFilter((state) => state.starsFilter1);
    const starsFilter2 = useFilter((state) => state.starsFilter2);
    const starsFilter3 = useFilter((state) => state.starsFilter3);
    const starsFilter4 = useFilter((state) => state.starsFilter4);
    const starsFilter5 = useFilter((state) => state.starsFilter5);
    const placesNeedFilter = useFilter((state) => state.placesNeedFilter); 
    const transportFilter = useFilter((state) => state.transportFilter); 
    const minPriceFilter = useFilter((state) => state.minPriceFilter);
    const maxPriceFilter = useFilter((state) => state.maxPriceFilter);  

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

    const onOpenDetails = (id) => {        
        console.log(id);
    }
    if (visibleItems.length < 1) {
        return <h1>Жодного туру не знайдено</h1>
    }
    else {
        const tourItems = visibleItems.map((item) => {
            const {id, ...itemProps} = item;
          
            return (
                <Link to={`/tour-details?id=${id}`}>
                    <TourListItem {...itemProps} key={id} placesNeed={placesNeedFilter}/>
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