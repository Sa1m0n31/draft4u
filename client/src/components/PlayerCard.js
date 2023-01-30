import React, {useContext, useEffect, useRef, useState} from 'react'
import man from "../static/img/profile-picture.png";
import heart from "../static/img/heart.svg";
import heartFilled from "../static/img/heart-filled.svg";
import balanceIcon from '../static/img/balance.svg'
import {calculateAge, countriesEn} from "../helpers/others";
import {addToFavorites, deleteFromFavorites} from "../helpers/club";
import {ContentContext} from "../App";
import {TestClubContext} from "../wrappers/ClubWrapper";
import cardBackground from '../static/img/card-background.png'
import settings from "../settings";

const PlayerCard = ({index, player, favoriteView, favorite, balance, addPlayerToComparator,
                        inComparator, addPlayerToFavorites}) => {
    const [favoritePlayer, setFavoritePlayer] = useState(false);
    const [comparator, setComparator] = useState(false);
    const [clubLogo, setClubLogo] = useState(null);

    const { content } = useContext(ContentContext);
    const { testClub } = useContext(TestClubContext);

    useEffect(() => {
        if(player) {
            if(player.club) {
                const clubLogos = localStorage.getItem('clubLogos') ? JSON.parse(localStorage.getItem('clubLogos')) : [];

                const logo = clubLogos?.find((item) => {
                    return item.name.toLowerCase().includes(player?.club?.toLowerCase())
                });
                console.log(logo);
                if(logo) {
                    setClubLogo(`https://draft4u.com.pl/image?url=/media/clubs/${logo.logo}`);
                }
            }
        }
    }, [player]);

    useEffect(() => {
        setComparator(inComparator);
    }, [inComparator]);

    useEffect(() => {
        if(favorite) {
            setFavoritePlayer(true);
        }
        else {
            setFavoritePlayer(false);
        }
    }, [favorite]);

    const addPlayerToFavoritesFallback = () => {
        if(!favorite && !testClub) {
            addToFavorites(player.id ? player.id : player.user_id);
        }
        else {
            deleteFromFavorites(player.id ? player.id : player.user_id);
        }
        setFavoritePlayer(!favorite);
    }

    const getPositionLetter = (pos) => {
        switch(pos) {
            case 3:
                return 'P';
            case 1:
                return 'A';
            case 4:
                return 'Ś';
            case 2:
                return 'R';
            default:
                return 'L';
        }
    }

    return <a key={index}
              href={`/profil-zawodnika?id=${player.user_id ? player.user_id : player.id}`}
              className={favoriteView ? "playerCard playerCard--favorite" : "playerCard"}>

        <img className="cardBackground" src={cardBackground} alt="tlo" />

        <div className="playerCard__top">
            <div className="playerCard__top__left">
                <div className="playerCard__top__left__buttons">
                    <button className="playerCard__addToFavorites"
                            onClick={(e) => { e.preventDefault(); e.stopPropagation(); addPlayerToFavorites ? addPlayerToFavorites(player.user_id) : addPlayerToFavoritesFallback(); }}>
                        {!favoritePlayer ? <img className="btn__img" src={heart} alt="dodaj-do-ulubionych" /> : <img className="btn__img heartFilled" src={heartFilled} alt="dodano-do-ulubionych" />}
                    </button>
                    {balance ? <button className={comparator ? "playerCard__balanceBtn playerCard__balanceBtn--added" : "playerCard__balanceBtn"}
                                       onClick={(e) => { e.preventDefault(); e.stopPropagation(); if(addPlayerToComparator(player)) setComparator(!comparator); }}>
                         <img className="playerCard__balanceBtn__img" src={balanceIcon} alt="dodaj-do-porownywarki" />
                    </button> : ""}
                </div>

                <p className="playerCard__position">
                    {getPositionLetter(player.position)}
                </p>

                <div className="playerCard__flag">
                    <span className={`fi fi-${Object.entries(countriesEn).map((item) => (item[0]))[player.country]?.toLowerCase()}`}></span>
                </div>

                {clubLogo ? <div className="playerCard__logo">
                    <img className="img" src={clubLogo} alt="logo" />
                </div> : ''}
            </div>
            <figure className="playerCard__imgWrapper">
                <img className="playerCard__img" src={player.file_path ? `${settings.IMAGE_URL}/image?url=/media/users/${player.file_path}` : man} alt="zdjecie-profilowe" />
            </figure>
        </div>

        <header className="playerCard__header">
            <h3 className="playerCard__header__h">
                {player.first_name} {testClub ? '******' : player.last_name}
            </h3>
        </header>
        <main className="playerCard__stats">
            <section className="playerCard__stats__item playerCard__stats__item--borderRight">
                            <span className="playerCard__stats__item__value">
                                {calculateAge(player.birthday)}
                            </span>
                            <span className="playerCard__stats__item__label">
                                {content.age}
                            </span>
            </section>
            <section className="playerCard__stats__item playerCard__stats__item--borderRight">
                            <span className="playerCard__stats__item__value">
                                {player.weight ? player.weight : "-"}
                            </span>
                <span className="playerCard__stats__item__label">
                    {content.player_parameter_12}
                            </span>
            </section>
            <section className="playerCard__stats__item">
                            <span className="playerCard__stats__item__value">
                                {player.height ? player.height : "-"}
                            </span>
                <span className="playerCard__stats__item__label">
                    {content.player_parameter_11}
                            </span>
            </section>

            <section className="playerCard__stats__item playerCard__stats__item--borderRight">
                            <span className="playerCard__stats__item__value">
                                {player.block_range ? player.block_range : "-"}
                            </span>
                <span className="playerCard__stats__item__label">
                               {content.player_parameter_10}
                            </span>
            </section>
            <section className="playerCard__stats__item playerCard__stats__item--borderRight">
                            <span className="playerCard__stats__item__value">
                                {player.vertical_range ? player.vertical_range : "-"}
                            </span>
                <span className="playerCard__stats__item__label">
                                {content.player_parameter_9}
                            </span>
            </section>
            <section className="playerCard__stats__item">
                            <span className="playerCard__stats__item__value">
                                {player.attack_range ? player.attack_range : "-"}
                            </span>
                <span className="playerCard__stats__item__label">
                                {content.player_parameter_8}
                            </span>
            </section>
        </main>
    </a>
}

export default PlayerCard;
