import React, {useState} from "react";
import { Navigate } from "react-router-dom";
import { useUsers, useSearchHistory } from "../store";
import "./user-details.css";

const UserDetails = () => {
    const lastPage = useSearchHistory(state => state.lastPage);
    const users = useUsers(state => state.users);
    const autorizeUser = useUsers(state => state.autorizeUser);
    const autorizedUser = useUsers(state => state.autorizedUser);
    const addUser = useUsers(state => state.addUser);

    const autorizedUserDetails = users.find(user => user.id === autorizedUser.id);
    const [surname, setSurname] = useState(autorizedUserDetails? autorizedUserDetails.surname : '');
    const [name, setName] = useState(autorizedUserDetails? autorizedUserDetails.name : '');
    const [patronymic, setPatronymic] = useState(autorizedUserDetails? autorizedUserDetails.patronymic : '');
    const [login, setLogin] = useState(autorizedUserDetails? autorizedUserDetails.login : '');
    const [email, setEmail] = useState(autorizedUserDetails? autorizedUserDetails.email : '');
    const [password, setPassword] = useState(autorizedUserDetails? autorizedUserDetails.password : '');
    const [phone, setPhone] = useState(autorizedUserDetails? autorizedUserDetails.phone : '');
    const [date, setDate] = useState(autorizedUserDetails? autorizedUserDetails.date : '');

    const onSurnameChange = (e) => {
        setSurname(e.target.value);
    };
    const onNameChange = (e) => {
        setName(e.target.value);
    };
    const onPatronymicChange = (e) => {
        setPatronymic(e.target.value);
    };
    const onLoginChange = (e) => {
        setLogin(e.target.value);
    };
    const onEmailChange = (e) => {
        setEmail(e.target.value);
    };
    const onPasswordChange = (e) => {
        setPassword(e.target.value);
    };
    const onPhoneChange = (e) => {
        setPhone(e.target.value);
    };
    const onDateChange = (e) => {
        setDate(e.target.value);
        console.log(e.target.value)
    };

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
            login,
            email,
            password,
            phone,
            date
        };
        addUser(changedUser);
    }

    if (!autorizedUser.login) {        
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
                        <input type="text" value={surname} onChange={onSurnameChange}/>
                    </div>
                    <div className="user-details-field-container">
                        <span>Ім'я</span><br/>
                        <input type="text" value={name} onChange={onNameChange}/>
                    </div>
                    <div className="user-details-field-container">
                        <span>По-батькові</span><br/>
                        <input type="text" value={patronymic} onChange={onPatronymicChange}/>
                    </div>
                </div>
                <div className="user-details-row">
                    <div className="user-details-field-container">
                        <span>Електрона пошта</span><br/>
                        <input type="text" value={email} onChange={onEmailChange}/>
                    </div>
                    <div className="user-details-field-container">
                        <span>Логін</span><br/>
                        <input type="text" value={login} onChange={onLoginChange}/>
                    </div>
                    <div className="user-details-field-container">
                        <span>Пароль</span><br/>
                        <input type="password" value={password} onChange={onPasswordChange}/>
                    </div>
                </div>
                <div className="user-details-row">
                    <div className="user-details-field-container">
                        <span>Номер телефону</span><br/>
                        <input type="text" value={phone} onChange={onPhoneChange}/>
                    </div>
                    <div className="user-details-field-container">
                        <span>Дата народження</span><br/>
                        <input type="date" value={date} onChange={onDateChange}/>
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
