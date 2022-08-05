import React, {useContext} from 'react';
import img1 from '../static/img/sklad.png'
import {ContentContext} from "../App";

const ClubSlide3 = () => {
    const { content } = useContext(ContentContext);

    return <div className="scrollCarousel__slide scrollCarousel__slide--1 scrollCarousel__slide--2 scrollCarousel__slide--3--club">
        <div>
            <h1 className="bigHeader bigHeader--slide1">
                {content.club_zone_header2}
            </h1>
            <p className="text">
                {content.club_zone_text2}
            </p>
            <h2 className="bigHeader__subheader">
                Show yourself!
            </h2>
        </div>
        <figure>
            <img className="img" src={img1} alt="dolacz-do-nas" />
        </figure>
    </div>
};

export default ClubSlide3;
