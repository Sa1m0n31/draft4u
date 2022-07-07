import React, {useContext} from 'react';
import img1 from '../static/img/phone-mockup.png'
import imgMobile from '../static/img/phone-mock-mobile.png'
import {ContentContext} from "../App";
import {getImageUrl} from "../helpers/others";

const ClubSlide4 = () => {
    const { content, language } = useContext(ContentContext);

    return <div className="scrollCarousel__slide scrollCarousel__slide--4">
        <h1 className="scrollCarousel__slide__backgroundHeader d-desktop">
            {language === 'pl' ? 'Czatuj' : 'Chat'}
            <span className="d-block">
                {language === 'pl' ? 'z zawodnikami' : 'with players'}
            </span>
        </h1>
        <h2 className="bigHeader d-mobile">
            {language === 'pl' ? 'Czatuj z zawodnikami' : 'Chat with players'}
        </h2>
        <figure>
            <img className="img d-desktop" src={img1} alt="dolacz-do-nas" />
            <img className="img d-mobile" src={imgMobile} alt="dolacz-do-nas" />
        </figure>
    </div>
};

export default ClubSlide4;
