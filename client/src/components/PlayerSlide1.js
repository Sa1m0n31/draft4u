import React, {useContext} from 'react';
import img1 from '../static/img/dolacz-do-nas.png'
import {ContentContext} from "../App";
import {getImageUrl} from "../helpers/others";

const PlayerSlide1 = ({openRegisterModal}) => {
    const { content } = useContext(ContentContext);

    return <div className="scrollCarousel__slide scrollCarousel__slide--1">
        <div>
            <h1 className="bigHeader bigHeader--slide1 whitespace">
                DOŁĄCZ DO NAS!
            </h1>
            <p className="text">
                Szukasz nowego klubu, ale brakuje Ci czasu lub nie chcesz współpracować z menedżerami? Nasz unikalny na polskim rynku serwis powstał po to, aby ułatwić kontakt klubów z zawodnikami. Wystarczy tylko kilka chwil: przygotuj swój profil na naszej stronie i gotowe! Od teraz przedstawiciele klubów, z którymi współpracujemy, mogą kontaktować się z Tobą szybko i bez pośredników.
            </p>
            <button className="button button--hover button--player--register" onClick={() => { openRegisterModal(); }}>
                <img className="btn__img" src={getImageUrl(content.img8)} alt="zarejestruj-sie" />
            </button>
        </div>
        <figure>
            <img className="img" src={img1} alt="dolacz-do-nas" />
        </figure>
    </div>
};

export default PlayerSlide1;
