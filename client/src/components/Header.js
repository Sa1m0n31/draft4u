import React, { useState, useEffect, useRef } from 'react'
import logo from '../static/img/logo.svg'
import logoDark from '../static/img/logo-dark.png'
import closeIcon from '../static/img/close-grey.svg'
import hamburger from '../static/img/hamburger.svg'
import LoginBox from "./LoginBox";
import RegisterModal from "./RegisterModal";
import loginIcon from '../static/img/log-in.svg'
import registerIcon from '../static/img/register.svg'

const Header = ({loggedIn, menu, theme, clubPage}) => {
    const [loginVisible, setLoginVisible] = useState(false);

    let loginBoxWrapper = useRef(null);
    let registerModal = useRef(null);

    let mobileMenu = useRef(null);
    let mobileMenuCloseBtn = useRef(null);
    let mobileMenuHeader = useRef(null);
    let mobileMenuList = useRef(null);
    let mobileMenuBottom = useRef(null);

    const mobileMenuChildren = [mobileMenuCloseBtn, mobileMenuHeader, mobileMenuList, mobileMenuBottom];

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

    const openMobileMenu = () => {
        mobileMenu.current.style.transform = "scaleX(1)";
        setTimeout(() => {
            mobileMenuChildren.forEach((item) => {
                item.current.style.opacity = "1";
            });
        }, 500);
    }

    const closeMobileMenu = () => {
        mobileMenuChildren.forEach((item) => {
            item.current.style.opacity = "0";
        });
        setTimeout(() => {
            mobileMenu.current.style.transform = "scaleX(0)";
        }, 500);
    }

    return <header className={theme === "dark" ? "siteHeader siteHeader--dark" : "siteHeader"}>
        <menu className="mobileMenu d-mobile" ref={mobileMenu}>
            <button className="mobileMenu__close" onClick={() => { closeMobileMenu(); }} ref={mobileMenuCloseBtn}>
                <img className="mobileMenu__close__img" src={closeIcon} alt="zamknij" />
            </button>

            <h3 className="mobileMenu__header" ref={mobileMenuHeader}>
                Menu
            </h3>

            <ul className="mobileMenu__list" ref={mobileMenuList}>
                <li className="mobileMenu__list__item">
                    <a className="mobileMenu__list__link" href="/">Home</a>
                </li>
                <li className="mobileMenu__list__item">
                    <a className="mobileMenu__list__link" href="/o-nas">O nas</a>
                </li>
                <li className="mobileMenu__list__item">
                    <a className="mobileMenu__list__link" href="/zawodnik">Zawodnik</a>
                </li>
                <li className="mobileMenu__list__item">
                    <a className="mobileMenu__list__link" href="/klub">Klub</a>
                </li>
                <li className="mobileMenu__list__item">
                    <a className="mobileMenu__list__link" href="/mapa">Mapa</a>
                </li>
            </ul>

            <ul className="mobileMenu__bottom" ref={mobileMenuBottom}>
                <li className="mobileMenu__bottom__item">
                    <a className="mobileMenu__bottom__link" href="/logowanie">
                        <img className="mobileMenu__bottom__img" src={loginIcon} alt="logowanie" />
                        Zaloguj się
                    </a>
                </li>
                <li className="mobileMenu__bottom__item">
                    <a className="mobileMenu__bottom__link" href="/zaloz-konto">
                        <img className="mobileMenu__bottom__img" src={registerIcon} alt="rejestracja" />
                        Załóż konto
                    </a>
                </li>
            </ul>
        </menu>

        <section className="registerModal d-desktop" ref={registerModal}>
            <RegisterModal />
        </section>

        <a className="siteHeader__logo" href="/">
            <img className="siteHeader__logo__img" src={theme === "dark" ? logoDark : logo} alt="draft4u" />
        </a>

        {/* Mobile menu */}
        <button className="mobileMenu__btn d-mobile" onClick={() => { openMobileMenu(); }}>
            <img className={menu === "dark" ? "mobileMenu__btn__img mobileMenu__btn__img--dark" : "mobileMenu__btn__img"} src={hamburger} alt="menu" />
        </button>

        <section className="siteHeader__content d-desktop">
            <menu className={theme === "dark" ? "siteHeader__menu siteHeader__menu--dark" : "siteHeader__menu"}>
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

            </section> : <>
                {!clubPage ? <button className="siteHeader__btn siteHeader__btn--register" onClick={() => { openRegisterModal(); }}>
                    Załóż konto
                </button> : ""}
                <section className={!clubPage ? "loginBtnWrapper" : "loginBtnWrapper loginBtnWrapper--clubPage"}>
                <button className={theme === "dark" ? "siteHeader__btn siteHeader__btn--login siteHeader__btn--login--dark" : "siteHeader__btn siteHeader__btn--login"} onClick={() => { toggleLogin(); }}>
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
