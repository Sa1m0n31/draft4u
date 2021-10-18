import React from 'react'

const ProfileImagePreview = (meta) => {
    return <figure className="userInfoEdition__previewWrapper">
        <img className="userInfoEdition__img" src={meta.meta.previewUrl} alt="alt" />
    </figure>
}

export default ProfileImagePreview;
