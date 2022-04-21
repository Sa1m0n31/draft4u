import React, {useContext, useEffect, useState} from 'react'
import man from '../static/img/profile.png'
import settings from "../settings";
import {ContentContext} from "../App";
import {getImageUrl} from "../helpers/others";

const MyAccountStartHeader = ({fullName, image}) => {
    const [profilePicture, setProfilePicture] = useState(man);
    const { content } = useContext(ContentContext);

    useEffect(() => {
        if(image) setProfilePicture(`${settings.API_URL}/image?url=/media/users/${image}`);
    }, []);

    return <header className="myAccountStart__header siteWidthSuperNarrow">
        <section className="player__section player__flex player__flex--section player__section--1 club__section">
            <article className="player__flex__content">
                <h2 className="player__header">
                    {content.welcome_header} {fullName}
                </h2>
                <p className="player__flex__text">
                    {content.welcome_text}
                </p>
                <a className="button button--hover button--club" href="/edycja-profilu">
                    <img className="btn__img" src={getImageUrl(content.img15)} alt="edytuj-profil" />
                </a>
            </article>

            <figure className="player__flex__imgWrapper player__flex__imgWrapper--profile">
                <img className="player__flex__img" src={profilePicture} alt="widok" />
            </figure>
        </section>
    </header>
}

export default MyAccountStartHeader;
