import React, { useState, useEffect } from 'react'
import AdminTop from "../components/AdminTop";
import PanelMenu from "../components/PanelMenu";
import trashIcon from "../static/img/trash-black.svg";
import penIcon from '../static/img/pen-white.png'
import {deleteNotification, getAllNotifications} from "../helpers/notification";
import settings from "../settings";

const AdminNotificationList = () => {
    const [notifications, setNotifications] = useState([]);
    const [candidateToDelete, setCandidateToDelete] = useState(0);
    const [deleteStatus, setDeleteStatus] = useState(-1);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);

    useEffect(() => {
        getAllNotifications()
            .then((res) => {
               setNotifications(res?.data?.result);
            });
    }, []);

    const openDeleteModal = (id) => {
        setCandidateToDelete(id);
        setDeleteModalOpen(true);
    }

    const deleteNotificationWrapper = () => {
        deleteNotification(candidateToDelete)
            .then((res) => {
                if(res?.data?.result) setDeleteStatus(1);
                else setDeleteStatus(0);
            });
    }

    return <div className="container container--dark container--admin">
        <AdminTop />
        <main className="admin">
            <PanelMenu menuOpen={2} />
            <main className="admin__main">
                <h1 className="admin__main__header">
                    Lista powiadomień
                </h1>
                {notifications?.reverse()?.map((item, index) => {
                    return <section className="admin__main__notification__item" key={index}>
                        <section className="admin__main__notification__item__col col-1">
                            {item.file_path ? <figure className="admin__main__notification__item__imgWrapper">
                                <img className="admin__main__notification__item__img btn__img" src={`${settings.API_URL}/image?url=/media/notifications/${item.file_path}`} alt={item.title} />
                            </figure> : "-"}
                        </section>
                        <section className="admin__main__notification__item__col col-2">
                            <h3 className="admin__main__notification__item__key">
                                Id
                            </h3>
                            <h4 className="admin__main__notification__item__value">
                                {item.id}
                            </h4>
                        </section>
                        <section className="admin__main__notification__item__col col-3">
                            <h3 className="admin__main__notification__item__key">
                                Tytuł
                            </h3>
                            <h4 className="admin__main__notification__item__value">
                                {item.title}
                            </h4>
                        </section>
                        <section className="admin__main__notification__item__col col-4">
                            <h3 className="admin__main__notification__item__key">
                                Akcje
                            </h3>
                            <section className="admin__main__notification__item__buttons">
                                <button className="admin__main__notification__item__btn" onClick={() => { openDeleteModal(item.id); }}>
                                    <img className="btn__img" src={trashIcon} alt="usun" />
                                </button>
                                <a className="admin__main__notification__item__btn" href={`/dodaj-powiadomienie?id=${item.id}`}>
                                    <img className="btn__img" src={penIcon} alt="edytuj" />
                                </a>
                            </section>
                        </section>
                    </section>
                })}
            </main>
        </main>
    </div>
}

export default AdminNotificationList;
