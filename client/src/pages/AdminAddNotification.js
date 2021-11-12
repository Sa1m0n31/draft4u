import React, {useEffect, useState} from 'react'
import AdminTop from "../components/AdminTop";
import PanelMenu from "../components/PanelMenu";
import {getClubs, getUsers} from "../helpers/admin";
import {isElementInArray} from "../helpers/others";
import Dropzone from "react-dropzone-uploader";
import ProfileImagePreview from "../components/ProfileImagePreview";
import trashIcon from '../static/img/trash-black.svg'
import {addNotification} from "../helpers/notification";

const AdminAddNotification = () => {
    const [title, setTitle] = useState("");
    const [link, setLink] = useState("");
    const [text, setText] = useState("");
    const [sendList, setSendList] = useState([]);
    const [clubs, setClubs] = useState([]);
    const [users, setUsers] = useState([]);
    const [allClubsSelected, setAllClubsSelected] = useState(false);
    const [allUsersSelected, setAllUsersSelected] = useState(false);
    const [img, setImg] = useState(null);
    const [status, setStatus] = useState(-1);

    useEffect(() => {
        getClubs()
            .then((res) => {
                setClubs(res?.data?.result);
            });

        getUsers()
            .then((res) => {
                setUsers(res?.data?.result);
            });
    }, []);

    const isElementClub = (clubId) => {
        return clubs.findIndex((item) => {
            return item.id === clubId;
        }) !== -1;
    }

    const addToSendList = (id, isClub = true) => {
        if(id === 1) {
            if(allClubsSelected) {
                setSendList(sendList.filter((item) => {
                    return !isElementClub(item);
                }));
                setAllClubsSelected(false);
            }
            else {
                setSendList(clubs.map((item) => {
                    return item.id;
                }).concat(sendList));
                setAllClubsSelected(true);
            }
            return 0;
        }
        else if(id === 2) {
            if(allUsersSelected) {
                setSendList(sendList.filter((item) => {
                    return isElementClub(item);
                }));
                setAllUsersSelected(false);
            }
            else {
                setSendList(users.map((item) => {
                    return item.id;
                }).concat(sendList));
                setAllUsersSelected(true);
            }
            return 0;
        }

        if(isElementInArray(sendList, id)) {
            setSendList(sendList.filter((item) => {
                return item !== id;
            }));
            if(isClub) setAllClubsSelected(false);
            else setAllUsersSelected(false);
        }
        else {
            setSendList([...sendList, id]);
        }
    }

    const getUploadImage = (img) => {
        console.log(img);
    }

    const handleChangeStatus = (status) => {
        setImg(status);
    }

    const deleteImg = () => {
        if(img) {
            img.remove();
            setImg(null);
        }
    }

    const handleSubmit = () => {
        if(title) {
            addNotification(title, link, text, img.file, sendList)
                .then((res) => {
                    setStatus(res?.data?.result);
                });
        }
    }

    useEffect(() => {
        if(status !== -1) {
            setTimeout(() => {
                setStatus(-1);

                setTitle("");
                setLink("");
                setText("");
                img.remove();
                setImg(null);
                setSendList([]);
                setAllUsersSelected(false);
                setAllClubsSelected(false);
            }, 5000);
        }
    }, [status]);

    return <div className="container container--dark container--admin">
        <AdminTop />
        <main className="admin">
            <PanelMenu menuOpen={2} />
            <main className="admin__main">
                <header className="admin__flex">
                    <h1 className="admin__main__header">
                        Dodaj nowe powiadomienie
                    </h1>
                    {status !== -1 ? <span className="admin__status">
                        {status === 1 ? <span className="admin__status__inner admin__status--success">
                            Notyfikacja została dodana
                        </span> : (status === 2) ? <span className="admin__status__inner admin__status--success">
                            Notyfikacja została zaktualizowana
                        </span> : <span className="admin__status__inner admin__status--error">
                            Coś poszło nie tak... Skontaktuj się z administratorem systemu
                        </span>}
                    </span> : ""}
                </header>
                <main className="admin__flex">
                    <section className="admin__main__form">
                        <label className="admin__label">
                            Tytuł
                            <input className="admin__input admin__input--title"
                                   name="title"
                                   value={title}
                                   onChange={(e) => { setTitle(e.target.value); }}
                                   placeholder="Tu wpisz tytuł powiadomienia" />
                        </label>
                        <label className="admin__label">
                            Link
                            <input className="admin__input admin__input--title"
                                   name="link"
                                   value={link}
                                   onChange={(e) => { setLink(e.target.value); }}
                                   placeholder="Tu wpisz link powiadomienia" />
                        </label>
                        <label className="admin__label">
                            Treść
                            <textarea className="admin__input admin__input--notificationContent"
                                      name="text"
                                      value={text}
                                      onChange={(e) => { setText(e.target.value); }}
                                      placeholder="Tu wpisz treść powiadomienia" />
                        </label>
                        <label className="admin__label">
                            Obrazek
                            <span className="admin__label__imgUpload">
                                {img ? <button className="admin__label__imgUpload__trashBtn" onClick={() => { deleteImg(); }}>
                                    <img className="btn__img" src={trashIcon} alt="usun" />
                                </button> : ""}
                                <Dropzone
                                    canRemove={true}
                                    getUploadParams={getUploadImage}
                                    onChangeStatus={(status) => { handleChangeStatus(status); }}
                                    accept="image/*"
                                    maxFiles={1} />
                            </span>
                        </label>
                        <button className="admin__btn admin__btn--addNotification"
                                disabled={status !== -1}
                                onClick={() => { handleSubmit(); }}>
                            Dodaj powiadomienie
                        </button>
                    </section>

                    <section className="admin__notificationChecklist">
                        <h3 className="admin__smallHeader">
                            Wybierz kluby
                        </h3>
                        <label className="admin__notificationChecklist__item">
                            <button className={allClubsSelected ? "admin__notificationChecklist__btn admin__notificationChecklist__btn--selected" : "admin__notificationChecklist__btn"} onClick={() => { addToSendList(1, null); }}>

                            </button>
                            Wyślij powiadomienie do wszystkich klubów
                        </label>
                        <section className="admin__notificationChecklist__scroll">
                            {clubs.map((item, index) => {
                                return <label className="admin__notificationChecklist__item">
                                    <button className={isElementInArray(sendList, item.id) ? "admin__notificationChecklist__btn admin__notificationChecklist__btn--selected" : "admin__notificationChecklist__btn"} onClick={() => { addToSendList(item.id, true); }}>
                                    </button>
                                    {item.name}
                                </label>
                            })}
                        </section>

                        <h3 className="admin__smallHeader">
                            Wybierz zawodników
                        </h3>
                        <label className="admin__notificationChecklist__item">
                            <button className={allUsersSelected ? "admin__notificationChecklist__btn admin__notificationChecklist__btn--selected" : "admin__notificationChecklist__btn"} onClick={() => { addToSendList(2); }}>

                            </button>
                            Wyślij powiadomienie do wszystkich zawodników
                        </label>
                        <section className="admin__notificationChecklist__scroll">
                            {users.map((item, index) => {
                                return <label className="admin__notificationChecklist__item">
                                    <button className={isElementInArray(sendList, item.id) ? "admin__notificationChecklist__btn admin__notificationChecklist__btn--selected" : "admin__notificationChecklist__btn"} onClick={() => { addToSendList(item.id, false); }}>

                                    </button>
                                    {item.first_name} {item.last_name} ({item.email})
                                </label>
                            })}
                        </section>
                    </section>
                </main>
            </main>
        </main>
    </div>
}

export default AdminAddNotification;
