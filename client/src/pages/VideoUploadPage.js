import React from 'react'
import Header from "../components/Header";
import Footer from "../components/Footer";
import ClubSlider from "../components/ClubSlider";
import VideoUploadContent from "../components/VideoUploadContent";

const VideoUploadPage = ({user}) => {
    return <div className="container container--light">
        <Header player={true} loggedIn={true} menu="dark" profileImage={user.file_path} />
        <VideoUploadContent />
        <ClubSlider />
        <Footer theme="light" />
    </div>
}

export default VideoUploadPage;
