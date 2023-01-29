import React, {useEffect, useState} from 'react';
import AfterAddEntry from "./AfterAddEntry";
import AfterAddEventError from "./AfterAddEventError";
import {getUserById} from "../helpers/user";
import profileImageExample from '../static/img/profile-picture.png';
import settings from "../settings";
import {acceptEventEntry} from "../helpers/event";
import {deleteNotification} from "../helpers/notification";

const EventEntryConfirmModal = ({notificationId, eventId, userId, closeModal}) => {
    const [status, setStatus] = useState(0);
    const [user, setUser] = useState({});

    useEffect(() => {
        getUserById(userId)
            .then((res) => {
                if(res?.data?.result) {
                    setUser(res.data.result);
                }
            });
    }, []);

    const acceptUserEntry = () => {
        acceptEventEntry(eventId, userId, user.identity)
            .then((res) => {
                if(res?.data?.result) {
                    setStatus(1);
                }
                else {
                    setStatus(-1);
                }
            })
            .catch(() => {
                setStatus(-1);
            });
    }

    const removeEntry = () => {
        deleteNotification(notificationId)
            .then((res) => {
               closeModal();
            });
    }

    return <div className="modal modal--event modal--eventInfo modal--entryConfirmation">
        {!status ? <div className="modal__inner">
            <button className="btn btn--remove btn--modalClose"
                    onClick={closeModal}>
                &times;
            </button>

            <figure className="modal__profileImage">
                <img className="img"
                     src={user.file_path ? `${settings.API_URL}/image?url=/media/users/${user.file_path}` : profileImageExample}
                     alt="profilowe" />
            </figure>

            <h4 className="modal__header modal__header--event goldman">
                {user.first_name} {user.last_name}
            </h4>
            <a className="modal__profileBtn" href={`/profil-zawodnika?id=${userId}`}>
                Zobacz profil
            </a>

            <h4 className="modal__header modal__header--text goldman">
                Czy chcesz potwierdzić zapis tego zawodnika na wydarzenie?
            </h4>

            <div className="modal__buttons">
                <button className="btn btn--gradient goldman center btn--acceptEntry"
                        onClick={() => { acceptUserEntry(); }}>
                    Akceptuj
                </button>
                <button className="btn btn--gradient goldman center btn--acceptEntry btn--removeEntry"
                        onClick={() => { removeEntry(); }}>
                    Odrzuć
                </button>
            </div>
        </div> : (status === 1 ? <AfterAddEntry entryAccept={true} closeModal={closeModal} /> : <AfterAddEventError closeModal={closeModal} />)}
    </div>
};

export default EventEntryConfirmModal;
