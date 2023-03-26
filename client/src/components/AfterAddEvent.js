import React, {useContext} from 'react';
import checkIcon from '../static/img/check-gold.svg';
import {ContentContext} from "../App";

const AfterAddEvent = ({closeModal, update}) => {
    const { language } = useContext(ContentContext);

    return <div className="modal__inner modal__inner--after">
        <button className="btn btn--remove btn--modalClose"
                onClick={closeModal}>
            &times;
        </button>

        <img className="checkImg" src={checkIcon} alt="check" />

        <h4 className="modal__inner__header modal__inner__header--addEvent">
            {language === 'pl' ? <>
                Wydarzenie zostało {update ? 'zaktualizowane' : 'dodane'}
            </> : <>
                Event has been {update ? 'updated' : 'added'}
            </>}
        </h4>

        <a className="btn btn--addEvent btn--gradient goldman" href="/wydarzenia">
            {language === 'pl' ? 'Zobacz swoje wydarzenia' : 'Check your events'}
        </a>
    </div>
};

export default AfterAddEvent;
