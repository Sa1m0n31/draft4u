import React, {useEffect, useState} from 'react'
import ctaBtn from "../static/img/btn-cta.png";
import man from '../static/img/profile.png'
import profileEditionBtn from '../static/img/edytuj-profil-btn.png'
import {getUserProfileImage} from "../helpers/user";
import settings from "../settings";

const MyAccountStartHeader = ({fullName, image}) => {
    const [profilePicture, setProfilePicture] = useState(man);

    useEffect(() => {
        if(image) setProfilePicture(`${settings.API_URL}/image?url=/media/users/${image}`);
    }, []);

    return <header className="myAccountStart__header siteWidthSuperNarrow">
        <section className="player__section player__flex player__flex--section player__section--1 club__section">
            <article className="player__flex__content">
                <h2 className="player__header">
                    Witaj {fullName}
                </h2>
                <p className="player__flex__text">
                    Szukasz nowego klubu, ale brakuje Ci czasu lub nie chcesz współpracować z menedżerami? Nasz unikalny na polskim rynku serwis powstał po to, aby ułatwić kontakt klubów z zawodnikami. Wystarczy tylko kilka chwil: przygotuj swój profil na naszej stronie i gotowe! Od teraz przedstawiciele klubów, z którymi współpracujemy, mogą kontaktować się z Tobą szybko i bez pośredników.
                </p>
                <a className="button button--hover button--club" href="/edycja-profilu">
                    <img className="btn__img" src={profileEditionBtn} alt="edytuj-profil" />
                </a>
            </article>

            <figure className="player__flex__imgWrapper player__flex__imgWrapper--profile">
                <img className="player__flex__img" src={profilePicture} alt="widok" />
            </figure>
        </section>
    </header>
}

export default MyAccountStartHeader;
