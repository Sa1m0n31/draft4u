import React, { useState, useEffect, useRef } from 'react'
import Header from "../components/Header";
import Footer from "../components/Footer";
import rightArrow from '../static/img/right-arrow.svg'
import michalCaption from '../static/img/michal-napis.svg'
import michalImg from '../static/img/michal.png'
import bartekCaption from '../static/img/bartek-napis.png'
import bartekImg from '../static/img/bartek.png'

const AboutUs = () => {
    let xDown = null;
    let yDown = null;

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

    const player1 = {
        id: 1,
        caption: michalCaption,
        img: michalImg,
        subheader: "W życiu kieruję się mottem:",
        quote: `„Najpierw naucz się zasad gry, a potem graj lepiej, niż wszyscy inni”`,
        desc: "Od 12 lat profesjonalnie gram w siatkówkę. Zaczynałem swoją przygodę na plaży - reprezentowałem Polskę na arenie krajowej i międzynarodowej. Obecnie gram na parkietach ligowych - doskonale wiem jak wygląda praca zawodnika od podszewki."
    }

    const player2 = {
        id: 2,
        caption: bartekCaption,
        img: bartekImg,
        subheader: "- trzy słowa, które określają mnie jako zawodnika.",
        quote: `„Wiara, ambicja, walka”`,
        desc: "Pierwsze siatkarskie kroki stawiałem 15 lat temu - w małym łódzkim klubie. Swój zapal oraz chęć ciągłego doskonalenia się zawdzięczam siatkówce. To ona ukształtowała mój charakter oraz to jakim człowiekiem jestem. Siatkówka to moja pasja - realizuję się zawodowo i robię w życiu to, co kocham."
    }

    const [foregroundPlayer, setForegroundPlayer] = useState(player1);
    const [backgroundPlayer, setBackgroundPlayer] = useState(player2);
    const [animationCounter, setAnimationCounter] = useState(true);

    const michalForeground = useRef(null);
    const michalBackground = useRef(null);
    const bartekForeground = useRef(null);
    const bartekBackground = useRef(null);

    const nextPlayer = (mobile = false) => {
        /* Animation */
        if(!mobile || window.innerWidth < 768) {
            document.querySelector(".aboutUs__images").style.opacity = "0";
            document.querySelector(".aboutUs__captionWrapper").style.opacity = "0";
            document.querySelector(".aboutUs__subheader").style.opacity = "0";
            document.querySelector(".aboutUs__desc").style.opacity = "0";

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

                    document.querySelector(".aboutUs__images").style.opacity = "1";
                    document.querySelector(".aboutUs__captionWrapper").style.opacity = "1";
                    document.querySelector(".aboutUs__subheader").style.opacity = "1";
                    document.querySelector(".aboutUs__desc").style.opacity = "1";
                }, 50);
            }, 500);
        }
    }

    return <div className="container container--light">
        <Header menu="dark" />
        <section className="aboutUs">
            <main className="aboutUs__main">
                <h2 className="aboutUs__header aboutUs__header--mobile d-mobile">
                    Kto stoi za projektem
                </h2>
                <section className="aboutUs__content"
                         onTouchStart={(e) => { handleTouchStart(e); }}
                         onTouchMove={(e) => { handleTouchMove(e); }}
                >
                    <h2 className="aboutUs__header d-desktop">
                        Kto stoi za projektem
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
