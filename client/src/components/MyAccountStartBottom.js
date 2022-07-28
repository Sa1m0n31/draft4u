import React, {useContext, useEffect, useState} from 'react'
import buyNowBtn from "../static/img/buy-now.png";
import lockRed from '../static/img/lock-red.svg'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {getUserSubscription} from "../helpers/user";
import discountImg from "../static/img/discount.png";
import DraftLoader from "./Loader";
import {ContentContext} from "../App";

const MyAccountStartBottom = ({userId}) => {
    const [days, setDays] = useState(0);
    const [loaded, setLoaded] = useState(false);

    const { content } = useContext(ContentContext);

    useEffect(() => {
        getUserSubscription(userId)
            .then((res) => {
                const result = res?.data?.result[0];
                setLoaded(true);
                if(result) {
                    if(result.subscription) {
                        const currentDate = new Date().getTime() - 1000 * 60 * 60;
                        const expireDate = new Date(Date.parse(result.subscription)).getTime();

                        const daysToExpire = Math.ceil((expireDate - currentDate) / 86400000);
                        setDays(daysToExpire);
                    }
                    else {
                        setDays(0);
                    }
                }
            });
    }, []);

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
                {days < 30 ? <a className="player__option" href="/zaplac">>
                    <img className="player__option__discount" src={discountImg} alt="promocja" />
                    <h3 className="player__option__name">
                        {content.player_zone_buy_frame1}
                    </h3>
                    <h4 className="player__option__price">
                        99
                        <span className="player__option__currency">
                                PLN
                            </span>
                    </h4>
                    <div className="button button--hover button--buyNow">
                        <img className="btn__img" src={buyNowBtn} alt="kup-teraz" />
                    </div>
                </a> : <p className="player__flex__text">
                    {content.ty_page_text}
                </p>}
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
