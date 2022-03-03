import React, {useContext, useEffect} from 'react'
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

const Stuff = () => {
    const openRegisterModal = () => {
        if(window.innerWidth > 768) {
            document.querySelector(".loginBoxWrapper").style.display = "none";
            document.querySelector(".registerModal").style.display = "block";
        }
        else {
            window.location = "/zaloz-konto";
        }
    }

    const { content } = useContext(ContentContext);

    return <div className="container container--light container--player">
        <Header menu="dark" />
        <main className="player">
            <figure className="player__firstImgWrapper">
                <img className="player__firstImgWrapper__img" src={getImageUrl(content.img33)} alt="draft4u" />
            </figure>

            <section className="player__section player__flex player__flex--section player__section--1">
                <figure className="player__flex__imgWrapper player__flex__imgWrapper--phone">
                    <img className="player__flex__img d-desktop" src={img1} alt="widok" />
                    <img className="player__flex__img d-mobile" src={phone} alt="widok" />
                </figure>

                <article className="player__flex__content">
                    <h2 className="player__header">
                        {content.stuff_zone_header1}
                    </h2>
                    <p className="player__flex__text">
                        {content.stuff_zone_text1}
                    </p>
                </article>
            </section>
            <section className="player__section player__flex player__flex--section player__section--1 player__flex--section--chat">
                <article className="player__flex__content player__flex__content--chat">
                    <h2 className="player__header">
                        {content.stuff_zone_header3}
                    </h2>
                    <p className="player__flex__text">
                        {content.stuff_zone_text3}
                    </p>
                </article>

                <figure className="player__flex__imgWrapper player__flex__imgWrapper--chat">
                    <img className="player__flex__img" src={img3} alt="widok" />
                </figure>
            </section>

            <section className="player__section">
                <h2 className="player__header">
                    {content.stuff_zone_header2}
                </h2>

                <section className="player__flex player__flex--margin">
                    <section className="player__step">
                        <img className="player__step__img" src={step2} alt="krok1" />
                        <h3 className="player__step__header">
                            {content.stuff_zone_circle1}
                        </h3>
                    </section>
                    <section className="player__step">
                        <img className="player__step__img" src={step1} alt="krok2" />
                        <h3 className="player__step__header">
                            {content.stuff_zone_circle2}
                        </h3>
                    </section>
                    <section className="player__step">
                        <img className="player__step__img" src={step3} alt="krok3" />
                        <h3 className="player__step__header">
                            {content.stuff_zone_circle3}
                        </h3>
                    </section>
                </section>

                <p className="player__flex__text player__flex__text--afterSteps">
                    {content.stuff_zone_text2}
                </p>
            </section>

            <section className="player__section player__flex player__flex--section">
                <article className="player__flex__content player__flex__content--first14">
                    <h2 className="player__header">
                        {content.stuff_zone_header4}
                    </h2>
                    <p className="player__flex__text">
                        {content.stuff_zone_text4}
                    </p>
                    <button className="button button--hover button--player--register" onClick={() => { openRegisterModal(); }}>
                        <img className="btn__img" src={getImageUrl(content.img8)} alt="zarejestruj-sie" />
                    </button>
                </article>
                <figure className="player__flex__imgWrapper tmpWrapper d-desktop">
                    <img className="btn__img" src={img2} alt="dolacz-za-darmo" />
                </figure>
            </section>

            <section className="player__section player__flex player__flex--section">
                <article className="player__flex__content player__flex__content--first14">
                    <h2 className="player__header">
                        {content.player_zone_header5}
                    </h2>
                    <p className="player__flex__text">
                        {content.player_zone_text6}
                    </p>
                </article>
                <div className="player__flex__imgWrapper tmpWrapper">
                    <section className="player__option">
                        <img className="player__option__discount" src={discountImg} alt="promocja" />
                        <h3 className="player__option__name">
                            {content.player_zone_buy_frame1}
                        </h3>
                        <h4 className="player__option__price">
                            99
                            <span className="player__option__currency">
                                PLN
                            </span>
                        </h4>
                        <button className="button button--hover button--buyNow" onClick={() => { openRegisterModal(); }}>
                            <img className="btn__img" src={getImageUrl(content.img9)} alt="kup-teraz" />
                        </button>
                        <span className="player__option--bottom">
                            {content.player_zone_buy_frame2}
                        </span>
                    </section>
                </div>
            </section>

            <section className="player__section player__section--faq">
                <h2 className="player__header">
                    {content.player_zone_header6}
                </h2>
                <PlayerFAQ />
            </section>
        </main>
        <ClubSlider />
        <Footer theme="light" border={true} />
    </div>
}

export default Stuff;
