import React, {useContext, useEffect, useState} from 'react';
import img1 from '../static/img/slide-6-background.png'
import {ContentContext} from "../App";
import {getImageUrl} from "../helpers/others";
import i1 from '../static/img/trener.svg'
import i2 from '../static/img/fizjoterapeuta.svg'
import i3 from '../static/img/asystent.svg'
import i4 from '../static/img/trener-przygotowania.svg'
import i5 from '../static/img/statystyk.svg'
import {getAllStuffPositions} from "../helpers/user";

const ClubSlide6 = ({openRegisterModal}) => {
    const { content } = useContext(ContentContext);

    const [positions, setPositions] = useState([]);

    useEffect(() => {
        getAllStuffPositions()
            .then((res) => {
                if(res?.data?.result) {
                    setPositions(res?.data?.result?.map((item) => {
                        return item?.name;
                    }));
                }
            });
    }, []);

    return <div className="scrollCarousel__slide scrollCarousel__slide--1 scrollCarousel__slide--6--club">
        <div>
            <h1 className="bigHeader bigHeader--slide1">
                Poszukujesz specjalistów do sztabu? Mamy ich!
            </h1>
            <p className="text">
                {content.club_zone_text1}
            </p>
            <div className="scrollCarousel__icons">
                <div className="scrollCarousel__icons__item">
                    <img className="img" src={i3} alt="trener" />
                    <h4 className="scrollCarousel__icons__item__header">
                        {content.post1}
                    </h4>
                </div>
                <div className="scrollCarousel__icons__item">
                    <img className="img" src={i2} alt="trener" />
                    <h4 className="scrollCarousel__icons__item__header">
                        {content.post3}
                    </h4>
                </div>
                <div className="scrollCarousel__icons__item">
                    <img className="img" src={i3} alt="trener" />
                    <h4 className="scrollCarousel__icons__item__header">
                        {content.post2}
                    </h4>
                </div>
                <div className="scrollCarousel__icons__item">
                    <img className="img" src={i4} alt="trener" />
                    <h4 className="scrollCarousel__icons__item__header">
                        {content.post4}
                    </h4>
                </div>
                <div className="scrollCarousel__icons__item">
                    <img className="img" src={i5} alt="trener" />
                    <h4 className="scrollCarousel__icons__item__header">
                        {content.post5}
                    </h4>
                </div>
            </div>
        </div>
        <figure>
            <img className="img" src={img1} alt="dolacz-do-nas" />
        </figure>
    </div>
};

export default ClubSlide6;
