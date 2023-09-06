import React, { useState, useEffect } from "react";
import { useSearchHistory, useUsers } from "../store";
import { useSearchParams, Link } from "react-router-dom";
import { useTourFilter } from "../store";
import { doc } from "firebase/firestore";
import { getFirestoreDatabyRef, getImage} from "../airlines-data-service";
import { firestore } from "../firebase";
import "./tour-details.css"

const TourDetails = () => {
    let [searchParams] = useSearchParams();
    const setLastPage = useSearchHistory(state => state.setLastPage);
    const autorizedUser = useUsers(state => state.autorizedUser);
    setLastPage(`/tour-details?id=${searchParams.get('id')}`);
    const [openPlacesModal, setOpenPlacesModal] = useState(false);
    const [openStartDateModal, setOpenStartDateModal] = useState(false);
    const [openDurationModal, setOpenDurationModal] = useState(false);
    const [openTransportModal, setOpenTransportModal] = useState(false);
    const [tour, setTour] = useState([]);
    const [onLoading, setOnLoading] = useState(true);
    const [image, setImage] = useState();


    const onOpenPlacesModal = () => {
        setOpenPlacesModal(true);
    }
    const onClosePlacesModal = () => {
        setOpenPlacesModal(false);
    }

    const onOpenStartDateModal = () => {
        setOpenStartDateModal(true);
    }
    const onCloseStartDateModal = () => {
        setOpenStartDateModal(false);
    }

    const onOpenDurationModal = () => {
        setOpenDurationModal(true);
    }
    const onCloseDurationModal = () => {
        setOpenDurationModal(false);
    }

    const onOpenTransportModal = () => {
        setOpenTransportModal(true);
    }
    const onCloseTransportModal = () => {
        setOpenTransportModal(false);
    }

    const loadData = async () => {
        const tour = await getFirestoreDatabyRef(doc(firestore, "tours", searchParams.get('id')));
        setTour(tour);
        const image = await getImage(tour.image_id)
        setImage(image);
        setOnLoading(false);
    }

    useEffect(() => {
        loadData()
    }, [])
    
    const placesNeedFilter = useTourFilter((state) => state.placesNeedFilter);
    const startDateFilter = useTourFilter((state) => state.startDateFilter);
    const tourDurationFilter = useTourFilter((state) => state.tourDurationFilter);
    const transportFilter = useTourFilter((state) => state.transportFilter);

    if(onLoading) {
        return (
            <div className="loading-message-container">
                <div>
                    <h1>
                        Завантажую...
                    </h1>
                </div>
            </div> 
        )
    }    
    
    let orderFormButton = (
        <React.Fragment>
            <span>Увійдіть в систему, щоб зробити замовлення</span>
            <Link to={'/login'}>
                <div className="tour-details-order-button">                            
                    <h2>Увіти</h2>
                </div>
            </Link>
        </React.Fragment>
    );

    if (autorizedUser.role === 'client') {
        if (placesNeedFilter === '' || startDateFilter === '' || tourDurationFilter === '' || transportFilter === '') {
            orderFormButton = (            
                <React.Fragment>
                    <span>Заповніть таблицю, щоб зробити замовлення</span>
                        <div className="tour-details-order-button">                            
                            <h2>Замовити</h2>
                        </div>
                </React.Fragment>
            );
        }
        else {
            orderFormButton = (            
                <Link to={`/order-form?id=${tour.id}`}>
                    <div className="tour-details-order-button">                            
                        <h2>ЗАМОВИТИ</h2>
                    </div>
                </Link>
            );
        }
    }

    return (
        <div className="tour-details-container">
            <div className="tour-details">
                <div className="tour-info">
                        <img src={image} alt="hotel"/>
                    <div className="tour-details-info-container">
                        <div className="tour-details-info-name-container">
                            <span className="tour-details-info-name">{tour.label}</span>
                            <span className="tour-details-info-stars">{'*'.repeat(tour.stars)}</span>
                        </div>
                        <div className="tour-details-info-location-container">
                            <span className="tour-list-item-container">{`${tour.country}, ${tour.city}`}</span>
                        </div>
                        <div className="tour-details-info-description-container">
                            <span className="tour-details-info-description">{tour.description}</span>                    
                        </div>
                    </div>
                </div>
                <div className="tour-details-order">
                    <div className="tour-details-order-table">
                        <table>
                            <tbody>
                                <tr>
                                    <td className="td1">
                                        Туристи
                                    </td>
                                    <td className="td2">
                                        {placesNeedFilter} туриста
                                    </td>
                                    <td className="td3">
                                        <input type="button" value="Змінити" onClick={onOpenPlacesModal}/>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="td1">
                                        Дата відправлення
                                    </td>
                                    <td className="td2">
                                        {startDateFilter}
                                    </td>
                                    <td className="td3">
                                        <input type="button" value="Змінити" onClick={onOpenStartDateModal}/>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="td1">
                                        Тривалість Туру
                                    </td>
                                    <td className="td2">
                                        {tourDurationFilter} діб
                                    </td>
                                    <td className="td3">
                                        <input type="button" value="Змінити" onClick={onOpenDurationModal}/>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="td1">
                                        Транспорт
                                    </td>
                                    <td className="td2">
                                        {transportFilter}
                                    </td>
                                    <td className="td3">
                                        <input type="button" value="Змінити" onClick={onOpenTransportModal}/>
                                    </td>
                                </tr>
                            </tbody>                        
                        </table>
                    </div>
                    <div className="tour-details-order-price-button-container">
                        <div className="tour-details-order-price">
                            <span>Разом</span>
                            <h2>{placesNeedFilter * tour.price} ГРН</h2>
                        </div>
                        {orderFormButton}
                    </div>                
                </div>
            </div>
            <PlacesNeedModalWindow filterValue={placesNeedFilter} opened={openPlacesModal} onCloseModalWindow={onClosePlacesModal}/>
            <StartDateModalWindow filterValue={startDateFilter} opened={openStartDateModal} onCloseModalWindow={onCloseStartDateModal}/>
            <DurationModalWindow filterValue={tourDurationFilter} opened={openDurationModal} onCloseModalWindow={onCloseDurationModal}/>
            <TransportModalWindow filterValue={transportFilter} opened={openTransportModal} onCloseModalWindow={onCloseTransportModal}/>
        </div>
    );
}

