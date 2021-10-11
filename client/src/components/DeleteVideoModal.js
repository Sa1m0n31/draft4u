import React, {useState} from 'react'
import {deletePlayerVideo} from "../helpers/video";
import closeIcon from "../static/img/close-grey.svg";
import deleteBtn from '../static/img/dalej-btn.png'

const DeleteVideoModal = ({setVideoUpload, videoUpload, userId, play, setModalClose}) => {
    const [deleted, setDeleted] = useState(-1);

    const confirmDelete = () => {
        deletePlayerVideo(userId, play)
            .then((res) => {
                if(res.data.result) setDeleted(1);
                else setDeleted(0);
                setVideoUpload(videoUpload+1);
                setTimeout(() => {
                    setModalClose(false);
                }, 1000);
            });
    }

    const closeModal = () => {
        setModalClose(false);
    }

    return <div className="modal">
        <main className="modal__inner modal__inner--deleteVideo">
            <button className="registerModal__closeBtn" onClick={() => { closeModal(); }}>
                <img className="registerModal__closeBtn__img" src={closeIcon} alt="zamknij" />
            </button>

            <h3 className="modal__inner__header">
                {deleted === -1 ? "Czy na pewno chcesz usunąć video?" : (deleted === 1 ? "Video zostało usunięte" : "Coś poszło nie tak... Prosimy spróbować później")}
            </h3>
            <button className="button button--hover modal__inner__btn" onClick={() => { confirmDelete(); }}>
                <img className="btn__img" src={deleteBtn} alt="usun" />
            </button>
        </main>
    </div>
}

export default DeleteVideoModal;
