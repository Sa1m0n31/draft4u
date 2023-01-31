import React, {useContext, useEffect, useState} from 'react';
import Header from "../components/Header";
import Footer from "../components/Footer";
import {Splide, SplideSlide} from "@splidejs/react-splide";
import PlayerCard from "../components/PlayerCard";
import {ContentContext} from "../App";
import {getAllPlayers} from "../helpers/club";
import DraftLoader from "../components/Loader";
import StuffCard from "./StuffCard";

const Community = ({user, isLocal}) => {
    const { content } = useContext(ContentContext);

    const [players, setPlayers] = useState([]);
    const [stuff, setStuff] = useState([]);
    const [currentCommunity, setCurrentCommunity] = useState(0);

    useEffect(() => {
        getAllPlayers()
            .then((res) => {
                const playersTmp = res?.data?.result.filter((item) => {
                    const splittedId = item.identity?.split('-');
                    return splittedId[splittedId.length - 1] !== 'stuff';
                });
                const stuffTmp = res?.data?.result?.filter((item) => {
                    const splittedId = item.identity?.split('-');
                    return splittedId[splittedId.length - 1] === 'stuff';
                });

                setPlayers(playersTmp);
                setStuff(stuffTmp);
            });
    }, []);

    const options = {
        perPage: 1.5,
        focus: "center"
    }

    return <div className="container container--dark">
        <Header loggedIn={true}
                player={!!user}
                profileImage={user?.file_path}
                isLocal={isLocal} />

            <main className="community siteWidthNarrow">
                <div className="community__top">
                    <button className={currentCommunity === 0 ? "btn--community btn--community--selected" : "btn--community" }
                            onClick={() => { setCurrentCommunity(0); }}>
                        Zawodnicy
                    </button>
                    <button className={currentCommunity === 1 ? "btn--community btn--community--selected" : "btn--community" }
                            onClick={() => { setCurrentCommunity(1); }}>
                        Sztab
                    </button>
                </div>

                {currentCommunity === 0 ? <>
                    {/* MOBILE */}
                    <main className="playersWall--mobile d-mobile">
                        {players?.length ? <Splide options={options}>
                            {players.map((item, index) => {
                                return <SplideSlide key={index}>
                                    <PlayerCard key={index}
                                                player={item}
                                                favoriteView={false}
                                                userView={true} />
                                </SplideSlide>
                            })}
                        </Splide> : (players?.length ? <div className="center">
                            <DraftLoader />
                        </div> : "") }
                    </main>

                    {/* DESKTOP */}
                    <main className={!players?.length ? "playersWall d-desktop siteWidthSuperNarrow siteWidthSuperNarrow--1400 playersWall--flex" : "playersWall d-desktop siteWidthSuperNarrow siteWidthSuperNarrow--1400"}>
                        {players?.length ? players.map((item, index) => {
                            return <PlayerCard key={index}
                                               player={item}
                                               favoriteView={false}
                                               userView={true} />
                        }) : <div className="center">
                            <DraftLoader />
                        </div>}
                    </main>
                </> : <>
                    {/* MOBILE */}
                    <main className="playersWall--mobile d-mobile">
                        {stuff?.length ? <Splide options={options}>
                            {stuff.map((item, index) => {
                                return <SplideSlide key={index}>
                                    <StuffCard key={index}
                                               player={item}
                                               userView={true}
                                               favoriteView={false} />
                                </SplideSlide>
                            })}
                        </Splide> : (players?.length ? <div className="center">
                            <DraftLoader />
                        </div> : "") }
                    </main>

                    {/* DESKTOP */}
                    <main className="playersWall d-desktop siteWidthSuperNarrow siteWidthSuperNarrow--1400">
                        {stuff?.length ? stuff.map((item, index) => {
                            return <StuffCard key={index}
                                              player={item}
                                              userView={true}
                                              favoriteView={false} />
                        }) : <div className="center">
                            <DraftLoader />
                        </div>}
                    </main>
                </>}
            </main>

        <Footer border={true} />
    </div>
}

export default Community;
