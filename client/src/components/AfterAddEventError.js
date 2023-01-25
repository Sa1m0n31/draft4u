import React from 'react';

const AfterAddEventError = ({closeModal}) => {
    return <div className="modal__inner modal__inner--after">
        <button className="btn btn--remove btn--modalClose"
                onClick={closeModal}>
            &times;
        </button>

        <h4 className="modal__inner__header modal__inner__header--addEvent">
            Coś poszło nie tak... Prosimy spróbować później.
        </h4>

        <a className="btn btn--addEvent btn--gradient goldman" href="/">
            Wróć na stronę główną
        </a>
    </div>
};

export default AfterAddEventError;
