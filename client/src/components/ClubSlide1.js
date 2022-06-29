import React, {useContext} from 'react';
import img1 from '../static/img/manager.png'
import {ContentContext} from "../App";
import {getImageUrl} from "../helpers/others";

const ClubSlide1 = ({openRegisterModal}) => {
    const { content } = useContext(ContentContext);

    return <div className="scrollCarousel__slide scrollCarousel__slide--1 scrollCarousel__slide--1--club">
        <div>
            <h1 className="bigHeader bigHeader--slide1 whitespace">
                {content.club_zone_header1}
            </h1>
            <p className="text">
                {content.club_zone_text1}
            </p>
            <a className="button button--hover button--player--register" href="mailto:biuro@draft4u.com.pl">
                <img className="btn__img" src={getImageUrl(content.img11)} alt="zarejestruj-sie" />
            </a>
        </div>
        <figure>
            <img className="img" src={img1} alt="dolacz-do-nas" />
        </figure>
    </div>
};

export default ClubSlide1;
