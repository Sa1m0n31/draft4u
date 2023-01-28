import React, {useContext, useState} from 'react';
import img from '../static/img/strefa-zawodnika-2.png'
import {ContentContext, StuffContext} from "../App";
import {getImageUrl} from "../helpers/others";
import {registerSecondAccount} from "../helpers/auth";
import SecondAccountModal from "./SecondAccountModal";

const AddAccountTypeSection = () => {
    const { content } = useContext(ContentContext);
    const { isStuff } = useContext(StuffContext);

    const [secondAccountAdded, setSecondAccountAdded] = useState(false);

    const addSecondAccountType = () => {
        registerSecondAccount()
            .then((res) => {
                if(res?.data?.result) {
                    setSecondAccountAdded(true);
                }
            });
    }

    return <section className="myAccountStart__header addAccountTypeSection siteWidthSuperNarrow">
        {secondAccountAdded ? <SecondAccountModal mobile={window.innerWidth < 768} /> : ''}

        <section className="player__section player__flex player__flex--section player__section--1 club__section">
            <figure className="player__flex__imgWrapper">
                <img className="player__flex__img" src={img} alt="widok" />
            </figure>

            <article className="player__flex__content">
                <h2 className="player__header">
                    {content.add_account_type_header}
                </h2>
                <p className="player__flex__text">
                    {isStuff ? content.add_account_type_text_staff : content.add_account_type_text_user}
                </p>
                <button className="button button--hover button--player--register center btn--gradient goldman" onClick={() => { addSecondAccountType(); }}>
                    {content.register}
                </button>
            </article>
        </section>
    </section>
};

export default AddAccountTypeSection;
