import React, {useEffect, useState} from 'react'
import example from "../static/img/profile.png";
import camera from "../static/img/camera.svg";
import Dropzone from "react-dropzone-uploader";
import Preview from "react-dropzone-uploader";
import ProfileImagePreview from "./ProfileImagePreview";
import {editProfileImage, getUserProfileImage} from "../helpers/user";
import settings from "../settings";

const UserProfileImage = ({user}) => {
    const [profilePicture, setProfilePicture] = useState(example);

    useEffect(() => {
        if(user.file_path) setProfilePicture(`${settings.API_URL}/image?url=/media/users/${user.file_path}`);
    }, []);

    const getUploadParams = ({file}) => {
        editProfileImage(user.id, file)
            .then((res) => {
                console.log(res.data.result);
            });
    }

    return <figure className="userInfoEdition__imgWrapper">
        <img className="userInfoEdition__img" src={profilePicture} alt="alt" />
        {/*<Preview />*/}
        <Dropzone
            getUploadParams={getUploadParams}
            accept="image/*"
            maxFiles={1}
            PreviewComponent={props => <ProfileImagePreview {...props} extraProp={10} />}
        />
    </figure>
}

export default UserProfileImage;
