import React, {useEffect, useState} from 'react'
import Header from "../components/Header";
import Footer from "../components/Footer";
import MapContent from "../components/MapContent";
import {isLoggedIn} from "../helpers/auth";
import {getClubData} from "../helpers/club";
import {getUserData} from "../helpers/user";
import LoadingPage from "./LoadingPage";

const Map = () => {
    const [loaded, setLoaded] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [isClub, setIsClub] = useState(false);
    const [isPlayer, setIsPlayer] = useState(false);
    const [user, setUser] = useState(null);
    const [club, setClub] = useState(null);

    useEffect(() => {
        isLoggedIn()
            .then(res => {
                if(res?.data?.result) {
                    setLoggedIn(true);
                    getClubData()
                        .then((res) => {
                            if(res?.data?.result) {
                                /* Logged as club */
                                setIsClub(true);
                                setClub(res?.data?.result);
                            }
                            else {
                                /* Logged as player */
                                setIsPlayer(true);
                                getUserData()
                                    .then((res) => {
                                        setUser(res?.data?.result);
                                    });
                            }
                        });
                }
                setLoaded(true);
            })
    },[]);

    return <div className={!isClub ? "container container--light" : "container container--dark"}>
        {loaded ? <>
            <Header loggedIn={loggedIn} player={isPlayer} club={isClub}
                    menu={isClub ? "light" : "dark"}
                    theme={isClub ? "dark" : null}
                    profileImage={club ? club.file_path : (user ? user.file_path : null)} />
            <MapContent />
            <Footer theme={!isClub ? "light" : "dark"} border={true} />
        </> : <LoadingPage />}
    </div>
}

export default Map;
