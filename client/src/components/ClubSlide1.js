import React, {useContext} from 'react';
import img1 from '../static/img/manager.png'
import {ContentContext} from "../App";

const ClubSlide1 = () => {
    const { content } = useContext(ContentContext);

    return <div className="scrollCarousel__slide scrollCarousel__slide--1 scrollCarousel__slide--1--club">
        <div>
            <h1 className="bigHeader bigHeader--slide1 whitespace">
                {content.club_zone_header1}
            </h1>
            <p className="text">
                {content.club_zone_text1}
            </p>
            <a className="button button--hover button--player--register btn--gradient goldman center btn--playerSlide1"
               href="/zaloz-konto">
                {content.register}
            </a>
        </div>
        <figure>
            <img className="img" src={img1} alt="dolacz-do-nas" />
        </figure>
    </div>
};

export default ClubSlide1;
