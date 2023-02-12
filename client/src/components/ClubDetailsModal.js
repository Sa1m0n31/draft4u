import React, {useEffect} from 'react';
import settings from "../settings";

const ClubDetailsModal = ({closeModal, clubPage, club}) => {
    useEffect(() => {
        document.addEventListener('keyup', (e) => {
            if(e.key === 'Escape') {
                closeModal();
            }
        });
    }, []);

    return <div className="modal modal--clubDetails">
        <div className="modal__inner">
            <button className="btn btn--remove btn--modalClose"
                    onClick={closeModal}>
                &times;
            </button>

            <img className="modal--clubDetails__img"
                 src={`${settings.IMAGE_URL}/image?url=/media/clubs/${club?.file_path}`}
                 alt="klub" />

            <h4 className="modal__header modal__header--clubDetails">
                {club?.name}
            </h4>
            <h5 className="modal__header modal__header--clubDetails--subheader">
                {club?.city}
            </h5>

            {clubPage ? <>
                {club?.nip ? <h5 className="modal__header modal__header--clubDetails--subheader">
                    NIP: {club?.nip}
                </h5> : ''}
                {club?.krs ? <h5 className="modal__header modal__header--clubDetails--subheader">
                    KRS: {club?.krs}
                </h5> : ''}
            </> : ''}
        </div>
    </div>
};

export default ClubDetailsModal;
