import React, {useContext, useEffect, useRef, useState} from 'react'
import man from "../static/img/profile-picture.png";
import heart from "../static/img/heart.svg";
import heartFilled from "../static/img/heart-filled.svg";
import balanceIcon from '../static/img/balance.svg'
import {calculateAge} from "../helpers/others";
import settings from "../settings";
import {addToFavorites, deleteFromFavorites} from "../helpers/club";
import {ContentContext} from "../App";
import {TestClubContext} from "../wrappers/ClubWrapper";

const StuffCard = ({index, player, favoriteView, favorite, addPlayerToFavorites}) => {
    const [favoritePlayer, setFavoritePlayer] = useState(false);
    const [post, setPost] = useState("-");

    const { content } = useContext(ContentContext);
    const { testClub } = useContext(TestClubContext);

    useEffect(() => {
        switch(player.position) {
            case 11:
                setPost(content.post1);
                break;
            case 12:
                setPost(content.post2);
                break;
            case 13:
                setPost(content.post3);
                break;
            case 14:
                setPost(content.post4);
                break;
            case 15:
                setPost(content.post5);
                break;
            default:
                break;
        }
    }, [player]);

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

    return <section key={index} className={favoriteView ? "playerCard playerCard--favorite playerCard--stuff" : "playerCard playerCard--stuff"}>
        <figure className="playerCard__imgWrapper">
            <img className="playerCard__img" src={player.file_path ? `${settings.IMAGE_URL}/image?url=/media/users/${player.file_path}` : man} alt="zdjecie-profilowe" />
        </figure>
        <header className={favoriteView ? "playerCard__header playerCard__header--favorite" : "playerCard__header"}>
            <h3 className="playerCard__header__h">
                {player.first_name} {testClub ? '******' : player.last_name}
            </h3>
            <button className="playerCard__addToFavorites" onClick={() => { addPlayerToFavorites ? addPlayerToFavorites(player.user_id) : addPlayerToFavoritesFallback(); }}>
                {!favoritePlayer ? <img className="btn__img" src={heart} alt="dodaj-do-ulubionych" /> : <img className="btn__img heartFilled" src={heartFilled} alt="dodano-do-ulubionych" />}
            </button>
        </header>
        <main className="playerCard__stats">
            <section className="stuffCard__stats__item flex">
                <h3 className="stuffCard__stats__item__header">
                    {content.post}
                </h3>
                <p className="stuffCard__stats__item__value">
                    {post}
                </p>
            </section>
            <section className="stuffCard__stats__item flex">
                <h3 className="stuffCard__stats__item__header">
                    {content.player_parameter_4}
                </h3>
                <p className="stuffCard__stats__item__value">
                    {player.club ? player.club : '-'}
                </p>
            </section>
            <section className="stuffCard__stats__item flex">
                <h3 className="stuffCard__stats__item__header">
                    {content.player_parameter_3}
                </h3>
                <p className="stuffCard__stats__item__value">
                    {player.phone_number ? (testClub ? "******" : player.phone_number) : '-'}
                </p>
            </section>
        </main>
        <a className="playerCard__moreBtn" href={`/profil-zawodnika?id=${player.user_id ? player.user_id : player.id}`}>
            {content.more_about_player}
        </a>
    </section>
}

export default StuffCard;
