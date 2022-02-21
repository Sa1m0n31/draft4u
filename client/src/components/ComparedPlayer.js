import React, {useContext, useEffect, useRef, useState} from 'react'
import profile from '../static/img/profile-picture.png'
import { Player, BigPlayButton } from 'video-react'
import heart from '../static/img/heart.svg'
import trashIcon from '../static/img/trash-black.svg'
import heartFilled from '../static/img/heart-filled.svg'
import balance from '../static/img/balance.svg'
import writeMsgBtn from '../static/img/napisz-wiadomosc.png'
import {getIdentityById, getUserById, getUserData} from "../helpers/user";
import {calculateAge, getImageUrl, getPositionById} from "../helpers/others";
import settings from "../settings";
import {Player as VideoPlayer} from "video-react";
import ModalVideoPlayer from "./ModalVideoPlayer";
import playBtn from "../static/img/play-button.svg";
import {addToFavorites, deleteFromFavorites, getFavoritesByClub, isPlayerFavorite} from "../helpers/club";
import {ContentContext} from "../App";
import {TestClubContext} from "../wrappers/ClubWrapper";

const ComparedPlayer = ({player, video, color, nameMinHeight}) => {
    const [playVideo, setPlayVideo] = useState(false);
    const [favoritePlayer, setFavoritePlayer] = useState(false);
    const [playerIdentity, setPlayerIdentity] = useState("");

    const { content } = useContext(ContentContext);
    const { testClub } = useContext(TestClubContext);

    useEffect(() => {
        getFavoritesByClub()
            .then((res) => {
                if(res?.data?.result?.findIndex((item) => {
                    return item.id === player.id;
                }) !== -1) {
                    setFavoritePlayer(true);
                }
            });

        if(player) {
            getIdentityById(player.id)
                .then((res) => {
                    setPlayerIdentity(res?.data?.result?.id);
                });
        }
    }, [player]);

    let playerRef = useRef(null);

    const addPlayerToFavorites = () => {
        if(!favoritePlayer) {
            addToFavorites(player.id);
        }
        else {
            deleteFromFavorites(player.id);
        }
        setFavoritePlayer(!favoritePlayer);
    }

    useEffect(() => {
        if(playVideo) {

        }
    }, [playVideo]);

    const deletePlayerFromComparator = (id) => {
        // Delete only if there are three players in comparator
        const params = new URLSearchParams(window.location.search);
        const first = parseInt(params.get('first'));
        const second = parseInt(params.get('second'));
        const third = parseInt(params.get('third'));
        if(first > 0 && second > 0 && third > 0) {
            const newUrl = window.location.href.replace(id, '-1');
            window.location = newUrl;
        }
    }

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const first = parseInt(params.get('first'));
        const second = parseInt(params.get('second'));
        const third = parseInt(params.get('third'));
        if(!(first > 0 && second > 0 && third > 0)) {
            Array.from(document.querySelectorAll('.comparedPlayer>.playersWall__compareSection__item__deleteBtn')).forEach((item) => {
                item.style.display = 'none';
            });
        }
    }, []);

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

    return <section className="comparedPlayer">
        {playVideo ? <ModalVideoPlayer closeModal={() => { setPlayVideo(false); }} source={`${settings.API_URL}/video/get?url=/videos/${video.file_path}`} /> : ""}

        <button className="playersWall__compareSection__item__deleteBtn" onClick={() => { deletePlayerFromComparator(player.id); }}>
            <img className="btn__img" src={trashIcon} alt="usun" />
        </button>
        <figure className="comparedPlayer__imgWrapper" style={{
            borderColor: color
        }}>
            <img className="comparedPlayer__img" src={player.file_path ? `${settings.API_URL}/image?url=/media/users/${player.file_path}` : profile} alt="profilowe" />
        </figure>
        <h2 className="comparedPlayer__fullName" style={{
            minHeight: nameMinHeight + 'px'
        }}>
            {player.first_name} {testClub ? '******' : player.last_name}
        </h2>
        <section className="comparedPlayer__icons">
            <button className="comparedPlayer__icons__item" onClick={() => { addPlayerToFavorites(); }}>
                <img className="btn__img" src={!favoritePlayer ? heart : heartFilled} alt="dodaj-do-ulubionych" />
            </button>
            <div className="comparedPlayer__icons__item">
                <img className="btn__img" src={balance} alt="waga" />
            </div>
        </section>
        <section className="comparedPlayer__section">
            <section className="comparedPlayer__section__item">
                <span className="comparedPlayer__section__key">
                    {content.age}
                </span>
                <span className="comparedPlayer__section__value">
                    {calculateAge(player.birthday)}
                </span>
            </section>
            <section className="comparedPlayer__section__item comparedPlayer__section__item--salary">
                <span className="comparedPlayer__section__key">
                    {content.player_parameter_7}
                </span>
                <span className="comparedPlayer__section__value comparedPlayer__section__value--salary">
                    {player.salary_from ? player.salary_from + " - " + player.salary_to : "-"}
                </span>
            </section>
            <section className="comparedPlayer__section__item comparedPlayer__section__item--club">
                <span className="comparedPlayer__section__key">
                    {content.player_parameter_4}
                </span>
                <span className="comparedPlayer__section__value">
                    {player?.club ? player.club : "-"}
                </span>
            </section>
            <section className="comparedPlayer__section__item comparedPlayer__section__item--club">
                <span className="comparedPlayer__section__key">
                    {content.player_parameter_6}
                </span>
                <span className="comparedPlayer__section__value">
                    {player?.experience ? player.experience : "-"}
                </span>
            </section>
        </section>

        <section className="comparedPlayer__section">
            <section className="comparedPlayer__section__item">
                <span className="comparedPlayer__section__key">
                       {content.player_parameter_8}
                </span>
                <span className="comparedPlayer__section__value">
                    {player.attack_range ? player.attack_range : "-"}
                </span>
            </section>
            <section className="comparedPlayer__section__item">
                <span className="comparedPlayer__section__key">
                       {content.player_parameter_9}
                </span>
                <span className="comparedPlayer__section__value">
                    {player.vertical_range ? player.vertical_range : "-"}
                </span>
            </section>
            <section className="comparedPlayer__section__item">
                <span className="comparedPlayer__section__key">
                       {content.player_parameter_10}
                </span>
                <span className="comparedPlayer__section__value">
                    {player.block_range ? player.block_range : "-"}
                </span>
            </section>
            <section className="comparedPlayer__section__item">
                <span className="comparedPlayer__section__key">
                       {content.player_parameter_12}
                </span>
                <span className="comparedPlayer__section__value">
                    {player.weight ? player.weight + " kg" : "-"}
                </span>
            </section>
            <section className="comparedPlayer__section__item">
                <span className="comparedPlayer__section__key">
                       {content.player_parameter_11}
                </span>
                <span className="comparedPlayer__section__value">
                    {player.height ? player.height + " cm" : "-"}
                </span>
            </section>
            <section className="comparedPlayer__section__item">
                <span className="comparedPlayer__section__key">
                    {content.position}
                </span>
                <span className="comparedPlayer__section__value">
                    {player.position ? getPositionById(player.position) : "-"}
                </span>
            </section>
        </section>

        <section className="comparedPlayer__videoSection" onClick={() => { if(video) setPlayVideo(true); }}>
            {video ?
                <div onClick={(e) => { e.preventDefault(); e.stopPropagation(); setPlayVideo(true); }}>
                    <span className="playerVideoView__overlay"></span>
                    <button className="playBtn playBtn--marginTopMinus">
                        <img className="btn__img" src={playBtn} alt="odtworz" />
                    </button>
                    <VideoPlayer ref={(pl) => { playerRef = pl }} src={`${settings.API_URL}/video/get?url=/videos/${video.file_path}`} />
                </div> : <div className="noVideo">
                    <span>
                        {content.no_videos_yet}
                    </span>
                </div> }
        </section>

        <a className="button button--hover button--comparedPlayer" href={testClub ? '/' : `/wiadomosci?new=${playerIdentity}`}>
            <img className="btn__img" src={getImageUrl(content.img10)} alt="napisz-wiadomosc" />
        </a>
    </section>
}

export default ComparedPlayer;
