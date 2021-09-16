import React, { useState, useEffect } from 'react'

import googleIcon from '../static/img/google.png'
import facebookIcon from '../static/img/facebook.svg'
import loginBtn from '../static/img/zaloguj-btn.png'
import appleBtn from '../static/img/button-apple.png'
import {loginApple, loginFacebook, loginGoogle, loginUser} from "../helpers/auth";

const LoginBox = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        loginUser(email, password)
            .then(res => {
               /* Login success */
                window.location = "/rozpocznij";
            })
            .catch(err => {
                /* Login failure */
                setEmail("");
                setPassword("");
                setError(true);
            });
    }

    useEffect(() => {
        if(error) setError(false);
    }, [email, password]);

    return <section className="loginBox d-desktop">
        <form className="loginBox__form" onSubmit={(e) => { handleSubmit(e); }}>
            <label>
                <input className="input"
                       placeholder="E-mail"
                       type="text"
                       value={email}
                       onChange={(e) => { setEmail(e.target.value); }}
                       name="username" />
            </label>
            <label>
                {error ?
                    <span className="loginBox__error">
                    Niepoprawne dane logowania
                </span> : ""}
                <input className={!error ? "input" : "input input--error"}
                       placeholder={!error ? "Hasło" : ""}
                       type="password"
                       value={password}
                       onChange={(e) => { setPassword(e.target.value); }}
                       name="password" />
            </label>

            <button className="button button--submit">
                <img className="button--submit__img" src={loginBtn} alt="zaloguj-sie" />
            </button>
        </form>

        <a className="loginBox__passwordRemindLink" href="/odzyskiwanie-hasla">
            Nie pamiętasz hasła?
        </a>

        <span className="loginBox__or">
            lub
        </span>

        <button className="button button--facebook" onClick={() => { loginFacebook(); }}>
            <img className="button--facebook__img" src={facebookIcon} alt="facebook" />
            Continue with Facebook
        </button>

        <button className="button button--google" onClick={() => { loginGoogle(); }}>
            <img className="button--google__img" src={googleIcon} alt="google" />
            Continue with Google
        </button>
        <button className="button button--apple" onClick={() => { loginApple(); }}>
            <img className="button--apple__img" src={appleBtn} alt="apple" />
            Continue with Apple
        </button>
    </section>
}

export default LoginBox;
