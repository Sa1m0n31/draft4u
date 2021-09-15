import React, { useState, useEffect, useRef } from 'react'
import logo from '../static/img/logo.svg'
import hamburger from '../static/img/hamburger.svg'
import LoginBox from "./LoginBox";
import RegisterModal from "./RegisterModal";

const Header = ({loggedIn}) => {
    const [loginVisible, setLoginVisible] = useState(false);

    let loginBoxWrapper = useRef(null);
    let registerModal = useRef(null);

    const toggleLogin = () => {
        if(loginVisible) {
            loginBoxWrapper.current.style.display = "none";
            setLoginVisible(false);
        }
        else {
            loginBoxWrapper.current.style.display = "block";
            setLoginVisible(true);
        }
    }

    const openRegisterModal = () => {
        loginBoxWrapper.current.style.display = "none";
        setLoginVisible(false);

        registerModal.current.style.display = "block";
    }

    return <header className="siteHeader">
        <section className="registerModal d-desktop" ref={registerModal}>
            <RegisterModal />
        </section>

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

            {loggedIn ? <section>

            </section> : <><button className="siteHeader__btn siteHeader__btn--register" onClick={() => { openRegisterModal(); }}>
                Załóż konto
            </button>
                <section className="loginBtnWrapper">
                <button className="siteHeader__btn siteHeader__btn--login" onClick={() => { toggleLogin(); }}>
                Logowanie
                </button>

                <section className="loginBoxWrapper" ref={loginBoxWrapper}>
                <LoginBox />
                </section>
                </section></>}
        </section>
    </header>
}

export default Header;
