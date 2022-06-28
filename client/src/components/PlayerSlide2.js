import React, {useContext} from 'react';
import img1 from '../static/img/sklad.png'
import {ContentContext} from "../App";
import {getImageUrl} from "../helpers/others";

const PlayerSlide2 = () => {
    const { content } = useContext(ContentContext);

    return <div className="scrollCarousel__slide scrollCarousel__slide--1 scrollCarousel__slide--2">
        <div>
            <h1 className="bigHeader bigHeader--slide1">
                CHWYTLIWY NAGŁÓWEK
            </h1>
            <p className="text">
                Szukasz nowego klubu, ale brakuje Ci czasu lub nie chcesz współpracować z menedżerami? Nasz unikalny na polskim rynku serwis powstał po to, aby ułatwić kontakt klubów z zawodnikami. Wystarczy tylko kilka chwil: przygotuj swój profil na naszej stronie i gotowe! Od teraz przedstawiciele klubów, z którymi współpracujemy, mogą kontaktować się z Tobą szybko i bez pośredników.
            </p>
            <h2 className="bigHeader__subheader">
                Stwórz swój wymarzony skład i zacznij do realizować
            </h2>
        </div>
        <figure>
            <img className="img" src={img1} alt="dolacz-do-nas" />
        </figure>
    </div>
};

export default PlayerSlide2;
