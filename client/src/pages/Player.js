import React from 'react'
import Header from "../components/Header";
import Footer from "../components/Footer";

import phone from '../static/img/telefon.png'
import registerBtn from '../static/img/register-btn.png'
import buyNowBtn from '../static/img/buy-now.png'
import tmpImg from '../static/img/placeholder.png'
import PlayerFAQ from "../components/PlayerFAQ";
import ClubSlider from "../components/ClubSlider";

const Player = () => {
    const openRegisterModal = () => {
        if(window.innerWidth > 768) {
            document.querySelector(".loginBoxWrapper").style.display = "none";
            document.querySelector(".registerModal").style.display = "block";
        }
        else {
            window.location = "/zaloz-konto";
        }
    }

    return <div className="container container--light container--player">
        <Header menu="dark" />
        <main className="player">
            <figure className="player__firstImgWrapper">
                <img className="player__firstImgWrapper__img" src={tmpImg} alt="draft4u" />
            </figure>

            <section className="player__section player__flex player__flex--section player__section--1">
                <figure className="player__flex__imgWrapper">
                    <img className="player__flex__img" src={phone} alt="widok" />
                </figure>

                <article className="player__flex__content">
                    <h2 className="player__header">
                        Ułatwiamy kontakt
                    </h2>
                    <p className="player__flex__text">
                        Szukasz nowego klubu, ale brakuje Ci czasu lub nie chcesz współpracować z menedżerami? Nasz unikalny na polskim rynku serwis powstał po to, aby ułatwić kontakt klubów z zawodnikami. Wystarczy tylko kilka chwil: przygotuj swój profil na naszej stronie i gotowe! Od teraz przedstawiciele klubów, z którymi współpracujemy, mogą kontaktować się z Tobą szybko i bez pośredników.
                    </p>
                </article>
            </section>

            <section className="player__section">
                <h2 className="player__header">
                    Trzy proste kroki
                </h2>
                <p className="player__flex__text">
                    Od kolejnego etapu Twojej kariery dzielą Cię tylko trzy proste kroki:
                </p>

                <section className="player__flex player__flex--margin">
                    <section className="player__step">
                        <figure className="player__step__imgWrapper">

                        </figure>
                        <h3 className="player__step__header">
                            Wpisz dane
                        </h3>
                    </section>
                    <section className="player__step">
                        <figure className="player__step__imgWrapper">

                        </figure>
                        <h3 className="player__step__header">
                            Wgraj wideo
                        </h3>
                    </section>
                    <section className="player__step">
                        <figure className="player__step__imgWrapper">

                        </figure>
                        <h3 className="player__step__header">
                            Wybierz warunki umowy
                        </h3>
                    </section>
                </section>
            </section>

            <section className="player__section player__flex player__flex--section">
                <article className="player__flex__content player__flex__content--first14">
                    <h2 className="player__header">
                        Pierwsze 14 dni za darmo
                    </h2>
                    <p className="player__flex__text">
                        Dołącz już teraz - do grudnia możesz się zarejestrować za darmo. Dzięki temu wypróbujesz nasz serwis i zobaczysz jak to działa. Dołącz już teraz - do grudnia możesz się zarejestrować za darmo. Dzięki temu wypróbujesz nasz serwis i zobaczysz jak to działa.
                    </p>
                    <button className="button button--hover button--player--register" onClick={() => { openRegisterModal(); }}>
                        <img className="btn__img" src={registerBtn} alt="zarejestruj-sie" />
                    </button>
                </article>
                <figure className="player__flex__imgWrapper tmpWrapper d-desktop">

                </figure>
            </section>

            <section className="player__section">
                <h2 className="player__header">
                    Pakiety
                </h2>
                <section className="player__flex player__flex--options player__flex--margin">
                    <section className="player__option">
                        <h3 className="player__option__name">
                            Miesięczny
                        </h3>
                        <h4 className="player__option__price">
                            199
                            <span className="player__option__currency">
                                PLN
                            </span>
                        </h4>
                        <button className="button button--hover button--buyNow" onClick={() => { openRegisterModal(); }}>
                            <img className="btn__img" src={buyNowBtn} alt="kup-teraz" />
                        </button>
                    </section>
                    <section className="player__option">
                        <h3 className="player__option__name">
                            3-miesięczny
                        </h3>
                        <h4 className="player__option__price">
                            399
                            <span className="player__option__currency">
                                PLN
                            </span>
                        </h4>
                        <button className="button button--hover button--buyNow" onClick={() => { openRegisterModal(); }}>
                            <img className="btn__img" src={buyNowBtn} alt="kup-teraz" />
                        </button>
                    </section>
                    <section className="player__option">
                        <h3 className="player__option__name">
                            Roczny
                        </h3>
                        <h4 className="player__option__price">
                            999
                            <span className="player__option__currency">
                                PLN
                            </span>
                        </h4>
                        <button className="button button--hover button--buyNow" onClick={() => { openRegisterModal(); }}>
                            <img className="btn__img" src={buyNowBtn} alt="kup-teraz" />
                        </button>
                    </section>
                </section>
            </section>

            <section className="player__section player__section--faq">
                <h2 className="player__header">
                    FAQ
                </h2>
                <PlayerFAQ />
            </section>
        </main>
        <ClubSlider />
        <Footer theme="dark" />
    </div>
}

export default Player;
