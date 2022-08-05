import React, {useContext, useEffect, useRef, useState} from 'react'
import Header from "../components/Header";
import PlayerFAQ from "../components/PlayerFAQ";
import PlayerSlide1 from "../components/PlayerSlide1";
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PlayerSlide2 from "../components/PlayerSlide2";
import PlayerSlide3 from "../components/PlayerSlide3";
import PlayerSlide4 from "../components/PlayerSlide4";
import PlayerSlide5 from "../components/PlayerSlide5";

const Player = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

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

    return <div className="container container--light container--player">
        <Header menu="dark" />
        <main className="player">
            <div className="scrollCarousel">
                <Slider ref={slider} {...settings}
                    beforeChange={(e) => { setCurrentSlide(e); }}
                >
                    <PlayerSlide1 openRegisterModal={openRegisterModal} />
                    <PlayerSlide2 />
                    <PlayerSlide3 />
                    <PlayerSlide4 currentSlide={currentSlide} />
                    <PlayerSlide5 openRegisterModal={openRegisterModal} />
                    <PlayerFAQ ref={faqContainer} />
                </Slider>
            </div>
        </main>
    </div>
}

export default Player;
