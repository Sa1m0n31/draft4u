import React from 'react'
import Header from "../components/Header";
import Footer from "../components/Footer";
import tmpImg from "../static/img/tmpheader.png";
import phone from "../static/img/telefon.png";
import ctaBtn from '../static/img/btn-cta.png'

const Club = () => {
    return <div className="container container--dark container--club">
        <Header theme="dark" menu="light" clubPage={true} />
        <main className="club">
            <figure className="player__firstImgWrapper">
                <img className="player__firstImgWrapper__img" src={tmpImg} alt="draft4u" />
            </figure>

            <section className="player__section player__flex player__flex--section player__section--1 club__section">
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
                    <button className="button button--hover button--club">
                        <img className="btn__img" src={ctaBtn} alt="cta" />
                    </button>
                </article>
            </section>

            <section className="player__section player__flex player__flex--section player__section--1 club__section">
                <article className="player__flex__content">
                    <h2 className="player__header">
                        Porównanie profili
                    </h2>
                    <p className="player__flex__text">
                        Szukasz nowego klubu, ale brakuje Ci czasu lub nie chcesz współpracować z menedżerami? Nasz unikalny na polskim rynku serwis powstał po to, aby ułatwić kontakt klubów z zawodnikami. Wystarczy tylko kilka chwil: przygotuj swój profil na naszej stronie i gotowe! Od teraz przedstawiciele klubów, z którymi współpracujemy, mogą kontaktować się z Tobą szybko i bez pośredników.
                    </p>
                    <button className="button button--hover button--club">
                        <img className="btn__img" src={ctaBtn} alt="cta" />
                    </button>
                </article>

                <figure className="player__flex__imgWrapper">
                    <img className="player__flex__img" src={phone} alt="widok" />
                </figure>
            </section>

            <section className="player__section player__flex player__flex--section player__section--1 club__section">
                <figure className="player__flex__imgWrapper">
                    <img className="player__flex__img" src={phone} alt="widok" />
                </figure>

                <article className="player__flex__content">
                    <h2 className="player__header">
                        Niezbędne informacje
                    </h2>
                    <p className="player__flex__text">
                        Szukasz nowego klubu, ale brakuje Ci czasu lub nie chcesz współpracować z menedżerami? Nasz unikalny na polskim rynku serwis powstał po to, aby ułatwić kontakt klubów z zawodnikami. Wystarczy tylko kilka chwil: przygotuj swój profil na naszej stronie i gotowe! Od teraz przedstawiciele klubów, z którymi współpracujemy, mogą kontaktować się z Tobą szybko i bez pośredników.
                    </p>
                    <button className="button button--hover button--club">
                        <img className="btn__img" src={ctaBtn} alt="cta" />
                    </button>
                </article>
            </section>
        </main>
        <Footer theme="dark" border={true} />
    </div>
}

export default Club;
