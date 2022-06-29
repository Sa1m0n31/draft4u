import React, {useContext} from 'react';
import img1 from '../static/img/sklad.png'
import {ContentContext} from "../App";
import {getImageUrl} from "../helpers/others";

const StuffSlide2 = () => {
    const { content } = useContext(ContentContext);

    return <div className="scrollCarousel__slide scrollCarousel__slide--1 scrollCarousel__slide--2">
        <div>
            <h1 className="bigHeader bigHeader--slide1">
                {content.stuff_zone_header5}
            </h1>
            <p className="text">
                {content.stuff_zone_text5}
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

export default StuffSlide2;
