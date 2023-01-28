import React, {useContext} from 'react';
import img1 from '../static/img/para.png'
import {ContentContext} from "../App";

const PlayerSlide5 = ({openRegisterModal}) => {
    const { content } = useContext(ContentContext);

    return <div className="scrollCarousel__slide scrollCarousel__slide--1 scrollCarousel__slide--5">
        <div>
            <h1 className="bigHeader bigHeader--slide1">
                {content.player_zone_header5}
            </h1>
            <p className="text">
                {content.player_zone_text5}
            </p>
            <button className="button button--hover button--player--register btn--playerSlide1 goldman btn--gradient"
                    onClick={() => { openRegisterModal(); }}>
                {content.register}
            </button>
        </div>
        <figure>
            <img className="img" src={img1} alt="dolacz-do-nas" />
        </figure>
    </div>
};

export default PlayerSlide5;
