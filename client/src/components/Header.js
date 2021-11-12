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
import envelopeGold from '../static/img/envelope-gold.svg'
import bellGold from '../static/img/bell-gold.svg'
import padlock from '../static/img/padlock.svg'
import question from '../static/img/question.svg'
import logoutIcon from '../static/img/logout.svg'
import profilePictureExample from '../static/img/profile.png'
import {logoutUser} from "../helpers/auth";
import settings from "../settings";
import arrowRightGold from '../static/img/arrow-right-gold.svg'
import {getClubMessages, getUserMessages} from "../helpers/chat";
import {getMessagePreview} from "../helpers/others";
import example from "../static/img/profile-picture.png";
import { io } from "socket.io-client";
import {getClubData} from "../helpers/club";
import {getClubNotifications, getUserNotifications, readNotification} from "../helpers/notification";

const Header = ({loggedIn, menu, theme, clubPage, player, club, profileImage, messageRead}) => {
    const [loginVisible, setLoginVisible] = useState(false);
    const [profilePicture, setProfilePicture] = useState(profilePictureExample);

    const [currentMenuVisible, setCurrentMenuVisible] = useState(-1);

    const [newMessages, setNewMessages] = useState(0);
    const [newNotifications, setNewNotifications] = useState(0);

    const [listenSocket, setListenSocket] = useState(null);
    const [updateNotifications, setUpdateNotifications] = useState(false);

    const [notifications, setNotifications] = useState([]);
    const [messages, setMessages] = useState([]);

    let loginBoxWrapper = useRef(null);
    let registerModal = useRef(null);

    let mobileMenu = useRef(null);
    let mobileMenuCloseBtn = useRef(null);
    let mobileMenuHeader = useRef(null);
    let mobileMenuList = useRef(null);
    let mobileMenuBottom = useRef(null);

    const mobileMenuChildren = [mobileMenuCloseBtn, mobileMenuHeader, mobileMenuList, mobileMenuBottom];

    useEffect(() => {
        if(profileImage) {
            if(player) setProfilePicture(`${settings.API_URL}/image?url=/media/users/${profileImage}`);
            else setProfilePicture(`${settings.API_URL}/image?url=/media/clubs/${profileImage}`);
        }
    }, []);

    useEffect(() => {
        setNewNotifications(notifications.filter((item) => {
            return !item.read;
        }).length);
    }, [notifications]);

    useEffect(() => {
        if(club) {
            getClubNotifications()
                .then((res) => {
                    setNotifications(res?.data?.result);
                });
        }
        else if(player) {
            getUserNotifications()
                .then((res) => {
                    setNotifications(res?.data?.result);
                });
        }
    }, [updateNotifications]);

    useEffect(() => {
        updateChatList();
    }, [messageRead]);

    useEffect(() => {
        if(club) {
            getClubData()
                .then((res) => {
                    const clubId = res?.data?.result?.id;
                    if(clubId) {
                        setListenSocket(io(`http://localhost:3001?room=${clubId}&receiver=true`));
                        getClubMessages()
                            .then((res) => {
                                setMessages(res?.data?.result);
                            });
                    }
                });
        }
    }, [club]);

    useEffect(() => {
        if(player) {
            getUserMessages()
                .then((res) => {
                   setMessages(res?.data?.result);
                });
        }
    }, [player]);

    /* Socket effects */
    useEffect(() => {
        if(listenSocket) {
            listenSocket.on("message", (data) => {
                /* GET NEW MESSAGE */
                updateChatList(data);
            });
        }
    }, [listenSocket]);

    useEffect(() => {
        setNewMessages(getNumberOfNewMessages());
    }, [messages]);

    const getNumberOfNewMessages = () => {
        return messages.filter((item) => {
            return isMessageNew(item);
        }).length;
    }

    const isMessageNew = (msg) => {
        return (new Date(msg.created_at) > new Date(msg.read_at)) && !msg.type;
    }

    const updateChatList = () => {
        if(club) {
            getClubMessages()
                .then((res) => {
                    setMessages(res?.data?.result);
                });
        }
        else if(player) {
            getUserMessages()
                .then((res) => {
                    setMessages(res?.data?.result);
                });
        }
    }

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
        if(mobileMenuChildren) {
            mobileMenuChildren.forEach((item) => {
                if(item?.current?.style) {
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

    const changeCurrentMenu = (n) => {
        if(n === currentMenuVisible) setCurrentMenuVisible(-1);
        else setCurrentMenuVisible(n);
    }

    const addNotificationToRead = (id) => {
        readNotification(id)
            .then((res) => {
                setUpdateNotifications(!updateNotifications);
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

            {/* Player menu */}
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

            {/* Club menu */}
            {club ? <ul className="mobileMenu__list mobileMenu__list--club" ref={mobileMenuList}>
                <li className="mobileMenu__list__item">
                    <a className="mobileMenu__list__link" href="/">Home</a>
                </li>
                <li className="mobileMenu__list__item">
                    <a className="mobileMenu__list__link" href="/szukaj">Szukaj</a>
                </li>
                <li className="mobileMenu__list__item">
                    <a className="mobileMenu__list__link" href="/ulubieni">Ulubieni</a>
                </li>
                <li className="mobileMenu__list__item">
                    <a className="mobileMenu__list__link" href="/sklady">Składy</a>
                </li>
                <li className="mobileMenu__list__item">
                    <a className="mobileMenu__list__link" href="/zapisane-druzyny">Zapisane drużyny</a>
                </li>
            </ul> : ""}

            {club ? <ul className="mobileMenu__bottom mobileMenu__bottom--club" ref={mobileMenuBottom}>
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

            {loggedIn ? (player || club ? <section className={club ? "siteHeader__player siteHeader__player--club" : "siteHeader__player"}>
                <button className="siteHeader__player__btn siteHeader__player__btn--notification" onClick={() => { changeCurrentMenu(0) }}>
                    <img className="siteHeader__player__btn__img" src={club ? bellGold : bell} alt="powiadomienia" />
                    {newNotifications > 0 ? <span className="button__circle">
                        {newNotifications}
                    </span> : ""}
                </button>

                {currentMenuVisible === 0 ? <menu className={club ? "profileMenu profileMenu--club profileMenu--messages profileMenu--notifications" : "profileMenu profileMenu--messages profileMenu--notifications"}>
                    <ul className="profileMenu__list">
                        {notifications?.map((item, index) => {
                            if(index < 5) {
                                return <li className="profileMenu__list__item" key={index} onClick={() => { addNotificationToRead(item.id); }}>
                                    <a className={!item.read ? "profileMenu__list__link profileMenu__list__link--new" : "profileMenu__list__link"}
                                       href={item.link} target="_blank">
                                        <figure className="messageMenu__imgWrapper">
                                            <img className="profileMenu__list__img" src={item.file_path ? `${settings.API_URL}/image?url=/media/notifications/${item.file_path}` : example} alt="powiadomienie" />
                                        </figure>
                                        <section className="messageMenu__list__item__content">
                                            <h3 className="messageMenu__list__item__header">
                                                {item.title}
                                            </h3>
                                            <p className="messageMenu__list__item__text">
                                                {item.content}
                                            </p>
                                        </section>
                                    </a>
                                </li>
                            }
                            else return "";
                        })}
                    </ul>
                </menu> : ""}

                <button className="siteHeader__player__btn" onClick={() => { changeCurrentMenu(1); }}>
                    <img className="siteHeader__player__btn__img img--envelope" src={club ? envelopeGold : envelope} alt="wiadomosci" />
                    {newMessages > 0 ? <span className="button__circle">
                        {newMessages}
                    </span> : ""}
                </button>

                {currentMenuVisible === 1 ? <menu className={club ? "profileMenu profileMenu--club profileMenu--messages" : "profileMenu profileMenu--messages"}>
                    <ul className="profileMenu__list">
                        {messages?.map((item, index) => {
                            if(index < 5) {
                                return <li className="profileMenu__list__item" key={index}>
                                    <a className={index < newMessages ? "profileMenu__list__link profileMenu__list__link--new" : "profileMenu__list__link"} href={`/wiadomosci/?new=`}>
                                        <figure className="messageMenu__imgWrapper">
                                            <img className="profileMenu__list__img" src={item.file_path ? `${settings.API_URL}/image?url=/media/users/${item.file_path}` : example} alt="zmien-haslo" />
                                        </figure>
                                        <section className="messageMenu__list__item__content">
                                            <h3 className="messageMenu__list__item__header">
                                                {item.first_name} {item.last_name}
                                            </h3>
                                            <p className="messageMenu__list__item__text">
                                                {getMessagePreview(item.content)}
                                            </p>
                                        </section>
                                    </a>
                                </li>
                            }
                            else return "";
                        })}
                    </ul>
                    <a className="messageMenu__bottom" href="/wiadomosci">
                        Zobacz wszystkie wiadomości
                        <img className="messageMenu__bottom__img" src={arrowRightGold} alt="dalej" />
                    </a>
                </menu> : ""}

                <button className="siteHeader__player__btn siteHeader__player__btn--profile d-desktop"
                        onClick={() => { changeCurrentMenu(2); }}
                >
                    <img className="siteHeader__player__btn--profile__img" src={profilePicture} alt="profile" />
                </button>

                {currentMenuVisible === 2 ? <menu className={club ? "profileMenu profileMenu--club" : "profileMenu"}>
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
            </section> : "") : <span className="d-desktop-flex">
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
