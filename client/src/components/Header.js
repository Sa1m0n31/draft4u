import React, { useState, useEffect, useRef, useContext } from 'react'
import logoDark from '../static/img/logo-dark.png'
import pen from '../static/img/pen-dropdown-menu.svg'
import closeIcon from '../static/img/close-grey.svg'
import hamburger from '../static/img/hamburger.svg'
import homeIcon from '../static/img/home.svg'
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
import {autoLogin, logoutUser} from "../helpers/auth";
import settings from "../settings";
import arrowRightGold from '../static/img/arrow-right-gold.svg'
import {getClubMessages, getUserMessages} from "../helpers/chat";
import {getMessagePreview, getUniqueListBy} from "../helpers/others";
import example from "../static/img/profile-picture.png";
import { io } from "socket.io-client";
import {getClubData} from "../helpers/club";
import {
    getClubNotifications,
    getUserNotifications,
    readAllNotifications,
    readNotification
} from "../helpers/notification";
import {getIdentityById, getSecondAccountData, getUserData, isUserWithTwoAccounts} from "../helpers/user";
import ContactInfo from "./ContactInfo";
import {ContentContext, StuffContext} from "../App";
import polandIcon from '../static/img/poland-flag.svg'
import ukIcon from '../static/img/united-kingdom.svg'
import arrowDownIcon from '../static/img/arrow-down-menu.svg'
import switchIcon from '../static/img/switch.svg'

