import React, {useEffect, useState} from 'react'
import Header from "../components/Header";
import UserInfoEdition from "../components/UserInfoEdition";
import PlayerInfoEdition from "../components/PlayerInfoEdition";
import PlayerVideoView from "../components/PlayerVideosView";
import ClubSlider from "../components/ClubSlider";
import Footer from "../components/Footer";
import {getUserById} from "../helpers/user";
import LoadingPage from "./LoadingPage";
import {addToVisited, isPlayerInFavorites} from "../helpers/club";

const PlayerPage = ({club}) => {
    const [user, setUser] = useState(null);
    const [favorite, setFavorite] = useState(false);

    useEffect(() => {
        const userId = new URLSearchParams(window.location.search).get('id');

        addToVisited(userId);

        getUserById(userId)
            .then((res) => {
                setUser(res?.data?.result);
            });

        isPlayerInFavorites(userId)
            .then((res) => {
                if(res?.data?.result) {
                    setFavorite(true);
                }
            })
    }, []);

    return <div className="container container--dark">
        {user ? <>
            <Header loggedIn={true} club={true} menu="light" theme="dark" profileImage={club.file_path} />

            <UserInfoEdition player={user} theme="dark" favorite={favorite} />
            <PlayerInfoEdition player={user} theme="dark" />
            <PlayerVideoView id={user.id} club={true} />
        </> : <LoadingPage />}

        <Footer theme="dark" border={true} />
    </div>
}

export default PlayerPage;
