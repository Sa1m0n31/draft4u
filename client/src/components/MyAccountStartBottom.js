import React, {useContext, useEffect, useState} from 'react';
import lockRed from '../static/img/lock-red.svg';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {cancelSubscription, getUserSubscription} from "../helpers/user";
import DraftLoader from "./Loader";
import {ContentContext} from "../App";
import {addTrailingZero} from "../helpers/others";

const MyAccountStartBottom = ({userId}) => {
    const [subscriptionPaymentsActive, setSubscriptionPaymentsActive] = useState(false);
    const [nextPaymentDate, setNextPaymentDate] = useState('');
    const [days, setDays] = useState(0);
    const [loaded, setLoaded] = useState(false);
    const [updateSubscription, setUpdateSubscription] = useState(false);

    const { content, language } = useContext(ContentContext);

    useEffect(() => {
        getUserSubscription(userId)
            .then((res) => {
                const result = res?.data?.result[0];
                setLoaded(true);
                if(result) {
                    if(result.subscription) {
                        if(result.ref_id) {
                            setSubscriptionPaymentsActive(true);
                        }
                        else {
                            setSubscriptionPaymentsActive(false);
                        }

                        const currentDate = new Date().getTime() - 1000 * 60 * 60;
                        const expireDate = new Date(Date.parse(result.subscription)).getTime();
                        const nextPaymentDateObject = new Date(Date.parse(result.subscription));
                        nextPaymentDateObject.setDate(nextPaymentDateObject.getDate() - 1);

                        setNextPaymentDate(`${addTrailingZero(nextPaymentDateObject.getDate())}.${addTrailingZero(nextPaymentDateObject.getMonth()+1)}.${nextPaymentDateObject.getFullYear()}`);

                        const daysToExpire = Math.ceil((expireDate - currentDate) / 86400000);
                        setDays(daysToExpire);
                    }
                    else {
                        setDays(0);
                    }
                }
            });
    }, [updateSubscription]);

    const cancelSubscriptionWrapper = () => {
        if(window.confirm(language === 'pl' ? 'Czy na pewno chcesz anulować subskrypcję?' : 'Are you sure you want to cancel subscription?')) {
            cancelSubscription(userId)
                .then((res) => {
                    if(res?.data?.result) {
                        setUpdateSubscription((p) => (!p));
                        alert(language === 'pl' ? 'Twoja subskrypcja została anulowana.' : 'You subscription has been canceled');
                    }
                })
                .catch(() => {
                    alert('Coś poszło nie tak... Prosimy o kontakt na adres biuro@draft4u.com.pl');
                });
        }
    }

    return <section className="myAccountStart__bottom siteWidthSuperNarrow">
        {loaded ? <main className="myAccountStart__bottom__content">
            <section className="myAccountStart__bottom__content__section">
                <h3 className="player__header">
                    {content.your_subscription}
                </h3>
                <span className="d-below-1200">
                    {days >= 1 ? <>
                        <CircularProgressbar value={days / 30 * 100}
                                             text={<span>14{content.your_subscription_days}<br/>{days}</span>} />

                        <span className="myAccountStart__bottom__content__days">
                        <span className="myAccountStart__bottom__content__days--big">
                            {days}
                        </span>
                        <span>
                              {content.your_subscription_days}
                        </span>
                    </span>
                    </> : <img className="myAccountStart__bottom__content__lock" src={lockRed} alt="konto-wygaslo" />}
                </span>

                <h4 className="myAccountStart__subheader">
                    {days <= 0 ? content.your_subscription_text_expire : content.your_subscription_text_ok.replace('x', days)}
                </h4>
                {days <= 50 && !subscriptionPaymentsActive ? <a className="player__option" href="/zaplac">
                    <h3 className="player__option__name white">
                        {content.player_zone_buy_frame1}
                    </h3>
                    <h4 className="player__option__price">
                        29
                        <span className="player__option__currency">
                                PLN
                            </span>
                    </h4>
                    <div className="button button--hover button--buyNow">
                        {language === 'pl' ? 'Kup teraz' : 'Buy now'}
                    </div>
                </a> : <div>
                    {subscriptionPaymentsActive ? <>
                        <p className="player__flex__text">
                            Następna płatność: {nextPaymentDate}
                        </p>
                        <button className="btn btn--cancelSubscription" onClick={() => { cancelSubscriptionWrapper(); }}>
                            Anuluj subskrypcje
                        </button>
                    </> : <>
                        <p className="player__flex__text">
                            Dziękujemy, że jesteś z nami!
                        </p>
                    </>}
                </div>}
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
                            {content.your_subscription_days}
                        </span>
                    </span>
                    </> : <img className="myAccountStart__bottom__content__lock" src={lockRed} alt="konto-wygaslo" />}
                </span>
            </section>
        </main> : <DraftLoader />}
    </section>
}

export default MyAccountStartBottom;
