import React, { useState, useEffect } from 'react'
import example from '../static/img/man.webp'
import camera from '../static/img/camera.svg'
import pen from '../static/img/pen.svg'

import { Range, getTrackBackground } from 'react-range';

const UserInfoEdition = () => {
    const [values, setValues] = useState([10, 40]);

    const STEP = 0.1;
    const MIN = 0;
    const MAX = 100;

    return <section className="userInfoEdition siteWidthSuperNarrow">
        <section className="userInfoEdition__section">
            <figure className="userInfoEdition__imgWrapper">
                <img className="userInfoEdition__img" src={example} alt="alt" />
                <button className="userInfoEdition__imgBtn">
                    <img className="userInfoEdition__imgBtn__img" src={camera} alt="zmien-zdjecie" />
                </button>
            </figure>
        </section>

        <section className="userInfoEdition__form">
            <h2 className="userInfoEdition__fullName">
                Imię i nazwisko
            </h2>

            <label className="userInfoEdition__form__field">
                <span className="userInfoEdition__key">
                    Wiek
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
                    Mail
                </span>
                <span className="userInfoEdition__value">
                    das@wp.pl
                </span>
            </label>
            <label className="userInfoEdition__form__field">
                <span className="userInfoEdition__key">
                    Telefon
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
                    Aktualny klub
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
                    Honorarium
                </span>
                <span className="userInfoEdition__value">
                    6500 - 9000
                    <button className="userInfoEdition__btn">
                        <img className="userInfoEdition__btn__img" src={pen} alt="edytuj" />
                    </button>
                </span>
            </label>

            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexWrap: 'wrap'
                }}
            >
                <Range
                    values={values}
                    step={STEP}
                    min={MIN}
                    max={MAX}
                    rtl={false}
                    onChange={(values) => setValues(values)}
                    renderTrack={({ props, children }) => (
                        <div
                            onMouseDown={props.onMouseDown}
                            onTouchStart={props.onTouchStart}
                            style={{
                                ...props.style,
                                height: '20px',
                                width: '20px',
                                borderRadius: '50%',
                                display: 'flex',
                            }}
                        >
                            <div
                                ref={props.ref}
                                style={{
                                    height: '5px',
                                    width: '100%',
                                    borderRadius: '4px',
                                    background: getTrackBackground({
                                        values,
                                        colors: ['#474747', '#E2B76D', '#474747'],
                                        min: MIN,
                                        max: MAX,
                                        rtl: false
                                    }),
                                    alignSelf: 'center'
                                }}
                            >
                                {children}
                            </div>
                        </div>
                    )}
                    renderThumb={({ index, props, isDragged }) => (
                        <div
                            {...props}
                            style={{
                                ...props.style,
                                height: '42px',
                                width: '42px',
                                borderRadius: '4px',
                                backgroundColor: '#FFF',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                boxShadow: '0px 2px 6px #AAA'
                            }}
                        >
                            <div
                                style={{
                                    position: 'absolute',
                                    top: '-28px',
                                    color: '#fff',
                                    fontWeight: 'bold',
                                    fontSize: '14px',
                                    fontFamily: 'Arial,Helvetica Neue,Helvetica,sans-serif',
                                    padding: '4px',
                                    borderRadius: '4px',
                                    backgroundColor: '#548BF4'
                                }}
                            >
                                {values[index].toFixed(1)}
                            </div>
                            <div
                                style={{
                                    height: '16px',
                                    width: '5px',
                                    backgroundColor: isDragged ? '#548BF4' : '#CCC'
                                }}
                            />
                        </div>
                    )}
                />
            </div>
        </section>
    </section>
}

export default UserInfoEdition;
