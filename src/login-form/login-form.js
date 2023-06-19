import React, {useState} from "react";
import { Navigate } from "react-router-dom";
import { useUsers, useSearchHistory } from "../store";
import "./login-form.css";

const LoginForm = () => {
  const lastPage = useSearchHistory(state => state.lastPage);
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const users = useUsers(state => state.users);
  const autorizeUser = useUsers(state => state.autorizeUser);
  const autorizedUser = useUsers(state => state.autorizedUser);

  const onLoginChange = (e) => {
    setLogin(e.target.value);
  };
  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const newAutorizedUser = users.find(user => user.login === login && user.password === password);
    
    if (newAutorizedUser) {
      autorizeUser(newAutorizedUser);
      alert("Ви увійшли як " + newAutorizedUser.login);
    }
    else {
      alert("Не правильно введено Логін або Пароль");
    }
  }

  if (autorizedUser.login) {
    return <Navigate to={lastPage}/>;
  }

  return (
    <form className="login-form" onSubmit={onSubmit}>
      <h1>Aвторизація</h1>      
      <span>Логін</span><br/>
      <input type="text" value={login} onChange={onLoginChange} required={true}/><br/>
      <span>Пароль</span><br/>
      <input type="password" value={password} onChange={onPasswordChange} required={true}/><br/>
      <input type="submit" value="УВІЙТИ" id="login-submit-button"/>      
    </form>
  );
}

export default LoginForm;
