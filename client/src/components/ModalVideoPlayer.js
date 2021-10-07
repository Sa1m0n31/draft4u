import React from 'react'
import { Player } from 'video-react'
import closeIcon from "../static/img/close-grey.svg";

const ModalVideoPlayer = ({source, closeModal}) => {
    return <main className="modalVideoPlayer">
        <main className="modalVideoPlayer__video">
            <button className="registerModal__closeBtn" onClick={() => { closeModal(); }}>
                <img className="registerModal__closeBtn__img" src={closeIcon} alt="zamknij" />
            </button>

            <Player src={source} playsInline autoPlay={true} controls={true} />
        </main>
    </main>
}

export default ModalVideoPlayer;
