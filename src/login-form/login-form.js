import React, {useState} from "react";
import { Navigate } from "react-router-dom";
import { useUsers, useSearchHistory } from "../store";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { getAllDataByName } from "../airlines-data-service";
import "./login-form.css";
import dataBase from "../firebase";

const LoginForm = () => {
  const lastPage = useSearchHistory(state => state.lastPage);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const autorizeUser = useUsers(state => state.autorizeUser);
  const autorizedUser = useUsers(state => state.autorizedUser);

  const onSubmit = (e) => {
    e.preventDefault();
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then(async({user}) => {
        const usersInfo = await getAllDataByName("users");
        const autorizedUserInfo = usersInfo.find(userInfo => userInfo.user_id === user.uid);
        autorizeUser(autorizedUserInfo);        
      })
      .catch(console.error)
  }

  if (autorizedUser.id) {
    return <Navigate to={lastPage}/>;
  }

  return (
    <form className="login-form" onSubmit={onSubmit}>
      <h1>Aвторизація</h1>      
      <span>Електронна пошта</span><br/>
      <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} required={true}/><br/>
      <span>Пароль</span><br/>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required={true}/><br/>
      <input type="submit" value="УВІЙТИ" id="login-submit-button"/>      
    </form>
  );
}

export default LoginForm;
