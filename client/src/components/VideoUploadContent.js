import React, { useState, useEffect } from 'react'
import uploadIcon from '../static/img/upload.svg'
import trashIcon from '../static/img/trash-black.svg'
import uploadBlackIcon from '../static/img/upload-black.svg'
import {getPlayElementsByPosition, getUserData} from "../helpers/user";
import VideoUploader from "./VideoUploader";
import {deletePlayerVideo, getUserVideos} from "../helpers/video";
import settings from "../settings";
import { Player } from 'video-react';
import ModalVideoPlayer from "./ModalVideoPlayer";
import DeleteVideoModal from "./DeleteVideoModal";

const VideoUploadContent = () => {
    const [videos, setVideos] = useState([1, 2, 3, 4, 5]);
    const [videoNames, setVideoNames] = useState([]);
    const [uploaderOpen, setUploaderOpen] = useState(false);
    const [userId, setUserId] = useState("");
    const [playVideo, setPlayVideo] = useState(-1);
    const [videoName, setVideoName] = useState("");
    const [deleteModal, setDeleteModal] = useState(false);
    const [playToDelete, setPlayToDelete] = useState("");
    const [videoUpload, setVideoUpload] = useState(0);

    useEffect(() => {
        getUserData()
            .then(res => {
                const position = res.data.result.name;
                setVideoNames(getPlayElementsByPosition(position));
                setUserId(res.data.result.id);
                getUserVideos(res.data.result.id)
                    .then((res) => {
                        setVideos(res.data.result);
                    })
            });
    }, []);

    useEffect(() => {
        if(videoUpload) {
            getUserVideos(userId)
                .then((res) => {
                    setVideos(res.data.result);
                });
        }
    }, [videoUpload]);

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

    const deleteVideo = (play) => {
        setPlayToDelete(play);
        setDeleteModal(true);
    }

    return <main className="siteWidthSuperNarrow videoUploadContent">
        {uploaderOpen ? <VideoUploader setVideoUpload={setVideoUpload} videoUpload={videoUpload} closeUploader={closeUploader} userId={userId} play={videoName} /> : ""}
        {playVideo !== -1 ? <ModalVideoPlayer closeModal={closeModalVideoPlayer} source={`${settings.API_URL}/video/get?url=/videos/${videos[playVideo].file_path}`} /> : ""}

        {deleteModal ? <DeleteVideoModal setVideoUpload={setVideoUpload} videoUpload={videoUpload} userId={userId} play={playToDelete} setModalClose={setDeleteModal} /> : ""}

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
                    {getVideoIndexByPlay(item) !== -1 ? <button className="videoTable__uploadBtn videoTable__uploadBtn--trash" onClick={(e) => { e.stopPropagation(); deleteVideo(item) }}>
                        <img className="btn__img" src={trashIcon} alt="usun" />
                    </button> : ""}
                    <button className="videoTable__uploadBtn">
                        <img className="btn__img" src={uploadBlackIcon} alt="dodaj-video" />
                    </button>
                </section>
            </section>
        })}
    </main>
}

export default VideoUploadContent;
