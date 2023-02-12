import React, {useContext, useEffect, useRef, useState} from 'react'
import Header from "../components/Header";
import {ContentContext} from "../App";
import ClubSlide1 from "../components/ClubSlide1";
import ClubSlide3 from "../components/ClubSlide3";
import ClubSlide4 from "../components/ClubSlide4";
import ClubSlide5 from "../components/ClubSlide5";
import ClubSlide6 from "../components/ClubSlide6";

const Club = () => {
    const { content } = useContext(ContentContext);

    const [currentSlide, setCurrentSlide] = useState(0);

    const faqContainer = useRef(null);
    const sectionsRef = useRef([]);

    useEffect(() => {
        (function() {
            "use strict";
            /*[pan and well CSS scrolls]*/
            var pnls = document.querySelectorAll('.panel').length,
                scdir, hold = false;

            function _scrollY(obj) {

                // Sprawdzanie czy zescrollowalismy do dolu
                const panel = sectionsRef.current[currentSlide];

                if(panel.scrollTop + panel.offsetHeight + 2 >= panel.scrollHeight
                    && window.innerWidth > 1200 && window.innerHeight > 650) {
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
                        setCurrentSlide(p => (p+1)%5);
                        slength = slength - step;
                    } else if (scdir === 'down' && slength < 0) {
                        setCurrentSlide(p => (Math.max(0, p-1)));
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
                }
            }
            /*[swipe detection on touchscreen devices]*/
            // function _swipe(obj) {
            //     var swdir,
            //         sX,
            //         sY,
            //         dX,
            //         dY,
            //         threshold = 100,
            //         /*[min distance traveled to be considered swipe]*/
            //         slack = 50,
            //         /*[max distance allowed at the same time in perpendicular direction]*/
            //         alT = 500,
            //         /*[max time allowed to travel that distance]*/
            //         elT, /*[elapsed time]*/
            //         stT; /*[start time]*/
            //     obj.addEventListener('touchstart', function(e) {
            //         var tchs = e.changedTouches[0];
            //         swdir = 'none';
            //         sX = tchs.pageX;
            //         sY = tchs.pageY;
            //         stT = new Date().getTime();
            //         //e.preventDefault();
            //     }, false);
            //
            //     obj.addEventListener('touchmove', function(e) {
            //         e.preventDefault(); /*[prevent scrolling when inside DIV]*/
            //     }, false);
            //
            //     obj.addEventListener('touchend', function(e) {
            //         var tchs = e.changedTouches[0];
            //         dX = tchs.pageX - sX;
            //         dY = tchs.pageY - sY;
            //         elT = new Date().getTime() - stT;
            //         if (elT <= alT) {
            //             if (Math.abs(dX) >= threshold && Math.abs(dY) <= slack) {
            //                 swdir = (dX < 0) ? 'left' : 'right';
            //             } else if (Math.abs(dY) >= threshold && Math.abs(dX) <= slack) {
            //                 swdir = (dY < 0) ? 'up' : 'down';
            //             }
            //             if (obj.id === 'well') {
            //                 if (swdir === 'up') {
            //                     scdir = swdir;
            //                     _scrollY(obj);
            //                 } else if (swdir === 'down' && obj.style.transform !== 'translateY(0)') {
            //                     scdir = swdir;
            //                     _scrollY(obj);
            //
            //                 }
            //                 e.stopPropagation();
            //             }
            //         }
            //     }, false);
            // }
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
            // _swipe(well);
            var tops = document.querySelectorAll('.top');
            for (var i = 0; i < tops.length; i++) {
                tops[i].addEventListener('click', function() {
                    scdir = 'top';
                    _scrollY(well);
                });
            }
        })();
    }, []);

    return <div className="container container--dark container--club">
        <Header theme="dark" menu="light" clubPage={true} />
        <main className="club">
            <div className="well" id="well">
                <div ref={(el) => (sectionsRef.current[0] = el)}
                     className="panel">
                    <ClubSlide1 />
                </div>
                <div ref={(el) => (sectionsRef.current[1] = el)} className="panel">
                    <ClubSlide3 />
                </div>
                <div ref={(el) => (sectionsRef.current[2] = el)} className="panel">
                    <ClubSlide4 currentSlide={currentSlide} />
                </div>
                <div ref={(el) => (sectionsRef.current[3] = el)} className="panel">
                    <ClubSlide5 />
                </div>
                <div ref={(el) => (sectionsRef.current[4] = el)} className="panel">
                    <ClubSlide6 />
                </div>
            </div>
        </main>
    </div>
}

export default Club;
