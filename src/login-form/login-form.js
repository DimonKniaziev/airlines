import React , {useState} from "react";
import { useUsers } from "../store";
import "./login-form.css";

const LoginForm = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const users = useUsers(state => state.users);
  const autorizedUser = useUsers(state => state.autorizedUser);
  const autorizeUser = useUsers(state => state.autorizeUser);

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
      console.log(autorizedUser);
    }
    else {
      alert("Не правильно введено Логін або Пароль");
    }
  }

  return (
    <form className="login-form" onSubmit={onSubmit}>
      <h1>Aвторизація</h1>      
      <span>Логін</span><br/>
      <input type="text" value={login} onChange={onLoginChange}/><br/>
      <span>Пароль</span><br/>
      <input type="password" value={password} onChange={onPasswordChange}/><br/>
      <input type="submit" value="УВІЙТИ" id="login-submit-button"/>      
    </form>
  );
}

export default LoginForm;
