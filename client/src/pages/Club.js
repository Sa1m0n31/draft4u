import React, {useContext, useEffect, useRef} from 'react'
import Header from "../components/Header";
import Footer from "../components/Footer";
import header from '../static/img/header-klub.jpg'
import img1 from '../static/img/strefa-zawodnika-1.png'
import img2 from '../static/img/strefa-klubowa-2.png'
import img3 from '../static/img/strefa-zawodnika-2.png'
import img4 from '../static/img/klub-porownywarka.png'
import img5 from '../static/img/czat.png'
import PlayerFAQ from "../components/PlayerFAQ";
import ClubForm from "../components/ClubForm";
import {ContentContext} from "../App";
import {getImageUrl} from "../helpers/others";
import Slider from "react-slick";
import PlayerSlide1 from "../components/PlayerSlide1";
import PlayerSlide2 from "../components/PlayerSlide2";
import PlayerSlide3 from "../components/PlayerSlide3";
import PlayerSlide4 from "../components/PlayerSlide4";
import PlayerSlide5 from "../components/PlayerSlide5";
import ClubSlide1 from "../components/ClubSlide1";
import ClubSlide2 from "../components/ClubSlide2";
import ClubSlide3 from "../components/ClubSlide3";
import ClubSlide4 from "../components/ClubSlide4";
import ClubSlide5 from "../components/ClubSlide5";
import ClubSlide6 from "../components/ClubSlide6";

const Club = () => {
    const { content } = useContext(ContentContext);

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

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    useEffect(() => {
        window.addEventListener('wheel', (event) => {
            if (event.deltaY < 0) {
                if(window.scrollY === 0) {
                    slider.current.slickPrev();
                }
            }
            else if (event.deltaY > 0) {
                if((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
                    slider.current.slickNext();
                    setTimeout(() => {
                        scrollToTop();
                    }, 100);
                }
            }
        });

        if(window.innerWidth < 768) {
            let touchstartY = 0
            let touchendY = 0

            function checkDirection() {
                if (touchendY < touchstartY) {
                    // down
                    if((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
                        slider.current.slickNext();
                        setTimeout(() => {
                            scrollToTop();
                        }, 100);
                    }
                }
                if (touchendY > touchstartY) {
                    // wp
                    if(window.scrollY === 0) {
                        slider.current.slickPrev();
                    }
                }
            }

            document.addEventListener('touchstart', e => {
                touchstartY = e.changedTouches[0].screenY
            })

            document.addEventListener('touchend', e => {
                touchendY = e.changedTouches[0].screenY
                checkDirection()
            })
        }
    }, []);

    const slider = useRef(null);

    return <div className="container container--dark container--club">
        <Header theme="dark" menu="light" clubPage={true} />
        <main className="club">
            <div className="scrollCarousel">
                <Slider ref={slider} {...settings}>
                    <ClubSlide1 />
                    <ClubSlide2 />
                    <ClubSlide3 />
                    <ClubSlide4 />
                    <ClubSlide5 />
                    <ClubSlide6 />
                </Slider>
            </div>
        </main>
    </div>
}

export default Club;
