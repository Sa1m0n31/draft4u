import React, {useContext, useEffect, useRef, useState} from 'react';
import img1 from '../static/img/phone-mockup.png'
import imgMobile from '../static/img/phone-mock-mobile.png'
import {ContentContext} from "../App";

const PlayerSlide4 = ({currentSlide}) => {
    const { content, language } = useContext(ContentContext);

    const mobilePhone = useRef(null);
    const backgroundHeader = useRef(null);
    const chatImages = useRef(null);

    function onVisible(element, callback) {
        new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if(entry.intersectionRatio > 0) {
                    callback(element);
                    observer.disconnect();
                }
            });
        }).observe(element);
    }

    useEffect(() => {
        onVisible(document.querySelector(".scrollCarousel__slide--4"), () => {
            // ANIMATION
            if(window.innerWidth > 1200 || window.innerWidth < 768) {
                setTimeout(() => {
                    if(window.innerWidth > 768) {
                        mobilePhone.current.style.transform = 'translateX(30%)';
                    }
                    else {
                        mobilePhone.current.style.transform = 'translateY(50%)';
                    }
                    backgroundHeader.current.style.opacity = '0';
                    setTimeout(() => {
                        chatImages.current.style.opacity = '1';
                    }, 1000);
                }, 500);
            }
        });
    }, [currentSlide]);

    return <div className="scrollCarousel__slide scrollCarousel__slide--4">
        <h1 className="scrollCarousel__slide__backgroundHeader d-desktop" ref={backgroundHeader}>
            {language === 'pl' ? 'Czatuj' : 'Chat'}
            <span className="d-block">
                {language === 'pl' ? 'z klubami' : 'with clubs'}
            </span>
        </h1>
        <h2 className="bigHeader d-mobile">
            {language === 'pl' ? 'Czatuj z klubami' : 'Chat with clubs'}
        </h2>

        <div className="chatImages" ref={chatImages}>
            <h2 className="bigHeader d-desktop">
                {language === 'pl' ? <span>Czatuj<br/>z klubami</span> : <span>Chat<br/>with clubs</span>}
            </h2>
            <p className="text text--chat">
                {content.player_zone_text6}
            </p>
        </div>

        <figure className="mobilePhone" ref={mobilePhone}>
            <img className="img d-desktop" src={img1} alt="dolacz-do-nas" />
            <img className="img d-mobile" src={imgMobile} alt="dolacz-do-nas" />
        </figure>
    </div>
};

export default PlayerSlide4;
