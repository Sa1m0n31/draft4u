import React, {useState, useEffect, useContext} from 'react'

import googleIcon from '../static/img/google.png'
import facebookIcon from '../static/img/facebook.svg'
import {loginUser} from "../helpers/auth";
import {ContentContext} from "../App";
import {getImageUrl} from "../helpers/others";
import {isUserWithTwoAccounts} from "../helpers/user";

const LoginBox = () => {
    const { content } = useContext(ContentContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if(!email || !password) {
            setError(content.login_error);
        }
        else {
            loginUser(email, password)
                .then(res => {
                    /* Login success */
                    if(res?.data?.result) {
                        window.location = "/tablica";

                        isUserWithTwoAccounts()
                            .then((res) => {
                               if(res?.data?.result) {
                                   localStorage.setItem('2a', '1');
                               }
                               else {
                                   localStorage.setItem('2a', '0');
                               }
                               window.location = "/tablica";
                            });
                    }
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
                    setError(content.login_error);
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
                       placeholder={content.login_input1}
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
                       placeholder={!error ? content.login_input2 : ""}
                       type="password"
                       value={password}
                       onChange={(e) => { setPassword(e.target.value); }}
                       name="password" />
            </label>

            <button className="button button--submit">
                <img className="button--submit__img" src={getImageUrl(content.img14)} alt="zaloguj-sie" />
            </button>
        </form>

        <a className="loginBox__passwordRemindLink" href="/odzyskiwanie-hasla">
            {content.login_box1}
        </a>

        <span className="loginBox__or">
            {content.login_box2}
        </span>

        <a className="button button--facebook" href="/auth/facebook">
            <img className="button--facebook__img" src={facebookIcon} alt="facebook" />
            Continue with Facebook
        </a>

        <a className="button button--google" href="/auth/google">
            <img className="button--google__img" src={googleIcon} alt="google" />
            Continue with Google
        </a>
    </section>
}

export default LoginBox;
