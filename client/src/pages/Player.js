import React from 'react'
import Header from "../components/Header";
import Footer from "../components/Footer";
import label from '../static/img/strefa-zawodnika-label.png'
import registerBtn from '../static/img/register-btn.png'
import buyNowBtn from '../static/img/buy-now.png'
import playerHeader from '../static/img/strefa-zawodnika-header.png'
import img1 from '../static/img/strefa-zawodnika-1.png'
import img2 from '../static/img/strefa-zawodnika-2.png'
import step1 from '../static/img/krok-1.svg'
import step2 from '../static/img/krok-2.svg'
import step3 from '../static/img/krok-3.svg'
import PlayerFAQ from "../components/PlayerFAQ";
import ClubSlider from "../components/ClubSlider";
import discountImg from '../static/img/discount.png'
import phone from '../static/img/ekran-glowny.png'

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
                <img className="player__label" src={label} alt="strefa-zawodnika" />
                <img className="player__firstImgWrapper__img" src={playerHeader} alt="draft4u" />
            </figure>

            <section className="player__section player__flex player__flex--section player__section--1">
                <figure className="player__flex__imgWrapper player__flex__imgWrapper--phone">
                    <img className="player__flex__img d-desktop" src={img1} alt="widok" />
                    <img className="player__flex__img d-mobile" src={phone} alt="widok" />
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
                        <img className="player__step__img" src={step2} alt="krok1" />
                        <h3 className="player__step__header">
                            Wpisz dane
                        </h3>
                    </section>
                    <section className="player__step">
                        <img className="player__step__img" src={step1} alt="krok2" />
                        <h3 className="player__step__header">
                            Wgraj wideo
                        </h3>
                    </section>
                    <section className="player__step">
                        <img className="player__step__img" src={step3} alt="krok3" />
                        <h3 className="player__step__header">
                            Wybierz warunki umowy
                        </h3>
                    </section>
                </section>

                <p className="player__flex__text player__flex__text--afterSteps">
                    To wszystko! Resztę pracy wykonują nasze algorytmy, które zaprezentują klubom listę zawodników dopasowanych do ich wymagań. Dzięki temu możesz być łatwiej dostrzeżony i szybciej znajdziesz nowy klub.
                </p>
            </section>

            <section className="player__section player__flex player__flex--section">
                <article className="player__flex__content player__flex__content--first14">
                    <h2 className="player__header">
                        Pierwsze 14 dni za darmo
                    </h2>
                    <p className="player__flex__text">
                        Dołącz już teraz - do grudnia możesz się zarejestrować za darmo. Dzięki temu wypróbujesz nasz serwis i zobaczysz jak to działa. Dołącz już teraz - do grudnia możesz się zarejestrować za darmo. Dzięki temu wypróbujesz nasz serwis i zobaczysz jak to działa.
                    </p>
                    {/*<button className="button button--hover button--player--register" onClick={() => { openRegisterModal(); }}>*/}
                    {/*    <img className="btn__img" src={registerBtn} alt="zarejestruj-sie" />*/}
                    {/*</button>*/}
                </article>
                <figure className="player__flex__imgWrapper tmpWrapper d-desktop">
                    <img className="btn__img" src={img2} alt="dolacz-za-darmo" />
                </figure>
            </section>

            <section className="player__section player__flex player__flex--section">
                <article className="player__flex__content player__flex__content--first14">
                    <h2 className="player__header">
                        Promocja na start
                    </h2>
                    <p className="player__flex__text">
                        Dołącz już teraz - do grudnia możesz się zarejestrować za darmo. Dzięki temu wypróbujesz nasz serwis i zobaczysz jak to działa. Dołącz już teraz - do grudnia możesz się zarejestrować za darmo. Dzięki temu wypróbujesz nasz serwis i zobaczysz jak to działa.
                    </p>
                </article>
                <div className="player__flex__imgWrapper tmpWrapper">
                    <section className="player__option">
                        <img className="player__option__discount" src={discountImg} alt="promocja" />
                        <h3 className="player__option__name">
                            Tylko
                        </h3>
                        <h4 className="player__option__price">
                            99
                            <span className="player__option__currency">
                                PLN
                            </span>
                        </h4>
                        <a className="button button--hover button--buyNow" href="/zaplac?pakiet=3">
                            <img className="btn__img" src={buyNowBtn} alt="kup-teraz" />
                        </a>
                    </section>
                </div>
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
