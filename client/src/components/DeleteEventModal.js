import React from 'react';
import closeIcon from "../static/img/close-grey.svg";

const DeleteEventModal = ({closeModal, deleted, confirmDelete}) => {
    return <div className="modal modal--deleteVideo modal--event">
        <main className="modal__inner modal__inner--deleteVideo">
            <button className="registerModal__closeBtn" onClick={() => { closeModal(); }}>
                <img className="registerModal__closeBtn__img" src={closeIcon} alt="zamknij" />
            </button>

            <h3 className="modal__inner__header">
                {deleted === -1 ? "Czy na pewno chcesz usunąć to wydarzenie?" : (deleted === 1 ? "Wydarzenie zostało usunięte" : "Coś poszło nie tak... Prosimy spróbować później")}
            </h3>
            {deleted === -1 ? <button className="button button--hover center goldman btn--gradient modal__inner__btn" onClick={() => { confirmDelete(); }}>
                Usuń
            </button> : ""}
        </main>
    </div>
};

export default DeleteEventModal;
