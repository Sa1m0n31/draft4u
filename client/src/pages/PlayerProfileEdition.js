import React, {useEffect, useState} from 'react'
import Header from "../components/Header";
import Footer from "../components/Footer";
import UserInfoEdition from "../components/UserInfoEdition";
import PlayerInfoEdition from "../components/PlayerInfoEdition";
import ClubSlider from "../components/ClubSlider";
import {getUserData} from "../helpers/user";
import {isLoggedIn} from "../helpers/auth";
import LoadingPage from "./LoadingPage";
import PlayerVideoView from "../components/PlayerVideosView";

const PlayerProfileEdition = ({user}) => {
    return <div className="container container--light">
        <Header loggedIn={true} player={true} menu="dark" profileImage={user.file_path} />

        <UserInfoEdition player={user} />
        <PlayerInfoEdition player={user} />
        <PlayerVideoView id={user.id} />
        <ClubSlider />

        <Footer theme="light" border={true} />
    </div>
}

export default PlayerProfileEdition;
