import React, {useState, useEffect, useContext} from 'react'
import uploadIcon from '../static/img/upload.svg'
import trashIcon from '../static/img/trash-black.svg'
import uploadBlackIcon from '../static/img/upload-black.svg'
import {getUserData} from "../helpers/user";
import VideoUploader from "./VideoUploader";
import {deletePlayerVideo, getUserVideos} from "../helpers/video";
import settings from "../settings";
import { Player } from 'video-react';
import ModalVideoPlayer from "./ModalVideoPlayer";
import DeleteVideoModal from "./DeleteVideoModal";
import threeDotsMenu from '../static/img/threeDotsMenu.svg'
import {removePolishChars, unicodeToUTF8} from "../helpers/others";
import {ContentContext} from "../App";

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
    const [mobileMenuVisible, setMobileMenuVisible] = useState(-1);
    const [loader, setLoader] = useState(true);

    const { content } = useContext(ContentContext);

    useEffect(() => {
        if(content) {
            getUserData()
                .then(res => {
                    const position = res.data.result.name;
                    if(position) {
                        setVideoNames(getPlayElementsByPosition(unicodeToUTF8(position)));
                    }
                    setUserId(res.data.result.id);
                    getUserVideos(res.data.result.id)
                        .then((res) => {
                            setVideos(res.data.result);
                            setLoader(false);
                        });
                });
        }
    }, [content]);

    useEffect(() => {
        if(videoUpload) {
            getUserVideos(userId)
                .then((res) => {
                    setVideos(res.data.result);
                    setLoader(false);
                });
        }
    }, [videoUpload]);

    const getPlayElementsByPosition = (position) => {
        console.log(content);
        const { element1, element2, element3, element4, element5, element6, element_7, element_8 } = content;
        switch(position) {
            case 'atakujący':
                return [element1, element2, element3, element4, element5];
            case 'przyjmujący':
                return [element1, element_8, element3, element2, element4];
            case 'rozgrywający':
                return [element6, element2, element3, element1, element_7, element4, element5];
            case 'libero':
                return [element_8, element_7, element6, element4, element5];
            case 'środkowy':
                return [element2, element1, element3, element4, element5];
            default:
                break;
        }
    }


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
        console.log(play);
        return videos.findIndex((item) => {
            if(play) return item.name === removePolishChars(play);
            else return '';
        });
    }

    const deleteVideo = (play) => {
        setPlayToDelete(play);
        setDeleteModal(true);
    }

    return <main className="siteWidthSuperNarrow videoUploadContent" onClick={() => { setMobileMenuVisible(-1); }}>
        {uploaderOpen ? <VideoUploader setVideoUpload={setVideoUpload} videoUpload={videoUpload} closeUploader={closeUploader} userId={userId} play={videoName} /> : ""}
        {playVideo !== -1 ? <ModalVideoPlayer closeModal={closeModalVideoPlayer} source={`${settings.API_URL}/video/get?url=/videos/${videos[playVideo].file_path}`} /> : ""}

        {deleteModal ? <DeleteVideoModal setVideoUpload={setVideoUpload} videoUpload={videoUpload} userId={userId} play={playToDelete} setModalClose={setDeleteModal} /> : ""}

        <h2 className="player__header">
            {content.add_video_header}
        </h2>
        <a className="videoUpload__backBtn" href="/edycja-profilu">
            {content.back_to_profile}
        </a>
        {videoNames?.length ? <header className="videoTable__header">
            <h3 className="videoTable__header__h videoTable__header__h--first">
                {content.video}
            </h3>
            <h3 className="videoTable__header__h videoTable__header__h--second">
                {content.play}
            </h3>

            <h3 className="videoTable__header__h videoTable__header__h--third">
                {content.add_date}
            </h3>
        </header> : ""}

        {videoNames?.length ? videoNames?.map((item, index) => {
            let positionName = '';
            if(item === 'przyjecie') positionName = 'przyjęcie';
            else if(item === 'pelen mecz') positionName = 'pełen mecz';
            else positionName = item;

            return <section className="videoTable__item" id={item} key={index} onClick={() => { setMobileMenuVisible(-1); openUploader(item); }}>
                <section className="videoTable__item__miniature" onClick={(e) => { if(getVideoIndexByPlay(item) !== -1) e.stopPropagation(); setPlayVideo(getVideoIndexByPlay(item)); }}>
                    {getVideoIndexByPlay(item) !== -1 ? <Player
                        width={150}
                        height={90}
                        playsInline
                        src={`${settings.API_URL}/video/get?url=/videos/${videos[getVideoIndexByPlay(item)].file_path}`}
                    /> : <img className="videoTable__uploadIcon" src={uploadIcon} alt="wyslij" />}
                </section>

                <h3 className="videoTable__item__element">
                    {positionName}
                </h3>

                <h3 className="videoTable__item__element">
                    {getVideoIndexByPlay(item) !== -1 ? videos[getVideoIndexByPlay(item)].date?.substr(0, 10) : ""}
                </h3>

                <section className="videoTable__mobileButtons d-mobile">
                    <button className="videoTable__mobile__more" onClick={(e) => { e.stopPropagation(); setMobileMenuVisible(index); }}>
                        <img className="videoTable__mobile__more__img" src={threeDotsMenu} alt="dzialania" />
                    </button>
                    {mobileMenuVisible === index ? <button className="videoTable__mobile__activity" onClick={(e) => { if(getVideoIndexByPlay(item) !== -1) {
                        e.stopPropagation();
                        deleteVideo(item);
                    } }}>
                        {getVideoIndexByPlay(item) !== -1 ? "Usuń" : "Dodaj"}
                    </button> : ""}
                </section>

                <section className="videoTable__buttons d-desktop">
                    {getVideoIndexByPlay(item) !== -1 ? <button className="videoTable__uploadBtn videoTable__uploadBtn--trash" onClick={(e) => { e.stopPropagation(); deleteVideo(item) }}>
                        <img className="btn__img" src={trashIcon} alt="usun" />
                    </button> : ""}
                    <button className="videoTable__uploadBtn">
                        <img className="btn__img" src={uploadBlackIcon} alt="dodaj-video" />
                    </button>
                </section>
            </section>
        }) : (!loader ? <h2 className="videoTable__error">
            {content.choose_position}
        </h2> : "")}
    </main>
}

export default VideoUploadContent;
