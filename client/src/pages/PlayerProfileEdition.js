import React, {useEffect, useState} from 'react'
import Header from "../components/Header";
import Footer from "../components/Footer";
import UserInfoEdition from "../components/UserInfoEdition";
import PlayerInfoEdition from "../components/PlayerInfoEdition";
import ClubSlider from "../components/ClubSlider";
import PlayerVideoView from "../components/PlayerVideosView";

const PlayerProfileEdition = ({user, isLocal}) => {
    return <div className="container container--light">
        <Header loggedIn={true} player={true} menu="dark" profileImage={user.file_path} isLocal={isLocal} />

        <UserInfoEdition player={user} />
        <PlayerInfoEdition player={user} />
        <PlayerVideoView id={user.id} />
        <ClubSlider />

        <Footer theme="light" border={true} />
    </div>
}

export default PlayerProfileEdition;
