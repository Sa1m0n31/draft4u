import React, {useContext, useEffect, useRef, useState} from 'react'
import Header from "../components/Header";
import Footer from "../components/Footer";
import img1 from '../static/img/strefa-zawodnika-1.png'
import img2 from '../static/img/strefa-zawodnika-2.png'
import img3 from '../static/img/czat.png'
import step1 from '../static/img/doswiadczenie.png'
import step2 from '../static/img/wyksztalcenie.png'
import step3 from '../static/img/kursy.png'
import PlayerFAQ from "../components/PlayerFAQ";
import ClubSlider from "../components/ClubSlider";
import discountImg from '../static/img/discount.png'
import phone from '../static/img/ekran-glowny.png'
import {ContentContext} from "../App";
import {getImageUrl} from "../helpers/others";
import Slider from "react-slick";
import PlayerSlide1 from "../components/PlayerSlide1";
import PlayerSlide2 from "../components/PlayerSlide2";
import PlayerSlide3 from "../components/PlayerSlide3";
import PlayerSlide4 from "../components/PlayerSlide4";
import PlayerSlide5 from "../components/PlayerSlide5";
import StuffSlide1 from "../components/StuffSlide1";
import StuffSlide2 from "../components/StuffSlide2";
import StuffSlide3 from "../components/StuffSlide3";

const Stuff = () => {
    const [slide, setSlide] = useState(0);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        draggable: false,
        adaptiveHeight: true,
        waitForAnimate: true
    };

    const slider = useRef(null);
    const faqContainer = useRef(null);

    const openRegisterModal = () => {
        if(window.innerWidth > 768) {
            document.querySelector(".loginBoxWrapper").style.display = "none";
            document.querySelector(".registerModal").style.display = "block";
        }
        else {
            window.location = "/zaloz-konto";
        }
    }

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    useEffect(() => {

        window.addEventListener('wheel', (event) => {
            /* Sprawdzamy czy nie FAQ */
            const path = event.path || (event.composedPath && event.composedPath());
            let isFaq = false;
            if(path) {
                isFaq = path.findIndex((item) => {
                    return item.className === 'faq scrollCarousel__slide';
                }) !== -1;
            }

            if(isFaq) {
                document.querySelector('.container').style.height = 'auto';

                /* Przesuwamy sie tylko jesli jestesmy maksymalnie na gorze lub maksymalnie na dole */
                if (event.deltaY < 0) {
                    if(window.scrollY === 0) {
                        if(window.innerWidth > 768 && window.innerHeight > 680) {
                            document.querySelector('.container').style.height = '100vh';
                        }
                        slider.current.slickPrev();
                    }
                }
                else {
                    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
                        if(window.innerWidth > 768 && window.innerHeight > 680) {
                            document.querySelector('.container').style.height = '100vh';
                        }
                        slider.current.slickNext();
                    }
                }
            }
            else {
                if(window.innerWidth > 768 && window.innerHeight > 680) {
                    document.querySelector('.container').style.height = '100vh';
                }

                if(event.deltaY < 0) {
                    if(window.scrollY === 0) {
                        slider.current.slickPrev();
                    }
                }
                else if(event.deltaY > 0) {
                    if((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
                        slider.current.slickNext();
                        setTimeout(() => {
                            scrollToTop();
                        }, 100);
                    }
                }
            }
        });
    }, []);

    useEffect(() => {

    }, [slide]);

    return <div className="container container--light container--player">
        <Header menu="dark" />
        <main className="player">
            <div className="scrollCarousel">
                <Slider ref={slider} {...settings}>
                    <StuffSlide1 openRegisterModal={openRegisterModal} />
                    <StuffSlide2 />
                    <StuffSlide3 />
                    <PlayerSlide4 />
                    <PlayerSlide5 openRegisterModal={openRegisterModal} />
                    <PlayerFAQ ref={faqContainer} />
                </Slider>
            </div>
        </main>
    </div>
}

export default Stuff;
