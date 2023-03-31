import React, {useContext, useEffect, useRef, useState} from 'react'
import przelewy24Icon from '../static/img/przelewy24.svg'
import arrowDown from '../static/img/triangle-down-black.svg'
import {addPayPalPayment, registerPayment} from "../helpers/payment";
import {
    usePayPalScriptReducer,
    PayPalButtons
} from "@paypal/react-paypal-js";
import payPalIcon from '../static/img/paypal.png'
import {ContentContext} from "../App";
import {getImageUrl} from "../helpers/others";

const PaymentForm = ({type, methods, coupons, userId, email}) => {
    const [{ options }, dispatch] = usePayPalScriptReducer();

    const { content, language } = useContext(ContentContext);

    const [cost, setCost] = useState(29);
    const [subscriptionType, setSubscriptionType] = useState(0);
    const [coupon, setCoupon] = useState("");
    const [paymentItem, setPaymentItem] = useState(-1);
    const [przelewy24Method, setPrzelewy24Method] = useState(-1);
    const [discount, setDiscount] = useState(0);
    const [amount, setAmount] = useState(29);
    const [cardMethodId, setCardMethodId] = useState(-1);

    const [p24Sign, setP24Sign] = useState("");

    const arrow1 = useRef(null);
    const arrow2 = useRef(null);
    const arrow3 = useRef(null);

    useEffect(() => {
        if(methods?.length) {
            const card = methods.find((item) => {
                return item.name === 'Karta płatnicza';
            });

            if(card) {
                setCardMethodId(card.id);
            }
        }
    }, [methods]);

    useEffect(() => {
        setAmount(subscriptionType === 1 ? 149 : 29);
        setCost(subscriptionType === 1 ? 149 : 29);
    }, [subscriptionType]);

    useEffect(() => {
        if(amount) {
            dispatch({
                type: "resetOptions",
                value: {
                    ...options,
                    currency: 'PLN'
                },
            });
        }
    }, [amount]);

    const changePaymentItem = (n) => {
        if(n === 0) {
            if(paymentItem === 0) {
                setPaymentItem(-1);
                arrow1.current.style.transform = "translateY(-50%) rotateX(0)";
            }
            else {
                setPaymentItem(0);
                arrow1.current.style.transform = "translateY(-50%) rotateX(180deg)";
            }
        }
        else if(n === 1) {
            if(paymentItem === 1) {
                setPaymentItem(-1);
                arrow2.current.style.transform = "translateY(-50%) rotateX(0)";
            }
            else {
                setPaymentItem(1);
                arrow2.current.style.transform = "translateY(-50%) rotateX(180deg)";
            }
        }
        else {
            if(paymentItem === 2) {
                setPaymentItem(-1);
                arrow3.current.style.transform = "translateY(-50%) rotateX(0)";
            }
            else {
                setPaymentItem(2);
                arrow3.current.style.transform = "translateY(-50%) rotateX(180deg)";
            }
        }
    }

    useEffect(() => {
        const index = coupons.findIndex((item) => {
            return item.name === coupon;
        });
        if(index !== -1) {
            setDiscount(coupons[index].value);
            setAmount(Math.ceil(cost - cost * (coupons[index].value / 100)));
        }
    }, [coupon]);

    const pay = (card = false) => {
        registerPayment(amount ? amount : cost, card ? cardMethodId : przelewy24Method, email,
            userId, type, coupon, card, subscriptionType === 0)
            .then((res) => {
                const paymentUri = "https://secure.przelewy24.pl/trnRequest/";
                const token = res.data.result;
                setP24Sign(res.data.sign);
                window.location = `${paymentUri}${token}`;
            });
    }

    const payWithPayPal = () => {
        addPayPalPayment(userId, amount, coupon)
            .then((res) => {
                window.location = '/subskrypcja-przedluzona'
            });
    }

    useEffect(() => {
        console.log(cardMethodId);
    }, [cardMethodId]);

    return <main className="payment siteWidthSuperNarrow">
        <h2 className="payment__header">
            {content.payment_header}
        </h2>

        <div className="payment__types">
            <button className={subscriptionType === 0 ? "button--paymentType button--paymentType--current" : "button--paymentType"}
                    onClick={() => { setSubscriptionType(0); }}>
                {language === 'pl' ? 'Płatność miesięczna' : 'Monthly payment'} (29 PLN)
            </button>
            <button className={subscriptionType === 1 ? "button--paymentType button--paymentType--current" : "button--paymentType"}
                    onClick={() => { setSubscriptionType(1); }}>
                {language === 'pl' ? 'Płatność roczna' : 'Yearly payment'} (149 PLN)
            </button>
        </div>

        {subscriptionType === 0 ? <section className="paymentItemWrapper">
            <button className="payment__item" onClick={() => { changePaymentItem(0); }}>
                <h3 className="payment__item__header">
                    {language === 'pl' ? 'Płatność subskrypcyjna' : 'Subscription payment'}
                </h3>
                <img className="payment__item__icon" src={przelewy24Icon} alt="przelewy-24" />

                <img ref={arrow1} className="payment__item__iconAbsolute" src={arrowDown} alt="rozwin" />
            </button>

            <section className={paymentItem === 0 ? "paymentMethod paymentMethod--1" : "hidden"}>
                <main className="paymentMethod__content">
                    <p>
                        {language === 'pl' ? `Płatność zarejestrowaną kartą będzie naliczana co miesiąc. Anulowanie subskrypcji
                       jest możliwe w każdej chwili po przejściu na podstronę Home i kliknięciu "Anuluj subskrypcję"` :
                            'Card payment will be preceeded automatically every month. Subscription can be cancelled any time by visiting page Home and clicking "Cancel subscription"'}
                    </p>
                </main>

                <button className="button button--hover button--payment" onClick={() => { pay(true); }}>
                    {language === 'pl' ? 'Zapłać' : 'Pay'}
                </button>
            </section>
        </section> : ''}

        <section className="paymentItemWrapper">
            <button className="payment__item" onClick={() => { changePaymentItem(1); }}>
                <h3 className="payment__item__header">
                    {language === 'pl' ? 'Płatność jednorazowa' : 'Payment'}
                </h3>
                <img className="payment__item__icon" src={przelewy24Icon} alt="przelewy-24" />

                <img ref={arrow2} className="payment__item__iconAbsolute" src={arrowDown} alt="rozwin" />
            </button>

             <section className={paymentItem === 1 ? "paymentMethod paymentMethod--1" : "hidden"}>
                <main className="paymentMethod__list">
                    {methods.map((item, index) => {
                        if(item.name !== 'Karta płatnicza') {
                            return <button key={index} className={przelewy24Method === item.id ? "paymentMethod__btn paymentMethod__btn--selected" : "paymentMethod__btn"} onClick={() => { setPrzelewy24Method(item.id); }}>
                                <img className="paymentMethod__btn__img" src={item.imgUrl} alt={item.name} />
                                <h3 className="paymentMethod__name">
                                    {item.name}
                                </h3>
                            </button>
                        }
                    })}
                </main>

                <button className="button button--hover button--payment" onClick={() => { pay(); }}>
                    {language === 'pl' ? 'Zapłać' : 'Pay'}
                </button>
            </section>
        </section>

        <section className="paymentItemWrapper">
            <button className="payment__item" onClick={() => { changePaymentItem(2); }}>
                <h3 className="payment__item__header">
                    {language === 'pl' ? 'Płatność jednorazowa' : 'Payment'}
                </h3>
                <img className="payment__item__icon" src={payPalIcon} alt="paypal" />

                <img ref={arrow3} className="payment__item__iconAbsolute" src={arrowDown} alt="rozwin" />
            </button>

            <section className={paymentItem === 2 ? "paymentMethod paymentMethod--2" : "hidden"}>
                <PayPalButtons
                    createOrder={(data, actions) => {
                        return actions.order.create({
                            purchase_units: [
                                {
                                    amount: {
                                        value: amount,
                                    },
                                },
                            ],
                        });
                    }}
                    onApprove={(data, actions) => {
                        return actions.order.capture().then((details) => {
                            payWithPayPal();
                        });
                    }}
                />
            </section>
        </section>

        <section className="payment__couponCode">
            <label>
                {content.discount_code}

                <input className="input input--couponCode"
                       name="coupon"
                       placeholder={content.discount_code_input}
                       disabled={discount !== 0}
                       value={coupon}
                       onChange={(e) => { setCoupon(e.target.value) }} />
            </label>

            {discount !== 0 ? <section className="payment__couponCode__result">
                <span><b>{content.payment_code}:</b> {coupon}</span>
                <span><b>{content.payment_discount}:</b> -{discount}%</span>
            </section> : (coupon ? <h3 className="payment__couponCode__error">
                {content.payment_code_not_exists}
            </h3> : "")}
        </section>
    </main>
}

export default PaymentForm;
