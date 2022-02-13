import React, {useContext} from 'react'
import laptop from '../static/img/laptop.png'
import {ContentContext} from "../App";
import {getImageUrl} from "../helpers/others";

const ClubAccountBottom = () => {
    const { content } = useContext(ContentContext);

    return <section className="siteWidthSuperNarrow siteWidthSuperNarrow--1400 clubAccountStart__bottom">
        <section className="clubAccountStart__bottom__section">
            <h2 className="player__header player__header--findNewPlayer">
                {content.create_your_team}
            </h2>
            <figure className="clubAccountStart__bottom__section d-mobile">
                <img className="btn__img" src={laptop} alt="draft4u" />
            </figure>
            <p className="clubAccountStart__bottom__text">
                {content.club_zone_text5}
            </p>
            <a className="button button--hover button--clubAccountBottom" href="/sklady">
                <img className="btn__img" src={getImageUrl(content.img22)} alt="sprawdz" />
            </a>
            <span className="orSpan">lub</span>

            <a className="button button--hover button--clubAccountBottom" href="/zapisane-druzyny">
                <img className="btn__img" src={getImageUrl(content.img23)} alt="zobacz-sklady" />
            </a>
        </section>
        <figure className="clubAccountStart__bottom__section clubAccountStart__bottom__section--laptop d-desktop">
            <img className="btn__img" src={laptop} alt="draft4u" />
        </figure>
    </section>
}

export default ClubAccountBottom;
