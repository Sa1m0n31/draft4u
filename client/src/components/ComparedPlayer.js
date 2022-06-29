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

    useEffect(() => {
        if(playVideo) {

        }
    }, [playVideo]);

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

    return <section className="comparedPlayer">
        {playVideo ? <ModalVideoPlayer closeModal={() => { setPlayVideo(false); }} source={`${settings.API_URL}/video/get?url=/videos/${video.file_path}`} /> : ""}

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
