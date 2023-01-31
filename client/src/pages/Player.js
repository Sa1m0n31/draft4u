import React, {useEffect, useRef, useState} from 'react'
import Header from "../components/Header";
import PlayerFAQ from "../components/PlayerFAQ";
import PlayerSlide1 from "../components/PlayerSlide1";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PlayerSlide3 from "../components/PlayerSlide3";
import PlayerSlide4 from "../components/PlayerSlide4";
import PlayerSlide5 from "../components/PlayerSlide5";

const Player = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const faqContainer = useRef(null);
    const sectionsRef = useRef([]);

    const openRegisterModal = () => {
        window.location = "/zaloz-konto";
    }

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    useEffect(() => {
        // document.querySelector('body').classList.add('noscroll');
    }, []);

    useEffect(() => {
        window.addEventListener('wheel', (event) => {
            // /* Sprawdzamy czy nie FAQ */
            // const path = event.path || (event.composedPath && event.composedPath());
            // let isFaq = false;
            // if(path) {
            //     isFaq = path.findIndex((item) => {
            //         return item.className === 'faq scrollCarousel__slide';
            //     }) !== -1;
            // }
            //
            // if(isFaq) {
            //     document.querySelector('.container').style.height = 'auto';
            //
            //     /* Przesuwamy sie tylko jesli jestesmy maksymalnie na gorze lub maksymalnie na dole */
            //     if (event.deltaY < 0) {
            //         if(window.scrollY === 0) {
            //             if(window.innerWidth > 768 && window.innerHeight > 680) {
            //                 document.querySelector('.container').style.height = '100vh';
            //             }
            //             slider.current.slickPrev();
            //         }
            //     }
            //     else {
            //         if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            //             if(window.innerWidth > 768 && window.innerHeight > 680) {
            //                 document.querySelector('.container').style.height = '100vh';
            //             }
            //             slider.current.slickNext();
            //         }
            //     }
            // }
            // else {
            //     if(window.innerWidth > 768 && window.innerHeight > 680) {
            //         document.querySelector('.container').style.height = '100vh';
            //     }
            //
            //     if(event.deltaY < 0) {
            //         if(window.scrollY === 0) {
            //             slider.current.slickPrev();
            //         }
            //     }
            //     else if(event.deltaY > 0) {
            //         if((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            //             slider.current.slickNext();
            //             setTimeout(() => {
            //                 scrollToTop();
            //             }, 100);
            //         }
            //     }
            // }
        });

        if(window.innerWidth < 768) {
            // let touchstartY = 0
            // let touchendY = 0
            //
            // function checkDirection() {
            //     if (touchendY < touchstartY) {
            //         // down
            //         if((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            //             slider.current.slickNext();
            //             setTimeout(() => {
            //                 scrollToTop();
            //             }, 100);
            //         }
            //     }
            //     if (touchendY > touchstartY) {
            //         // wp
            //         if(window.scrollY === 0) {
            //             slider.current.slickPrev();
            //         }
            //     }
            // }
            //
            // document.addEventListener('touchstart', e => {
            //     touchstartY = e.changedTouches[0].screenY
            // })
            //
            // document.addEventListener('touchend', e => {
            //     touchendY = e.changedTouches[0].screenY
            //     checkDirection()
            // })
        }
    }, []);

    useEffect(() => {
        console.log(currentSlide);
    }, [currentSlide]);

    window.addEventListener('wheel', (event) => {
        event.preventDefault();
        const { deltaY } = event;

        if(deltaY > 0 && currentSlide < sectionsRef.current.length) {
            sectionsRef.current[currentSlide].scrollIntoView({ behavior: "smooth" });
            setCurrentSlide(currentSlide + 1);
        }

        if(deltaY < 0 && currentSlide > 0) {
            sectionsRef.current[currentSlide - 1].scrollIntoView({ behavior: "smooth" });
            setCurrentSlide(currentSlide - 1);
        }
    }, {
        passive: false
    });

    useEffect(() => {
        (function() {
            "use strict";
            /*[pan and well CSS scrolls]*/
            var pnls = document.querySelectorAll('.panel').length,
                scdir, hold = false;

            function _scrollY(obj) {

                // Sprawdzanie czy zescrollowalismy do dolu
                const panel = sectionsRef.current[currentSlide];

                if(panel.scrollTop + panel.offsetHeight >= panel.scrollHeight) {
                    var slength, plength, pan, step = 100,
                        vh = window.innerHeight / 100,
                        vmin = Math.min(window.innerHeight, window.innerWidth) / 100;
                    if ((this !== undefined && this.id === 'well') || (obj !== undefined && obj.id === 'well')) {
                        pan = this || obj;
                        plength = parseInt(pan.offsetHeight / vh);
                    }
                    if (pan === undefined) {
                        return;
                    }
                    plength = plength || parseInt(pan.offsetHeight / vmin);
                    slength = parseInt(pan.style.transform.replace('translateY(', ''));
                    if (scdir === 'up' && Math.abs(slength) < (plength - plength / pnls)) {
                        slength = slength - step;
                    } else if (scdir === 'down' && slength < 0) {
                        slength = slength + step;
                    } else if (scdir === 'top') {
                        slength = 0;
                    }
                    if (hold === false) {
                        hold = true;
                        pan.style.transform = 'translateY(' + slength + 'vh)';
                        setTimeout(function() {
                            hold = false;
                        }, 1000);
                    }
                    console.log(scdir + ':' + slength + ':' + plength + ':' + (plength - plength / pnls));
                }
            }
            /*[swipe detection on touchscreen devices]*/
            function _swipe(obj) {
                var swdir,
                    sX,
                    sY,
                    dX,
                    dY,
                    threshold = 100,
                    /*[min distance traveled to be considered swipe]*/
                    slack = 50,
                    /*[max distance allowed at the same time in perpendicular direction]*/
                    alT = 500,
                    /*[max time allowed to travel that distance]*/
                    elT, /*[elapsed time]*/
                    stT; /*[start time]*/
                obj.addEventListener('touchstart', function(e) {
                    var tchs = e.changedTouches[0];
                    swdir = 'none';
                    sX = tchs.pageX;
                    sY = tchs.pageY;
                    stT = new Date().getTime();
                    //e.preventDefault();
                }, false);

                obj.addEventListener('touchmove', function(e) {
                    e.preventDefault(); /*[prevent scrolling when inside DIV]*/
                }, false);

                obj.addEventListener('touchend', function(e) {
                    var tchs = e.changedTouches[0];
                    dX = tchs.pageX - sX;
                    dY = tchs.pageY - sY;
                    elT = new Date().getTime() - stT;
                    if (elT <= alT) {
                        if (Math.abs(dX) >= threshold && Math.abs(dY) <= slack) {
                            swdir = (dX < 0) ? 'left' : 'right';
                        } else if (Math.abs(dY) >= threshold && Math.abs(dX) <= slack) {
                            swdir = (dY < 0) ? 'up' : 'down';
                        }
                        if (obj.id === 'well') {
                            if (swdir === 'up') {
                                scdir = swdir;
                                _scrollY(obj);
                            } else if (swdir === 'down' && obj.style.transform !== 'translateY(0)') {
                                scdir = swdir;
                                _scrollY(obj);

                            }
                            e.stopPropagation();
                        }
                    }
                }, false);
            }
            /*[assignments]*/
            var well = document.getElementById('well');
            well.style.transform = 'translateY(0)';
            well.addEventListener('wheel', function(e) {
                if (e.deltaY < 0) {
                    scdir = 'down';
                }
                if (e.deltaY > 0) {
                    scdir = 'up';
                }
                e.stopPropagation();
            });
            well.addEventListener('wheel', _scrollY);
            _swipe(well);
            var tops = document.querySelectorAll('.top');
            for (var i = 0; i < tops.length; i++) {
                tops[i].addEventListener('click', function() {
                    scdir = 'top';
                    _scrollY(well);
                });
            }
        })();
    }, []);

    return <div className="container container--light container--player">
        <Header menu="dark" />
        <main className="player">

            <div className="well" id="well">
                <div ref={(el) => (sectionsRef.current[0] = el)}
                     className="panel">
                    <PlayerSlide1 openRegisterModal={openRegisterModal} />
                </div>
                <div ref={(el) => (sectionsRef.current[1] = el)} className="panel">
                    <PlayerSlide3 />
                </div>
                <div ref={(el) => (sectionsRef.current[2] = el)} className="panel">
                    <PlayerSlide4 currentSlide={currentSlide} />
                </div>
                <div ref={(el) => (sectionsRef.current[3] = el)} className="panel">
                    <PlayerSlide5 openRegisterModal={openRegisterModal} />
                </div>
                <div ref={(el) => (sectionsRef.current[4] = el)} className="panel">
                    <PlayerFAQ ref={faqContainer} />
                </div>
            </div>
        </main>
    </div>
}

export default Player;
