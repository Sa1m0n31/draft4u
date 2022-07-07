import React, {useContext} from 'react';
import img1 from '../static/img/sklad.png'
import {ContentContext} from "../App";
import {getImageUrl} from "../helpers/others";

const ClubSlide2 = () => {
    const { content, language } = useContext(ContentContext);

    return <div className="scrollCarousel__slide scrollCarousel__slide--1 scrollCarousel__slide--2">
        <div>
            <h1 className="bigHeader bigHeader--slide1">
                {content.club_zone_header5}
            </h1>
            <p className="text">
                {content.club_zone_text5}
            </p>
            <h2 className="bigHeader__subheader">
                {language === 'pl' ? 'Stwórz swój wymarzony skład i zacznij go realizować' : 'Create your dream team and make it happen!'}
            </h2>
        </div>
        <figure>
            <img className="img" src={img1} alt="dolacz-do-nas" />
        </figure>
    </div>
};

export default ClubSlide2;
