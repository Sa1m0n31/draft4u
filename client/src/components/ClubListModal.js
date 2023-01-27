import React, {useEffect, useState} from 'react';
import {getClubs} from "../helpers/admin";
import {getUserToClubNotifications, sendUserToClubNotification} from "../helpers/user";

const ClubListModal = ({closeModal, userId}) => {
    const [clubs, setClubs] = useState([]);
    const [userNotifications, setUserNotifications] = useState([]);
    const [sendFlag, setSendFlag] = useState(false);

    useEffect(() => {
        getClubs()
            .then((res) => {
                if(res?.data?.result) {
                    setClubs(res.data.result.filter((item) => (item.name !== 'test')));
                }
            });
    }, []);

    useEffect(() => {
        if(userId) {
            getUserToClubNotifications(userId)
                .then((res) => {
                    if(res?.data?.result) {
                        const allNotifications = res.data.result;

                        setUserNotifications(allNotifications.filter((item) => {
                            const notificationDate = new Date(item.date);
                            const now = new Date();

                            return (notificationDate.getFullYear() === now.getFullYear())
                                && (notificationDate.getMonth() === now.getMonth());
                        }).map((item) => (item.club_id)));
                    }
                });
        }
    }, [userId, sendFlag]);

    const sendCvToClub = (id) => {
        sendUserToClubNotification(userId, id)
            .then((res) => {
                setSendFlag(p => !p);
            });
    }

    return <div className="modal modal--event modal--clubList">
        <div className="modal__inner modal__inner--after">
            <button className="btn btn--remove btn--modalClose"
                    onClick={closeModal}>
                &times;
            </button>

            <h4 className="modal__inner__header modal__inner__header--clubList">
                Możesz wysłać trzy CV miesięcznie do wybranych klubów. Po kliknięciu "Wyślij" klub otrzyma
                powiadomienie oraz link do Twojego profilu.
                {userNotifications?.length >= 3 ? 'W tym miesiącu wykorzystałeś już limit wysłanych CV do klubów' : ''}
            </h4>

            <div className="modal__clubs scroll">
                {clubs.map((item, index) => {
                    return <div className="modal__club"
                                key={index}>
                        <h5 className="modal__club__name">
                            {item.name}
                        </h5>
                        {userNotifications?.includes(item.id) ? <h6 className="modal__club__sendInfo goldman">
                            Wysłano
                        </h6> : <button className="btn btn--gradient goldman center btn--hover modal__club__btn"
                                        disabled={userNotifications?.length >= 3}
                                        onClick={() => { sendCvToClub(item.id); }}>
                            Wyślij
                        </button>}
                    </div>
                })}
            </div>

            <button className="btn btn--addEvent btn--gradient goldman"
                    onClick={() => { closeModal(); }}>
                Wróć na stronę główną
            </button>
        </div>
    </div>
};

export default ClubListModal;
