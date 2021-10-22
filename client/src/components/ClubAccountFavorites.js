import React from 'react'
import PlayerCard from "./PlayerCard";
import przegladajBtn from "../static/img/zobacz-btn.png";
import {Splide, SplideSlide} from "@splidejs/react-splide";

const ClubAccountFavorites = () => {
    const players = [1, 2, 3];

    const options = {
        perPage: 1.2,
        focus: 'center'
    }

    return <section className="siteWidthSuperNarrow siteWidthSuperNarrow--1400 findNewPlayerWrapper">
        <h2 className="player__header player__header--findNewPlayer">
            Ulubieni zawodnicy
        </h2>

        {/* MOBILE */}
        <main className="findNewPlayer--mobile d-mobile">
            <Splide options={options}>
                {players.map((item, index) => {
                    return <SplideSlide key={index}>
                        <PlayerCard key={index} player={item} favoriteView={true} />
                    </SplideSlide>
                })}
            </Splide>
        </main>

        {/* DESKTOP */}
        <main className="findNewPlayer d-desktop">
            {players.map((item, index) => {
                return <PlayerCard key={index} player={item} favoriteView={true} />
            })}
        </main>

        <a className="button button--hover button--showPlayersPage" href="/szukaj">
            <img className="btn__img" src={przegladajBtn} alt="przegladaj" />
        </a>
    </section>
}

export default ClubAccountFavorites;
