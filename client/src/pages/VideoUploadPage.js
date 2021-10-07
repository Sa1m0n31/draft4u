import React, { useState, useEffect } from 'react'
import {isLoggedIn} from "../helpers/auth";
import Header from "../components/Header";
import Footer from "../components/Footer";
import LoadingPage from "./LoadingPage";
import ClubSlider from "../components/ClubSlider";
import VideoUploadContent from "../components/VideoUploadContent";

const VideoUploadPage = () => {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        isLoggedIn()
            .then(res => {
                if(!res?.data?.result) window.location = "/";
                else {
                    setLoaded(true);
                }
            })
    }, []);

    return <div className="container container--light">
        {loaded ? <>
            <Header player={true} loggedIn={true} menu="dark" />
            <VideoUploadContent />
            <ClubSlider />
            <Footer theme="light" />
        </> : <LoadingPage />}
    </div>
}

export default VideoUploadPage;
