import React, {useContext, useEffect, useState} from 'react'
import Header from "../components/Header";
import iconLogin from '../static/img/login.svg';
import iconPassword from '../static/img/password.svg';
import authBackground from '../static/img/auth-background.png';
import facebookIcon from '../static/img/facebook.svg';
import instagramIcon from '../static/img/instagram.svg';
import fbIcon from "../static/img/facebook.svg";
import instaIcon from "../static/img/instagram.svg";
import {ContentContext} from "../App";
import {loginUser} from "../helpers/auth";
import {isUserWithTwoAccounts} from "../helpers/user";
import {getImageUrl} from "../helpers/others";
import googleIcon from "../static/img/google.png";

const LoginPage = () => {
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

    return <div className="container">
        <Header menu="dark" mobileBackground="black" />

        <div className="authBox authBox--login">
            <ul className="authBox__socialMedia">
                <li className="footer__col__list__item">
                    <a className="footer__col__socialMediaLink" href="https://www.facebook.com/Draft4uPolska/" target="_blank">
                        <img className="footer__col__socialMediaLink__img" src={fbIcon} alt="facebook" />
                    </a>
                </li>
                <li className="footer__col__list__item">
                    <a className="footer__col__socialMediaLink" href="https://www.instagram.com/draft4u.com.pl/?fbclid=IwAR2T5cPxFXcSmGdxxpBkclPct0HKQl9ezqeNLdVYwdDYZ_c6E74llzmbihY" target="_blank">
                        <img className="footer__col__socialMediaLink__img" src={instaIcon} alt="instagram" />
                    </a>
                </li>
            </ul>

            <h1 className="authBox__header">
                {content?.auth}
            </h1>
            <h2 className="authBox__subheader">
                {content?.of_your_account}
            </h2>

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
                    <input className={!error ? "input input--password" : "input input--password input--error"}
                           placeholder={!error ? content.login_input2 : ""}
                           type="password"
                           value={password}
                           onChange={(e) => { setPassword(e.target.value); }}
                           name="password" />
                </label>
                <a className="loginBox__passwordRemindLink" href="/odzyskiwanie-hasla">
                    {content.login_box1}
                </a>

                <button className="button button--submit button--auth btn--gradient goldman">
                    {content.login}
                </button>
            </form>

            <a className="button button--facebook" href="/auth/facebook">
                <img className="button--facebook__img" src={facebookIcon} alt="facebook" />
                Continue with Facebook
            </a>

            <a className="button button--google" href="/auth/google">
                <img className="button--google__img" src={googleIcon} alt="google" />
                Continue with Google
            </a>
        </div>

        <img className="authImg" src={authBackground} alt="tlo" />
    </div>
}

export default LoginPage;
