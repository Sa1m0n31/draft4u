import React, { useState, useEffect, useRef } from 'react'
import logo from '../static/img/logo.svg'
import hamburger from '../static/img/hamburger.svg'
import LoginBox from "./LoginBox";

const Header = () => {
    const [loginVisible, setLoginVisible] = useState(false);

    let loginBoxWrapper = useRef(null);

    const toggleLogin = () => {
        if(loginVisible) {
            loginBoxWrapper.current.style.display = "none";
            setLoginVisible(false);
        }
        else {
            console.log(loginBoxWrapper);
            loginBoxWrapper.current.style.display = "block";
            setLoginVisible(true);
        }
    }

    const openRegisterModal = () => {

    }

    return <header className="siteHeader">
        <a className="siteHeader__logo" href="/">
            <img className="siteHeader__logo__img" src={logo} alt="draft4u" />
        </a>

        {/* Mobile menu */}
        <button className="mobileMenu__btn d-mobile">
            <img className="mobileMenu__btn__img" src={hamburger} alt="menu" />
        </button>

        <section className="siteHeader__content d-desktop">
            <menu className="siteHeader__menu">
                <ul className="siteHeader__menu__list">
                    <li className="siteHeader__menu__list__item">
                        <a className="siteHeader__menu__link" href="/">
                            Home
                        </a>
                    </li>
                    <li className="siteHeader__menu__list__item">
                        <a className="siteHeader__menu__link" href="/o-nas">
                            O nas
                        </a>
                    </li>
                    <li className="siteHeader__menu__list__item">
                        <a className="siteHeader__menu__link" href="/zawodnik">
                            Zawodnik
                        </a>
                    </li>
                    <li className="siteHeader__menu__list__item">
                        <a className="siteHeader__menu__link" href="/klub">
                            Klub
                        </a>
                    </li>
                    <li className="siteHeader__menu__list__item">
                        <a className="siteHeader__menu__link" href="/mapa">
                            Mapa
                        </a>
                    </li>
                </ul>
            </menu>

            <button className="siteHeader__btn siteHeader__btn--register" onClick={() => { openRegisterModal(); }}>
                Załóż konto
            </button>
            <section className="loginBtnWrapper">
                <button className="siteHeader__btn siteHeader__btn--login" onClick={() => { toggleLogin(); }}>
                    Logowanie
                </button>

                <section className="loginBoxWrapper" ref={loginBoxWrapper}>
                    <LoginBox />
                </section>
            </section>
        </section>
    </header>
}

export default Header;