const PlacesNeedModalWindow = ({filterValue, opened, onCloseModalWindow}) => {
    const setPlacesNeedFilter = useTourFilter((state) => state.setPlacesNeedFilter);
    const [number, setNumber] = useState(filterValue);

    const onSubmit = (e) => {
        e.preventDefault();    
        setPlacesNeedFilter(number);
        onCloseModalWindow();        
    }
    const onCloseModal = () => {
        setNumber(filterValue);
        onCloseModalWindow();
    }

    if(opened) {
        return (        
            <div className="modal-window-container" id="places-modal-window">
                <form className="modal-window places-modal-window" onSubmit={onSubmit}>
                    <div className="modal-window-top">
                        <span>Кількість туристів</span> <span className="close-modal-window-button" onClick={onCloseModal}>X</span>
                    </div>
                    <input type="number" value={number} onChange={(e) => setNumber(e.target.value)} min={1}/><br/>
                    <input type="submit" id="modal-window-submit" value="Змінити"/>
                </form>
            </div>
        );
    }
}

const StartDateModalWindow = ({filterValue, opened, onCloseModalWindow}) => {
    const setStartDateFilter = useTourFilter((state) => state.setStartDateFilter);
    const [date, setDate] = useState(filterValue);

    const onSubmit = (e) => {
        e.preventDefault();    
        setStartDateFilter(date);
        onCloseModalWindow();        
    }
    const onCloseModal = () => {
        setDate(filterValue);
        onCloseModalWindow();
    }

    if(opened) {
        return (        
            <div className="modal-window-container date-modal-window-container" id="places-modal-window">
                <form className="modal-window date-modal-window" onSubmit={onSubmit}>
                    <div className="modal-window-top">
                        <span>Дата відправлення</span> <span className="close-modal-window-button" onClick={onCloseModal}>X</span>
                    </div>
                    <input type="date" value={date} onChange={(e) => setDate(e.target.value)}/><br/>
                    <input type="submit" id="modal-window-submit" value="Змінити"/>
                </form>
            </div>
        );
    }
}

const DurationModalWindow = ({filterValue, opened, onCloseModalWindow}) => {
    const setTourDurationFilter = useTourFilter((state) => state.setTourDurationFilter);
    const [number, setNumber] = useState(filterValue);

    const onSubmit = (e) => {
        e.preventDefault();    
        setTourDurationFilter(number);
        onCloseModalWindow();        
    }
    const onCloseModal = () => {
        setNumber(filterValue);
        onCloseModalWindow();
    }

    if(opened) {
        return (        
            <div className="modal-window-container" id="places-modal-window">
                <form className="modal-window places-modal-window" onSubmit={onSubmit}>
                    <div className="modal-window-top">
                        <span>Тривалість туру</span> <span className="close-modal-window-button" onClick={onCloseModal}>X</span>
                    </div>
                    <input type="number" value={number} onChange={(e) => setNumber(e.target.value)} min="1"/><br/>
                    <input type="submit" id="modal-window-submit" value="Змінити"/>
                </form>
            </div>
        );
    }
}

const TransportModalWindow = ({filterValue, opened, onCloseModalWindow}) => {
    const setTransportFilter = useTourFilter((state) => state.setTransportFilter);
    const [transport, setTransport] = useState(filterValue);

    const onSubmit = (e) => {
        e.preventDefault();    
        setTransportFilter(transport);
        onCloseModalWindow();        
    }
    const onCloseModal = () => {
        setTransport(filterValue);
        onCloseModalWindow();
    }

    if(opened) {
        return (        
            <div className="modal-window-container" id="transport-modal-window">
                <form className="modal-window transport-modal-window" onSubmit={onSubmit}>
                    <div className="modal-window-top">
                        <span>Транспорт</span> <span className="close-modal-window-button" onClick={onCloseModal}>X</span>
                    </div>
                    <div id="transport-modal-radio-container">
                        <input type="radio" id="radioAirPlane" name="transport" checked={transport === 'Літак'} value="Літак" onChange={(e) => setTransport(e.target.value)}/>
                        <label htmlFor="radioAirPlane">Літак</label>
                    </div>
                    <div id="transport-modal-radio-container">
                        <input type="radio" id="radioBus" name="transport" checked={transport === 'Автобус'} value="Автобус" onChange={(e) => setTransport(e.target.value)}/>
                        <label htmlFor="radioBus">Автобус</label>
                    </div>
                    <div id="transport-modal-radio-container">
                        <input type="radio" id="radioNoTransport" name="transport" checked={transport === 'Без Транспорту'} value="Без Транспорту" onChange={(e) => setTransport(e.target.value)}/>
                        <label htmlFor="radioNoTransport">Без Транспорту</label>
                    </div>
                    <input type="submit" id="modal-window-submit" value="Змінити"/>
                </form>
            </div>
        );
    }
}

export default TourDetails;