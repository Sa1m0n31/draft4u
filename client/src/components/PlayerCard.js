import React, {useRef, useState} from 'react'
import man from "../static/img/profile-picture.png";
import heart from "../static/img/heart.svg";
import heartFilled from "../static/img/heart-filled.svg";
import balanceIcon from '../static/img/balance.svg'

const PlayerCard = ({index, player, favoriteView, balance}) => {
    const [favorite, setFavorite] = useState(false);
    const [comparator, setComparator] = useState(false);

    const addPlayerToFavorites = (id) => {
        setFavorite(!favorite);
    }

    const addPlayerToComparator = (id) => {
        setComparator(!comparator);
    }

    return <section key={index} className={favoriteView ? "playerCard playerCard--favorite" : "playerCard"}>
        <figure className="playerCard__imgWrapper">
            {balance ? <button className={comparator ? "playerCard__balanceBtn playerCard__balanceBtn--added" : "playerCard__balanceBtn"} onClick={() => { addPlayerToComparator("123"); }}>
                <img className="playerCard__balanceBtn__img" src={balanceIcon} alt="dodaj-do-porownywarki" />
            </button> : ""}
            <img className="playerCard__img" src={man} alt="zdjecie-profilowe" />
        </figure>
        <header className={favoriteView ? "playerCard__header playerCard__header--favorite" : "playerCard__header"}>
            <h3 className="playerCard__header__h">
                Jan Kowalski
            </h3>
            <button className="playerCard__addToFavorites" onClick={() => { addPlayerToFavorites("123"); }}>
                {!favorite ? <img className="btn__img" src={heart} alt="dodaj-do-ulubionych" /> : <img className="btn__img heartFilled" src={heartFilled} alt="dodano-do-ulubionych" />}
            </button>
        </header>
        <main className="playerCard__stats">
            <section className="playerCard__stats__item playerCard__stats__item--borderRight">
                            <span className="playerCard__stats__item__value">
                                27
                            </span>
                <span className="playerCard__stats__item__label">
                                Wiek
                            </span>
            </section>
            <section className="playerCard__stats__item playerCard__stats__item--borderRight">
                            <span className="playerCard__stats__item__value">
                                92
                            </span>
                <span className="playerCard__stats__item__label">
                                Waga
                            </span>
            </section>
            <section className="playerCard__stats__item">
                            <span className="playerCard__stats__item__value">
                                198
                            </span>
                <span className="playerCard__stats__item__label">
                                Wzrost
                            </span>
            </section>

            <section className="playerCard__stats__item playerCard__stats__item--borderRight">
                            <span className="playerCard__stats__item__value">
                                245
                            </span>
                <span className="playerCard__stats__item__label">
                                Zasięg ataku
                            </span>
            </section>
            <section className="playerCard__stats__item playerCard__stats__item--borderRight">
                            <span className="playerCard__stats__item__value">
                                200
                            </span>
                <span className="playerCard__stats__item__label">
                                Zasięg dosiężny
                            </span>
            </section>
            <section className="playerCard__stats__item">
                            <span className="playerCard__stats__item__value">
                                192
                            </span>
                <span className="playerCard__stats__item__label">
                                Zasięg dosiężny
                            </span>
            </section>
        </main>
        <a className="playerCard__moreBtn" href="">
            Więcej
        </a>
    </section>
}

export default PlayerCard;
