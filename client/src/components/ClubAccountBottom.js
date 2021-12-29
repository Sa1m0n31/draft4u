import React from 'react'
import laptop from '../static/img/laptop.png'
import btn1 from '../static/img/sprawdz-btn.png'
import btn2 from '../static/img/zapisane-sklady-btn.png'

const ClubAccountBottom = () => {
    return <section className="siteWidthSuperNarrow siteWidthSuperNarrow--1400 clubAccountStart__bottom">
        <section className="clubAccountStart__bottom__section">
            <h2 className="player__header player__header--findNewPlayer">
                Stwórz swoją drużynę
            </h2>
            <figure className="clubAccountStart__bottom__section d-mobile">
                <img className="btn__img" src={laptop} alt="draft4u" />
            </figure>
            <p className="clubAccountStart__bottom__text">
                Zobacz jak wybrany kandydat prezentuje się w Twoim składzie! Stwórz swoją drużynę – dodaj zawodników i zobacz jak będzie wyglądać Twój zespół z nowym graczem. Możesz stworzyć nieograniczoną liczbę składów, a także w łatwy sposób zmieniać zawodników na poszczególnych pozycjach. W prawym górnym rogu zobaczysz szacowany koszt drużyny. Każdy wariant możesz zapisać osobno, aż znajdziesz najlepsze rozwiązanie.
            </p>
            <a className="button button--hover button--clubAccountBottom" href="/sklady">
                <img className="btn__img" src={btn1} alt="sprawdz" />
            </a>
            <span className="orSpan">lub</span>

            <a className="button button--hover button--clubAccountBottom" href="/zapisane-druzyny">
                <img className="btn__img" src={btn2} alt="zobacz-sklady" />
            </a>
        </section>
        <figure className="clubAccountStart__bottom__section clubAccountStart__bottom__section--laptop d-desktop">
            <img className="btn__img" src={laptop} alt="draft4u" />
        </figure>
    </section>
}

export default ClubAccountBottom;
