import React, { useState, useEffect } from 'react'
import uploadIcon from '../static/img/upload.svg'
import uploadBlackIcon from '../static/img/upload-black.svg'
import {getPlayElementsByPosition, getUserData} from "../helpers/user";
import VideoUploader from "./VideoUploader";
import {getUserVideos} from "../helpers/video";
import settings from "../settings";
import { Player } from 'video-react';
import ModalVideoPlayer from "./ModalVideoPlayer";

const VideoUploadContent = () => {
    const [videos, setVideos] = useState([1, 2, 3, 4, 5]);
    const [videoNames, setVideoNames] = useState([]);
    const [uploaderOpen, setUploaderOpen] = useState(false);
    const [userId, setUserId] = useState("");
    const [playVideo, setPlayVideo] = useState(-1);
    const [videoName, setVideoName] = useState("");

    useEffect(() => {
        getUserData()
            .then(res => {
                const position = res.data.result.name;
                setVideoNames(getPlayElementsByPosition(position));
                setUserId(res.data.result.id);
                getUserVideos(res.data.result.id)
                    .then((res) => {
                        console.log(res.data.result);
                        setVideos(res.data.result);
                    })
            });
    }, []);

    const openUploader = (play) => {
        setVideoName(play);
        setUploaderOpen(true);
    }

    const closeUploader = () => {
        setUploaderOpen(false);
    }

    const closeModalVideoPlayer = () => {
        setPlayVideo(-1);
    }

    const getVideoIndexByPlay = (play) => {
        return videos.findIndex((item) => {
            return item.name === play;
        });
    }

    return <main className="siteWidthSuperNarrow videoUploadContent">
        {uploaderOpen ? <VideoUploader closeUploader={closeUploader} userId={userId} play={videoName} /> : ""}
        {playVideo !== -1 ? <ModalVideoPlayer closeModal={closeModalVideoPlayer} source={`${settings.API_URL}/video/get?url=/videos/${videos[playVideo].file_path}`} /> : ""}

        <h2 className="player__header">
            Dodaj akcje
        </h2>
        <a className="videoUpload__backBtn" href="/edycja-profilu">
            wróć do profilu
        </a>
        <header className="videoTable__header">
            <h3 className="videoTable__header__h videoTable__header__h--first">
                Film
            </h3>
            <h3 className="videoTable__header__h videoTable__header__h--second">
                Element gry
            </h3>
            <h3 className="videoTable__header__h videoTable__header__h--third">
                Nazwa pliku
            </h3>
        </header>

        {videoNames?.map((item, index) => {
            return <section className="videoTable__item" id={item} key={index} onClick={() => { openUploader(item); }}>
                <section className="videoTable__item__miniature" onClick={(e) => { if(getVideoIndexByPlay(item) !== -1) e.stopPropagation(); setPlayVideo(getVideoIndexByPlay(item)); }}>
                    {getVideoIndexByPlay(item) !== -1 ? <Player
                        width={150}
                        height={90}
                        playsInline
                        src={`${settings.API_URL}/video/get?url=/videos/${videos[getVideoIndexByPlay(item)].file_path}`}
                    /> : ""}
                </section>

                <h3 className="videoTable__item__element">
                    {item}
                </h3>

                <h3 className="videoTable__item__fileName">
                    nazwa213.mp4
                </h3>

                <section className="videoTable__buttons">
                    <button className="videoTable__uploadBtn">
                        <img className="btn__img" src={uploadBlackIcon} alt="dodaj-video" />
                    </button>
                </section>
            </section>
        })}
    </main>
}

export default VideoUploadContent;
