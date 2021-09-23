import React, { useEffect, useState, useRef } from 'react'

const PlayerFAQ = () => {
    const [category, setCategory] = useState(0);

    const questionWrapper1 = useRef(null);
    const questionWrapper2 = useRef(null);
    const questionWrapper3 = useRef(null);
    const questionWrapper4 = useRef(null);

    return <section className="faq">
        <header className="faq__header">
            <button className={category !== 0 ? "faq__btn" : "faq__btn faq__btn--current"} onClick={() => { setCategory(0); }}>
                Jak to działa?
            </button>
            <span className="faq__header__divider"></span>
            <button className={category !== 1 ? "faq__btn" : "faq__btn faq__btn--current"} onClick={() => { setCategory(1); }}>
                Rejestracja
            </button>
            <span className="faq__header__divider"></span>
            <button className={category !== 2 ? "faq__btn" : "faq__btn faq__btn--current"} onClick={() => { setCategory(2); }}>
                Konto profilowe
            </button>
            <span className="faq__header__divider"></span>
            <button className={category !== 3 ? "faq__btn" : "faq__btn faq__btn--current"} onClick={() => { setCategory(3); }}>
                Opłaty
            </button>
        </header>

        <main className="faq__questions" ref={questionWrapper1}>
            <section className="faq__question">
                <button className="faq__question__header">
                    <h4 className="faq__question__header__h">
                        Jak działa Draft4U?
                    </h4>
                    <button className="faq__question__header__btn">
                        +
                    </button>
                </button>
                <article className="faq__question__main">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque eu vulputate augue. Quisque elementum efficitur tellus, id auctor orci tincidunt id. In ac nunc sodales, congue libero at, aliquet augue. Donec interdum ullamcorper convallis. Aliquam scelerisque, purus sit amet pellentesque viverra
                </article>
            </section>
            <section className="faq__question">
                <header className="faq__question__header">
                    <h4 className="faq__question__header__h">
                        Jak odbywa się kontakt pomiędzy klubem a zawodnikiem?
                    </h4>
                    <button className="faq__question__header__btn">
                        +
                    </button>
                </header>
                <article className="faq__question__main">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque eu vulputate augue. Quisque elementum efficitur tellus, id auctor orci tincidunt id. In ac nunc sodales, congue libero at, aliquet augue. Donec interdum ullamcorper convallis. Aliquam scelerisque, purus sit amet pellentesque viverra
                </article>
            </section>
            <section className="faq__question">
                <header className="faq__question__header">
                    <h4 className="faq__question__header__h">
                        Z jakimi ligami współpracujemy?
                    </h4>
                    <button className="faq__question__header__btn">
                        +
                    </button>
                </header>
                <article className="faq__question__main">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque eu vulputate augue. Quisque elementum efficitur tellus, id auctor orci tincidunt id. In ac nunc sodales, congue libero at, aliquet augue. Donec interdum ullamcorper convallis. Aliquam scelerisque, purus sit amet pellentesque viverra
                </article>
            </section>
        </main>
    </section>
}

export default PlayerFAQ;
