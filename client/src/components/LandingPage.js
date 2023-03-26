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
    const { content, language } = useContext(ContentContext);

    const [playersCounter, setPlayersCounter] = useState(10);
    const [clubCounter, setClubCounter] = useState(10);

    useEffect(() => {
        getAllClubs()
            .then((res) => {
                if(res?.data?.result) {
                    const allClubs = res.data.result.filter((item) => {
                        return item?.active && item?.file_path;
                    });
                    setClubCounter(allClubs.length);
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
                    {content.landing_header_1}
                </h1>
                <figure className="landingPage__flex__img d-mobile">
                    <img className="img" src={secondImage} alt="dolacz-do-nas" />
                </figure>
                <p className="text">
                    {content.landing_text_1}
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
                {content.landing_header_2}
            </h2>
            <p className="landingPage__benefits__text">
                {content.landing_text_2}
            </p>
            <div className="landingPage__benefits__flex">
                <div className="landingPage__benefits__flex__item">
                    <div className="landingPage__benefits__flex__item__content">
                        <h3 className="landingPage__benefits__flex__item__content__header">
                            {content.landing_benefit_header_1}
                        </h3>
                        <p className="landingPage__benefits__flex__item__content__text">
                            {content.landing_benefit_text_1}
                        </p>
                    </div>
                    <figure className="landingPage__benefits__flex__item__image">
                        <img className="img" src={img1} alt="img1" />
                    </figure>
                </div>
                <div className="landingPage__benefits__flex__item">
                    <div className="landingPage__benefits__flex__item__content">
                        <h3 className="landingPage__benefits__flex__item__content__header">
                            {content.landing_benefit_header_2}
                        </h3>
                        <p className="landingPage__benefits__flex__item__content__text">
                            {content.landing_benefit_text_2}
                        </p>
                    </div>
                    <figure className="landingPage__benefits__flex__item__image">
                        <img className="img" src={img3} alt="img1" />
                    </figure>
                </div>
                <div className="landingPage__benefits__flex__item">
                    <div className="landingPage__benefits__flex__item__content">
                        <h3 className="landingPage__benefits__flex__item__content__header">
                            {content.landing_benefit_header_3}
                        </h3>
                        <p className="landingPage__benefits__flex__item__content__text">
                            {content.landing_benefit_text_3}
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
                    {language === 'pl' ? 'Zawodników' : 'Players'}
                </h5>
            </div>
            <div className="landingPage__numbers__section">
                <h4 className="landingPage__numbers__section__number">
                    {clubCounter}
                </h4>
                <h5 className="landingPage__numbers__section__caption">
                    {language === 'pl' ? 'Klubów' : 'Clubs'}
                </h5>
            </div>
        </div>

        <ClubSlider />
    </main>
}

export default LandingPage;
