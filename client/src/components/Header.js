import React, { useState, useEffect, useRef } from 'react'
import logo from '../static/img/logo.svg'
import logoDark from '../static/img/logo-dark.png'
import closeIcon from '../static/img/close-grey.svg'
import hamburger from '../static/img/hamburger.svg'
import LoginBox from "./LoginBox";
import RegisterModal from "./RegisterModal";
import loginIcon from '../static/img/log-in.svg'
import registerIcon from '../static/img/register.svg'
import envelope from '../static/img/envelope.svg'
import bell from '../static/img/bell.svg'
import padlock from '../static/img/padlock.svg'
import question from '../static/img/question.svg'
import logoutIcon from '../static/img/logout.svg'
import profilePictureExample from '../static/img/profile.png'
import {logoutUser} from "../helpers/auth";
import settings from "../settings";
import {getUserProfileImage} from "../helpers/user";

const Header = ({loggedIn, menu, theme, clubPage, player, club, profileImage}) => {
    const [loginVisible, setLoginVisible] = useState(false);
    const [profileMenuVisible, setProfileMenuVisible] = useState(false);
    const [notificationsVisible, setNotificationsVisible] = useState(false);
    const [messagesVisible, setMessagesVisible] = useState(false);
    const [profilePicture, setProfilePicture] = useState(profilePictureExample);

    let loginBoxWrapper = useRef(null);
    let registerModal = useRef(null);

    let mobileMenu = useRef(null);
    let mobileMenuCloseBtn = useRef(null);
    let mobileMenuHeader = useRef(null);
    let mobileMenuList = useRef(null);
    let mobileMenuBottom = useRef(null);

    const mobileMenuChildren = [mobileMenuCloseBtn, mobileMenuHeader, mobileMenuList, mobileMenuBottom];

    useEffect(() => {
        if(profileImage) setProfilePicture(`${settings.API_URL}/image?url=/media/users/${profileImage}`);
    }, []);

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
            if(mobileMenuChildren) {
                mobileMenuChildren.forEach((item) => {
                    if(item?.current?.style) {
                        item.current.style.opacity = "1";
                    }
                });
            }
        }, 500);
    }

    const closeMobileMenu = () => {
        if (mobileMenuChildren) {
            mobileMenuChildren.forEach((item) => {
                if (item?.current?.style) {
                    item.current.style.opacity = "0";
                }
            });
            setTimeout(() => {
                mobileMenu.current.style.transform = "scaleX(0)";
            }, 500);
        }
    }

    const logout = () => {
        logoutUser()
            .then(res => {
               if(res?.data?.result) {
                   window.location = "/";
               }
            });
    }

    return <header className={theme === "dark" ? "siteHeader siteHeader--dark" : "siteHeader"}>
        {/* MOBILE MENU */}
        <menu className="mobileMenu d-mobile" ref={mobileMenu}>
            <button className="mobileMenu__close" onClick={() => { closeMobileMenu(); }} ref={mobileMenuCloseBtn}>
                <img className="mobileMenu__close__img" src={closeIcon} alt="zamknij" />
            </button>

            <h3 className="mobileMenu__header" ref={mobileMenuHeader}>
                Menu
            </h3>

            {/* Homepage menu */}
            {!club && !player ? <ul className="mobileMenu__list" ref={mobileMenuList}>
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
            </ul> : ""}

            {!player && !club ? <ul className="mobileMenu__bottom" ref={mobileMenuBottom}>
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
            </ul> : ""}

            {player ? <ul className="mobileMenu__list" ref={mobileMenuList}>
                <li className="mobileMenu__list__item">
                    <a className="mobileMenu__list__link" href="/">Home</a>
                </li>
                <li className="mobileMenu__list__item">
                    <a className="mobileMenu__list__link" href="/edycja-profilu">Profil</a>
                </li>
            </ul> : ""}

            {player ? <ul className="mobileMenu__bottom" ref={mobileMenuBottom}>
                <li className="mobileMenu__bottom__item">
                    <a className="mobileMenu__bottom__link" href="/odzyskiwanie-hasla">
                        <img className="mobileMenu__bottom__img" src={padlock} alt="zmien-haslo" />
                        Zmiana hasła
                    </a>
                </li>
                <li className="mobileMenu__bottom__item">
                    <a className="mobileMenu__bottom__link" href="/faq">
                        <img className="mobileMenu__bottom__img" src={question} alt="zmien-haslo" />
                        Pomoc online
                    </a>
                </li>
                <li className="mobileMenu__bottom__item">
                    <button className="mobileMenu__bottom__link" onClick={() => { logout(); }}>
                        <img className="mobileMenu__bottom__img" src={logoutIcon} alt="zmien-haslo" />
                        Wyloguj się
                    </button>
                </li>
                </ul> : ""}
        </menu>

        {/* REGISTER MODAL */}
        <section className="registerModal d-desktop" ref={registerModal}>
            <RegisterModal />
        </section>

        <a className="siteHeader__logo" href="/">
            <img className="siteHeader__logo__img" src={theme === "dark" ? logoDark : logo} alt="draft4u" />
        </a>

        <section className="siteHeader__content">
            <menu className={theme === "dark" ? "siteHeader__menu siteHeader__menu--dark d-desktop" : "siteHeader__menu d-desktop"}>
                {/* Homepage menu */}
                {!player && !club ? <ul className="siteHeader__menu__list">
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
                </ul> : ""}

                {/* Player menu */}
                {player ? <ul className="siteHeader__menu__list">
                    <li className="siteHeader__menu__list__item">
                        <a className="siteHeader__menu__link" href="/">
                            Home
                        </a>
                    </li>
                    <li className="siteHeader__menu__list__item">
                        <a className="siteHeader__menu__link" href="/edycja-profilu">
                            Profil
                        </a>
                    </li>
                </ul> : ""}

                {/* Club menu */}
                {club ? <ul className="siteHeader__menu__list">
                    <li className="siteHeader__menu__list__item">
                        <a className="siteHeader__menu__link" href="/">
                            Home
                        </a>
                    </li>
                    <li className="siteHeader__menu__list__item">
                        <a className="siteHeader__menu__link" href="/szukaj">
                            Szukaj
                        </a>
                    </li>
                    <li className="siteHeader__menu__list__item">
                        <a className="siteHeader__menu__link" href="/ulubieni">
                            Ulubieni
                        </a>
                    </li>
                    <li className="siteHeader__menu__list__item">
                        <a className="siteHeader__menu__link" href="/sklady">
                            Składy
                        </a>
                    </li>
                    <li className="siteHeader__menu__list__item">
                        <a className="siteHeader__menu__link" href="/zapisane-druzyny">
                            Zapisane drużyny
                        </a>
                    </li>
                </ul> : ""}
            </menu>

            {loggedIn ? (player ? <section className="siteHeader__player">
                <button className="siteHeader__player__btn">
                    <img className="siteHeader__player__btn__img" src={bell} alt="powiadomienia" />
                </button>
                <button className="siteHeader__player__btn">
                    <img className="siteHeader__player__btn__img img--envelope" src={envelope} alt="wiadomosci" />
                </button>

                <button className="siteHeader__player__btn siteHeader__player__btn--profile d-desktop"
                        onClick={() => { setProfileMenuVisible(!profileMenuVisible); }}
                >
                    <img className="siteHeader__player__btn--profile__img" src={profilePicture} alt="profile" />
                </button>

                {profileMenuVisible ? <menu className="profileMenu">
                    <ul className="profileMenu__list">
                        <li className="profileMenu__list__item">
                            <a className="profileMenu__list__link" href="/odzyskiwanie-hasla">
                                <img className="profileMenu__list__img" src={padlock} alt="zmien-haslo" />
                                Zmiana hasła
                            </a>
                            <a className="profileMenu__list__link" href="/faq">
                                <img className="profileMenu__list__img" src={question} alt="faq" />
                                Pomoc online
                            </a>
                            <button className="profileMenu__list__link" onClick={() => { logout(); }}>
                                <img className="profileMenu__list__img" src={logoutIcon} alt="wyloguj-sie" />
                                Wyloguj się
                            </button>
                        </li>
                    </ul>
                </menu> : ""}
            </section> : <section>
                {/* CLUB */}

            </section>) : <span className="d-desktop-flex">
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
                </section></span>}

            {/* Mobile menu */}
            <button className="mobileMenu__btn d-mobile" onClick={() => { openMobileMenu(); }}>
                <img className={menu === "dark" ? "mobileMenu__btn__img mobileMenu__btn__img--dark" : "mobileMenu__btn__img"} src={hamburger} alt="menu" />
            </button>

        </section>
    </header>
}

export default Header;
