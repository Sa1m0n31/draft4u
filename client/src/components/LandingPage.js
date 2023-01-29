import React, {useContext} from 'react'
import ClubSlider from "./ClubSlider";
import {ContentContext} from "../App";
import mainImage from '../static/img/landing-image.png';
import secondImage from '../static/img/homepage-mockup.png';
import img1 from '../static/img/korzysc1.png';
import img2 from '../static/img/korzysc2.png';
import img3 from '../static/img/korzysc3.png';

const LandingPage = () => {
    const { content } = useContext(ContentContext);

    return <main className="landingPage">
        <main className="landingPage__inner">
           <figure className="landingPage__image">
               <img className="img" src={mainImage} alt="draft4u" />
           </figure>
        </main>

        <div className="landingPage__flex">
            <div className="landingPage__flex__content">
                <h1 className="bigHeader bigHeader--slide1 whitespace">
                    Czym jest Draft4U?
                </h1>
                <figure className="landingPage__flex__img d-mobile">
                    <img className="img" src={secondImage} alt="dolacz-do-nas" />
                </figure>
                <p className="text">
                    {content.player_zone_text1}
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
                {content.player_zone_text2}
            </p>
            <div className="landingPage__benefits__flex">
                <div className="landingPage__benefits__flex__item">
                    <div className="landingPage__benefits__flex__item__content">
                        <h3 className="landingPage__benefits__flex__item__content__header">
                            korzyść
                        </h3>
                        <p className="landingPage__benefits__flex__item__content__text">
                            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore
                            et dolore magna aliquyam erat, sed diam voluptua.
                        </p>
                    </div>
                    <figure className="landingPage__benefits__flex__item__image">
                        <img className="img" src={img1} alt="img1" />
                    </figure>
                </div>
                <div className="landingPage__benefits__flex__item">
                    <div className="landingPage__benefits__flex__item__content">
                        <h3 className="landingPage__benefits__flex__item__content__header">
                            korzyść
                        </h3>
                        <p className="landingPage__benefits__flex__item__content__text">
                            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore
                            et dolore magna aliquyam erat, sed diam voluptua.
                        </p>
                    </div>
                    <figure className="landingPage__benefits__flex__item__image">
                        <img className="img" src={img3} alt="img1" />
                    </figure>
                </div>
                <div className="landingPage__benefits__flex__item">
                    <div className="landingPage__benefits__flex__item__content">
                        <h3 className="landingPage__benefits__flex__item__content__header">
                            korzyść
                        </h3>
                        <p className="landingPage__benefits__flex__item__content__text">
                            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore
                            et dolore magna aliquyam erat, sed diam voluptua.
                        </p>
                    </div>
                    <figure className="landingPage__benefits__flex__item__image">
                        <img className="img" src={img2} alt="img1" />
                    </figure>
                </div>
            </div>
        </div>

        <ClubSlider />
        {/*<Partners />*/}
    </main>
}

export default LandingPage;
