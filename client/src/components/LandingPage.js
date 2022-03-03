import React, {useContext, useRef} from 'react'
import ClubSlider from "./ClubSlider";
import person1 from '../static/img/sztab-postac.png'
import person2 from '../static/img/zawodnik-postac.png'
import person3 from '../static/img/klub-postac.png'
import {ContentContext} from "../App";
import {getImageUrl} from "../helpers/others";

const LandingPage = ({registerFromThirdParty}) => {
    const playerZone = useRef(null);
    const clubZone = useRef(null);

    const { content } = useContext(ContentContext);

    const animationPlayer = () => {
        playerZone.current.style.transform = "scale(.95)";
        document.querySelector('.container--homepage').classList.remove('container--homepage--animation--coach');
        document.querySelector('.container--homepage').classList.add('container--homepage--animation');
    }

    const animationPlayerEnd = () => {
        playerZone.current.style.transform = "scale(.9)";
        document.querySelector('.container--homepage').classList.remove('container--homepage--animation');
    }

    const animationCoach = () => {
        clubZone.current.style.transform = "scale(1.05)";
        document.querySelector('.container--homepage').classList.remove('container--homepage--animation');
        document.querySelector('.container--homepage').classList.add('container--homepage--animation--coach');
    }

    const animationCoachEnd = () => {
        clubZone.current.style.transform = "scale(1)";
        document.querySelector('.container--homepage').classList.remove('container--homepage--animation--coach');
    }

    return <main className="landingPage">
        <main className="landingPage__inner">
            <a className="landingPage__inner__section" href="/sztab">
                <img className="landingPage__person" src={person1} alt="strefa-asystenta" />
                <img className="landingPage__personCaption" src={getImageUrl(content.img30)} alt="strefa-asystenta" />
            </a>
            <a className="landingPage__inner__section" href="/zawodnik">
                <img className="landingPage__person" src={person2} alt="strefa-asystenta" />
                <img className="landingPage__personCaption" src={getImageUrl(content.img31)} alt="strefa-asystenta" />
            </a>
            <a className="landingPage__inner__section" href="/klub">
                <img className="landingPage__person" src={person3} alt="strefa-asystenta" />
                <img className="landingPage__personCaption" src={getImageUrl(content.img32)} alt="strefa-asystenta" />
            </a>
        </main>

        <ClubSlider />
    </main>
}

export default LandingPage;
