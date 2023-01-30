import React, {useContext, useEffect, useRef} from 'react';
import img1 from '../static/img/phone-mockup.png'
import imgMobile from '../static/img/phone-mock-mobile.png'
import {ContentContext} from "../App";
import {getImageUrl} from "../helpers/others";
import chat1 from "../static/img/czat1.png";
import chat2 from "../static/img/czat2.png";
import chat3 from "../static/img/czat3.png";

const ClubSlide4 = ({currentSlide}) => {
    const { language } = useContext(ContentContext);

    const mobilePhone = useRef(null);
    const backgroundHeader = useRef(null);
    const chatImages = useRef(null);
    const chat1Ref = useRef(null);
    const chat2Ref = useRef(null);
    const chat3Ref = useRef(null);

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
                        setTimeout(() => {
                            chat1Ref.current.style.opacity = '1';
                            setTimeout(() => {
                                chat2Ref.current.style.opacity = '1';
                                setTimeout(() => {
                                    chat3Ref.current.style.opacity = '1';
                                }, 1000);
                            }, 1000);
                        }, 1000);
                    }, 1000);
                }, 500);
            }
        });
    }, [currentSlide]);

    return <div className="scrollCarousel__slide scrollCarousel__slide--4 scrollCarousel__slide--4--club">
        <h1 className="scrollCarousel__slide__backgroundHeader d-desktop" ref={backgroundHeader}>
            {language === 'pl' ? 'Czatuj' : 'Chat'}
            <span className="d-block">
                {language === 'pl' ? 'z zawodnikami' : 'with players'}
            </span>
        </h1>
        <h2 className="bigHeader d-mobile">
            {language === 'pl' ? 'Czatuj z zawodnikami' : 'Chat with players'}
        </h2>
        <div className="chatImages" ref={chatImages}>
            <h2 className="bigHeader d-desktop">
                {language === 'pl' ? <span>Czatuj<br/>z zawodnikami</span> : <span>Chat<br/>with players</span>}
            </h2>
            <figure ref={chat1Ref}>
                <img className="img img--chat1" src={chat3} alt="czat" />
            </figure>
            <figure ref={chat2Ref}>
                <img className="img" src={chat2} alt="czat" />
            </figure>
            <figure ref={chat3Ref}>
                <img className="img" src={chat3} alt="czat" />
            </figure>
        </div>
        <figure ref={mobilePhone}>
            <img className="img d-desktop" src={img1} alt="dolacz-do-nas" />
            <img className="img d-mobile" src={imgMobile} alt="dolacz-do-nas" />
        </figure>
    </div>
};

export default ClubSlide4;
