import React, {useContext, useEffect, useState} from 'react'
import ClubSlider from "./ClubSlider";
import {ContentContext} from "../App";
import mainImage from '../static/img/landing-image.png';
import secondImage from '../static/img/mockup.png';
import img1 from '../static/img/korzysc1.png';
import img2 from '../static/img/korzysc2.png';
import img3 from '../static/img/box-siergiej.png';
import {getAllClubs, getAllPlayers} from "../helpers/club";

const LandingPage = () => {
    const { content } = useContext(ContentContext);

    const [playersCounter, setPlayersCounter] = useState(10);
    const [clubCounter, setClubCounter] = useState(10);

    useEffect(() => {
        getAllClubs()
            .then((res) => {
                if(res?.data?.result) {
                    setClubCounter(res.data.result.length);
                }
            });

        getAllPlayers()
            .then((res) => {
                if(res?.data?.result) {
                    setPlayersCounter(res.data.result.length);
                }
            });
    }, []);

    return <main className="landingPage">
        <main className="landingPage__inner">
           <figure className="landingPage__image">
               <img className="img" src={mainImage} alt="draft4u" />
           </figure>
        </main>

        <div className="landingPage__flex">
            <div className="landingPage__flex__content">
                <h1 className="bigHeader bigHeader--slide1 whitespace">
                    Poznaj Draft4U
                </h1>
                <figure className="landingPage__flex__img d-mobile">
                    <img className="img" src={secondImage} alt="dolacz-do-nas" />
                </figure>
                <p className="text">
                    Szukasz dla siebie nowego klubu? Jesteś młody, ambitny i chcesz mieć wpływ na swój rozwój bez pośrednictwa managerów? Draft4U to miejsce dla ciebie! Załóż konto, uzupełnij profil i kontaktuj się z klubami. Dołącz do nas i sam wykreuj swoją sportową przyszłość.
                </p>
                <a href="/zaloz-konto" className="button button--landingFlex btn--gradient goldman center">
                    {content.register}
                </a>
            </div>
            <figure className="landingPage__flex__img d-desktop">
                <img className="img" src={secondImage} alt="dolacz-do-nas" />
            </figure>
        </div>

        <div className="landingPage__benefits">
            <h2 className="landingPage__benefits__header goldman">
                Korzyści
            </h2>
            <p className="landingPage__benefits__text">
                Szukasz dla siebie nowego klubu? Jesteś młody, ambitny i chcesz mieć wpływ na swój rozwój bez pośrednictwa managerów? Draft4U to miejsce dla ciebie! Załóż konto, uzupełnij profil i kontaktuj się z klubami. Dołącz do nas i sam wykreuj swoją sportową przyszłość.
            </p>
            <div className="landingPage__benefits__flex">
                <div className="landingPage__benefits__flex__item">
                    <div className="landingPage__benefits__flex__item__content">
                        <h3 className="landingPage__benefits__flex__item__content__header">
                            Pokaż się z najlepszej strony
                        </h3>
                        <p className="landingPage__benefits__flex__item__content__text">
                            Zaprezentuj najlepsze zagrania klubom w całej Polsce. Bądź z nimi w stałym kontakcie, wysyłaj swoje CV i zgłaszaj się na testy.
                        </p>
                    </div>
                    <figure className="landingPage__benefits__flex__item__image">
                        <img className="img" src={img1} alt="img1" />
                    </figure>
                </div>
                <div className="landingPage__benefits__flex__item">
                    <div className="landingPage__benefits__flex__item__content">
                        <h3 className="landingPage__benefits__flex__item__content__header">
                            Korzystaj bezpłatnie
                        </h3>
                        <p className="landingPage__benefits__flex__item__content__text">
                            Nie płać prowizji managerowi, załóż bezpłatne konto w okresie promocyjnym i czerp korzyści z obecności w sportowym świecie bez ograniczeń.
                        </p>
                    </div>
                    <figure className="landingPage__benefits__flex__item__image">
                        <img className="img" src={img3} alt="img1" />
                    </figure>
                </div>
                <div className="landingPage__benefits__flex__item">
                    <div className="landingPage__benefits__flex__item__content">
                        <h3 className="landingPage__benefits__flex__item__content__header">
                            Trzymaj rękę na pulsie
                        </h3>
                        <p className="landingPage__benefits__flex__item__content__text">
                            Sprawdzaj, które kluby oglądały twój profil, śledź klubowe wydarzenia, czatuj, publikuj i wymieniaj się siatkarskimi newsami na swojej tablicy.
                        </p>
                    </div>
                    <figure className="landingPage__benefits__flex__item__image">
                        <img className="img" src={img2} alt="img1" />
                    </figure>
                </div>
            </div>
        </div>

        <div className="landingPage__numbers">
            <div className="landingPage__numbers__section">
                <h4 className="landingPage__numbers__section__number">
                    {playersCounter}
                </h4>
                <h5 className="landingPage__numbers__section__caption">
                    Zawodników
                </h5>
            </div>
            <div className="landingPage__numbers__section">
                <h4 className="landingPage__numbers__section__number">
                    {clubCounter}
                </h4>
                <h5 className="landingPage__numbers__section__caption">
                    Klubów
                </h5>
            </div>
        </div>

        <ClubSlider />
        {/*<Partners />*/}
    </main>
}

export default LandingPage;
