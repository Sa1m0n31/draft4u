import React, {useContext, useState} from 'react';
import settings from "../settings";
import profile from "../static/img/profile-picture.png";
import {ContentContext} from "../App";
import {TestClubContext} from "../wrappers/ClubWrapper";
import {addToFavorites, deleteFromFavorites} from "../helpers/club";
import heart from '../static/img/heart.svg'
import heartFilled from '../static/img/heart-filled.svg'
import balance from '../static/img/balance.svg'

const ComparedPlayerTop = ({player, color, nameMinHeight}) => {
    const { content } = useContext(ContentContext);
    const { testClub } = useContext(TestClubContext);

    const [favoritePlayer, setFavoritePlayer] = useState(false);

    const getPositionById = (id) => {
        switch(id) {
            case 3:
                return content.position3;
            case 1:
                return content.position1;
            case 4:
                return content.position4;
            case 2:
                return content.position2;
            case 5:
                return content.position5;
            default:
                return null;
        }
    }

    const addPlayerToFavorites = () => {
        if(!favoritePlayer) {
            addToFavorites(player.id);
        }
        else {
            deleteFromFavorites(player.id);
        }
        setFavoritePlayer(!favoritePlayer);
    }

    return (
        <div className="comparedPlayer__top">
            <div className="comparedPlayer__top__left">
                <figure className="comparedPlayer__imgWrapper" style={{
                    borderColor: color
                }} onClick={() => { window.location = `/profil-zawodnika?id=${player?.id}`; }}>
                    <img className="comparedPlayer__img" src={player.file_path ? `${settings.API_URL}/image?url=/media/users/${player.file_path}` : profile} alt="profilowe" />
                </figure>
                <section className="comparedPlayer__icons">
                    <button className="comparedPlayer__icons__item" onClick={() => { addPlayerToFavorites(); }}>
                        <img className="btn__img" src={!favoritePlayer ? heart : heartFilled} alt="dodaj-do-ulubionych" />
                    </button>
                    <div className="comparedPlayer__icons__item">
                        <img className="btn__img" src={balance} alt="waga" />
                    </div>
                </section>
            </div>
            <div className="comparedPlayer__top__right">
                <a className="comparedPlayer__fullName" href={`/profil-zawodnika?id=${player?.id}`}>
                    {player.first_name} {testClub ? '******' : player.last_name}
                </a>
                <h3 className="comparedPlayer__top__right__key">
                    Pozycja
                </h3>
                <h4 className="comparedPlayer__top__right__value">
                    {getPositionById(player.position)}
                </h4>
                <h3 className="comparedPlayer__top__right__key comparedPlayer__top__right__key--second">
                    Aktualny klub
                </h3>
                <h4 className="comparedPlayer__top__right__value">
                    {player.club ? player.club : '-'}
                </h4>
            </div>
        </div>
    );
};

export default ComparedPlayerTop;
