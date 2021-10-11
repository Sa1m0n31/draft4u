import React, { useState, useEffect } from 'react'
import addVideosBtn from '../static/img/wgraj-filmik.png'
import playBtn from '../static/img/play-button.svg'
import {getUserVideos} from "../helpers/video";
import { Player } from 'video-react'
import settings from "../settings";
import Slider from 'react-slick'

const PlayerVideoView = ({id}) => {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        getUserVideos(id)
            .then(res => {
                console.log(res.data.result);
                setVideos(res.data.result);
            });

    }, []);

    const settings = {
        className: "center",
        centerMode: true,
        infinite: true,
        centerPadding: "60px",
        slidesToShow: 3,
        speed: 500
    };

    return <section className="playerVideoView siteWidthSuperNarrow">
        <main className="playerVideoView__carousel test">
                    <Slider {...settings}>
                        {videos?.map((item, index) => {
                            return <div key={index}>
                                {/*Test 2*/}
                                <Player width={200} height={100} src={`${settings.API_URL}/video/get?url=/videos/${item.file_path}`} />
                                {/*<img className="embla__slide--video__playBtn" src={playBtn} alt="play" />*/}
                            </div>
                        })}
                    </Slider>
        </main>
        <section className="playerVideoView__btnWrapper">
            <a className="button button--hover playerVideoView__btn" href="/dodaj-video">
                <img className="btn__img" src={addVideosBtn} alt="wgraj-filmiki" />
            </a>
        </section>
    </section>
}

export default PlayerVideoView;
