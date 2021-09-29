import React, { useState, useEffect } from 'react'
import pen from "../static/img/pen.svg";

import RadarChart from 'react-svg-radar-chart';
import 'react-svg-radar-chart/build/css/index.css'

const PlayerInfoEdition = () => {
    const data = [
        {
            data: {
                wzrost: 0.7,
                waga: .8,
                zasiegWAtaku: 0.9,
                zasiegDosiezny: 0.67,
                zasiegWBloku: 0.8
            },
            meta: { color: '#E2B76D' }
        }
    ];

    const captions = {
        // columns
        wzrost: 'Wzrost',
        waga: 'Waga',
        zasiegWAtaku: 'Zasięg w ataku',
        zasiegDosiezny: 'Zasięg dosiężny',
        zasiegWBloku: 'Zasięg w bloku'
    };

    return <section className="playerInfoEdition siteWidthSuperNarrow">
        <section className="userInfoEdition__form">
            <label className="userInfoEdition__form__field">
                <span className="userInfoEdition__key">
                    Zasięg w ataku
                </span>
                <span className="userInfoEdition__value">
                    23
                    <button className="userInfoEdition__btn">
                        <img className="userInfoEdition__btn__img" src={pen} alt="edytuj" />
                    </button>
                </span>
            </label>
            <label className="userInfoEdition__form__field">
                <span className="userInfoEdition__key">
                    Zasięg dosiężny
                </span>
                <span className="userInfoEdition__value">
                    das@wp.pl
                    <button className="userInfoEdition__btn">
                        <img className="userInfoEdition__btn__img" src={pen} alt="edytuj" />
                    </button>
                </span>
            </label>
            <label className="userInfoEdition__form__field">
                <span className="userInfoEdition__key">
                    Zasięg w bloku
                </span>
                <span className="userInfoEdition__value">
                    600 179 174
                    <button className="userInfoEdition__btn">
                        <img className="userInfoEdition__btn__img" src={pen} alt="edytuj" />
                    </button>
                </span>
            </label>
            <label className="userInfoEdition__form__field">
                <span className="userInfoEdition__key">
                    Waga
                </span>
                <span className="userInfoEdition__value">
                    Lorem ipsum
                    <button className="userInfoEdition__btn">
                        <img className="userInfoEdition__btn__img" src={pen} alt="edytuj" />
                    </button>
                </span>
            </label>
            <label className="userInfoEdition__form__field">
                <span className="userInfoEdition__key">
                    Pozycja na boisku
                </span>
                <span className="userInfoEdition__value">
                    przyjmujący
                    <button className="userInfoEdition__btn">
                        <img className="userInfoEdition__btn__img" src={pen} alt="edytuj" />
                    </button>
                </span>
            </label>
        </section>

        <section className="userInfoEdition__graphSection">
            <RadarChart
                captions={captions}
                data={data}
                size={550}
            />
        </section>
    </section>
}

export default PlayerInfoEdition;
