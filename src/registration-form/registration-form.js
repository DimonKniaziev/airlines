import React, {useState} from "react";
import { useUsers } from "../store";
import "./registration-form.css";

const RegistrationForm = () => {
  const [surname, setSurname] = useState('');
  const [name, setName] = useState('');
  const [patronymic, setPatronymic] = useState('');
  const [login, setLogin] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');

  const users = useUsers(state => state.users);
  const addUser = useUsers(state => state.addUser);

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
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      name,
      surname,
      patronymic,
      login,
      email,
      password,
      phone,
      date
    };

    const existLogin = users.find(user => user.login === newUser.login);
    const existEmail = users.find(user => user.email === newUser.email);
    const existPhone = users.find(user => user.phone === newUser.phone);
    if (existLogin) {
      alert('Вказаний логін вже зайнятий');
    }
    else if (existEmail) {
      alert('Вказана електрона пошта вже зареєстрована');
    }
    else if (existPhone) {
      alert('Вказаний телефон вже зареєстрований');
    }
    else {
      alert('Ви успішно зареєструвалися!');
      addUser(newUser);        
    }
  }

  return (
    <form className="registration-form" onSubmit={onSubmit}>
      <h1>Реєстрація</h1>
      <span>Прізвище</span><br/>
      <input type="text" required={true} value={surname} onChange={onSurnameChange}/><br/>
      <span>Ім'я</span><br/>
      <input type="text" required={true} value={name} onChange={onNameChange}/><br/>
      <span>По-батькові</span><br/>
      <input type="text" required={true} value={patronymic} onChange={onPatronymicChange}/><br/>
      <span>Логін</span><br/>
      <input type="text" required={true} value={login} onChange={onLoginChange}/><br/>
      <span>Електронна пошта</span><br/>
      <input type="email" required={true} value={email} onChange={onEmailChange}/><br/>
      <span>Пароль</span><br/>
      <input type="password" required={true} minLength={8} value={password} onChange={onPasswordChange}/><br/>
      <span>Номер телефону</span><br/>
      <input type="tel" required={true} pattern="[0-9]{10}" value={phone} onChange={onPhoneChange}/><br/>
      <span>Номер телефону</span><br/>
      <input type="date" required={true} value={date} onChange={onDateChange}/><br/>
      <input type="submit" value="РЕЄСТРАЦІЯ" id="submit-button"/>   
    </form>
  );
}

export default RegistrationForm;
