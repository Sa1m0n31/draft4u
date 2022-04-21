import React from 'react';
import logo1 from '../static/img/zzaksa.png'

const Partners = () => {
    return <section className="partners">
        <main className="clubCarousel__inner">
            <h3 className="clubCarousel__header">
                Partnerzy
            </h3>
            <div className="partners__main">
                <a className="partners__imgWrapper" href="">
                    <img className="partners__img partners__img--grey" src={logo1} alt="partnerzy" />
                    <img className="partners__img partners__img--color" src={logo1} alt="partnerzy" />
                </a>
                <a className="partners__imgWrapper" href="">
                    <img className="partners__img partners__img--grey" src={logo1} alt="partnerzy" />
                    <img className="partners__img partners__img--color" src={logo1} alt="partnerzy" />
                </a>
            </div>
        </main>
    </section>
};

export default Partners;
