import React, {useContext, useEffect, useState} from 'react'
import PlayerCard from "./PlayerCard";
import przegladajBtn from "../static/img/zobacz-btn.png";
import {Splide, SplideSlide} from "@splidejs/react-splide";
import {ContentContext} from "../App";
import {getImageUrl} from "../helpers/others";

const ClubAccountFavorites = ({favoritesProp}) => {
    const [players, setPlayers] = useState([]);
    const { content } = useContext(ContentContext);

    useEffect(() => {
        setPlayers(favoritesProp);
    }, [favoritesProp]);

    const options = {
        perPage: 1.5,
        focus: 'center'
    }

    return <section className="siteWidthSuperNarrow siteWidthSuperNarrow--1400 findNewPlayerWrapper findNewPlayerWrapper--clubAccountStart">
        <h2 className="player__header player__header--findNewPlayer">
            {content.favorite_players}
        </h2>

        {players?.length ? <>
            {/* MOBILE */}
            <main className="findNewPlayer--mobile d-mobile">
                <Splide options={options}>
                    {players.map((item, index) => {
                        if(index < 6) {
                            return <SplideSlide key={index}>
                                <PlayerCard key={index} player={item} favoriteView={true} favorite={true} />
                            </SplideSlide>
                        }
                    })}
                </Splide>
            </main>

            {/* DESKTOP */}
            <main className="findNewPlayer d-desktop">
                {players.map((item, index) => {
                    if(index < 3) {
                        return <PlayerCard key={index} player={item} favoriteView={true} favorite={true} />
                    }
                })}
            </main>
        </> : <h3 className="playersWall__playersNotFoundHeader">
            {content.no_favorite_players}
        </h3>}

        <a className="button button--hover button--showPlayersPage" href="/ulubieni-zawodnicy">
            <img className="btn__img" src={getImageUrl(content.img20)} alt="przegladaj" />
        </a>
    </section>
}

export default ClubAccountFavorites;
