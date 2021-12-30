import React, { useState, useEffect } from 'react'

import googleIcon from '../static/img/google.png'
import facebookIcon from '../static/img/facebook.svg'
import loginBtn from '../static/img/zaloguj-btn.png'
import appleBtn from '../static/img/button-apple.png'
import {loginApple, loginUser} from "../helpers/auth";
import settings from "../settings";

const LoginBox = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if(!email || !password) {
            setError("Wpisz swoje dane logowania");
        }
        else {
            loginUser(email, password)
                .then(res => {
                    /* Login success */
                    if(res?.data?.result) window.location = "/rozpocznij";
                    else {
                        setEmail("");
                        setPassword("");
                        setError(res?.data?.msg);
                    }
                })
                .catch(err => {
                    /* Login failure */
                    setEmail("");
                    setPassword("");
                    setError("Niepoprawne dane logowania");
                });
        }
    }

    useEffect(() => {
        if(error) setError("");
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
                {error !== "" ?
                    <span className="loginBox__error">
                        {error}
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

        {/*<span className="loginBox__or">*/}
        {/*    lub*/}
        {/*</span>*/}

        {/*<a className="button button--facebook" href={`${settings.API_URL}/auth/facebook`}>*/}
        {/*    <img className="button--facebook__img" src={facebookIcon} alt="facebook" />*/}
        {/*    Continue with Facebook*/}
        {/*</a>*/}

        {/*<a className="button button--google" href={`${settings.API_URL}/auth/google`}>*/}
        {/*    <img className="button--google__img" src={googleIcon} alt="google" />*/}
        {/*    Continue with Google*/}
        {/*</a>*/}
        {/*<button className="button button--apple" onClick={() => { loginApple(); }}>*/}
        {/*    <img className="button--apple__img" src={appleBtn} alt="apple" />*/}
        {/*    Continue with Apple*/}
        {/*</button>*/}
    </section>
}

export default LoginBox;
