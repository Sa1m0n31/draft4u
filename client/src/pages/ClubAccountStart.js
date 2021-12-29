import React from 'react'
import Header from "../components/Header";
import Footer from "../components/Footer";
import headerImg from '../static/img/header-klub.jpg'
import ClubAccountStartFindPlayer from "../components/ClubAccountStartFindPlayer";
import ClubAccountFavorites from "../components/ClubAccountFavorites";
import ClubAccountBottom from "../components/ClubAccountBottom";

const ClubAccountStart = ({club, favorites, playersProp}) => {
    return <div className="container container--dark">
        <Header loggedIn={true} club={true} menu="light" theme="dark" profileImage={club.file_path} />

        <header className="siteWidthSuperNarrow siteWidthSuperNarrow--1400">
            <img className="btn__img clubAccountHeader__img" src={headerImg} alt="klub" />
        </header>

        <ClubAccountStartFindPlayer />
        <ClubAccountFavorites favoritesProp={favorites} />
        <ClubAccountBottom />

        <Footer theme="dark" border={true} />
    </div>
}

export default ClubAccountStart;
