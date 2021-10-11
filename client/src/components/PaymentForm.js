import React, {useState} from 'react'
import przelewy24Icon from '../static/img/przelewy24.svg'
import kartyIcon from '../static/img/karty-platnicze.png'
import arrowDown from '../static/img/triangle-down-black.svg'

const PaymentForm = ({type, cost}) => {
    const [coupon, setCoupon] = useState("");

    return <main className="payment siteWidthSuperNarrow">
        <h2 className="payment__header">
            Skonfiguruj płatność
        </h2>
        <p className="payment__text">
            Członkostwo rozpocznie się po skonfigurowaniu płatności.
        </p>
        <p className="payment__text payment__text--marginBottom">
            Wybrałeś pakiet {type} w kwocie <b>{cost} PLN</b>
        </p>

        <button className="payment__item">
            <h3 className="payment__item__header">
                Płać z Przelewy24
            </h3>
            <img className="payment__item__icon" src={przelewy24Icon} alt="przelewy-24" />

            <img className="payment__item__iconAbsolute" src={arrowDown} alt="rozwin" />
        </button>

        <button className="payment__item">
            <h3 className="payment__item__header">
                Płać kartą kredytową lub debetową
            </h3>
            <img className="payment__item__icon" src={kartyIcon} alt="karty-kredytowe" />

            <img className="payment__item__iconAbsolute" src={arrowDown} alt="rozwin" />
        </button>

        <section className="payment__couponCode">
            <label>
                Masz kod rabatowy?

                <input className="input input--couponCode"
                       name="coupon"
                       placeholder="Wpisz kod"
                       value={coupon}
                       onChange={(e) => { setCoupon(e.target.value) }} />
            </label>
        </section>
    </main>
}

export default PaymentForm;
