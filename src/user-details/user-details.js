import React, {useState} from "react";
import { Navigate } from "react-router-dom";
import { useUsers, useSearchHistory } from "../store";
import "./user-details.css";

const UserDetails = () => {
    const lastPage = useSearchHistory(state => state.lastPage);
    const autorizeUser = useUsers(state => state.autorizeUser);
    const autorizedUser = useUsers(state => state.autorizedUser);

    const [surname, setSurname] = useState(autorizedUser? autorizedUser.surname : '');
    const [name, setName] = useState(autorizedUser? autorizedUser.name : '');
    const [patronymic, setPatronymic] = useState(autorizedUser? autorizedUser.patronymic : '');
    const [phoneNumber, setPhone] = useState(autorizedUser? autorizedUser.phoneNumber : '');
    const [date, setDate] = useState(autorizedUser? autorizedUser.date : '');

    const onLogout = () => {
        autorizeUser({id: ''});
    }

    const onDetailsChange = (e) => {
        e.preventDefault();
        const changedUser = {
            id: autorizedUser.id,
            name,
            surname,
            patronymic,
            phoneNumber,
            date
        };
        // addUser(changedUser);
    }

    if (!autorizedUser.user_id) {        
        return <Navigate to={lastPage}/>;
    }

    return (
        <div className="user-details-container">
            <div className="user-details-header">
                <h1>Деталі вашого облікового запису</h1><br/>
                <h2 className="logout-link" onClick={onLogout}>
                    Вийти з облікового запису
                </h2>        
            </div>
            <form className="user-details" onSubmit={onDetailsChange}>                    
                <div className="user-details-row">
                    <div className="user-details-field-container">
                        <span>Прізвище</span><br/>
                        <input type="text" value={surname} onChange={(e) => setSurname(e.target.value)}/>
                    </div>
                    <div className="user-details-field-container">
                        <span>Ім'я</span><br/>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
                    </div>
                    <div className="user-details-field-container">
                        <span>По-батькові</span><br/>
                        <input type="text" value={patronymic} onChange={(e) => setPatronymic(e.target.value)}/>
                    </div>
                </div>
                <div className="user-details-row">
                    <div className="user-details-field-container">
                        <span>Номер телефону</span><br/>
                        <input type="text" value={phoneNumber} onChange={(e) => setPhone(e.target.value)}/>
                    </div>
                    <div className="user-details-field-container">
                        <span>Дата народження</span><br/>
                        <input type="date" value={date} onChange={(e) => setDate(e.target.value)}/>
                    </div>
                </div>
                <div className="submit-button-container">
                    <input type="submit" value="ЗМІНИТИ ДАНІ" id="user-details-submit-button"/>
                </div>
            </form>
        </div>
    );
}

export default UserDetails;
