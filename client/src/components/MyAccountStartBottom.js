import React from 'react'
import buyNowBtn from "../static/img/buy-now.png";

const MyAccountStartBottom = () => {
    return <section className="myAccountStart__bottom siteWidthSuperNarrow">
        <menu className="myAccountStart__bottom__subscriptions">
            <section className="player__flex player__flex--options player__flex--margin">
                <section className="player__option">
                    <h3 className="player__option__name">
                        Miesięczny
                    </h3>
                    <h4 className="player__option__price">
                        199
                        <span className="player__option__currency">
                                PLN
                            </span>
                    </h4>
                    <button className="button button--hover button--buyNow">
                        <img className="btn__img" src={buyNowBtn} alt="kup-teraz" />
                    </button>
                </section>
                <section className="player__option">
                    <h3 className="player__option__name">
                        3-miesięczny
                    </h3>
                    <h4 className="player__option__price">
                        399
                        <span className="player__option__currency">
                                PLN
                            </span>
                    </h4>
                    <button className="button button--hover button--buyNow">
                        <img className="btn__img" src={buyNowBtn} alt="kup-teraz" />
                    </button>
                </section>
                <section className="player__option">
                    <h3 className="player__option__name">
                        Roczny
                    </h3>
                    <h4 className="player__option__price">
                        999
                        <span className="player__option__currency">
                                PLN
                            </span>
                    </h4>
                    <button className="button button--hover button--buyNow">
                        <img className="btn__img" src={buyNowBtn} alt="kup-teraz" />
                    </button>
                </section>
            </section>
        </menu>
    </section>
}

export default MyAccountStartBottom;
