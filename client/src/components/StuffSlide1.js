import React, {useContext} from 'react';
import img1 from '../static/img/trener-siergiej.png'
import {ContentContext} from "../App";
import {getImageUrl} from "../helpers/others";

const StuffSlide1 = ({openRegisterModal}) => {
    const { content } = useContext(ContentContext);

    return <div className="scrollCarousel__slide scrollCarousel__slide--1 scrollCarousel__slide--1--stuff">
        <div>
            <h1 className="bigHeader bigHeader--slide1 whitespace">
                {content.stuff_zone_header1}
            </h1>
            <p className="text">
                {content.stuff_zone_text1}
            </p>
            <button className="button button--hover button--player--register" onClick={() => { openRegisterModal(); }}>
                <img className="btn__img" src={getImageUrl(content.img8)} alt="zarejestruj-sie" />
            </button>
        </div>
        <figure>
            <img className="img img--siergiej" src={img1} alt="dolacz-do-nas" />
        </figure>
    </div>
};

export default StuffSlide1;
