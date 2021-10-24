import React, {useEffect, useRef, useState} from 'react'
import przelewy24Icon from '../static/img/przelewy24.svg'
import kartyIcon from '../static/img/karty-platnicze.png'
import arrowDown from '../static/img/triangle-down-black.svg'
import payBtn from '../static/img/zaplac.png'
import {chargeCard, registerPayment} from "../helpers/payment";

const PaymentForm = ({type, cost, methods, coupons, userId, email}) => {
    const [coupon, setCoupon] = useState("");
    const [paymentItem, setPaymentItem] = useState(-1);
    const [przelewy24Method, setPrzelewy24Method] = useState(-1);
    const [discount, setDiscount] = useState(0);
    const [amount, setAmount] = useState(cost);

    const [cardNumber, setCardNumber] = useState("");
    const [cardDate, setCardDate] = useState("");
    const [cvv, setCvv] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const arrow1 = useRef(null);
    const arrow2 = useRef(null);

    useEffect(() => {
        setAmount(cost);
    }, [])

    const changePaymentItem = (n) => {
        if(n === 1) {
            if(paymentItem === 1) {
                setPaymentItem(-1);
                arrow1.current.style.transform = "translateY(-50%) rotateX(0)";
            }
            else {
                setPaymentItem(1);
                arrow1.current.style.transform = "translateY(-50%) rotateX(180deg)";
            }
        }
        else {
            if(paymentItem === 2) {
                setPaymentItem(-1);
                arrow2.current.style.transform = "translateY(-50%) rotateX(0)";
            }
            else {
                setPaymentItem(2);
                arrow2.current.style.transform = "translateY(-50%) rotateX(180deg)";
            }
        }
    }

    useEffect(() => {
        const index = coupons.findIndex((item) => {
            return item.name === coupon;
        });
        if(index !== -1) {
            setDiscount(coupons[index].value);
            setAmount(Math.round(cost - cost * (coupons[index].value / 100)));
        }
    }, [coupon]);

    const pay = () => {
        if(przelewy24Method !== -1) {
            registerPayment(amount ? amount : cost, przelewy24Method, email, userId, type)
                .then((res) => {
                    const paymentUri = "https://sandbox.przelewy24.pl/trnRequest/";
                    const token = res.data.result;
                    window.location = `${paymentUri}${token}`;
                })
        }
    }

    const addCard = () => {
        registerPayment(amount ? amount : cost, przelewy24Method, email, userId, type)
            .then((res) => {
                const token = res.data.result;
                console.log(token);
                chargeCard(token, cardNumber, cardDate, cvv, `${firstName} ${lastName}`)
                    .then((res) => {
                        console.log(res.data);
                    });
            });
    }

    return <main className="payment siteWidthSuperNarrow">
        <h2 className="payment__header">
            Skonfiguruj płatność
        </h2>
        <p className="payment__text">
            Członkostwo rozpocznie się po skonfigurowaniu płatności.
        </p>
        <p className="payment__text payment__text--marginBottom">
            Wybrałeś pakiet {type} w kwocie <b>{amount ? amount : cost} PLN</b>
        </p>

        <section className="paymentItemWrapper">
            <button className="payment__item" onClick={() => { changePaymentItem(1); }}>
                <h3 className="payment__item__header">
                    Płać z Przelewy24
                </h3>
                <img className="payment__item__icon" src={przelewy24Icon} alt="przelewy-24" />

                <img ref={arrow1} className="payment__item__iconAbsolute" src={arrowDown} alt="rozwin" />
            </button>

             <section className={paymentItem === 1 ? "paymentMethod paymentMethod--1" : "hidden"}>
                <main className="paymentMethod__list">
                    {methods.map((item, index) => {
                        return <button key={index} className={przelewy24Method === item.id ? "paymentMethod__btn paymentMethod__btn--selected" : "paymentMethod__btn"} onClick={() => { setPrzelewy24Method(item.id); }}>
                            <img className="paymentMethod__btn__img" src={item.imgUrl} alt={item.name} />
                            <h3 className="paymentMethod__name">
                                {item.name}
                            </h3>
                        </button>
                    })}
                </main>

                <button className="button button--hover button--payment" onClick={() => { pay(); }}>
                    <img className="btn__img" src={payBtn} alt="zaplac" />
                </button>
            </section>
        </section>

        <section className="paymentItemWrapper">
            <button className="payment__item" onClick={() => { changePaymentItem(2); }}>
                <h3 className="payment__item__header">
                    Płać kartą kredytową lub debetową
                </h3>
                <img className="payment__item__icon" src={kartyIcon} alt="karty-kredytowe" />

                <img ref={arrow2} className="payment__item__iconAbsolute" src={arrowDown} alt="rozwin" />
            </button>

            {paymentItem === 2 ? <main className="payment__item__formWrapper">
                <form className="payment__item__form">
                    <label>
                        <input className="input input--payment"
                               name="firstName"
                               value={firstName}
                               onChange={(e) => { setFirstName(e.target.value); }}
                               placeholder="Imię" />
                    </label>
                    <label>
                        <input className="input input--payment"
                               name="lastName"
                               value={lastName}
                               onChange={(e) => { setLastName(e.target.value); }}
                               placeholder="Nazwisko" />
                    </label>
                    <label>
                        <input className="input input--payment"
                               name="cardNumber"
                               value={cardNumber}
                               onChange={(e) => { setCardNumber(e.target.value); }}
                               placeholder="Numer karty" />
                    </label>
                    <span className="payment__item__form__flex">
                        <label>
                            <input className="input input--payment"
                                   name="cardDate"
                                   value={cardDate}
                                   onChange={(e) => { setCardDate(e.target.value); }}
                                   placeholder="Data wygaśnięcia (MM/RR)" />
                         </label>
                        <label>
                            <input className="input input--payment"
                                   name={cvv}
                                   onChange={(e) => { setCvv(e.target.value); }}
                                   placeholder="Kod zabezpieczający (CVV)" />
                        </label>
                    </span>

                    <button type="button" className="button button--hover button--payment button--payment--card" onClick={() => { addCard(); }}>
                        <img className="btn__img" src={payBtn} alt="dodaj-karte" />
                    </button>

                    <p className="payment__disclaimer">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam blandit nisl sit amet venenatis facilisis. Ut imperdiet nunc cursus eros posuere molestie. Nullam ultrices augue at leo pellentesque pretium. Morbi tincidunt magna ultricies nisl blandit, ut pulvinar sem fermentum.
                    </p>
                </form>
            </main> : ""}
        </section>

        <section className="payment__couponCode">
            <label>
                Masz kod rabatowy?

                <input className="input input--couponCode"
                       name="coupon"
                       placeholder="Wpisz kod"
                       disabled={discount !== 0}
                       value={coupon}
                       onChange={(e) => { setCoupon(e.target.value) }} />
            </label>

            {discount !== 0 ? <section className="payment__couponCode__result">
                <span><b>Kod:</b> {coupon}</span>
                <span><b>Zniżka:</b> -{discount}%</span>
            </section> : (coupon ? <h3 className="payment__couponCode__error">
                Podany kod rabatowy nie istnieje
            </h3> : "")}
        </section>
    </main>
}

export default PaymentForm;