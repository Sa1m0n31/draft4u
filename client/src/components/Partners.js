import React, {useContext} from 'react';
import logo1 from '../static/img/polska-siatkowka.png'
import logo2 from '../static/img/4quality.svg'
import {ContentContext} from "../App";

const Partners = () => {
    const { content } = useContext(ContentContext);

    return <section className="partners">
        <main className="clubCarousel__inner">
            <h3 className="clubCarousel__header">
                {content?.partners?.split(';')[0]}
            </h3>
            <div className="partners__main">
                <a className="partners__imgWrapper" href="">
                    <img className="partners__img partners__img--grey" src={logo1} alt="partnerzy" />
                    <img className="partners__img partners__img--color" src={logo1} alt="partnerzy" />
                </a>
            </div>
            <h3 className="clubCarousel__header clubCarousel__header--marginTop">
                {content?.partners?.split(';')[1]}
            </h3>
            <div className="partners__main">
                <a className="partners__imgWrapper" href="">
                    <img className="partners__img partners__img--grey" src={logo2} alt="partnerzy" />
                    <img className="partners__img partners__img--color" src={logo2} alt="partnerzy" />
                </a>
            </div>
        </main>
    </section>
};

export default Partners;
