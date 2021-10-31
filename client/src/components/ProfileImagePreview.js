import React from 'react'

const ProfileImagePreview = (meta, { club }) => {
    return <figure className="userInfoEdition__previewWrapper">
        {!club ? <img className="userInfoEdition__img" src={meta.meta.previewUrl} alt="alt" /> : ""}
    </figure>
}

export default ProfileImagePreview;
