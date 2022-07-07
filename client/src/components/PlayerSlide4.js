import React, {useContext} from 'react';
import img1 from '../static/img/phone-mockup.png'
import imgMobile from '../static/img/phone-mock-mobile.png'
import {ContentContext} from "../App";
import {getImageUrl} from "../helpers/others";

const PlayerSlide4 = () => {
    const { language } = useContext(ContentContext);

    return <div className="scrollCarousel__slide scrollCarousel__slide--4">
        <h1 className="scrollCarousel__slide__backgroundHeader d-desktop">
            {language === 'pl' ? 'Czatuj' : 'Chat'}
            <span className="d-block">
                {language === 'pl' ? 'z klubami' : 'with clubs'}
            </span>
        </h1>
        <h2 className="bigHeader d-mobile">
            {language === 'pl' ? 'Czatuj z klubami' : 'Chat with clubs'}
        </h2>
        <figure>
            <img className="img d-desktop" src={img1} alt="dolacz-do-nas" />
            <img className="img d-mobile" src={imgMobile} alt="dolacz-do-nas" />
        </figure>
    </div>
};

export default PlayerSlide4;