const Header = ({loggedIn, firstName, lastName, mobile, menu, theme, mobileBackground,
                    clubPage, player, club, profileImage, messageRead, isLocal, registerFromThirdParty}) => {
    const [loginVisible, setLoginVisible] = useState(false);
    const [profilePicture, setProfilePicture] = useState(profilePictureExample);
    const [render, setRender] = useState(false);
    const [currentMenuVisible, setCurrentMenuVisible] = useState(-1);

    const [newMessages, setNewMessages] = useState(0);
    const [newNotifications, setNewNotifications] = useState(0);

    const [listenSocket, setListenSocket] = useState(null);
    const [updateNotifications, setUpdateNotifications] = useState(false);

    const [notifications, setNotifications] = useState([]);
    const [messages, setMessages] = useState([]);

    const [menuBeforeLogin, setMenuBeforeLogin] = useState([]);
    const [menuPlayer, setMenuPlayer] = useState([]);
    const [menuClub, setMenuClub] = useState([]);
    const [dropdownPlayer, setDropdownPlayer] = useState([]);
    const [dropdownClub, setDropdownClub] = useState([]);
    const [accountSwitch, setAccountSwitch] = useState(false);

    let loginBoxWrapper = useRef(null);
    let registerModal = useRef(null);

    let mobileMenu = useRef(null);
    let mobileMenuCloseBtn = useRef(null);
    let mobileMenuHeader = useRef(null);
    let mobileMenuList = useRef(null);
    let mobileMenuBottom = useRef(null);

    const mobileMenuChildren = [mobileMenuCloseBtn, mobileMenuHeader, mobileMenuList, mobileMenuBottom];

    const { content, language, setLanguage } = useContext(ContentContext);
    const { isStuff } = useContext(StuffContext);

    document.addEventListener("click", (e) => {
        e.stopPropagation();
        if(currentMenuVisible !== -1) {
            setCurrentMenuVisible(-1);
        }
    });

    useEffect(() => {
        isUserWithTwoAccounts()
            .then((res) => {
                if(res?.data?.result) {
                    localStorage.setItem('2a', '1');
                    setAccountSwitch(true);
                }
                else {
                    localStorage.setItem('2a', '0');
                    setAccountSwitch(false);
                }
            });
    }, []);

    useEffect(() => {
        if(content) {
            setMenuBeforeLogin(content.menu_before_login?.split(';'));
            setMenuPlayer(content.menu_player?.split(';'));
            setMenuClub(content.menu_club?.split(';'));
            setDropdownPlayer(content.dropdown_menu_player?.split(';'));
            setDropdownClub(content?.dropdown_menu_club?.split(';'));
            setRender(true);
        }
    }, [content]);

    useEffect(() => {
        if(profileImage) {
            if(player) setProfilePicture(`${settings.API_URL}/image?url=/media/users/${profileImage}`);
            else setProfilePicture(`${settings.API_URL}/image?url=/media/clubs/${profileImage}`);
        }
    }, [profileImage]);

    useEffect(() => {
        if(notifications?.length) {
            setNewNotifications(notifications.filter((item) => {
                return !item.read;
            }).length);
        }
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
                        setListenSocket(io(`${settings.API_URL}?room=${clubId}&receiver=true`));
                        getClubMessages()
                            .then((res) => {
                                setMessages(getUniqueListBy(res?.data?.result, 'chat_id'));
                            });
                    }
                });
        }
    }, [club]);

    useEffect(() => {
        if(player) {
            getUserData()
                .then((res) => {
                   const userId = res?.data?.result?.id;
                   if(userId) {
                       getIdentityById(userId)
                           .then((res) => {
                               const id = res?.data?.result?.id;
                               if(id) {
                                   setListenSocket(io(`${settings.API_URL}?room=${id}&receiver=true`));
                               }
                           })
                   }
                });

            getUserMessages()
                .then((res) => {
                   setMessages(getUniqueListBy(res?.data?.result, 'chat_id'));
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

    const switchAccounts = () => {
        getSecondAccountData()
            .then((res) => {
                const result = res?.data?.result;
                if(result) {
                    const { id, user_id } = result;
                    autoLogin(user_id, id)
                        .then((res) => {
                            window.location = '/rozpocznij';
                        });
                }
            });
    }

    const getNumberOfNewMessages = () => {
        if(messages?.length) {
            return messages.filter((item) => {
                return isMessageNew(item);
            }).length;
        }
        else {
            return 0;
        }
    }

    const isMessageNew = (msg) => {
        return (new Date(msg.created_at) > new Date(msg.read_at)) && ((!msg.type && club) || (msg.type && player));
    }

    const updateChatList = () => {
        if(club) {
            getClubMessages()
                .then((res) => {
                    setMessages(getUniqueListBy(res?.data?.result, 'chat_id'));
                });
        }
        else if(player) {
            getUserMessages()
                .then((res) => {
                    setMessages(getUniqueListBy(res?.data?.result, 'chat_id'));
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
        if(window.innerWidth > 768) {
            if(n === currentMenuVisible) setCurrentMenuVisible(-1);
            else setCurrentMenuVisible(n);
        }
        else {
            if(n === 0) {
                window.location = player ? "/notyfikacje" : "/powiadomienia";
            }
            else if(n === 1) {
                window.location = player ? "/czat" : "/wiadomosci";
            }
        }
    }

    const addNotificationToRead = (id) => {
        readNotification(id)
            .then((res) => {
                setUpdateNotifications(!updateNotifications);
            });
    }

    const readAllNotificationsWrapper = () => {
        readAllNotifications()
            .then((res) => {
               setUpdateNotifications(!updateNotifications);
            });
    }

    return <header className={mobileBackground === 'black' ? "siteHeader siteHeader--dark siteHeader--mobileDark" : "siteHeader siteHeader--dark"}>
        {/*<ContactInfo />*/}
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
                    <a className="mobileMenu__list__link" href="/">{menuBeforeLogin[0]}</a>
                </li>
                <li className="mobileMenu__list__item">
                    <a className="mobileMenu__list__link" href="/o-nas">{menuBeforeLogin[1]}</a>
                </li>
                <li className="mobileMenu__list__item">
                    <a className="mobileMenu__list__link" href="/zawodnik">{menuBeforeLogin[2]}</a>
                </li>
                <li className="mobileMenu__list__item">
                    <a className="mobileMenu__list__link" href="/klub">{menuBeforeLogin[3]}</a>
                </li>
                <li className="mobileMenu__list__item">
                    <a className="mobileMenu__list__link" href="/sztab">{menuBeforeLogin[4]}</a>
                </li>
                <li className="mobileMenu__list__item">
                    <a className="mobileMenu__list__link" href="/mapa">{menuBeforeLogin[5]}</a>
                </li>
            </ul> : ""}

            {!player && !club ? <ul className="mobileMenu__bottom" ref={mobileMenuBottom}>
                <li className="mobileMenu__bottom__item">
                    <button className="mobileMenu__bottom__link" onClick={() => { language === 'pl' ? setLanguage('en') : setLanguage('pl'); }}>
                        <img className="flag" src={language === 'pl' ? ukIcon : polandIcon} alt="english" />
                        {language === 'pl' ? 'English' : 'Polski'}
                    </button>
                </li>
                <li className="mobileMenu__bottom__item">
                    <a className="mobileMenu__bottom__link" href="/logowanie">
                        <img className="mobileMenu__bottom__img" src={loginIcon} alt="logowanie" />
                        {content.login}
                    </a>
                </li>
                <li className="mobileMenu__bottom__item">
                    <a className="mobileMenu__bottom__link" href="/zaloz-konto">
                        <img className="mobileMenu__bottom__img" src={registerIcon} alt="rejestracja" />
                        {content.register}
                    </a>
                </li>
            </ul> : ""}

            {/* Player menu */}
            {player ? <ul className="mobileMenu__list" ref={mobileMenuList}>
                <li className="mobileMenu__list__item">
                    <a className="mobileMenu__list__link" href="/">{menuPlayer[0]}</a>
                </li>
                <li className="mobileMenu__list__item">
                    <a className="mobileMenu__list__link" href="/edycja-profilu">{menuPlayer[1]}</a>
                </li>
                <li className="mobileMenu__list__item">
                    <a className="mobileMenu__list__link" href="/mapa">{menuPlayer[2]}</a>
                </li>
            </ul> : ""}

            {player ? <ul className="mobileMenu__bottom" ref={mobileMenuBottom}>
                {accountSwitch ? <li className="mobileMenu__bottom__item">
                    <button className="mobileMenu__bottom__link" onClick={() => { switchAccounts(); }}>
                        <img className="mobileMenu__bottom__img" src={switchIcon} alt="zmien-typ-konta" />
                        {isStuff ? content.switch_account_type_staff : content.switch_account_type_user}
                    </button>
                </li> : ''}
                <li className="mobileMenu__bottom__item">
                    <a className="mobileMenu__bottom__link" href="/zmien-haslo-zawodnika">
                        <img className="mobileMenu__bottom__img" src={padlock} alt="zmien-haslo" />
                        {dropdownClub[0]}
                    </a>
                </li>
                <li className="mobileMenu__bottom__item">
                    <a className="mobileMenu__bottom__link" href="/faq">
                        <img className="mobileMenu__bottom__img" src={question} alt="zmien-haslo" />
                        {dropdownPlayer[0]}
                    </a>
                </li>
                <li className="mobileMenu__bottom__item">
                    <button className="mobileMenu__bottom__link" onClick={() => { language === 'pl' ? setLanguage('en') : setLanguage('pl'); }}>
                        <img className="flag" src={language === 'pl' ? ukIcon : polandIcon} alt="english" />
                        {language === 'pl' ? 'English' : 'Polski'}
                    </button>
                </li>
                <li className="mobileMenu__bottom__item">
                    <button className="mobileMenu__bottom__link" onClick={() => { logout(); }}>
                        <img className="mobileMenu__bottom__img" src={logoutIcon} alt="zmien-haslo" />
                        {dropdownPlayer[2]}
                    </button>
                </li>
                </ul> : ""}

            {/* Club menu */}
            {club ? <ul className="mobileMenu__list mobileMenu__list--club" ref={mobileMenuList}>
                <li className="mobileMenu__list__item">
                    <a className="mobileMenu__list__link" href="/">{menuClub[0]}</a>
                </li>
                <li className="mobileMenu__list__item">
                    <a className="mobileMenu__list__link" href="/szukaj-zawodnika">{menuClub[6]}</a>
                </li>
                <li className="mobileMenu__list__item">
                    <a className="mobileMenu__list__link" href="/szukaj-sztabu">{menuClub[7]}</a>
                </li>
                <li className="mobileMenu__list__item">
                    <a className="mobileMenu__list__link" href="/ulubieni-zawodnicy">{menuClub[8]}</a>
                </li>
                <li className="mobileMenu__list__item">
                    <a className="mobileMenu__list__link" href="/ulubieni-sztab">{menuClub[9]}</a>
                </li>
                <li className="mobileMenu__list__item">
                    <a className="mobileMenu__list__link" href="/sklady">{menuClub[3]}</a>
                </li>
                <li className="mobileMenu__list__item">
                    <a className="mobileMenu__list__link" href="/zapisane-druzyny">{menuClub[4]}</a>
                </li>
            </ul> : ""}

            {club ? <ul className="mobileMenu__bottom mobileMenu__bottom--club" ref={mobileMenuBottom}>
                <li className="mobileMenu__bottom__item">
                    <a className="mobileMenu__bottom__link" href="/zmien-haslo-klubu">
                        <img className="mobileMenu__bottom__img" src={padlock} alt="zmien-haslo" />
                        {dropdownClub[0]}
                    </a>
                </li>
                <li className="mobileMenu__bottom__item">
                    <button className="mobileMenu__bottom__link" onClick={() => { language === 'pl' ? setLanguage('en') : setLanguage('pl'); }}>
                        <img className="flag" src={language === 'pl' ? ukIcon : polandIcon} alt="english" />
                        {language === 'pl' ? 'English' : 'Polski'}
                    </button>
                </li>
                <li className="mobileMenu__bottom__item">
                    <button className="mobileMenu__bottom__link" onClick={() => { logout(); }}>
                        <img className="mobileMenu__bottom__img" src={logoutIcon} alt="zmien-haslo" />
                        {dropdownClub[1]}
                    </button>
                </li>
            </ul> : ""}
        </menu>

        {/* REGISTER MODAL */}
        <section className={registerFromThirdParty ? "registerModal registerModal--thirdParty d-desktop" : "registerModal d-desktop"} ref={registerModal}>
            <RegisterModal registerFromThirdParty={registerFromThirdParty}
                           firstName={firstName}
                           lastName={lastName}
                           mobile={mobile} />
        </section>

        <a className="siteHeader__logo" href="/">
            <img className="siteHeader__logo__img" src={logoDark} alt="draft4u" />
        </a>

        <menu className="siteHeader__menu siteHeader__menu--dark d-desktop">
            {/* Homepage menu */}
            {!player && !club ? <ul className="siteHeader__menu__list">
                <li className="siteHeader__menu__list__item">
                    <a className="siteHeader__menu__link" href="/">
                        <img className="homeIcon" src={homeIcon} alt="home" />
                        {menuBeforeLogin[0]}
                    </a>
                </li>
                <li className="siteHeader__menu__list__item">
                    <a className="siteHeader__menu__link" href="/o-nas">
                        {menuBeforeLogin[1]}
                    </a>
                </li>
                <li className="siteHeader__menu__list__item">
                    <a className="siteHeader__menu__link" href="/zawodnik">
                        {menuBeforeLogin[2]}
                    </a>
                </li>
                <li className="siteHeader__menu__list__item">
                    <a className="siteHeader__menu__link" href="/klub">
                        {menuBeforeLogin[3]}
                    </a>
                </li>
                <li className="siteHeader__menu__list__item">
                    <a className="siteHeader__menu__link" href="/sztab">
                        {menuBeforeLogin[4]}
                    </a>
                </li>
                <li className="siteHeader__menu__list__item">
                    <a className="siteHeader__menu__link" href="/mapa">
                        {menuBeforeLogin[5]}
                    </a>
                </li>
            </ul> : ""}

            {/* Player menu */}
            {player ? <ul className="siteHeader__menu__list">
                <li className="siteHeader__menu__list__item">
                    <a className="siteHeader__menu__link" href="/">
                        {menuPlayer[0]}
                    </a>
                </li>
                <li className="siteHeader__menu__list__item">
                    <a className="siteHeader__menu__link" href="/edycja-profilu">
                        {menuPlayer[1]}
                    </a>
                </li>
                <li className="siteHeader__menu__list__item">
                    <a className="siteHeader__menu__link" href="/mapa">
                        {menuPlayer[2]}
                    </a>
                </li>
            </ul> : ""}

            {/* Club menu */}
            {club ? <ul className="siteHeader__menu__list">
                <li className="siteHeader__menu__list__item">
                    <a className="siteHeader__menu__link" href="/">
                        {menuClub[0]}
                    </a>
                </li>
                <li className="siteHeader__menu__list__item">
                    <div className="siteHeader__menu__link">
                        {menuClub[1]}
                        <img className="siteHeader__menu__arrowDown" src={arrowDownIcon} alt="rozwin" />
                        <ul className="siteHeader__menu__submenu">
                            <li className="siteHeader__menu__submenu__item">
                                <a className="siteHeader__menu__link" href="/szukaj-zawodnika">
                                    {content.club_search_dropdown1}
                                </a>
                            </li>
                            <li className="siteHeader__menu__submenu__item">
                                <a className="siteHeader__menu__link" href="/szukaj-sztabu">
                                    {content.club_search_dropdown2}
                                </a>
                            </li>
                        </ul>
                    </div>
                </li>
                <li className="siteHeader__menu__list__item siteHeader__menu__list__item--favorites">
                    <div className="siteHeader__menu__link">
                        {menuClub[2]}
                        <img className="siteHeader__menu__arrowDown" src={arrowDownIcon} alt="rozwin" />
                        <ul className="siteHeader__menu__submenu">
                            <li className="siteHeader__menu__submenu__item">
                                <a className="siteHeader__menu__link" href="/ulubieni-zawodnicy">
                                    {content.club_search_dropdown1}
                                </a>
                            </li>
                            <li className="siteHeader__menu__submenu__item">
                                <a className="siteHeader__menu__link" href="/ulubieni-sztab">
                                    {content.club_search_dropdown2}
                                </a>
                            </li>
                        </ul>
                    </div>
                </li>
                <li className="siteHeader__menu__list__item">
                    <a className="siteHeader__menu__link" href="/sklady">
                        {menuClub[3]}
                    </a>
                </li>
                <li className="siteHeader__menu__list__item">
                    <a className="siteHeader__menu__link" href="/zapisane-druzyny">
                        {menuClub[4]}
                    </a>
                </li>
                <li className="siteHeader__menu__list__item d-over-1200">
                    <a className="siteHeader__menu__link" href="/mapa">
                        {menuClub[5]}
                    </a>
                </li>
            </ul> : ""}
        </menu>

        <section className="siteHeader__content">
            {loggedIn ? (player || club ? <section className={club ? "siteHeader__player siteHeader__player--club" : "siteHeader__player"}>
                <button className="siteHeader__player__btn siteHeader__player__btn--notification" onClick={(e) => { e.stopPropagation(); changeCurrentMenu(0); readAllNotificationsWrapper(); }}>
                    <img className="siteHeader__player__btn__img" src={club || newNotifications || window.innerWidth < 768 ? bellGold : bell} alt="powiadomienia" />
                    {newNotifications > 0 ? <span className="button__circle">
                        {newNotifications}
                    </span> : ""}
                </button>

                {currentMenuVisible === 0? <menu className={club ? "profileMenu profileMenu--club profileMenu--messages profileMenu--notifications" : "profileMenu profileMenu--messages profileMenu--notifications"}>
                    {notifications.length ? <ul className="profileMenu__list">
                        {notifications?.map((item, index) => {
                            if(index < 5) {
                                return <li className="profileMenu__list__item" key={index}>
                                    <a className={!item.read ? "profileMenu__list__link profileMenu__list__link--new" : "profileMenu__list__link"}
                                       href={item.link} target="_blank">
                                        {item.file_path ? <figure className="messageMenu__imgWrapper messageMenu__imgWrapper--notification">
                                            <img className="profileMenu__list__img" src={item.file_path ? `${settings.API_URL}/image?url=/media/notifications/${item.file_path}` : example} alt="powiadomienie" />
                                        </figure> : ""}
                                        <section className={item.file_path ? "messageMenu__list__item__content" : "messageMenu__list__item__content messageMenu__list__item__content--fullWidth"}>
                                            <h3 className={club ? "messageMenu__list__item__header" : "messageMenu__list__item__header messageMenu__list__item__header--player"}>
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
                    </ul> : <span className={club ? "emptyMenu emptyMenu--white" : "emptyMenu"}>
                        Brak powiadomień
                    </span> }
                </menu> : ""}

                <button className="siteHeader__player__btn" onClick={(e) => { e.stopPropagation(); changeCurrentMenu(1); }}>
                    <img className={!newMessages && window.innerWidth > 768 ? "siteHeader__player__btn__img img--envelope" : "siteHeader__player__btn__img"} src={club || newMessages || window.innerWidth < 768 ? envelopeGold : envelope} alt="wiadomosci" />
                    {newMessages > 0 ? <span className="button__circle">
                        {newMessages}
                    </span> : ""}
                </button>

                {currentMenuVisible === 1 ? <menu className={club ? "profileMenu profileMenu--club profileMenu--messages" : "profileMenu profileMenu--messages"}>
                    <ul className="profileMenu__list">
                        {messages?.length ? messages?.map((item, index) => {
                            if(index < 5) {
                                return <li className="profileMenu__list__item" key={index}>
                                    <a className={index < newMessages ? "profileMenu__list__link profileMenu__list__link--new" : "profileMenu__list__link"}
                                       href={club ? `/wiadomosci/?new=${item.chat_id.split(';')[1]}` : `/czat/?new=${item.chat_id.split(';')[0]}`}>
                                        <figure className="messageMenu__imgWrapper">
                                            <img className="profileMenu__list__img" src={item.file_path ? `${settings.API_URL}/image?url=/media/${club ? 'users' : 'clubs'}/${item.file_path}` : example} alt="zdjecie-profilowe" />
                                        </figure>
                                        <section className="messageMenu__list__item__content">
                                            <h3 className={club ? "messageMenu__list__item__header" : "messageMenu__list__item__header messageMenu__list__item__header--player"}>
                                                {club ? item.first_name + " " + item.last_name : item.name}
                                            </h3>
                                            <p className="messageMenu__list__item__text">
                                                {getMessagePreview(item.content)}
                                            </p>
                                        </section>
                                    </a>
                                </li>
                            }
                            else return "";
                        }) : <aside className="profileMenu__noMessages">
                            <h3 className={club ? "emptyMenu emptyMenu--white" : "emptyMenu"}>
                                {content?.player_profile_no_messages}
                            </h3>
                        </aside>}
                    </ul>
                    {messages.length ? <a className={club ? "messageMenu__bottom" : "messageMenu__bottom messageMenu__bottom--player"} href={club ? '/wiadomosci' : '/czat'}>
                        {content?.player_profile_all_messages}
                        <img className="messageMenu__bottom__img" src={arrowRightGold} alt="dalej" />
                    </a> : ""}
                </menu> : ""}

                <button className="siteHeader__player__btn siteHeader__player__btn--profile d-desktop"
                        onClick={(e) => { e.stopPropagation(); changeCurrentMenu(2); }}
                >
                    <img className="siteHeader__player__btn--profile__img" src={profilePicture} alt="profile" />
                </button>

                {currentMenuVisible === 2 ? <menu className={club ? "profileMenu profileMenu--club" : "profileMenu"}>
                    <ul className="profileMenu__list">
                        <li className="profileMenu__list__item">
                            {!club ? <>
                                {accountSwitch ? <button className="profileMenu__list__link" onClick={() => { switchAccounts(); }}>
                                    <img className="profileMenu__list__img" src={switchIcon} alt="przelacz" />
                                    {isStuff ? content.switch_account_type_staff : content.switch_account_type_user}
                                </button> : ''}
                                <a className="profileMenu__list__link" href="/faq">
                                    <img className="profileMenu__list__img" src={question} alt="faq" />
                                    {dropdownPlayer[0]}
                                </a>
                                <a className="profileMenu__list__link" href="/edycja-profilu">
                                    <img className="profileMenu__list__img" src={pen} alt="faq" />
                                    {dropdownPlayer[1]}
                                </a>
                            </> : ""}
                            {club || isLocal ?  <a className="profileMenu__list__link" href={club ? "/zmien-haslo-klubu" : "/zmien-haslo-zawodnika"}>
                                <img className="profileMenu__list__img" src={padlock} alt="zmien-haslo" />
                                {dropdownClub[0]}
                            </a> : ""}
                            <a className="profileMenu__list__link">
                                <button className="profileMenu__list__link__language" onClick={() => { language === 'pl' ? setLanguage('en') : setLanguage('pl'); }}>
                                    <img className="flag" src={language === 'pl' ? ukIcon : polandIcon} alt="english" />
                                    {language === 'pl' ? 'English' : 'Polski'}
                                </button>
                            </a>
                            <button className="profileMenu__list__link" onClick={() => { logout(); }}>
                                <img className="profileMenu__list__img" src={logoutIcon} alt="wyloguj-sie" />
                                {dropdownClub[1]}
                            </button>
                        </li>
                    </ul>
                </menu> : ""}
            </section> : "") : <span className="d-desktop-flex">
                <a className="siteHeader__btn siteHeader__btn--register goldman"
                                     href="/zaloz-konto">
                    {content.register}
                </a>
                <a className="siteHeader__btn siteHeader__btn--login siteHeader__btn--login--dark goldman"
                        href="/logowanie">
                    {content.login}
                </a>
            </span>}

            {/*{!club && !player ? <button className="languageBtn" onClick={() => { language === 'pl' ? setLanguage('en') : setLanguage('pl'); }}>*/}
            {/*    <img className="flag" src={language === 'pl' ? ukIcon : polandIcon} alt="english" />*/}
            {/*</button> : ""}*/}

            {/* Mobile menu */}
            <button className="mobileMenu__btn d-mobile" onClick={() => { openMobileMenu(); }}>
                <img className="mobileMenu__btn__img mobileMenu__btn__img--dark" src={hamburger} alt="menu" />
            </button>

        </section>
    </header>
}

export default Header;
