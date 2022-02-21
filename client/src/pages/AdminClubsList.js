import React, {useEffect, useState, useRef} from 'react'
import AdminTop from "../components/AdminTop";
import closeIcon from "../static/img/close-grey.svg";
import PanelMenu from "../components/PanelMenu";
import settings from "../settings";
import trashIcon from "../static/img/block.svg";
import penIcon from "../static/img/pen-white.png";
import unlockIcon from '../static/img/unlock.svg';
import {banUser, getClubs, unlockUser} from "../helpers/admin";

const AdminClubsList = ({admin}) => {
    const [clubs, setClubs] = useState([]);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [deleteStatus, setDeleteStatus] = useState(-1);
    const [candidateToDelete, setCandidateToDelete] = useState(0);
    const [blockMode, setBlockMode] = useState(true);

    const deleteModal = useRef(null);

    useEffect(() => {
        getClubs()
            .then((res) => {
                setClubs(res?.data?.result);
            });

        if(deleteStatus !== -1) {
            setTimeout(() => {
                setDeleteStatus(-1);
            }, 3000);
        }

        if(deleteStatus === -1) setDeleteModalOpen(false);
    }, [deleteStatus]);

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
        if(!active) setBlockMode(false);
        else setBlockMode(true);

        setCandidateToDelete(id);
        setDeleteModalOpen(true);
    }

    return <div className="container container--dark container--admin">
        <AdminTop />

        <div className="modal modal--deleteSquad" ref={deleteModal}>
            <div className="modal__inner">
                <button className="modal__close" onClick={() => { setDeleteModalOpen(false); }}>
                    <img className="btn__img" src={closeIcon} alt="zamknij" />
                </button>

                {deleteStatus === -1 ? <>
                    <h3 className="modal__header">
                        Czy na pewno chcesz {blockMode ? "zablokować" : "odblokować"} ten klub?
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
                        {deleteStatus === 1 ? "Klub został zablokowany" : "Coś poszło nie tak... Prosimy spróbować później lub skontaktować się z administratorem"}
                    </h3> : <h3 className="modal__header">
                        {deleteStatus === 1 ? "Klub został odblokowany" : "Coś poszło nie tak... Prosimy spróbować później lub skontaktować się z administratorem"}
                    </h3>)}
            </div>
        </div>

        <main className="admin">
            <PanelMenu menuOpen={0} />
            <main className="admin__main">
                <h1 className="admin__main__header">
                    Lista klubów
                </h1>
                {clubs?.reverse()?.map((item, index) => {
                    return <section className="admin__main__notification__item" key={index}>
                        <section className="admin__main__notification__item__col col-2">
                            <h3 className="admin__main__notification__item__key">
                                Ostatnie logowanie
                            </h3>
                            <h4 className="admin__main__notification__item__value">
                                {item.login_time ? <span>
                                        {item.login_time.substring(0, 10)}<br/>
                                    {item.login_time.substring(11, 19)}
                                    </span>: 'Brak danych'}
                            </h4>
                        </section>
                        <section className="admin__main__notification__item__col col-1">
                            {item.file_path ? <figure className="admin__main__notification__item__imgWrapper">
                                <img className="admin__main__notification__item__img btn__img" src={`${settings.API_URL}/image?url=/media/clubs/${item.file_path}`} alt={item.title} />
                            </figure> : ''}
                        </section>
                        <section className="admin__main__notification__item__col col-2">
                            <h3 className="admin__main__notification__item__key">
                                Login
                            </h3>
                            <h4 className="admin__main__notification__item__value">
                                {item.login}
                            </h4>
                        </section>
                        <section className="admin__main__notification__item__col col-3">
                            <h3 className="admin__main__notification__item__key">
                                Nazwa klubu
                            </h3>
                            <h4 className="admin__main__notification__item__value">
                                {item.name}
                            </h4>
                        </section>
                        <section className="admin__main__notification__item__col col-3">
                            <h3 className="admin__main__notification__item__key">
                                Aktywny
                            </h3>
                            <h4 className="admin__main__notification__item__value">
                                {!item.file_path ? 'Konto testowe' : item.active ? <span className="green">Tak</span> : <span className="red">Zablokowany</span>}
                            </h4>
                        </section>
                        <section className="admin__main__notification__item__col col-4">
                            <h3 className="admin__main__notification__item__key">
                                Akcje
                            </h3>
                            <section className="admin__main__notification__item__buttons">
                                <button className="admin__main__notification__item__btn admin__main__notification__item__btn--block" onClick={() => { openDeleteModal(item.id, item.active); }}>
                                    {item.active ? <img className="btn__img" src={trashIcon} alt="usun" /> : <img className="btn__img" src={unlockIcon} alt="odblokuj" />}
                                </button>
                                <a className="admin__main__notification__item__btn" href={`/dodaj-klub?id=${item.id}`}>
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

export default AdminClubsList;
