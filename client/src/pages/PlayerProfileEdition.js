import React from 'react'
import Header from "../components/Header";
import Footer from "../components/Footer";
import UserInfoEdition from "../components/UserInfoEdition";
import PlayerInfoEdition from "../components/PlayerInfoEdition";
import ClubSlider from "../components/ClubSlider";

const PlayerProfileEdition = () => {
    return <div className="container container--light">
        <Header loggedIn={true} player={true} />

        <UserInfoEdition />
        <PlayerInfoEdition />

        <ClubSlider />
        <Footer theme="light" border={true} />
    </div>
}

export default PlayerProfileEdition;
