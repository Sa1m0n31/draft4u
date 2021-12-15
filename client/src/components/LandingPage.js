import React, {useRef} from 'react'
import ClubSlider from "./ClubSlider";
import trener from '../static/img/trener.png'
import zawodnicy from '../static/img/zawodnicy.png'
import belka from '../static/img/belka.png'
import boisko from '../static/img/boisko-hero.svg'
import pilka from '../static/img/tlo-zawodnikow.png'

const LandingPage = () => {
    const playerZone = useRef(null);
    const clubZone = useRef(null);

    const animationPlayer = () => {
        playerZone.current.style.transform = "scale(.95)";
    }

    const animationPlayerEnd = () => {
        playerZone.current.style.transform = "scale(.9)";
    }

    const animationCoach = () => {
        clubZone.current.style.transform = "scale(1.05)";
    }

    const animationCoachEnd = () => {
        clubZone.current.style.transform = "scale(1)";
    }

    return <main className="landingPage">
        <main className="landingPage__inner">

            <a className="landingPage__link landingPage__link--left"
               onMouseEnter={() => { animationPlayer(); }}
               onMouseLeave={() => { animationPlayerEnd(); }}
               href="/zawodnik"></a>
            <a className="landingPage__link landingPage__link--right"
               onMouseEnter={() => { animationCoach(); }}
               onMouseLeave={() => { animationCoachEnd(); }}
               href="/klub">
            </a>

            <img className="landingPage__img"
                 id="boisko"
                 src={boisko} alt="boisko" />
            <img className="landingPage__img"
                 id="pilka"
                 src={pilka} alt="boisko" />

            <img className="landingPage__img"
                 id="belka"
                 src={belka} alt="belka" />
            <img className="landingPage__img"
                 id="trener"
                 ref={clubZone}
                 src={trener} alt="trener" />
            <img className="landingPage__img"
                 id="zawodnicy"
                 ref={playerZone}
                 src={zawodnicy} alt="zawodnicy" />
        </main>

        <ClubSlider />
    </main>
}

export default LandingPage;
