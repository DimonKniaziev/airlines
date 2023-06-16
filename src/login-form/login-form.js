import React from "react";
import "./login-form.css";

const LoginForm = () => {
  return (
    <div className="login-form">
      <h1>Реєстрація</h1>
      <span>Прізвище</span><br/>
      <input type="text"/><br/>
      <span>Ім'я</span><br/>
      <input type="text"/><br/>
      <span>По-батькові</span><br/>
      <input type="text"/><br/>
      <span>Логін</span><br/>
      <input type="text"/><br/>
      <span>Електронна пошта</span><br/>
      <input type="text"/><br/>
      <span>Пароль</span><br/>
      <input type="password"/><br/>
      <span>Номер телефону</span><br/>
      <input type="text"/><br/>
      <input type="button" value="РЕЄСТРАЦІЯ" id="submit-button"/>   
    </div>
  );
}

export default LoginForm;
