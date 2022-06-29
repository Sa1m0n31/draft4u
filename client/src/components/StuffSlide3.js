import React, {useContext} from 'react';
import circle1 from '../static/img/doswiadczenie.png'
import circle2 from '../static/img/wyksztalcenie.png'
import circle3 from '../static/img/kursy.png'
import {ContentContext} from "../App";
import {getImageUrl} from "../helpers/others";

const StuffSlide3 = () => {
    const { content } = useContext(ContentContext);

    return <div className="scrollCarousel__slide scrollCarousel__slide--3 scrollCarousel__slide--3--stuff">
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
                        {content.stuff_zone_circle1}
                    </h3>
                </div>
                <div className="whiteBackground__circles__item">
                    <figure>
                        <img className="circleImg" src={circle2} alt="wpisz-dane" />
                    </figure>
                    <h3 className="circle__header">
                        {content.stuff_zone_circle2}
                    </h3>
                </div>
                <div className="whiteBackground__circles__item">
                    <figure>
                        <img className="circleImg" src={circle3} alt="wpisz-dane" />
                    </figure>
                    <h3 className="circle__header">
                        {content.stuff_zone_circle3}
                    </h3>
                </div>
            </div>

            <div className="whiteBackground__bottom">
                <h2 className="whiteBackground__bottom__header d-desktop">
                    {content.stuff_zone_header2}
                </h2>
                <p className="text">
                    {content.stuff_zone_text2}
                </p>
            </div>
        </div>
    </div>
};

export default StuffSlide3;
