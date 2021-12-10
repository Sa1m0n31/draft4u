import React, {useEffect, useRef, useState} from 'react'
import AdminTop from "../components/AdminTop";
import PanelMenu from "../components/PanelMenu";
import closeIcon from "../static/img/close-grey.svg";
import trashIcon from "../static/img/block.svg";
import unlockIcon from "../static/img/unlock.svg";
import {banUser, getUsers, unlockUser} from "../helpers/admin";

const AdminPlayersList = () => {
    const [players, setPlayers] = useState([]);
    const [candidateToDelete, setCandidateToDelete] = useState(0);
    const [deleteStatus, setDeleteStatus] = useState(-1);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [blockMode, setBlockMode] = useState(true);

    const deleteModal = useRef(null);

    useEffect(() => {
        getUsers()
            .then((res) => {
                setPlayers(res?.data?.result);
            });

        if(deleteStatus !== -1) {
            setTimeout(() => {
                setDeleteStatus(-1);
            }, 3000);
        }

        if(deleteStatus === -1) setDeleteModalOpen(false);
    }, [deleteStatus]);

    const banUserWrapper = () => {
        if(blockMode) {
            banUser(candidateToDelete)
                .then((res) => {
                    if(res?.data?.result) setDeleteStatus(1);
                    else setDeleteStatus(0);
                });
        }
        else {
            unlockUser(candidateToDelete)
                .then((res) => {
                    if(res?.data?.result) setDeleteStatus(1);
                    else setDeleteStatus(0);
                });
        }
    }

    const openDeleteModal = (id, active) => {
        if(active) setBlockMode(true);
        else setBlockMode(false);

        setCandidateToDelete(id);
        setDeleteModalOpen(true);
    }

    useEffect(() => {
        if(deleteModalOpen) {
            deleteModal.current.style.zIndex = "10";
            deleteModal.current.style.opacity = "1";
        }
        else {

            deleteModal.current.style.zIndex = "-1";
            deleteModal.current.style.opacity = "0";
        }
    }, [deleteModalOpen]);

    return <div className="container container--dark container--admin">
        <AdminTop />

        <div className="modal modal--deleteSquad" ref={deleteModal}>
            <div className="modal__inner">
                <button className="modal__close" onClick={() => { setDeleteModalOpen(false); }}>
                    <img className="btn__img" src={closeIcon} alt="zamknij" />
                </button>

                {deleteStatus === -1 ? <>
                    <h3 className="modal__header">
                        Czy na pewno chcesz {blockMode ? "zablokować" : "odblokować"} konto tego zawodnika?
                    </h3>

                    <div className="modal__buttons">
                        <button className="modal__btn" onClick={() => { banUserWrapper(); }}>
                            {blockMode ? "Zablokuj" : "Odblokuj"}
                        </button>
                        <button className="modal__btn" onClick={() => { setDeleteModalOpen(false); }}>
                            Powrót
                        </button>
                    </div>
                </> : (blockMode ? <h3 className="modal__header">
                    {deleteStatus === 1 ? "Zawodnik został zablokowany" : "Coś poszło nie tak... Prosimy spróbować później lub skontaktować się z administratorem"}
                </h3> : <h3 className="modal__header">
                    {deleteStatus === 1 ? "Zawodnik został odblokowany" : "Coś poszło nie tak... Prosimy spróbować później lub skontaktować się z administratorem"}
                </h3>)}
            </div>
        </div>

        <main className="admin">
            <PanelMenu menuOpen={1} />
            <main className="admin__main">
                {players?.map((item, index) => {
                    return <section className="admin__main__notification__item" key={index}>
                        <section className="admin__main__notification__item__col col-2">
                            <h3 className="admin__main__notification__item__key">
                                Id
                            </h3>
                            <h4 className="admin__main__notification__item__value">
                                {item.user_id}
                            </h4>
                        </section>
                        <section className="admin__main__notification__item__col col-3">
                            <h3 className="admin__main__notification__item__key">
                                Imię i nazwisko
                            </h3>
                            <h4 className="admin__main__notification__item__value">
                                {item.first_name} {item.last_name}
                            </h4>
                        </section>
                        <section className="admin__main__notification__item__col col-2">
                            <h3 className="admin__main__notification__item__key">
                                Subskrypcja
                            </h3>
                            <h4 className="admin__main__notification__item__value">
                                {new Date(item.subscription) > new Date() ? <>
                                    <p className="green">{item.subscription.substring(0, 10)}</p>
                                </> : <p className="red">
                                    Nieaktywna
                                </p>}
                            </h4>
                        </section>
                        <section className="admin__main__notification__item__col col-3">
                            <h3 className="admin__main__notification__item__key">
                                Aktywny
                            </h3>
                            <h4 className="admin__main__notification__item__value">
                                {item.active ? <span className="green">Tak</span> : <span className="red">
                                    {item.active === null ? "Zablokowany" : "Niezweryfikowany"}
                                </span>}
                            </h4>
                        </section>
                        <section className="admin__main__notification__item__col col-4">
                            <h3 className="admin__main__notification__item__key">
                                Zalogowany przez
                            </h3>
                            <h4 className="admin__main__notification__item__value">
                                {item.adapter === 1 ? 'Konto w serwisie' : (item.adapter === 2 ? 'Facebook' : 'Google')}
                            </h4>
                        </section>
                        <section className="admin__main__notification__item__col col-4">
                            <h3 className="admin__main__notification__item__key">
                                Akcje
                            </h3>
                            <section className="admin__main__notification__item__buttons">
                                <button className="admin__main__notification__item__btn admin__main__notification__item__btn--block" onClick={() => { openDeleteModal(item.id, item.active); }}>
                                    {item.active !== null ? <img className="btn__img" src={trashIcon} alt="zablokuj" /> : <img className="btn__img" src={unlockIcon} alt="odblokuj" />}
                                </button>
                            </section>
                        </section>
                    </section>
                })}
            </main>
        </main>
    </div>
}

export default AdminPlayersList;
