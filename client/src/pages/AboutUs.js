import React, { useState, useEffect, useRef } from 'react'
import Header from "../components/Header";
import Footer from "../components/Footer";
import rightArrow from '../static/img/right-arrow.svg'
import michalCaption from '../static/img/michal-napis.png'
import michalImg from '../static/img/michal-zdjecie.png'
import bartekCaption from '../static/img/bartek-napis.png'
import bartekImg from '../static/img/bartek-zdjecie.png'

const AboutUs = () => {
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
        desc: "Od 12 lat profesjonalnie gram w siatkówkę. Zaczynałem swoją przygodę na plaży - reprezentowałem Polskę na arenie krajowej i międzynarodowej. Obecnie gram na parkietach ligowych - doskonale wiem jak wygląda praca zawodnika od podszewki."
    }

    const [foregroundPlayer, setForegroundPlayer] = useState(player1);
    const [backgroundPlayer, setBackgroundPlayer] = useState(player2);

    const nextPlayer = () => {
        /* Animation */

        /* Content */
        let tmp;
        tmp = foregroundPlayer;
        setForegroundPlayer(backgroundPlayer);
        setBackgroundPlayer(tmp);
    }

    return <div className="container container--light">
        <Header menu="dark" />
        <section className="aboutUs">
            <main className="aboutUs__main">
                <h2 className="aboutUs__header aboutUs__header--mobile d-mobile">
                    Kto stoi za projektem
                </h2>
                <section className="aboutUs__content">
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
                        <img className="aboutUs__profileImg" src={foregroundPlayer.img} alt="michal-makowski" />
                    </figure>
                    <figure className="aboutUs__profileWrapper aboutUs__profileWrapper--background">
                        <img className="aboutUs__profileImg" src={backgroundPlayer.img} alt="bartosz-czyzewski" />
                    </figure>
                </section>
            </main>
        </section>
        <Footer theme="dark-light" />
    </div>
}

export default AboutUs;
