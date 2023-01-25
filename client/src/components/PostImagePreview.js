import React from 'react';

const PostImagePreview = (meta) => {
    return meta?.meta?.previewUrl ? <figure className="feed__main__top__image">
        <img className="img" src={meta.meta.previewUrl} alt="zdjęcie-postu" />
    </figure> : <button className="btn--feedTopOption">
        Zdjęcie
    </button>
};

export default PostImagePreview;
