import React, {useEffect, useRef, useState} from 'react'
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
    const playerZoneCaption = useRef(null);
    const clubZoneCaption = useRef(null);

    useEffect(() => {
    }, []);

    const animationLeft = () => {
        if(window.innerWidth > 786) {
            playerZoneCaption.current.style.left = "15%";
            playerZoneCaption.current.style.bottom = "-3%";
        }
    }

    const animationLeftEnd = () => {
        playerZoneCaption.current.style.left = "26%";
        playerZoneCaption.current.style.bottom = "-1%";
    }

    const animationRight = () => {
        if(window.innerWidth > 768) {
           clubZoneCaption.current.style.left = '25%';
           clubZoneCaption.current.style.bottom = '14%';
        }
    }

    const animationRightEnd = () => {
        clubZoneCaption.current.style.left = '15%';
        clubZoneCaption.current.style.bottom = '12%';
    }

    return <main className="landingPage">
        <main className="landingPage__inner">
            <div className="landingPage__img landingPage__img--bottom" id="yellowLines">
                <div className="landingPage__img--left"
                     onMouseLeave={() => { animationLeftEnd();} }
                     onMouseEnter={() => { animationLeft(); }}>
                ></div>
                <div className="landingPage__img--right"
                     onMouseEnter={() => { animationRight(); }}
                     onMouseLeave={() => { animationRightEnd(); }}
                ></div>
                <img className="btn__img"
                     src={zoltaRamka}
                     alt="ramka" />
            </div>
            <a className="landingPage__left" href="/zawodnik"
               onMouseLeave={() => { animationLeftEnd();} }
               onMouseEnter={() => { animationLeft(); }}>
                <div className="landingPage__block"
                     onMouseLeave={() => { animationLeftEnd();} }
                     onMouseEnter={() => { animationLeft(); }}></div>
                <img className="landingPage__img"
                     id="zawodnikTlo"
                     onMouseLeave={() => { animationLeftEnd();} }
                     onMouseEnter={() => { animationLeft(); }}
                     src={tloZawodnikow}
                     alt="tlo-zawodnikow" />
                <img className="landingPage__img"
                    id="zawodnik"
                     onMouseLeave={() => { animationLeftEnd();} }
                     onMouseEnter={() => { animationLeft(); }}
                    src={zawodnicy}
                    alt="strefa-zawotnika" />

                <img className="landingPage__img"
                    id="strefaZawodnikaTlo"
                    src={tloStrefaZawodnika}
                     alt="strefa-zawotnika" />
                <img className="landingPage__img"
                     ref={playerZoneCaption}
                     id="strefaZawodnika"
                     src={strefaZawodnika}
                     alt="strefa-zawodnika" />
            </a>
            <a className="landingPage__right"
               onMouseEnter={() => { animationRight(); }}
               onMouseLeave={() => { animationRightEnd(); }}
               href="/klub">
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
                     ref={clubZoneCaption}
                     src={strefaKlubowa}
                     alt="strefa-klubowa" />


                     <div className="homepage--overlay--right"></div>
            </a>
        </main>

        <ClubSlider />
    </main>
}

export default LandingPage;
