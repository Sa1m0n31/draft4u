import React, {useContext, useEffect, useState} from 'react'
import Header from "../components/Header";
import UserInfoEdition from "../components/UserInfoEdition";
import PlayerInfoEdition from "../components/PlayerInfoEdition";
import PlayerVideoView from "../components/PlayerVideosView";
import Footer from "../components/Footer";
import {getUserById} from "../helpers/user";
import LoadingPage from "./LoadingPage";
import {addToVisited, isPlayerInFavorites} from "../helpers/club";
import {StuffContext} from "../App";
import StuffInfoEdition from "../components/StuffInfoEdition";

const PlayerPage = ({club, userInfo}) => {
    const [user, setUser] = useState(null);
    const [favorite, setFavorite] = useState(false);

    const { isStuff, setIsStuff } = useContext(StuffContext);

    useEffect(() => {
        if(club) {
            const userId = new URLSearchParams(window.location.search).get('id');
            addToVisited(userId);
        }
    }, [club, isStuff]);

    useEffect(() => {
        const userId = new URLSearchParams(window.location.search).get('id');

        getUserById(userId)
            .then((res) => {
                const result = res?.data?.result;
                setUser(result);

                const identitySplitted = result.identity.split('-');

                console.log(identitySplitted);

                if(identitySplitted[identitySplitted.length-1] === 'stuff') {
                    setIsStuff(true);
                }
                else {
                    setIsStuff(false);
                }
            });

        isPlayerInFavorites(userId)
            .then((res) => {
                if(res?.data?.result) {
                    setFavorite(true);
                }
            })
    }, [isStuff]);

    return <div className="container container--dark">
        {user ? <>
            <Header loggedIn={true}
                    club={!!club}
                    player={userInfo ? userInfo : null}
                    profileImage={club?.file_path ? club.file_path : userInfo?.file_path} />

            <UserInfoEdition player={user}
                             clubProp={true}
                             user={!!userInfo}
                             theme="dark"
                             favorite={favorite} />

            {!isStuff && !userInfo ? <>
                <PlayerInfoEdition player={user}
                                   theme="dark" />
                <PlayerVideoView id={user.id} 
                                 club={true} />
            </> : (!userInfo ? <StuffInfoEdition id={user.identity} club={true} /> : '')}
        </> : <LoadingPage />}

        <Footer theme="dark" border={true} />
    </div>
}

export default PlayerPage;
