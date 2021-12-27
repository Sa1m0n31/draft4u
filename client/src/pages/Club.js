import React from 'react'
import Header from "../components/Header";
import Footer from "../components/Footer";
import header from '../static/img/strefa-klubowa-header.png'
import img1 from '../static/img/strefa-zawodnika-1.png'
import img2 from '../static/img/strefa-klubowa-2.png'
import img3 from '../static/img/strefa-zawodnika-2.png'
import img4 from '../static/img/klub-porownywarka.png'
import PlayerFAQ from "../components/PlayerFAQ";
import ClubForm from "../components/ClubForm";

const Club = () => {
    return <div className="container container--dark container--club">
        <Header theme="dark" menu="light" clubPage={true} />
        <main className="club">
            <figure className="player__firstImgWrapper">
                <img className="player__firstImgWrapper__img" src={header} alt="draft4u" />
            </figure>

            <section className="player__section player__flex player__flex--section player__section--1 club__section">
                <figure className="player__flex__imgWrapper player__flex__imgWrapper--phone">
                    <img className="player__flex__img" src={img1} alt="widok" />
                </figure>

                <article className="player__flex__content">
                    <h2 className="player__header">
                        Ułatwiamy kontakt
                    </h2>
                    <p className="player__flex__text">
                        Szukasz nowego zawodnika? Jesteśmy unikalnym serwisem na polskim rynku, który wspiera kluby w nawiązywaniu kontaktu z zawodnikami. Szeroka lista profili pomaga zaoszczędzić czas i środki, które trzeba poświęcić na znalezienie nowego sportowca. Na naszej stronie znajdziesz zarówno początkujących graczy jak i doświadczonych zawodników. W każdej chwili możesz skontaktować się ze sportowcem, którym jesteś zainteresowany - bez wyjazdów i bez pośredników.
                    </p>
                </article>
            </section>

            <section className="player__section player__flex player__flex--section player__section--1 club__section">
                <article className="player__flex__content">
                    <h2 className="player__header">
                        Porównanie profili
                    </h2>
                    <p className="player__flex__text player__flex__text--marginRight">
                        Każdy zawodnik przedstawia w swoim profilu statystyki - nie tylko swój wiek lub doświadczenie, ale również zasięg ataku, wzrost i inne cechy. Dzięki wykorzystaniu odpowiednich filtrów możesz szybko zawęzić pulę kandydatów. Na dodatek za pomocą kilku kliknięć możesz porównać wybranych kandydatów i określić, który najlepiej pasuje do Twojego klubu, a także dodać profil wybranego zawodnika do ulubionych.
                    </p>
                </article>

                <figure className="player__flex__imgWrapper">
                    <img className="player__flex__img player__flex__imgWrapper--clubImg2" src={img4} alt="widok" />
                </figure>
            </section>

            <section className="player__section player__flex player__flex--section player__section--1 club__section">
                <figure className="player__flex__imgWrapper">
                    <img className="player__flex__img player__flex__imgWrapper--clubImg3" src={img3} alt="widok" />
                </figure>

                <article className="player__flex__content">
                    <h2 className="player__header">
                        Niezbędne informacje
                    </h2>
                    <p className="player__flex__text">
                        Na profilu zawodników znajdziesz filmiki przygotowane przez sportowców, które pokazują ich najlepsze zagrania. Jeszcze przed kontaktem możesz ocenić ich technikę oraz jakość. Zawodnicy przedstawiają także warunki umowy, co jest niezbędnym aspektem podczas negocjacji kontraktu.
                    </p>
                </article>
            </section>

            <section className="player__section player__flex player__flex--section player__section--1 club__section">
                <article className="player__flex__content">
                    <h2 className="player__header">
                        Stwórz swoją drużynę
                    </h2>
                    <p className="player__flex__text">
                        Zobacz jak wybrany kandydat prezentuje się w Twoim składzie! Stwórz swoją drużynę – dodaj zawodników i zobacz jak będzie wyglądać Twój zespół z nowym graczem. Możesz stworzyć nieograniczoną liczbę składów, a także w łatwy sposób zmieniać zawodników na poszczególnych pozycjach. W prawym górnym rogu zobaczysz szacowany koszt drużyny. Każdy wariant możesz zapisać osobno, aż znajdziesz najlepsze rozwiązanie.
                    </p>
                </article>

                <figure className="player__flex__imgWrapper">
                    <img className="player__flex__img player__flex__imgWrapper--clubImg2" src={img2} alt="widok" />
                </figure>
            </section>

            <ClubForm />

            <PlayerFAQ />
        </main>
        <Footer theme="dark" border={true} />
    </div>
}

export default Club;
