import React from "react";
import { useTourFilter } from "../store";
import "./tour-filter.css";


const TourFilter = () => {    
    const countryFilter = useTourFilter((state) => state.countryFilter);
    const startDateFilter = useTourFilter((state) => state.startDateFilter);
    const tourDurationFilter = useTourFilter((state) => state.tourDurationFilter);
    const starsFilter1 = useTourFilter((state) => state.starsFilter1);
    const starsFilter2 = useTourFilter((state) => state.starsFilter2);
    const starsFilter3 = useTourFilter((state) => state.starsFilter3);
    const starsFilter4 = useTourFilter((state) => state.starsFilter4);
    const starsFilter5 = useTourFilter((state) => state.starsFilter5);
    const placesNeedFilter = useTourFilter((state) => state.placesNeedFilter);
    const minPriceFilter = useTourFilter((state) => state.minPriceFilter);
    const maxPriceFilter = useTourFilter((state) => state.maxPriceFilter);
    const transportFilter = useTourFilter((state) => state.transportFilter);

    const setCountryFilter = useTourFilter((state) => state.setCountryFilter);
    const setStartDateFilter = useTourFilter((state) => state.setStartDateFilter);
    const setTourDurationFilter = useTourFilter((state) => state.setTourDurationFilter);
    const setStarsFilter1 = useTourFilter((state) => state.setStarsFilter1);
    const setStarsFilter2 = useTourFilter((state) => state.setStarsFilter2);
    const setStarsFilter3 = useTourFilter((state) => state.setStarsFilter3);
    const setStarsFilter4 = useTourFilter((state) => state.setStarsFilter4);
    const setStarsFilter5 = useTourFilter((state) => state.setStarsFilter5);
    const setPlacesNeedFilter = useTourFilter((state) => state.setPlacesNeedFilter);
    const setTransportFilter = useTourFilter((state) => state.setTransportFilter);
    const setMinPriceFilter = useTourFilter((state) => state.setMinPriceFilter);
    const setMaxPriceFilter = useTourFilter((state) => state.setMaxPriceFilter);
    
    return (
        <div className="tour-filter" background="red">
            <div className="filter-row-container">
                <h3>ПОШУК ТУРУ</h3>
            </div>            
            <div className="filter-row-container">
                <input type="text" placeholder="Країна" className="country-search" value={countryFilter} onChange={(e) => setCountryFilter(e.target.value)}/>
            </div>
            <div className="filter-row-container">
                <span>Початок туру</span>
            </div>
            <div className="filter-row-container">
                <input type="date" value={startDateFilter} onChange={(e) => setStartDateFilter(e.target.value)}/>
            </div>
            <div className="filter-row-container">
                <span>Тривалість туру</span>
            </div>
            <div className="filter-row-container">
                <input type="number" value={tourDurationFilter} onChange={(e) => setTourDurationFilter(e.target.value)} min={1}/>
                <span>Діб</span>
            </div>
            <div className="filter-row-container">
                <span>Категорії готелю</span><br/>
            </div>
            <div className="filter-row-container">
                <label className="new-checkbox">
                    <input type='checkbox' value={0} checked={starsFilter1} onChange={(e) => setStarsFilter1(e.target.value)}/>
                    <span></span>
                </label>
                <label className="new-checkbox">
                    <input type='checkbox' value={1} checked={starsFilter2} onChange={(e) => setStarsFilter2(e.target.value)}/>
                    <span></span>
                </label>
                <label className="new-checkbox">
                    <input type='checkbox' value={2} checked={starsFilter3} onChange={(e) => setStarsFilter3(e.target.value)}/>
                    <span></span>
                </label>
                <label className="new-checkbox">
                    <input type='checkbox' value={3} checked={starsFilter4} onChange={(e) => setStarsFilter4(e.target.value)}/>
                    <span></span>
                </label><label className="new-checkbox">
                    <input type='checkbox' value={4} checked={starsFilter5} onChange={(e) => setStarsFilter5(e.target.value)}/>
                    <span></span>
                </label>
            </div>            
            <div className="filter-row-container">
                <span className="stars-label">1*</span>
                <span className="stars-label">2*</span>
                <span className="stars-label">3*</span>
                <span className="stars-label">4*</span>
                <span className="stars-label">5*</span>
            </div>
            <div className="filter-row-container">
                <span>Кількість туристів</span>
                <input type="number" value={placesNeedFilter} onChange={(e) => setPlacesNeedFilter(e.target.value)} min={1}/><br/>
            </div>
            <div className="filter-row-container">
                <span>Транспорт</span>
            </div>
            <div id="filter-radio-container">
                <input type="radio" id="radioAirPlane" name="transport" value="Літак" onChange={(e) => setTransportFilter(e.target.value)} checked={transportFilter === "Літак"}/>
                <label htmlFor="radioAirPlane">Літак</label>
            </div>
            <div id="filter-radio-container">
                <input type="radio" id="radioBus" name="transport" value="Автобус" onChange={(e) => setTransportFilter(e.target.value)} checked={transportFilter === "Автобус"}/>
                <label htmlFor="radioBus">Автобус</label>
            </div>
            <div id="filter-radio-container">
                <input type="radio" id="radioNoTransport" name="transport" value="Без Транспорту" onChange={(e) => setTransportFilter(e.target.value)} checked={transportFilter === "Без Транспорту"}/>
                <label htmlFor="radioNoTransport">Без Транспорту</label>
            </div>
            <div className="filter-row-container">
                <span>Ціна</span>
            </div>
            <div className="filter-row-container">
                <span>Від</span>
                <input type="number" id="price-input" value={minPriceFilter} onChange={(e) => setMinPriceFilter(e.target.value)} max={maxPriceFilter}/>
                <span>До</span>
                <input type="number" id="price-input" value={maxPriceFilter}  onChange={(e) => setMaxPriceFilter(e.target.value)} min={minPriceFilter}/>  
            </div>            
        </div>
    );
}

export default TourFilter;