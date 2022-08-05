import React, {useState, useEffect, useRef, useContext} from 'react'
import Header from "../components/Header";
import Footer from "../components/Footer";
import rightArrow from '../static/img/right-arrow.svg'
import michalCaption from '../static/img/michal-napis.svg'
import michalImg from '../static/img/michal.png'
import bartekCaption from '../static/img/bartek-napis.png'
import bartekImg from '../static/img/bartek.png'
import {ContentContext} from "../App";

const AboutUs = () => {
    let xDown = null;
    let yDown = null;

    const [player1, setPlayer1] = useState({});
    const [player2, setPlayer2] = useState({});

    const { content } = useContext(ContentContext);

    function getTouches(evt) {
        return evt.touches || evt.originalEvent.touches;
    }

    function handleTouchStart(evt) {
        evt.stopPropagation();
        const firstTouch = getTouches(evt)[0];
        xDown = firstTouch.clientX;
        yDown = firstTouch.clientY;
    }

    function handleTouchMove(evt) {
        evt.stopPropagation();
        if ( ! xDown || ! yDown ) {
            return;
        }

        let xUp = evt.touches[0].clientX;
        let yUp = evt.touches[0].clientY;

        let xDiff = xDown - xUp;
        let yDiff = yDown - yUp;

        if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {
            nextPlayer(true);
        }

        xDown = null;
        yDown = null;
    }

    useEffect(() => {
        if(content) {
            setPlayer1({
                id: 1,
                caption: michalCaption,
                img: michalImg,
                subheader: content.about_us_michal_1,
                quote: content.about_us_michal_2,
                desc: content.about_us_michal_3
            });
            setPlayer2({
                id: 2,
                caption: bartekCaption,
                img: bartekImg,
                subheader: content.about_us_bartosz_2,
                quote: content.about_us_bartosz_1,
                desc: content.about_us_bartosz_3
            });
            // if(animationCounter) nextPlayer();
        }
    }, [content]);

    useEffect(() => {
        setForegroundPlayer(player1);
        setBackgroundPlayer(player2);
    }, [player1, player2]);

    const [foregroundPlayer, setForegroundPlayer] = useState({});
    const [backgroundPlayer, setBackgroundPlayer] = useState({});
    const [animationCounter, setAnimationCounter] = useState(true);

    const michalForeground = useRef(null);
    const michalBackground = useRef(null);
    const bartekForeground = useRef(null);
    const bartekBackground = useRef(null);

    const nextPlayer = (mobile = false) => {
        /* Animation */
        if(!mobile || window.innerWidth < 768) {
            const images = document.querySelector(".aboutUs__images");
            const captionWrapper = document.querySelector(".aboutUs__captionWrapper");
            const subheader = document.querySelector(".aboutUs__subheader");
            const description = document.querySelector(".aboutUs__desc");

            images.style.opacity = "0";
            captionWrapper.style.opacity = "0";
            subheader.style.opacity = "0";
            description.style.opacity = "0";

            setTimeout(() => {
                captionWrapper.style.transform = 'translateX(-100px)';
                subheader.style.transform = 'translateX(-100px)';
                description.style.transform = 'translateX(-100px)';
            }, 200);

            setAnimationCounter(prevState => {
                return !prevState;
            });
            setTimeout(() => {
                /* Content */
                let tmp;
                tmp = foregroundPlayer;
                setForegroundPlayer(backgroundPlayer);
                setBackgroundPlayer(tmp);
                setTimeout(() => {
                    if(animationCounter) {
                        michalForeground.current.style.display = 'none';
                        michalForeground.current.style.marginTop = '0';
                        bartekBackground.current.style.display = 'none';
                        michalBackground.current.style.display = 'block';
                        bartekForeground.current.style.display = 'block';
                    }
                    else {
                        michalForeground.current.style.display = 'block';
                        michalForeground.current.style.marginTop = '20px';
                        bartekBackground.current.style.display = 'block';
                        michalBackground.current.style.display = 'none';
                        bartekForeground.current.style.display = 'none';
                    }

                    captionWrapper.style.transform = 'none';
                    subheader.style.transform = 'none';
                    description.style.transform = 'none';

                    images.style.opacity = "1";
                    captionWrapper.style.opacity = "1";
                    subheader.style.opacity = "1";
                    description.style.opacity = "1";
                }, 50);
            }, 500);
        }
    }

    return <div className="container container--light">
        <Header menu="dark" />
        <section className="aboutUs">
            <main className="aboutUs__main">
                <h2 className="aboutUs__header aboutUs__header--mobile d-mobile">
                    {content.about_us_header}
                </h2>
                <section className="aboutUs__content"
                         onTouchStart={(e) => { handleTouchStart(e); }}
                         onTouchMove={(e) => { handleTouchMove(e); }}
                >
                    <h2 className="aboutUs__header d-desktop">
                        {content.about_us_header}
                    </h2>
                    <figure className="aboutUs__captionWrapper">
                        <img className="aboutUs__caption" src={foregroundPlayer.caption} alt="nazwisko-zawodnika" />
                    </figure>

                    <h3 className="aboutUs__subheader">
                        {foregroundPlayer.id === 1 ? <>
                            {foregroundPlayer.subheader} <span className="aboutUs__quote">{foregroundPlayer.quote}</span>
                        </> : <>
                            <span className="aboutUs__quote">{foregroundPlayer.quote}</span> {foregroundPlayer.subheader}
                        </>}
                    </h3>

                    <p className="aboutUs__desc">
                        {foregroundPlayer.desc}
                    </p>

                    <section className="aboutUs__buttons d-desktop">
                        <button className="aboutUs__btn aboutUs__btn--prev" onClick={() => { nextPlayer(); }}>
                            <img className="btn__img" src={rightArrow} alt="poprzedni" />
                        </button>
                        <button className="aboutUs__btn aboutUs__btn--next" onClick={() => { nextPlayer(); }}>
                            <img className="btn__img" src={rightArrow} alt="next" />
                        </button>
                    </section>
                </section>
                <section className="aboutUs__images">
                    <figure className="aboutUs__profileWrapper aboutUs__profileWrapper--foreground">
                        <img className="aboutUs__profileImg aboutUs__profileImg--michal" ref={michalForeground} src={michalImg} alt="michal-makowski" />
                        <img className="aboutUs__profileImg aboutUs__profileImg--bartek" ref={bartekForeground} src={bartekImg} alt="michal-makowski" />
                    </figure>
                    <figure className="aboutUs__profileWrapper aboutUs__profileWrapper--background">
                        <img className="aboutUs__profileImg aboutUs__profileImg--michal" ref={michalBackground} src={michalImg} alt="bartosz-cedzynski" />
                        <img className="aboutUs__profileImg aboutUs__profileImg--bartek" ref={bartekBackground} src={bartekImg} alt="bartosz-cedzynski" />
                    </figure>
                </section>
            </main>
        </section>
        <Footer theme="dark-light" />
    </div>
}

export default AboutUs;
