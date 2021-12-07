import React, {useState, useEffect, useRef} from 'react'
import addVideosBtn from '../static/img/wgraj-filmik.png'
import playBtn from '../static/img/play-button.svg'
import {getUserVideos} from "../helpers/video";
import { Player, BigPlayButton } from 'video-react'
import settings from "../settings";
import '@splidejs/splide/dist/css/themes/splide-default.min.css';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import writeMsgBtn from '../static/img/napisz-wiadomosc.png'
import ModalVideoPlayer from "./ModalVideoPlayer";
import {getIdentityById} from "../helpers/user";

const PlayerVideoView = ({id, club}) => {
    const [videos, setVideos] = useState([]);
    const [playVideo, setPlayVideo] = useState(-1);
    const [identity, setIdentity] = useState("");

    var player = useRef(null);

    useEffect(() => {
        getUserVideos(id)
            .then(res => {
                setVideos(res.data.result);
            });
    }, []);

    useEffect(() => {
        if(club) {
            getIdentityById(id)
                .then((res) => {
                    setIdentity(res?.data?.result?.id);
                });
        }
    }, [id]);

    const closeModalVideoPlayer = () => {
        setPlayVideo(-1);
    }

    const options = {
        perPage: 2.2,
        focus: 'center'
    }

    return <section className="playerVideoView siteWidthSuperNarrow">
        {playVideo !== -1 ? <ModalVideoPlayer closeModal={closeModalVideoPlayer} source={`${settings.API_URL}/video/get?url=/videos/${videos[playVideo].file_path}`} /> : ""}

        {club || videos?.length ? <main className={club ? "playerVideoView__carousel playerVideoView__carousel--empty" : "playerVideoView__carousel"}>
            {videos?.length || !club ? <Splide options={options}>
                {videos?.map((item, index) => {
                    return <SplideSlide key={index}>
                        <div onClick={(e) => { e.preventDefault(); e.stopPropagation(); setPlayVideo(index); }}>
                            <span className="playerVideoView__overlay"></span>
                            <button className="playBtn playBtn--marginLeftMinus">
                                <img className="btn__img" src={playBtn} alt="odtworz" />
                            </button>
                            <Player ref={(pl) => { player = pl }} width={200} height={100} src={`${settings.API_URL}/video/get?url=/videos/${item.file_path}`} />
                        </div>
                    </SplideSlide>
                })}
            </Splide> : <h3 className="noVideosHeader">
                Ten zawodnik nie dodał jeszcze żadnych filmików
            </h3>}
            {club ? <a href={`/wiadomosci?new=${identity}`} className={videos.length ? "button button--hover playerVideoView__btn playerVideoView__btn--club" : "button button--hover playerVideoView__btn playerVideoView__btn--club--center"}>
                <img className="btn__img" src={writeMsgBtn} alt="napisz-wiadomosc" />
            </a> : ""}
        </main> : ""}
        <section className={videos.length ? "playerVideoView__btnWrapper" : "playerVideoView__btnWrapper--center"}>
            {!club ? <a className="button button--hover playerVideoView__btn" href="/dodaj-video">
                <img className="btn__img" src={addVideosBtn} alt="wgraj-filmiki" />
            </a> : ""}
        </section>
    </section>
}

export default PlayerVideoView;
//
