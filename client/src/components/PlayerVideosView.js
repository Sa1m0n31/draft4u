import React, { useState, useEffect } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import addVideosBtn from '../static/img/wgraj-filmik.png'
import playBtn from '../static/img/play-button.svg'
import {getUserVideos} from "../helpers/video";
import { Player } from 'video-react'
import settings from "../settings";

const PlayerVideoView = ({id}) => {
    const [videos, setVideos] = useState([]);

    const [emblaRef] = useEmblaCarousel();

    useEffect(() => {

    }, []);

    useEffect(() => {
        getUserVideos(id)
            .then(res => {
                console.log(res.data.result);
                setVideos(res.data.result);
            })
    }, []);

    return <section className="playerVideoView siteWidthSuperNarrow">
        <main className="playerVideoView__carousel">
            <div className="embla" ref={emblaRef}>
                <div className="embla__container embla__container--videos">
                    {videos?.map((item, index) => {
                        return <div className="embla__slide--video" key={index}>
                            <Player width={200} height={100} src={`${settings.API_URL}/video/get?url=/videos/${item.file_path}`} />
                            {/*<img className="embla__slide--video__playBtn" src={playBtn} alt="play" />*/}
                        </div>
                    })}
                </div>
            </div>
        </main>
        <section className="playerVideoView__btnWrapper">
            <a className="button button--hover playerVideoView__btn" href="/dodaj-video">
                <img className="btn__img" src={addVideosBtn} alt="wgraj-filmiki" />
            </a>
        </section>
    </section>
}

export default PlayerVideoView;
