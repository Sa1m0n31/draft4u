import React, {useContext} from 'react';
import img from '../static/img/strefa-zawodnika-2.png'
import {ContentContext} from "../App";
import {getImageUrl} from "../helpers/others";
import {registerSecondAccount} from "../helpers/auth";

const AddAccountTypeSection = () => {
    const { content } = useContext(ContentContext);

    const addSecondAccountType = () => {
        registerSecondAccount()
            .then((res) => {

            })
            .catch(() => {

            });
    }

    return <section className="myAccountStart__header addAccountTypeSection siteWidthSuperNarrow">
        <section className="player__section player__flex player__flex--section player__section--1 club__section">
            <figure className="player__flex__imgWrapper">
                <img className="player__flex__img" src={img} alt="widok" />
            </figure>

            <article className="player__flex__content">
                <h2 className="player__header">
                    Jedna subskrypcja, dwa typy konta
                </h2>
                <p className="player__flex__text">
                    Możesz dołączyć do nas również jako członek sztabu!
                </p>
                <button className="button button--hover button--player--register" onClick={() => { addSecondAccountType(); }}>
                    <img className="btn__img" src={getImageUrl(content.img8)} alt="zarejestruj-sie" />
                </button>
            </article>
        </section>
    </section>
};

export default AddAccountTypeSection;
