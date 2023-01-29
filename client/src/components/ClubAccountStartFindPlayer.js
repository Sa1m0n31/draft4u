import React, {useEffect, useState, useRef, useContext} from 'react'
import PlayerCard from "./PlayerCard";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import {getThreeNewest} from "../helpers/club";
import {ContentContext} from "../App";
import {getImageUrl} from "../helpers/others";

const ClubAccountStartFindPlayer = () => {
    const [players, setPlayers] = useState([]);
    const { content } = useContext(ContentContext);

    useEffect(() => {
        getThreeNewest()
            .then((res) => {
                setPlayers(res?.data?.result);
            });
    }, []);

    const options = {
        perPage: 1.5,
        focus: 'center'
    }

    return <section className="siteWidthSuperNarrow siteWidthSuperNarrow--1400 findNewPlayerWrapper findNewPlayerWrapper--clubAccountStart">
        <h2 className="player__header player__header--findNewPlayer">
            {content.find_new_player}
        </h2>

        {/* MOBILE */}
        <main className="findNewPlayer--mobile d-mobile">
            <Splide options={options}>
                {players?.map((item, index) => {
                        return <SplideSlide key={index}>
                            <PlayerCard key={index}
                                        player={item}
                                        favoriteView={false}
                                        favorite={false} />
                        </SplideSlide>
                })}
            </Splide>
        </main>

        {/* DESKTOP */}
        <main className="findNewPlayer d-desktop">
            {players?.map((item, index) => {
                return <PlayerCard key={index}
                                   player={item}
                                   favoriteView={false}
                                   favorite={false} />
            })}
        </main>

        <a className="button button--hover button--showPlayersPage btn btn--gradient center goldman" href="/szukaj-zawodnika">
            Przeglądaj
        </a>
    </section>
}

export default ClubAccountStartFindPlayer;
