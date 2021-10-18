import React, {useEffect, useState} from 'react'
import buyNowBtn from "../static/img/buy-now.png";
import lockRed from '../static/img/lock-red.svg'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {getUserSubscription} from "../helpers/user";

const MyAccountStartBottom = ({userId}) => {
    const [days, setDays] = useState(0);

    useEffect(() => {
        getUserSubscription(userId)
            .then((res) => {
                const result = res?.data?.result[0];
                if(result) {
                    const currentDate = new Date();
                    const expireDate = new Date(Date.parse(result.expire));

                    const daysToExpire = Math.abs(Math.floor((currentDate - expireDate) / 86400000));
                    setDays(daysToExpire);
                }
            });
    }, []);

    return <section className="myAccountStart__bottom siteWidthSuperNarrow">
        <main className="myAccountStart__bottom__content">
            <section className="myAccountStart__bottom__content__section">
                <h3 className="player__header">
                    Twoja subskrypcja
                </h3>
                <span className="d-below-1200">
                    {days >= 1 ? <>
                        <CircularProgressbar value={days / 30 * 100}
                                             text={<span>14dni<br/>{days}</span>} />

                        <span className="myAccountStart__bottom__content__days">
                        <span className="myAccountStart__bottom__content__days--big">
                            {days}
                        </span>
                        <span>
                            dni
                        </span>
                    </span>
                    </> : <img className="myAccountStart__bottom__content__lock" src={lockRed} alt="konto-wygaslo" />}
                </span>

                <h4 className="myAccountStart__subheader">
                    {days <= 0 ? "Twoje konto straciło ważność" : (`Pozostało ${days} ${days > 1 ? "dni" : "dzień"} do końca Twojego pakietu`)}
                </h4>
                <p className="myAccountStart__text">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur quis pretium dolor. Nam eu odio et turpis volutpat congue in ac metus. Integer consectetur justo lorem, quis consectetur nisi ultricies ut. Maecenas auctor mauris tristique justo volutpat imperdiet. Proin commodo mi sapien, vita Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur quis pretium dolor. Nam eu odio et turpis volutpat congue in ac metus. Integer consectetur justo lorem, quis consectetur nisi ultricies ut. Maecenas auctor mauris tristique justo volutpat imperdiet. Proin commodo mi sapien, vita
                </p>
            </section>

            <section className="myAccountStart__bottom__content__section">
                <span className="d-over-1200">
                    {days >= 1 ? <>
                        <CircularProgressbar value={days / 30 * 100}
                                             text={<span>{days}dni<br/>{days}</span>} />

                        <span className="myAccountStart__bottom__content__days">
                        <span className="myAccountStart__bottom__content__days--big">
                            {days}
                        </span>
                        <span>
                            dni
                        </span>
                    </span>
                    </> : <img className="myAccountStart__bottom__content__lock" src={lockRed} alt="konto-wygaslo" />}
                </span>
            </section>
        </main>

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
                    <a className="button button--hover button--buyNow" href="/zaplac?pakiet=1">
                        <img className="btn__img" src={buyNowBtn} alt="kup-teraz" />
                    </a>
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
                    <a className="button button--hover button--buyNow" href="/zaplac?pakiet=2">
                        <img className="btn__img" src={buyNowBtn} alt="kup-teraz" />
                    </a>
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
                    <a className="button button--hover button--buyNow" href="/zaplac?pakiet=3">
                        <img className="btn__img" src={buyNowBtn} alt="kup-teraz" />
                    </a>
                </section>
            </section>
        </menu>
    </section>
}

export default MyAccountStartBottom;
