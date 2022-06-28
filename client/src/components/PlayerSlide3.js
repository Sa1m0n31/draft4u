import React, {useContext} from 'react';
import circle1 from '../static/img/circle-1.svg'
import circle2 from '../static/img/circle-2.svg'
import circle3 from '../static/img/circle-3.svg'
import {ContentContext} from "../App";
import {getImageUrl} from "../helpers/others";

const PlayerSlide3 = () => {
    const { content } = useContext(ContentContext);

    return <div className="scrollCarousel__slide scrollCarousel__slide--3">
        <div className="whiteBackground">
            <div className="whiteBackground__circles">
                <h2 className="d-mobile">
                    {content.player_zone_header3}
                </h2>
                <div className="whiteBackground__circles__item">
                    <figure>
                        <img className="circleImg" src={circle1} alt="wpisz-dane" />
                    </figure>
                    <h3 className="circle__header">
                        {content.player_zone_circle1}
                    </h3>
                </div>
                <div className="whiteBackground__circles__item">
                    <figure>
                        <img className="circleImg" src={circle2} alt="wpisz-dane" />
                    </figure>
                    <h3 className="circle__header">
                        {content.player_zone_circle2}
                    </h3>
                </div>
                <div className="whiteBackground__circles__item">
                    <figure>
                        <img className="circleImg" src={circle3} alt="wpisz-dane" />
                    </figure>
                    <h3 className="circle__header">
                        {content.player_zone_circle3}
                    </h3>
                </div>
            </div>

            <div className="whiteBackground__bottom">
                <h2 className="whiteBackground__bottom__header d-desktop">
                    {content.player_zone_header3}
                </h2>
                <p className="text">
                    {content.player_zone_text4}
                </p>
            </div>
        </div>
    </div>
};

export default PlayerSlide3;
