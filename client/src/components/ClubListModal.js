import React, {useContext, useEffect, useState} from 'react';
import {getClubs} from "../helpers/admin";
import {getUserData, getUserToClubNotifications, sendUserToClubNotification} from "../helpers/user";
import DraftLoader from "./Loader";
import {ContentContext} from "../App";

const ClubListModal = ({closeModal, userId}) => {
    const { language, content } = useContext(ContentContext);

    const [loaded, setLoaded] = useState(false);
    const [clubs, setClubs] = useState([]);
    const [userNotifications, setUserNotifications] = useState([]);
    const [sendFlag, setSendFlag] = useState(false);
    const [userData, setUserData] = useState({});
    const [isStuff, setIsStuff] = useState(false);

    useEffect(() => {
        if(userData && clubs?.length) {
            setLoaded(true);

            if(userData?.identity?.split('-')[userData?.identity?.split('-')?.length-1] === 'stuff') {
                setIsStuff(true);
            }
        }
    }, [clubs, userData]);

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
            getUserData()
                .then((res) => {
                    if(res?.data?.result) {
                        setUserData(res.data.result);
                    }
                });

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

            {loaded ? <>
                <h4 className="modal__inner__header modal__inner__header--clubList">
                    {language === 'pl' ? 'Możesz wysłać trzy CV miesięcznie do wybranych klubów. Po kliknięciu "Wyślij" klub otrzyma ' +
                        '                    powiadomienie oraz link do Twojego profilu.' : "You can send max three CV monthly. After clicking \"Send\" club will receive notification and link to your profile."}
                    {userNotifications?.length >= 7 ? (language === 'pl' ? ' W tym miesiącu wykorzystałeś już limit wysłanych CV do klubów' : ' You already use your monthly limit') : ''}
                </h4>

                <div className="modal__inner__cv">
                    <div className="modal__clubs scroll">
                        {clubs.map((item, index) => {
                            return <div className="modal__club"
                                        key={index}>
                                <h5 className="modal__club__name">
                                    {item.name}
                                </h5>
                                {userNotifications?.includes(item.id) ? <h6 className="modal__club__sendInfo goldman">
                                    {language === 'pl' ? 'Wysłano' : 'CV has been send'}
                                </h6> : <button className="btn btn--gradient goldman center btn--hover modal__club__btn"
                                                disabled={userNotifications?.length >= 7}
                                                onClick={() => { sendCvToClub(item.id); }}>
                                    {language === 'pl' ? 'Wyślij' : 'Send'}
                                </button>}
                            </div>
                        })}
                    </div>

                    <div className="modal__cv">
                        <h4 className="modal__cv__header">
                            {userData.first_name} {userData.last_name}
                        </h4>
                        <p>
                            {content.player_parameter_1}: <b>{userData.birthday?.substring(0, 10) || ''}</b>
                        </p>
                        {isStuff ? <>
                            <p>
                                {language === 'pl' ? 'Posada' : 'Position'}: <b>{userData.stuff_position}</b>
                            </p>
                            <p>
                                {content.player_parameter_4}: <b>{userData.club || '-'}</b>
                            </p>
                        </> : <>
                            <p>
                                {content.player_parameter_11}: <b>{userData.height ? `${userData.height} cm` : '-'}</b>
                            </p>
                            <p className="mb">
                                {content.player_parameter_12}: <b>{userData.weight ? `${userData.weight} kg` : '-'}</b>
                            </p>
                            <p>
                                {content.player_parameter_4}: <b>{userData.club || '-'}</b>
                            </p>
                            <p className="mb">
                                {content.player_parameter_6}: <b>{userData.experience || '-'}</b>
                            </p>
                            <p>
                                {content.player_parameter_8}: <b>{userData.attack_range ? `${userData.attack_range} cm` : '-'}</b>
                            </p>
                            <p>
                                {content.player_parameter_10}: <b>{userData.block_range ? `${userData.block_range} cm` : '-'}</b>
                            </p>
                            <p className="mb">
                                {content.player_parameter_9}: <b>{userData.vertical_range ? `${userData.vertical_range} cm` : '-'}</b>
                            </p>
                        </>}
                        <p>
                            {content.player_parameter_3}: <b>{userData.phone_number || '-'}</b>
                        </p>
                        <p>
                            Email: <b>{userData.email || '-'}</b>
                        </p>
                    </div>
                </div>

                <button className="btn btn--addEvent btn--gradient goldman"
                        onClick={() => { closeModal(); }}>
                    {language === 'pl' ? 'Wróć na stronę główną' : 'Back to homepage'}
                </button>
            </> : <div className="center">
                <DraftLoader />
            </div>}
        </div>
    </div>
};

export default ClubListModal;
