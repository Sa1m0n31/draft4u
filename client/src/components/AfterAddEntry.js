import React, {useContext} from 'react';
import checkIcon from '../static/img/check-gold.svg';
import {ContentContext} from "../App";

const AfterAddEntry = ({closeModal, entryAccept}) => {
    const { language } = useContext(ContentContext);

    return <div className="modal__inner modal__inner--after">
        <button className="btn btn--remove btn--modalClose"
                onClick={closeModal}>
            &times;
        </button>

        <img className="checkImg" src={checkIcon} alt="check" />

        <h4 className="modal__inner__header modal__inner__header--addEvent">
            {language === 'pl' ? <>
                {entryAccept ? 'Udało się! Zaproszenie zostało zaakceptowane.' : 'Klub otrzymał Twoje zgłoszenie. Otrzymasz powiadomienie, gdy klub potwierdzi Twój zapis.'}
            </> : <>
                {entryAccept ? 'Invitation has been accepted!' : 'Club received your application. You will receive notification as soon as club will accept your registration.'}
            </>}
        </h4>

        <a className="btn btn--addEvent btn--gradient goldman" href="/">
            {language === 'pl' ? 'Wróć na stronę główną' : 'Back to homepage'}
        </a>
    </div>
};

export default AfterAddEntry;
