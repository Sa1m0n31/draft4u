import React, {useState, useEffect} from 'react'
import logo from '../static/img/logo-dark.png'
import {isLoggedIn, loginAdmin} from "../helpers/auth";
import LoadingPage from "./LoadingPage";

const AdminLogin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [auth, setAuth] = useState(-2);

    useEffect(() => {
        isLoggedIn()
            .then((res) => {
                if(res?.data?.result === 2) {
                    window.location = "/panel";
                }
                else {
                    setAuth(-1);
                }
            });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        if(username && password) {
            loginAdmin(username, password)
                .then((res) => {
                    if(res?.data?.result) window.location = "/panel";
                })
                .catch((err) => {
                    setAuth(0);
                });
        }
    }

    return <div className="container container--dark container--adminLogin">
        {auth === -2 ? <LoadingPage /> : <>
            <img className="loginFormLogo" src={logo} alt="draft4u" />

            <form className="loginForm" onSubmit={(e) => { handleSubmit(e); }}>
                <label>
                    <input className="loginForm__input"
                           name="username"
                           placeholder="Login"
                           value={username}
                           onChange={(e) => { setUsername(e.target.value); }} />
                </label>
                <label>
                    <input className="loginForm__input"
                           type="password"
                           placeholder="Hasło"
                           name="password"
                           value={password}
                           onChange={(e) => { setPassword(e.target.value); }} />
                </label>

                {!auth ? <span className="loginForm__error">
                Niepoprawna nazwa użytkownika lub hasło
            </span> : ""}

                <button className="loginForm__btn">
                    Zaloguj się
                </button>
            </form>
        </>}
    </div>
}

export default AdminLogin;
