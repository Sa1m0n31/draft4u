import React, {useContext} from 'react'
import Header from "../components/Header";
import Footer from "../components/Footer";
import ClubAccountStartFindPlayer from "../components/ClubAccountStartFindPlayer";
import ClubAccountFavorites from "../components/ClubAccountFavorites";
import ClubAccountBottom from "../components/ClubAccountBottom";
import {ContentContext} from "../App";
import {getImageUrl} from "../helpers/others";

const ClubAccountStart = ({club, favorites}) => {
    const { content } = useContext(ContentContext);

    return <div className="container container--dark">
        <Header loggedIn={true} club={true} menu="light" theme="dark" profileImage={club.file_path} />

        <header className="siteWidthSuperNarrow siteWidthSuperNarrow--1400">
            <img className="btn__img clubAccountHeader__img" src={getImageUrl(content.img3)} alt="klub" />
        </header>

        <ClubAccountStartFindPlayer />
        <ClubAccountFavorites favoritesProp={favorites} />
        <ClubAccountBottom />

        <Footer theme="dark" border={true} />
    </div>
}

export default ClubAccountStart;
