import React from 'react';
import checkIcon from '../static/img/check-gold.svg';

const AfterAddEvent = ({closeModal}) => {
    return <div className="modal__inner modal__inner--after">
        <button className="btn btn--remove btn--modalClose"
                onClick={closeModal}>
            &times;
        </button>

        <img className="checkImg" src={checkIcon} alt="check" />

        <h4 className="modal__inner__header modal__inner__header--addEvent">
            Wydarzenie zostało dodane
        </h4>

        <a className="btn btn--addEvent btn--gradient goldman" href="/wydarzenia">
            Zobacz swoje wydarzenia
        </a>
    </div>
};

export default AfterAddEvent;
