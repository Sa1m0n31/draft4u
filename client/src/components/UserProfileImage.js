import React, {useEffect, useState} from 'react'
import example from "../static/img/profile.png";
import Dropzone from "react-dropzone-uploader";
import ProfileImagePreview from "./ProfileImagePreview";
import {editProfileImage, getUserProfileImage} from "../helpers/user";
import settings from "../settings";
import DraftLoader from "./Loader";

const UserProfileImage = ({user, club}) => {
    const [profilePicture, setProfilePicture] = useState(example);
    const [loader, setLoader] = useState(false);

    useEffect(() => {
        if(user.file_path) setProfilePicture(`${settings.IMAGE_URL}/image?url=/media/users/${user.file_path}`);
    }, []);

    const getUploadParams = ({file}) => {
        editProfileImage(user.id, file)
            .then((res) => {
                setLoader(false);
            });
    }

    return <figure className="userInfoEdition__imgWrapper">
        <span className={!loader ? "hidden hidden--profileImage" : "loader--profileImage"}>
            <DraftLoader />
        </span>
        <span className={loader ? "hidden" : ""}>
            <img className="userInfoEdition__img" src={profilePicture} alt="alt" />
            {!club ? <Dropzone
                getUploadParams={getUploadParams}
                accept="image/*"
                multiple={false}
                maxFiles={10}
                canRestart={true}
                PreviewComponent={props => <ProfileImagePreview {...props} />}
            /> : ""}
        </span>
    </figure>
}

export default UserProfileImage;
