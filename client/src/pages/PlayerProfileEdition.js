import React, {useContext} from 'react'
import Header from "../components/Header";
import Footer from "../components/Footer";
import UserInfoEdition from "../components/UserInfoEdition";
import PlayerInfoEdition from "../components/PlayerInfoEdition";
import PlayerVideoView from "../components/PlayerVideosView";
import {StuffContext} from "../App";
import StuffInfoEdition from "../components/StuffInfoEdition";

const PlayerProfileEdition = ({user, isLocal}) => {
    const { isStuff } = useContext(StuffContext);

    return <div className="container container--light">
        <Header loggedIn={true} player={true} menu="dark" profileImage={user.file_path} isLocal={isLocal} />

        <UserInfoEdition player={user} clubProp={false} />
        {!isStuff ? <>
            <PlayerInfoEdition player={user} />
            <PlayerVideoView id={user.id} />
        </> : <StuffInfoEdition id={user.identity} />}

        <Footer border={true} />
    </div>
}

export default PlayerProfileEdition;
