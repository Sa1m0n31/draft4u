import React, { useRef, useEffect, useState } from 'react'
import closeIcon from "../static/img/close-grey.svg";
import uploadIcon from '../static/img/upload.svg'
import wybierzPlikBtn from '../static/img/wybierz-plik.png'
import Dropzone from "react-dropzone-uploader";
import {getUserVideos, uploadVideo} from "../helpers/video";
import DraftLoader from "./Loader";
import successIcon from '../static/img/success.svg'
import failureIcon from '../static/img/failure.svg'
import axios from "axios";
import settings from "../settings";

const VideoUploader = ({setVideoUpload, videoUpload, closeUploader, userId, play}) => {
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState(-1);
    const [progress, setProgress] = useState(0);

    const getUploadParams = ({file, meta}) => {
        setLoading(true);
        const config = {
            onUploadProgress: (progressEvent) => {
                const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                setProgress(percentCompleted);
            },
            headers: { 'Content-Type': 'multipart/form-data' }
        }
        let formData = new FormData();
        formData.append('file', file);
        formData.append('userId', userId);
        formData.append('play', play);

       return axios.post(`${settings.API_URL}/video/upload`, formData, config)
           .then((res) => {
               setLoading(false);
               setVideoUpload(videoUpload+1);
               if(res?.data?.result) setResponse(1);
               else setResponse(0);
           });
    }

    return <main className="videoUploaderWrapper">
        <main className="videoUploader">
            <button className="registerModal__closeBtn" onClick={() => { closeUploader(); }}>
                <img className="registerModal__closeBtn__img" src={closeIcon} alt="zamknij" />
            </button>

            <h2 className="player__header player__header--videoUploader">
                Prześlij filmik
            </h2>

            {!loading && response === -1 ? <>
                <Dropzone
                    getUploadParams={getUploadParams}
                    accept="video/*"
                    maxFiles={1} />

                <figure className="videoUploader__imgWrapper">
                    <img className="videoUploader__img" src={uploadIcon} alt="dodaj-filmik" />
                </figure>
                <h3 className="videoUploader__text">
                    Przeciągnij i upuść pliki wideo, które chcesz przesłać
                </h3>
                <button className="button button--hover button--videoUploader">
                    <img className="btn__img" src={wybierzPlikBtn} alt="wybierz-plik" />
                </button>
            </> : (loading ? <div className="videoLoadingWrapper">
                <DraftLoader />

                <span className="progressBar">
                    <span className="progressBar__inner" style={{
                        width: progress + '%'
                    }}></span>
                </span>

                <span className="progressBar__percent">
                    {progress} %
                </span>
            </div> : (response === 1 ? <>
                <img className="videoUploader__responseImg" src={successIcon} alt="sukces" />
                <h2 className="videoUploader__responseHeader">
                    Filmik został dodany
                </h2>
            </> : <>
                <img className="videoUploader__responseImg" src={failureIcon} alt="cos-poszlo-nie-tak" />
                <h2 className="videoUploader__responseHeader">
                    Coś poszło nie tak... Prosimy spróbować później
                </h2>
            </>))}
        </main>
    </main>
}

export default VideoUploader;
