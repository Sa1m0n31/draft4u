import React, {useContext} from 'react'
import ClubSlider from "./ClubSlider";
import {ContentContext} from "../App";
import mainImage from '../static/img/landing-image.png';
import img1 from '../static/img/sklad.png';
import img2 from '../static/img/landing-img2.png';
import img3 from '../static/img/dolacz-do-nas.png';

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
                    {content.player_zone_header1}
                </h1>
                <p className="text">
                    {content.player_zone_text1}
                </p>
                <a href="/zaloz-konto" className="button button--landingFlex">
                    {content.register}
                </a>
            </div>
            <figure className="landingPage__flex__img">
                <img className="img" src={mainImage} alt="dolacz-do-nas" />
            </figure>
        </div>

        <div className="landingPage__benefits">
            <h2 className="landingPage__benefits__header">
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
                            et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
                            Stet clita kasd gubergren, no sea takimata
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
                            et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
                            Stet clita kasd gubergren, no sea takimata
                        </p>
                    </div>
                    <figure className="landingPage__benefits__flex__item__image">
                        <img className="img" src={img2} alt="img1" />
                    </figure>
                </div>
                <div className="landingPage__benefits__flex__item">
                    <div className="landingPage__benefits__flex__item__content">
                        <h3 className="landingPage__benefits__flex__item__content__header">
                            korzyść
                        </h3>
                        <p className="landingPage__benefits__flex__item__content__text">
                            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore
                            et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
                            Stet clita kasd gubergren, no sea takimata
                        </p>
                    </div>
                    <figure className="landingPage__benefits__flex__item__image">
                        <img className="img" src={img3} alt="img1" />
                    </figure>
                </div>
            </div>
        </div>

        <ClubSlider />
        {/*<Partners />*/}
    </main>
}

export default LandingPage;
