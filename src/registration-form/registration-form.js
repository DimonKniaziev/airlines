import React, {useState} from "react";
import {getAuth, createUserWithEmailAndPassword} from "firebase/auth";
import { Navigate } from "react-router-dom";
import { useUsers, useSearchHistory } from "../store";
import { addFirestoreDataByName } from "../airlines-data-service";
import "./registration-form.css";

const RegistrationForm = () => {
  const lastPage = useSearchHistory(state => state.lastPage);
  const [surname, setSurname] = useState('');
  const [name, setName] = useState('');
  const [patronymic, setPatronymic] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [date, setDate] = useState('');

  const autorizedUser = useUsers(state => state.autorizedUser);
  const autorizeUser = useUsers(state => state.autorizeUser);

  const onSubmit = (e) => {
    e.preventDefault();
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then(async({user}) => {
        const newUser = {
          user_id : user.uid,
          email : user.email,
          role : "client",
          surname,
          name,
          patronymic,
          phoneNumber,
          date
        };

        await addFirestoreDataByName("users", newUser)
        autorizeUser(newUser);
      })
      .catch(console.error)   
  }

  if (autorizedUser.user_id) {
    return <Navigate to={lastPage}/>;
  }

  return (    
    <form className="registration-form" onSubmit={onSubmit}>
      <h1>Реєстрація</h1>
      <span>Прізвище</span><br/>
      <input type="text" required={true} value={surname} onChange={(e) => setSurname(e.target.value)}/><br/>
      <span>Ім'я</span><br/>
      <input type="text" required={true} value={name} onChange={(e) => setName(e.target.value)}/><br/>
      <span>По-батькові</span><br/>
      <input type="text" required={true} value={patronymic} onChange={(e) => setPatronymic(e.target.value)}/><br/>
      <span>Електронна пошта</span><br/>
      <input type="email" required={true} value={email} onChange={(e) => setEmail(e.target.value)}/><br/>
      <span>Пароль</span><br/>
      <input type="password" required={true} minLength={8} value={password} onChange={(e) => setPassword(e.target.value)}/><br/>
      <span>Номер телефону</span><br/>
      <input type="tel" required={true} pattern="[0-9]{10}" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}/><br/>
      <span>Дата народження</span><br/>
      <input type="date" required={true} value={date} onChange={(e) => setDate(e.target.value)}/><br/>
      <input type="submit" value="РЕЄСТРАЦІЯ" id="submit-button"/>
    </form>
  );
}

export default RegistrationForm;
