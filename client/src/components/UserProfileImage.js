import React from 'react'
import example from "../static/img/profile.png";
import camera from "../static/img/camera.svg";
import Dropzone from "react-dropzone-uploader";
import Preview from "react-dropzone-uploader";
import ProfileImagePreview from "./ProfileImagePreview";

const UserProfileImage = () => {
    const getUploadParams = () => {
        // return { url: 'https://httpbin.org/post' }
    }

    const handleChangeStatus = ({ meta }, status) => {
        // console.log(status, meta)
        console.log("change");
    }

    const handleSubmit = (files, allFiles) => {
        // console.log(files.map(f => f.meta))
        console.log("Submit");
        allFiles.forEach(f => f.remove())
    }

    return <figure className="userInfoEdition__imgWrapper">
        {/*<img className="userInfoEdition__img" src={example} alt="alt" />*/}
        {/*<Preview />*/}
        <Dropzone
            getUploadParams={getUploadParams}
            accept="image/*"
            maxFiles={1}
            PreviewComponent={props => <ProfileImagePreview {...props} extraProp={10} />}
            onChangeStatus={handleChangeStatus}
            onSubmit={handleSubmit}
        />
    </figure>
}

export default UserProfileImage;
