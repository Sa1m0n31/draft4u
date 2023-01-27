import React from 'react'
import Header from "../components/Header";
import Footer from "../components/Footer";
import VideoUploadContent from "../components/VideoUploadContent";

const VideoUploadPage = ({user, isLocal}) => {
    return <div className="container container--light">
        <Header player={true} loggedIn={true} menu="dark" profileImage={user.file_path} isLocal={isLocal} />
        <VideoUploadContent />
        <Footer border={true} />
    </div>
}

export default VideoUploadPage;
