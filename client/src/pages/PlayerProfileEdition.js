import React, {useEffect, useState} from 'react'
import Header from "../components/Header";
import Footer from "../components/Footer";
import UserInfoEdition from "../components/UserInfoEdition";
import PlayerInfoEdition from "../components/PlayerInfoEdition";
import ClubSlider from "../components/ClubSlider";
import {getUserData} from "../helpers/user";
import {isLoggedIn} from "../helpers/auth";
import LoadingPage from "./LoadingPage";

const PlayerProfileEdition = () => {
    const [loaded, setLoaded] = useState(false);
    const [player, setPlayer] = useState({});

    useEffect(() => {
        isLoggedIn()
            .then(res => {
                if(!res?.data?.result) window.location = "/";
            });

        getUserData()
            .then(res => {
                setPlayer(res?.data?.result);
                setLoaded(true);
            });

    }, []);

    return <div className="container container--light">
        {loaded ? <>
            <Header loggedIn={true} player={true} menu="dark" />

            <UserInfoEdition player={player} />
            <PlayerInfoEdition player={player} />
            <ClubSlider />

            <Footer theme="light" border={true} />
        </> : <LoadingPage />}
    </div>
}

export default PlayerProfileEdition;
