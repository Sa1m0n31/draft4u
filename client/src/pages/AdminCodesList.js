import React, {useEffect, useRef, useState} from 'react'
import AdminTop from "../components/AdminTop";
import PanelMenu from "../components/PanelMenu";
import closeIcon from "../static/img/close-grey.svg";
import {deleteArticle, getAllArticles} from "../helpers/blog";
import settings from "../settings";
import trashIcon from "../static/img/trash-black.svg";
import penIcon from "../static/img/pen-white.png";
import {deleteCoupon, getAllCoupons} from "../helpers/coupon";

const AdminCodesList = () => {
    const [codes, setCodes] = useState([]);
    const [candidateToDelete, setCandidateToDelete] = useState(0);
    const [deleteStatus, setDeleteStatus] = useState(-1);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);

    const deleteModal = useRef(null);

    useEffect(() => {
        getAllCoupons()
            .then((res) => {
                setCodes(res?.data?.result);
            });

        if(deleteStatus !== -1) {
            setTimeout(() => {
                setDeleteStatus(-1);
            }, 3000);
        }

        if(deleteStatus === -1) setDeleteModalOpen(false);
    }, [deleteStatus]);

    const deleteCodeWrapper = () => {
        deleteCoupon(candidateToDelete)
            .then((res) => {
                if(res?.data?.result) setDeleteStatus(1);
                else setDeleteStatus(0);
            })
    }

    const openDeleteModal = (id) => {
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
                        Czy na pewno chcesz usunąć ten kod rabatowy?
                    </h3>

                    <div className="modal__buttons">
                        <button className="modal__btn" onClick={() => { deleteCodeWrapper(); }}>
                            Usuń
                        </button>
                        <button className="modal__btn" onClick={() => { setDeleteModalOpen(false); }}>
                            Powrót
                        </button>
                    </div>
                </> : <h3 className="modal__header">
                    {deleteStatus === 1 ? "Kod rabatowy został usunięty" : "Coś poszło nie tak... Prosimy spróbować później lub skontaktować się z administratorem"}
                </h3>}
            </div>
        </div>

        <main className="admin">
            <PanelMenu menuOpen={5} />
            <main className="admin__main">
                {codes?.reverse()?.map((item, index) => {
                    return <section className="admin__main__notification__item" key={index}>
                        <section className="admin__main__notification__item__col col-1">
                            {item.file_path ? <figure className="admin__main__notification__item__imgWrapper">
                                <img className="admin__main__notification__item__img btn__img" src={`${settings.IMAGE_URL}/image?url=/media/blog/${item.file_path}`} alt={item.title} />
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
                                Kod
                            </h3>
                            <h4 className="admin__main__notification__item__value">
                                {item.name}
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
                                <a className="admin__main__notification__item__btn" href={`/dodaj-kod?id=${item.id}`}>
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

export default AdminCodesList;
