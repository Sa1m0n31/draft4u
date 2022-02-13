import React, {useRef, useEffect, useState, useContext} from 'react'
import closeIcon from "../static/img/close-grey.svg";
import uploadIcon from '../static/img/upload.svg'
import wybierzPlikBtn from '../static/img/wybierz-plik.png'
import Dropzone from "react-dropzone-uploader";
import DraftLoader from "./Loader";
import successIcon from '../static/img/success.svg'
import failureIcon from '../static/img/failure.svg'
import axios from "axios";
import settings from "../settings";
import {getImageUrl, removePolishChars} from "../helpers/others";
import {ContentContext} from "../App";

const VideoUploader = ({setVideoUpload, videoUpload, closeUploader, userId, play}) => {
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState(-1);
    const [progress, setProgress] = useState(0);
    const [fileToLarge, setFileToLarge] = useState(false);

    const { content } = useContext(ContentContext);

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
        formData.append('play', removePolishChars(play));

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
                {content.add_video_header}
            </h2>

            {!loading && response === -1 ? <>
                <Dropzone
                    onChangeStatus={(a, b, c) => {
                        if(b === 'error_file_size') {
                            setFileToLarge(true);
                        }
                    }}
                    getUploadParams={getUploadParams}
                    accept="video/mp4,video/x-m4v,video/*"
                    maxSizeBytes={500000000}
                    maxFiles={1} />

                <figure className="videoUploader__imgWrapper">
                    <img className="videoUploader__img" src={uploadIcon} alt="dodaj-filmik" />
                </figure>
                {!fileToLarge ? <>
                    <h3 className="videoUploader__text">
                        {content.add_video_text}
                    </h3>
                    <h4 className="videoUploader__smallText">
                        {content.add_video_text2}
                    </h4>
                    <button className="button button--hover button--videoUploader">
                        <img className="btn__img" src={getImageUrl(content.img17)} alt="wybierz-plik" />
                    </button>
                </> : <h4 className="videoUploader__text">
                    {content.video_to_large}
                </h4>}
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
                    {content.video_added}
                </h2>
            </> : <>
                <img className="videoUploader__responseImg" src={failureIcon} alt="cos-poszlo-nie-tak" />
                <h2 className="videoUploader__responseHeader">
                    {content.error}
                </h2>
            </>))}
        </main>
    </main>
}

export default VideoUploader;
