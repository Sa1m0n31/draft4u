import React, { useEffect, useState, useRef } from 'react'
import man from '../static/img/profile-picture.png'
import heart from '../static/img/heart.svg'
import heartFilled from '../static/img/heart-filled.svg'
import przegladajBtn from '../static/img/przegladaj-btn.png'
import PlayerCard from "./PlayerCard";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import {getThreeNewest} from "../helpers/club";

const ClubAccountStartFindPlayer = () => {
    const [players, setPlayers] = useState([]);

    useEffect(() => {
        getThreeNewest()
            .then((res) => {
                setPlayers(res?.data?.result);
            });
    }, []);

    const options = {
        perPage: 1.2,
        focus: 'center'
    }

    return <section className="siteWidthSuperNarrow siteWidthSuperNarrow--1400 findNewPlayerWrapper">
        <h2 className="player__header player__header--findNewPlayer">
            Znajdź nowego zawodnika
        </h2>

        {/* MOBILE */}
        <main className="findNewPlayer--mobile d-mobile">
            <Splide options={options}>
                {players.map((item, index) => {
                    return <SplideSlide key={index}>
                        <PlayerCard key={index} player={item} favoriteView={false} favorite={item.club_id} />
                    </SplideSlide>
                })}
            </Splide>
        </main>

        {/* DESKTOP */}
        <main className="findNewPlayer d-desktop">
            {players.map((item, index) => {
                return <PlayerCard key={index} player={item} favoriteView={false} favorite={item.club_id} />
            })}
        </main>

        <a className="button button--hover button--showPlayersPage" href="/szukaj">
            <img className="btn__img" src={przegladajBtn} alt="przegladaj" />
        </a>
    </section>
}

export default ClubAccountStartFindPlayer;
