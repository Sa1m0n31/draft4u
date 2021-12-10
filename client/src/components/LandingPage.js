import React from 'react'
import ClubSlider from "./ClubSlider";
import strefaKlubowa from '../static/img/strefa-klubowa.png'
import strefaZawodnika from '../static/img/strefa-zawodnika.png'
import tloTrenera from '../static/img/tlo-trenera.png'
import tloZawodnikow from '../static/img/tlo-zawodnikow.png'
import trener from '../static/img/trener.png'
import zawodnicy from '../static/img/zawodnicy.png'
import zoltaRamka from '../static/img/zolta-ramka.png'
import tloStrefaZawodnika from '../static/img/tlo-strefy-zawodnika.png'

const LandingPage = () => {
    const animationLeft = () => {
        if(window.innerWidth > 786) {
            const container = document.querySelector(".container");
            container.classList.add('container--animation');
        }
    }

    const animationLeftEnd = () => {
        const container = document.querySelector(".container");
        container.classList.remove('container--animation');
        if(window.innerWidth > 786) {

        }
    }

    const animationRight = () => {
        if(window.innerWidth > 768) {
            const container = document.querySelector(".container");
            const overlay = document.querySelector('.homepage--overlay--right');
            container.classList.add('container--animationRight');
            overlay.classList.add('homepage--overlay--right--animation');
        }
    }

    const animationRightEnd = () => {
        const container = document.querySelector(".container");
        const overlay = document.querySelector('.homepage--overlay--right');
        container.classList.remove('container--animationRight');
        overlay.classList.remove('homepage--overlay--right--animation');
    }

    return <main className="landingPage">
        <main className="landingPage__inner">
            <img className="landingPage__img"
                 id="yellowLines"
                 src={zoltaRamka}
                 alt="ramka" />
            <a className="landingPage__left" href="#"
               onMouseLeave={() => { animationLeftEnd();} }
               onMouseEnter={() => { animationLeft(); }}>
                <img className="landingPage__img"
                     id="zawodnikTlo"
                     src={tloZawodnikow}
                     alt="tlo-zawodnikow" />
                <img className="landingPage__img"
                    id="zawodnik"
                    src={zawodnicy}
                    alt="strefa-zawotnika" />

                <img className="landingPage__img"
                    id="strefaZawodnikaTlo"
                    src={tloStrefaZawodnika}
                     alt="strefa-zawotnika" />
                <img className="landingPage__img"
                     id="strefaZawodnika"
                     src={strefaZawodnika}
                     alt="strefa-zawodnika" />
            </a>
            <a className="landingPage__right"
               onMouseEnter={() => { animationRight(); }}
               onMouseLeave={() => { animationRightEnd(); }}
               href="#">
                <img className="landingPage__img"
                     id="trenerTlo"
                     src={tloTrenera}
                     alt="tlo-trenera" />
                <img className="landingPage__img"
                     id="trener"
                     src={trener}
                     alt="strefa-klubu" />

                <div id="tloStrefaKlubowa"></div>
                <img className="landingPage__img"
                     id="strefaKlubowa"
                     src={strefaKlubowa}
                     alt="strefa-klubowa" />


                     <div className="homepage--overlay--right"></div>
            </a>
        </main>

        <ClubSlider />
    </main>
}

export default LandingPage;
