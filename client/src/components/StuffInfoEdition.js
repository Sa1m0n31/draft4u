import React, {useContext, useEffect, useState} from 'react';
import StuffExperience from "./StuffExperience";
import {addCv, deleteCv, getCvs, updateCv} from "../helpers/user";
import closeIcon from '../static/img/close-grey.svg'
import {getDate, getDateForInput, getImageUrl} from "../helpers/others";
import {ContentContext} from "../App";
import StuffEducation from "./StuffEducation";
import StuffCourses from "./StuffCourses";

const StuffInfoEdition = ({id, club}) => {
    const [cvs, setCvs] = useState([]);
    const [experience, setExperience] = useState([]);
    const [education, setEducation] = useState([]);
    const [courses, setCourses] = useState([]);
    const [modal, setModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [deleted, setDeleted] = useState(-1);
    const [update, setUpdate] = useState(false);

    const [cvToEditId, setCvToEditId] = useState(null);
    const [title, setTitle] = useState("");
    const [type, setType] = useState("");
    const [from, setFrom] = useState(null);
    const [to, setTo] = useState(null);
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState(null);

    const { content } = useContext(ContentContext);

    useEffect(() => {
        getCvs(id)
            .then((res) => {
                const result = res?.data?.result;
                if(result?.length) {
                    setExperience(result.filter((item) => {
                        return item.type === 'experience';
                    }));
                    setEducation(result.filter((item) => {
                        return item.type === 'education';
                    }));
                    setCourses(result.filter((item) => {
                        return item.type === 'courses';
                    }));
                }
            });
    }, [update]);

    const addNewCv = () => {
        addCv(type, title, from, to, description)
            .then((res) => {
                if(res?.data?.result) {
                    setUpdate(!update);
                    setStatus('Wpis został dodany');
                }
                else setStatus('Coś poszło nie tak...');
            });
    }

    const updateCvById = () => {
        updateCv(cvToEditId, title, from, to, description)
            .then((res) => {
                if(res?.data?.result) {
                    setUpdate(!update);
                    setStatus('Wpis został zaktualizowany');
                }
                else setStatus('Coś poszło nie tak...');
            });
    }

    const openCvModal = (id = null, typ = null, tit = null, f = null, t = null, desc = null) => {
        setModal(true);
        setCvToEditId(id);
        setType(typ);
        if(id) {
            setTitle(tit);
            setFrom(getDateForInput(f));
            setTo(getDateForInput(t));
            setDescription(desc);
        }
        else {
            setTitle(null);
            setFrom(null);
            setTo(null);
            setDescription(null);
        }
    }

    const deleteCvModal = (id) => {
        setDeleteModal(true);
        setCvToEditId(id);
    }

    const closeModal = () => {
        setModal(false);
        setCvToEditId(null);
    }

    const deleteCvById = () => {
        deleteCv(cvToEditId)
            .then((res) => {
                setDeleted(res?.data?.result);
                setUpdate(!update);
            });
    }

    return <section className="userInfoEdition userInfoEdition--stuff siteWidthSuperNarrow">
        {deleteModal ? <div className="deleteCvModal">
            <button className="modal__close" onClick={() => { setDeleteModal(false); }}>
                <img className="btn__img" src={closeIcon} alt="zamknij" />
            </button>

            <div className="modal__inner">
                {deleted === -1 ? <>
                    <h3 className="modal__header">
                        Czy na pewno chcesz usunąć ten wpis w CV?
                    </h3>

                    <div className="modal__buttons">
                        <button className="modal__btn" onClick={() => { deleteCvById(); }}>
                            Usuń
                        </button>
                        <button className="modal__btn" onClick={() => { setDeleteModal(false); }}>
                            Powrót
                        </button>
                    </div>
                </> : <h3 className="modal__header">
                    {deleted === 1 ? "Wpis został usunięty" : "Coś poszło nie tak... Prosimy spróbować później"}
                </h3>}
            </div>
        </div> : ''}

        {modal ? <div className="stuffModal">
            <button className="stuffModal__close" onClick={() => { setStatus(null); closeModal(); }}>
                <img className="btn__img" src={closeIcon} alt="zamknij" />
            </button>

            <h4 className="stuffModal__header">
                Doświadczenia zawodowe
            </h4>

            {!status ? <main className="stuffModal__form">
                <label className="stuffModal__label stuffModal__label--title">
                    Tytuł
                    <input className="stuffModal__input"
                           placeholder="Tytuł"
                           value={title}
                           onChange={(e) => { setTitle(e.target.value); }} />
                </label>
                <section className="stuffModal__dateLabel">
                    Data
                    <div className="stuffModal__dateWrapper">
                        <input className="stuffModal__input"
                               type="date"
                               value={from}
                               onChange={(e) => { setFrom(e.target.value); }} />
                        <span>-</span>
                        <input className="stuffModal__input"
                               type="date"
                               value={to}
                               onChange={(e) => { setTo(e.target.value); }} />
                    </div>
                </section>
                <label className="stuffModal__label stuffModal__label--desc">
                    Opis praktyki
                    <textarea className="stuffModal__input stuffModal__textarea"
                              placeholder="Opis praktyki"
                              value={description}
                              onChange={(e) => { setDescription(e.target.value); }}>

                    </textarea>
                </label>

                <button className="stuffModal__submitBtn" onClick={() => { cvToEditId ? updateCvById() : addNewCv(); }}>
                    <img className="btn__img" src={getImageUrl(content.img12)} alt="dodaj" />
                </button>
            </main> : <div className="modal__header--stuffAdded">
                <h3 className="modal__header modal__header--stuffAdded__header">
                    {status}
                </h3>
                <button className="modal__header--stuffAdded__btn" onClick={() => { setStatus(null); closeModal(); }}>
                    <img className="btn__img" src={getImageUrl(content.img12)} alt="dalej" />
                </button>
            </div>}
        </div> : ''}

        <StuffExperience cvs={experience} openCvModal={openCvModal} deleteCvModal={deleteCvModal} />
        <StuffEducation cvs={education} openCvModal={openCvModal} deleteCvModal={deleteCvModal} />
        <StuffCourses cvs={courses} openCvModal={openCvModal} deleteCvModal={deleteCvModal} />

        <a className="stuff__writeMsg" href={`/wiadomosci?new=${id}`}>
            <img className="btn__img" src={getImageUrl(content.img11)} alt="napisz" />
        </a>
    </section>
};

export default StuffInfoEdition;
