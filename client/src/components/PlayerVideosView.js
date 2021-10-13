import React, {useState, useEffect, useRef} from 'react'
import addVideosBtn from '../static/img/wgraj-filmik.png'
import playBtn from '../static/img/play-button.svg'
import {getUserVideos} from "../helpers/video";
import { Player, BigPlayButton } from 'video-react'
import settings from "../settings";
import '@splidejs/splide/dist/css/themes/splide-default.min.css';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import ModalVideoPlayer from "./ModalVideoPlayer";

const PlayerVideoView = ({id}) => {
    const [videos, setVideos] = useState([]);
    const [playVideo, setPlayVideo] = useState(-1);

    var player = useRef(null);

    useEffect(() => {
        getUserVideos(id)
            .then(res => {
                console.log(res.data.result);
                setVideos(res.data.result);
            });
    }, []);

    const closeModalVideoPlayer = () => {
        setPlayVideo(-1);
    }

    const options = {
        perPage: 2.2,
        focus: 'center'
    }

    return <section className="playerVideoView siteWidthSuperNarrow">
        {playVideo !== -1 ? <ModalVideoPlayer closeModal={closeModalVideoPlayer} source={`${settings.API_URL}/video/get?url=/videos/${videos[playVideo].file_path}`} /> : ""}

        <main className="playerVideoView__carousel test">
                    <Splide options={options}>
                        {videos?.map((item, index) => {
                            return <SplideSlide key={index}>
                                    <div onClick={(e) => { e.preventDefault(); e.stopPropagation(); setPlayVideo(index); }}>
                                        <span className="playerVideoView__overlay"></span>
                                        <Player ref={(pl) => { player = pl }} width={200} height={100} src={`${settings.API_URL}/video/get?url=/videos/${item.file_path}`} />
                                    </div>
                            </SplideSlide>
                        })}
                    </Splide>
        </main>
        <section className={videos.length ? "playerVideoView__btnWrapper" : "playerVideoView__btnWrapper--center"}>
            <a className="button button--hover playerVideoView__btn" href="/dodaj-video">
                <img className="btn__img" src={addVideosBtn} alt="wgraj-filmiki" />
            </a>
        </section>
    </section>
}

export default PlayerVideoView;
//
