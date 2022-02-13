import React, {useContext, useEffect, useState} from 'react'
import Header from "../components/Header";
import Footer from "../components/Footer";
import {getClubNotifications, getUserNotifications, readNotification} from "../helpers/notification";
import LoadingPage from "./LoadingPage";
import settings from "../settings";
import example from "../static/img/profile-picture.png";
import {ContentContext} from "../App";

const Notifications = ({club, user, isLocal}) => {
    const [loaded, setLoaded] = useState(false);
    const [updateNotifications, setUpdateNotifications] = useState(false);
    const [notifications, setNotifications] = useState([]);

    const { content } = useContext(ContentContext);

    useEffect(() => {
        if(window.innerWidth > 768) window.location = "/";
    }, []);

    useEffect(() => {
        if(club) {
            getClubNotifications()
                .then((res) => {
                    setNotifications(res?.data?.result);
                    setLoaded(true);
                });
        }
        if(user) {
            getUserNotifications()
                .then((res) => {
                    setNotifications(res?.data?.result);
                    setLoaded(true);
                });
        }
    }, [club, user, updateNotifications]);

    const addNotificationToRead = (id) => {
        readNotification(id)
            .then((res) => {
                setUpdateNotifications(!updateNotifications);
            });
    }

    return <div className={club ? "container container--dark" : "container container--light"}>
        {loaded ? <>
            <Header loggedIn={true} club={!!club} player={!!user} menu={club ? "light" : "dark"} theme={club ? "dark" : "light"} profileImage={club ? club.file_path : user.file_path} isLocal={isLocal} />

            <main className="notifications">
                <h2 className="notifications__header">
                    {content.notifications}
                </h2>
                <menu className={club ? "profileMenu profileMenu--club profileMenu--messages profileMenu--notifications" : "profileMenu profileMenu--messages profileMenu--notifications"}>
                    <ul className="profileMenu__list">
                        {notifications.map((item, index) => {
                            if(index < 5) {
                                return <li className="profileMenu__list__item" key={index} onClick={() => { addNotificationToRead(item.id); }}>
                                    <a className={!item.read ? "profileMenu__list__link profileMenu__list__link--new" : "profileMenu__list__link"}
                                       href={item.link}>
                                        <figure className="messageMenu__imgWrapper messageMenu__imgWrapper--notification">
                                            <img className="profileMenu__list__img" src={item.file_path ? `${settings.API_URL}/image?url=/media/notifications/${item.file_path}` : example} alt="powiadomienie" />
                                        </figure>
                                        <section className="messageMenu__list__item__content">
                                            <h3 className="messageMenu__list__item__header">
                                                {item.title}
                                            </h3>
                                            <p className="messageMenu__list__item__text">
                                                {item.content}
                                            </p>
                                        </section>
                                    </a>
                                </li>
                            }
                            else return "";
                        })}
                    </ul>
                </menu>
            </main>

            <Footer theme={club ? "dark" : "light"} border={true} />
        </> : <LoadingPage />}
    </div>
}

export default Notifications;
