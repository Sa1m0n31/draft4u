import React, {useEffect, useState} from 'react'
import Header from "../components/Header";
import Footer from "../components/Footer";
import UserInfoEdition from "../components/UserInfoEdition";
import PlayerInfoEdition from "../components/PlayerInfoEdition";
import ClubSlider from "../components/ClubSlider";
import {getUserData} from "../helpers/user";
import {isLoggedIn} from "../helpers/auth";

const PlayerProfileEdition = () => {
    const [loaded, setLoaded] = useState(false);
    const [player, setPlayer] = useState({});

    useEffect(() => {
        isLoggedIn()
            .then(res => {
                if(!res?.data?.result) window.location = "/";
                else setLoaded(true);
            });

        // setLoaded(true);

        getUserData()
            .then(res => {
                console.log(res.data.result);
                setPlayer(res?.data?.result);
            });

    }, []);

    return <div className="container container--light">
        <Header loggedIn={true} player={true} />

        {loaded ? <>
            <UserInfoEdition player={player} />
            <PlayerInfoEdition player={player} />
            <ClubSlider />
        </> : ""}

        <Footer theme="light" border={true} />
    </div>
}

export default PlayerProfileEdition;
