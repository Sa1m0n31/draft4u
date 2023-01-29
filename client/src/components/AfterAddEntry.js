import React from 'react';
import checkIcon from '../static/img/check-gold.svg';

const AfterAddEntry = ({closeModal, entryAccept}) => {
    return <div className="modal__inner modal__inner--after">
        <button className="btn btn--remove btn--modalClose"
                onClick={closeModal}>
            &times;
        </button>

        <img className="checkImg" src={checkIcon} alt="check" />

        <h4 className="modal__inner__header modal__inner__header--addEvent">
            {entryAccept ? 'Udało się! Zaproszenie zostało zaakceptowane.' : 'Klub otrzymał Twoje zgłoszenie. Otrzymasz powiadomienie, gdy klub potwierdzi Twój zapis.'}
        </h4>

        <a className="btn btn--addEvent btn--gradient goldman" href="/">
            Wróć na stronę główną
        </a>
    </div>
};

export default AfterAddEntry;
