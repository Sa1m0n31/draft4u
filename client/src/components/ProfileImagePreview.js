import React from 'react'
import camera from "../static/img/camera.svg";
import Dropzone from "react-dropzone-uploader";

const ProfileImagePreview = (meta) => {
    return <figure className="userInfoEdition__previewWrapper">
        <img className="userInfoEdition__img" src={meta.meta.previewUrl} alt="alt" />
    </figure>
}

export default ProfileImagePreview;
