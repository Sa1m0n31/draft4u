import React, {useEffect, useState} from 'react'
import logo from '../static/img/logo-dark.png'
import profileImg from '../static/img/profile-picture.png'
import {getAdminById, getAdminData} from "../helpers/admin";
import padlock from "../static/img/padlock.svg";
import question from "../static/img/question.svg";
import logoutIcon from "../static/img/logout.svg";
import {logoutUser} from "../helpers/auth";

const AdminTop = () => {
    const [username, setUsername] = useState("");
    const [profileMenuVisible, setProfileMenuVisible] = useState(false);

    useEffect(() => {
        getAdminData()
            .then((res) => {
               setUsername(res?.data?.result?.login);
            });
    }, []);

    const logout = () => {
        logoutUser()
            .then(res => {
                if(res?.data?.result) {
                    window.location = "/admin";
                }
            });
    }

    return <header className="adminTop">
        <a className="adminTop__logoWrapper" href="/panel">
            <img className="btn__img" src={logo} alt="draft4u" />
        </a>

        <section className="adminTop__right">
            <h4 className="adminTop__header">
                <span className="adminTop__header__key">
                    Zalogowany:
                </span>
                    <span className="adminTop__header__value">
                    {username}
                </span>
            </h4>
            <button className="siteHeader__player__btn siteHeader__player__btn--profile d-desktop"
                    onClick={() => { setProfileMenuVisible(!profileMenuVisible); }}
            >
                <img className="siteHeader__player__btn--profile__img" src={profileImg} alt="profile" />
            </button>

            {profileMenuVisible ? <menu className="profileMenu profileMenu--club">
                <ul className="profileMenu__list">
                    <li className="profileMenu__list__item">
                        <a className="profileMenu__list__link" href="/odzyskiwanie-hasla">
                            <img className="profileMenu__list__img" src={padlock} alt="zmien-haslo" />
                            Zmiana hasła
                        </a>
                        <button className="profileMenu__list__link" onClick={() => { logout(); }}>
                            <img className="profileMenu__list__img" src={logoutIcon} alt="wyloguj-sie" />
                            Wyloguj się
                        </button>
                    </li>
                </ul>
            </menu> : ""}

        </section>
    </header>
}

export default AdminTop;
