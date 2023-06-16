import React, { useState } from "react";
import { useFilter } from "../store";
import "./tour-filter.css";


const TourFilter = () => {
    const [x0, setX0] = useState(true);
    const [x1, setX1] = useState(true);
    const [x2, setX2] = useState(true);
    const [x3, setX3] = useState(true);
    const [x4, setX4] = useState(true);
    const countryFilter = useFilter((state) => state.countryFilter);
    const startDateFilter = useFilter((state) => state.startDateFilter);
    const tourDurationFilter = useFilter((state) => state.tourDurationFilter);
    const starsFilter1 = useFilter((state) => state.starsFilter1);
    const starsFilter2 = useFilter((state) => state.starsFilter2);
    const starsFilter3 = useFilter((state) => state.starsFilter3);
    const starsFilter4 = useFilter((state) => state.starsFilter4);
    const starsFilter5 = useFilter((state) => state.starsFilter5);
    const placesNeedFilter = useFilter((state) => state.placesNeedFilter);
    const minPriceFilter = useFilter((state) => state.minPriceFilter);
    const maxPriceFilter = useFilter((state) => state.maxPriceFilter);

    const setCountryFilter = useFilter((state) => state.setCountryFilter);
    const setStartDateFilter = useFilter((state) => state.setStartDateFilter);
    const setTourDurationFilter = useFilter((state) => state.setTourDurationFilter);
    const setStarsFilter1 = useFilter((state) => state.setStarsFilter1);
    const setStarsFilter2 = useFilter((state) => state.setStarsFilter2);
    const setStarsFilter3 = useFilter((state) => state.setStarsFilter3);
    const setStarsFilter4 = useFilter((state) => state.setStarsFilter4);
    const setStarsFilter5 = useFilter((state) => state.setStarsFilter5);
    const setPlacesNeedFilter = useFilter((state) => state.setPlacesNeedFilter);
    const setTransportFilter = useFilter((state) => state.setTransportFilter);
    const setMinPriceFilter = useFilter((state) => state.setMinPriceFilter);
    const setMaxPriceFilter = useFilter((state) => state.setMaxPriceFilter);
    
    const onSetCountryFilter = (e) => {
        setCountryFilter(e.target.value);
    }
    const onSetStartDateFilter = (e) => {
        setStartDateFilter(e.target.value);
    }
    const onSetTourDurationFilter = (e) => {
        setTourDurationFilter(e.target.value);
    }
    // const onSetStarsFilter = (e) => {
    //     let newStarsFilter = starsFilter;        
    //     newStarsFilter[e.target.value] = !newStarsFilter[e.target.value];        
    //     setStarsFilter(newStarsFilter);
    //     setX0(newStarsFilter[0]);
    //     setX1(newStarsFilter[1]);
    //     setX2(newStarsFilter[2]);
    //     setX3(newStarsFilter[3]);
    //     setX4(newStarsFilter[4]);
    //     console.log(newStarsFilter);
    // }
    const onSetStarsFilter1 = (e) => {
        setStarsFilter1(!starsFilter1);
    }
    const onSetStarsFilter2 = (e) => {
        setStarsFilter2(!starsFilter2);
    }
    const onSetStarsFilter3 = (e) => {
        setStarsFilter3(!starsFilter3);
    }
    const onSetStarsFilter4 = (e) => {
        setStarsFilter4(!starsFilter4);
    }
    const onSetStarsFilter5 = (e) => {
        setStarsFilter5(!starsFilter5);
    }
    const onSetPlacesNeedFilter = (e) => {
        setPlacesNeedFilter(e.target.value);
    }
    const onSetTransportFilter = (e) => {
        setTransportFilter(e.target.value);
    }
    const onSetMinPriceFilter = (e) => {
        setMinPriceFilter(e.target.value);
    }    
    const onSetMaxPriceFilter = (e) => {
        setMaxPriceFilter(e.target.value);
    }    
    
    return (
        <div className="tour-filter" background="red">
            <div className="filter-row-container">
                <h3>ПОШУК ТУРУ</h3>
            </div>            
            <div className="filter-row-container">
                <input type="text" placeholder="Країна" className="country-search" value={countryFilter} onChange={onSetCountryFilter}/>
            </div>
            <div className="filter-row-container">
                <span>Початок туру</span>
            </div>
            <div className="filter-row-container">
                <input type="date" value={startDateFilter} onChange={onSetStartDateFilter}/>
            </div>
            <div className="filter-row-container">
                <span>Тривалість туру</span>
            </div>
            <div className="filter-row-container">
                <input type="number" value={tourDurationFilter} onChange={onSetTourDurationFilter} min={1}/>
                <span>Діб</span>
            </div>
            <div className="filter-row-container">
                <span>Категорії готелю</span><br/>
            </div>
            <div className="filter-row-container">
                <label className="new-checkbox">
                    <input type='checkbox' value={0} checked={starsFilter1} onChange={onSetStarsFilter1}/>
                    <span></span>
                </label>
                <label className="new-checkbox">
                    <input type='checkbox' value={1} checked={starsFilter2} onChange={onSetStarsFilter2}/>
                    <span></span>
                </label>
                <label className="new-checkbox">
                    <input type='checkbox' value={2} checked={starsFilter3} onChange={onSetStarsFilter3}/>
                    <span></span>
                </label>
                <label className="new-checkbox">
                    <input type='checkbox' value={3} checked={starsFilter4} onChange={onSetStarsFilter4}/>
                    <span></span>
                </label><label className="new-checkbox">
                    <input type='checkbox' value={4} checked={starsFilter5} onChange={onSetStarsFilter5}/>
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
                <input type="number" value={placesNeedFilter} onChange={onSetPlacesNeedFilter} min={1}/><br/>
            </div>
            <div className="filter-row-container">
                <span>Транспорт</span>
            </div>
            <div id="filter-radio-container">
                <input type="radio" id="radioAirPlane" name="transport" value="Літак" onClick={onSetTransportFilter}/>
                <label htmlFor="radioAirPlane">Літак</label>
            </div>
            <div id="filter-radio-container">
                <input type="radio" id="radioBus" name="transport" value="Автобус" onClick={onSetTransportFilter}/>
                <label htmlFor="radioBus">Автобус</label>
            </div>
            <div id="filter-radio-container">
                <input type="radio" id="radioNoTransport" name="transport" value="Без Транспорту" onClick={onSetTransportFilter}/>
                <label htmlFor="radioNoTransport">Без Транспорту</label>
            </div>
            <div className="filter-row-container">
                <span>Ціна</span>
            </div>
            <div className="filter-row-container">
                <span>Від</span>
                <input type="number" id="price-input" value={minPriceFilter} onChange={onSetMinPriceFilter} max={maxPriceFilter}/>
                <span>До</span>
                <input type="number" id="price-input" value={maxPriceFilter}  onChange={onSetMaxPriceFilter} min={minPriceFilter}/>  
            </div>            
        </div>
    );
}

export default TourFilter;