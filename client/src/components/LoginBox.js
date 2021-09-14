import React, { useState, useEffect } from 'react'

import googleIcon from '../static/img/google.png'
import facebookIcon from '../static/img/facebook.svg'
import {loginFacebook, loginGoogle, loginUser} from "../helpers/auth";

const LoginBox = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        loginUser(email, password)
            .then(res => {
               console.log(res);
            });
    }

    return <section className="loginBox">
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
                <input className="input"
                       placeholder="Hasło"
                       type="password"
                       value={password}
                       onChange={(e) => { setPassword(e.target.value); }}
                       name="password" />
            </label>

            <button className="button button--submit">
                Zaloguj się
            </button>
        </form>

        <a className="loginBox__passwordRemindLink" href="/przypomnienie-hasla">
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
    </section>
}

export default LoginBox;
