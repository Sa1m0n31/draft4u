import React, {useEffect, useRef, useState} from 'react'
import Header from "../components/Header";
import PlayerFAQ from "../components/PlayerFAQ";
import Slider from "react-slick";
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
        document.querySelector('body').classList.add('noscroll');
    }, []);

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

    useEffect(() => {

    }, [slide]);

    return <div className="container container--light container--player">
        <Header menu="dark" />
        <main className="player">
            <div className="scrollCarousel">
                <Slider ref={slider} {...settings}>
                    <StuffSlide1 openRegisterModal={openRegisterModal} />
                    {/*<StuffSlide2 />*/}
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
