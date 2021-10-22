import React from 'react'
import laptop from '../static/img/laptop.png'
import btn1 from '../static/img/sprawdz-btn.png'
import btn2 from '../static/img/zapisane-sklady-btn.png'

const ClubAccountBottom = () => {
    return <section className="siteWidthSuperNarrow siteWidthSuperNarrow--1400 clubAccountStart__bottom">
        <section className="clubAccountStart__bottom__section">
            <h2 className="player__header player__header--findNewPlayer">
                Stwórz swój skład
            </h2>
            <figure className="clubAccountStart__bottom__section d-mobile">
                <img className="btn__img" src={laptop} alt="draft4u" />
            </figure>
            <p className="clubAccountStart__bottom__text">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam blandit nisl sit amet venenatis facilisis. Ut imperdiet nunc cursus eros posuere molestie. Nullam ultrices augue at leo pellentesque pretium.
            </p>
            <a className="button button--hover button--clubAccountBottom">
                <img className="btn__img" src={btn1} alt="sprawdz" />
            </a>
            <span className="orSpan">lub</span>

            <a className="button button--hover button--clubAccountBottom">
                <img className="btn__img" src={btn2} alt="zobacz-sklady" />
            </a>
        </section>
        <figure className="clubAccountStart__bottom__section d-desktop">
            <img className="btn__img" src={laptop} alt="draft4u" />
        </figure>
    </section>
}

export default ClubAccountBottom;
