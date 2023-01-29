import React, {useContext, useEffect, useState} from 'react'
import Header from "../components/Header";
import Footer from "../components/Footer";
import ClubAccountStartFindPlayer from "../components/ClubAccountStartFindPlayer";
import ClubAccountFavorites from "../components/ClubAccountFavorites";
import ClubAccountBottom from "../components/ClubAccountBottom";
import {ContentContext} from "../App";
import {getImageUrl} from "../helpers/others";
import TermsForClubs from "../components/TermsForClubs";
import {getAllClubs} from "../helpers/club";

const ClubAccountStart = ({club, favorites}) => {
    const { content } = useContext(ContentContext);

    const [render, setRender] = useState(false);

    useEffect(() => {
        if(club) {
            setRender(true);

            getAllClubs()
                .then((res) => {
                   localStorage.setItem('clubLogos', JSON.stringify(res?.data?.result?.map((item) => {
                       return {
                           name: item.name,
                           logo: item.file_path
                       }
                   })));
                });
        }
    }, [club]);

    return <div className="container container--dark">
        {render ? <>
            {/*{!club?.active ? <TermsForClubs club={club} /> : ""}*/} {/* TODO */}

            <Header loggedIn={true} club={true} menu="light" theme="dark" profileImage={club.file_path} />

            <header className="siteWidthSuperNarrow siteWidthSuperNarrow--1400">
                <img className="btn__img clubAccountHeader__img" src={getImageUrl(content.img3)} alt="klub" />
            </header>

            <ClubAccountStartFindPlayer />
            <ClubAccountFavorites favoritesProp={favorites} />
            {/*<ClubAccountBottom />*/}

            <Footer theme="dark" border={true} />
        </> : ""}
    </div>
}

export default ClubAccountStart;
