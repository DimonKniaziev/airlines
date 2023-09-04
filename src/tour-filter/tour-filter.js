import React from "react";
import { useTourFilter } from "../store";
import "./tour-filter.css";


const TourFilter = () => {    
    const countryFilter = useTourFilter((state) => state.countryFilter);
    const startDateFilter = useTourFilter((state) => state.startDateFilter);
    const tourDurationFilter = useTourFilter((state) => state.tourDurationFilter);
    const starsFilter = useTourFilter((state) => state.starsFilter);    
    const placesNeedFilter = useTourFilter((state) => state.placesNeedFilter);
    const minPriceFilter = useTourFilter((state) => state.minPriceFilter);
    const maxPriceFilter = useTourFilter((state) => state.maxPriceFilter);
    const transportFilter = useTourFilter((state) => state.transportFilter);

    const setCountryFilter = useTourFilter((state) => state.setCountryFilter);
    const setStartDateFilter = useTourFilter((state) => state.setStartDateFilter);
    const setTourDurationFilter = useTourFilter((state) => state.setTourDurationFilter);
    const setStarsFilter = useTourFilter((state) => state.setStarsFilter);
    const setPlacesNeedFilter = useTourFilter((state) => state.setPlacesNeedFilter);
    const setTransportFilter = useTourFilter((state) => state.setTransportFilter);
    const setMinPriceFilter = useTourFilter((state) => state.setMinPriceFilter);
    const setMaxPriceFilter = useTourFilter((state) => state.setMaxPriceFilter);

    const handleStarsChange = (e) => {
        const { value, checked } = e.target;

        if (checked) {
            setStarsFilter([...starsFilter, parseInt(value)]);
        } else {          
            setStarsFilter(starsFilter.filter(item => item !== parseInt(value)));
        }
    }
    
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
                    <input type='checkbox' value={1} checked={starsFilter.includes(1)} onChange={handleStarsChange}/>
                    <span></span>
                </label>
                <label className="new-checkbox">
                    <input type='checkbox' value={2} checked={starsFilter.includes(2)} onChange={handleStarsChange}/>
                    <span></span>
                </label>
                <label className="new-checkbox">
                    <input type='checkbox' value={3} checked={starsFilter.includes(3)} onChange={handleStarsChange}/>
                    <span></span>
                </label>
                <label className="new-checkbox">
                    <input type='checkbox' value={4} checked={starsFilter.includes(4)} onChange={handleStarsChange}/>
                    <span></span>
                </label><label className="new-checkbox">
                    <input type='checkbox' value={5} checked={starsFilter.includes(5)} onChange={handleStarsChange}/>
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