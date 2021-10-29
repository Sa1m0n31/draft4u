import React, {useEffect, useRef, useState} from 'react'
import man from "../static/img/profile-picture.png";
import heart from "../static/img/heart.svg";
import heartFilled from "../static/img/heart-filled.svg";
import balanceIcon from '../static/img/balance.svg'
import {calculateAge} from "../helpers/others";
import settings from "../settings";
import {addToFavorites, deleteFromFavorites} from "../helpers/club";

const PlayerCard = ({index, player, favoriteView, favorite, balance, addPlayerToComparator}) => {
    const [favoritePlayer, setFavoritePlayer] = useState(false);
    const [comparator, setComparator] = useState(false);

    useEffect(() => {
        if(favorite) setFavoritePlayer(true);
    }, []);

    const addPlayerToFavorites = () => {
        console.log("add to favorites: " + player.user_id);
        if(!favoritePlayer) {
            addToFavorites(player.user_id);
        }
        else {
            deleteFromFavorites(player.user_id);
        }
        setFavoritePlayer(!favoritePlayer);
    }

    return <section key={index} className={favoriteView ? "playerCard playerCard--favorite" : "playerCard"}>
        <figure className="playerCard__imgWrapper">
            {balance ? <button className={comparator ? "playerCard__balanceBtn playerCard__balanceBtn--added" : "playerCard__balanceBtn"} onClick={() => { addPlayerToComparator(player); setComparator(!comparator); }}>
                <img className="playerCard__balanceBtn__img" src={balanceIcon} alt="dodaj-do-porownywarki" />
            </button> : ""}
            <img className="playerCard__img" src={player.file_path ? `${settings.API_URL}/image?url=/media/users/${player.file_path}` : man} alt="zdjecie-profilowe" />
        </figure>
        <header className={favoriteView ? "playerCard__header playerCard__header--favorite" : "playerCard__header"}>
            <h3 className="playerCard__header__h">
                {player.first_name} {player.last_name}
            </h3>
            <button className="playerCard__addToFavorites" onClick={() => { addPlayerToFavorites(); }}>
                {!favoritePlayer ? <img className="btn__img" src={heart} alt="dodaj-do-ulubionych" /> : <img className="btn__img heartFilled" src={heartFilled} alt="dodano-do-ulubionych" />}
            </button>
        </header>
        <main className="playerCard__stats">
            <section className="playerCard__stats__item playerCard__stats__item--borderRight">
                            <span className="playerCard__stats__item__value">
                                {calculateAge(player.birthday)}
                            </span>
                <span className="playerCard__stats__item__label">
                                Wiek
                            </span>
            </section>
            <section className="playerCard__stats__item playerCard__stats__item--borderRight">
                            <span className="playerCard__stats__item__value">
                                {player.weight ? player.weight : "-"}
                            </span>
                <span className="playerCard__stats__item__label">
                                Waga
                            </span>
            </section>
            <section className="playerCard__stats__item">
                            <span className="playerCard__stats__item__value">
                                {player.height ? player.height : "-"}
                            </span>
                <span className="playerCard__stats__item__label">
                                Wzrost
                            </span>
            </section>

            <section className="playerCard__stats__item playerCard__stats__item--borderRight">
                            <span className="playerCard__stats__item__value">
                                {player.block_range ? player.block_range : "-"}
                            </span>
                <span className="playerCard__stats__item__label">
                                Zasięg bloku
                            </span>
            </section>
            <section className="playerCard__stats__item playerCard__stats__item--borderRight">
                            <span className="playerCard__stats__item__value">
                                {player.vertical_range ? player.vertical_range : "-"}
                            </span>
                <span className="playerCard__stats__item__label">
                                Zasięg dosiężny
                            </span>
            </section>
            <section className="playerCard__stats__item">
                            <span className="playerCard__stats__item__value">
                                {player.attack_range ? player.attack_range : "-"}
                            </span>
                <span className="playerCard__stats__item__label">
                                Zasięg w ataku
                            </span>
            </section>
        </main>
        <a className="playerCard__moreBtn" href="">
            Więcej
        </a>
    </section>
}

export default PlayerCard;
