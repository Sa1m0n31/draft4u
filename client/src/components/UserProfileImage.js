import React, {useEffect, useState} from 'react'
import example from "../static/img/profile.png";
import camera from "../static/img/camera.svg";
import Dropzone from "react-dropzone-uploader";
import Preview from "react-dropzone-uploader";
import ProfileImagePreview from "./ProfileImagePreview";
import {editProfileImage, getUserProfileImage} from "../helpers/user";
import settings from "../settings";
import DraftLoader from "./Loader";

const UserProfileImage = ({user}) => {
    const [profilePicture, setProfilePicture] = useState(example);
    const [loader, setLoader] = useState(false);

    useEffect(() => {
        if(user.file_path) setProfilePicture(`${settings.API_URL}/image?url=/media/users/${user.file_path}`);
    }, []);

    const getUploadParams = ({file}) => {
        setLoader(true);
        editProfileImage(user.id, file)
            .then((res) => {
                setLoader(false);
                console.log("loader");
            });
    }

    return <figure className="userInfoEdition__imgWrapper">
        <span className={loader ? "hidden" : ""}>
            <img className="userInfoEdition__img" src={profilePicture} alt="alt" />
            <Dropzone
                getUploadParams={getUploadParams}
                accept="image/*"
                maxFiles={1}
                PreviewComponent={props => <ProfileImagePreview {...props} extraProp={10} />}
            />
        </span>

        <span className={!loader ? "hidden" : ""}>
            <DraftLoader />
        </span>
    </figure>
}

export default UserProfileImage;
