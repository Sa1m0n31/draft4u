import React, { useContext } from 'react';
import {ContentContext} from "../App";

const AfterAddEventError = ({closeModal}) => {
    const { language } = useContext(ContentContext);

    return <div className="modal__inner modal__inner--after">
        <button className="btn btn--remove btn--modalClose"
                onClick={closeModal}>
            &times;
        </button>

        <h4 className="modal__inner__header modal__inner__header--addEvent">
            {language === 'pl' ? 'Coś poszło nie tak... Prosimy spróbować później.' : 'Something went wrong... Please try again later'}
        </h4>

        <a className="btn btn--addEvent btn--gradient goldman" href="/">
            {language === 'pl' ? 'Wróć na stronę główną' : 'Back to homepage'}
        </a>
    </div>
};

export default AfterAddEventError;
