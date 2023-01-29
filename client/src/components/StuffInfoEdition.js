import React, {useContext, useEffect, useState} from 'react';
import StuffExperience from "./StuffExperience";
import {addCv, deleteCv, getCvs, updateCv} from "../helpers/user";
import closeIcon from '../static/img/close-grey.svg'
import {getDate, getDateForInput, getImageUrl} from "../helpers/others";
import {ContentContext, StuffContext} from "../App";
import StuffEducation from "./StuffEducation";
import StuffCourses from "./StuffCourses";
import {TestClubContext} from "../wrappers/ClubWrapper";

const StuffInfoEdition = ({id, club}) => {
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
    const [error, setError] = useState("");

    const { content } = useContext(ContentContext);
    const { testClub } = useContext(TestClubContext);

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
        if(!title) {
            setError(content.cv_input_error1);
            return 0;
        }
        else if(!from || !to) {
            setError(content.cv_input_error2);
            return 0;
        }
        else if(!description) {
            setError(content.cv_input_error3);
            return 0;
        }

        addCv(type, title, from, to, description)
            .then((res) => {
                if(res?.data?.result) {
                    setUpdate(!update);
                    setError("");
                    setStatus(content.cv_added);
                }
                else setStatus(content.error);
            });
    }

    const updateCvById = () => {
        if(!title) {
            setError(content.cv_input_error1);
            return 0;
        }
        else if(!from || !to) {
            setError(content.cv_input_error2);
            return 0;
        }
        else if(!description) {
            setError(content.cv_input_error3);
            return 0;
        }

        updateCv(cvToEditId, title, from, to, description)
            .then((res) => {
                if(res?.data?.result) {
                    setUpdate(!update);
                    setError("");
                    setStatus(content.cv_updated);
                }
                else setStatus(content.error);
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

        if(window.innerWidth < 997) {
            document.querySelector('html').style.height = '100%';
            document.querySelector('html').style.overflow = 'hidden';
            document.querySelector('body').style.height = '100%';
            document.querySelector('body').style.overflow = 'hidden';
        }
    }

    const deleteCvModal = (id) => {
        if(window.innerWidth < 997) {
            document.querySelector('html').style.height = '100%';
            document.querySelector('html').style.overflow = 'hidden';
            document.querySelector('body').style.height = '100%';
            document.querySelector('body').style.overflow = 'hidden';
        }

        setDeleteModal(true);
        setDeleted(-1);
        setCvToEditId(id);
    }

    const closeModal = () => {
        document.querySelector('html').style.height = 'auto';
        document.querySelector('html').style.overflowY = 'scroll';
        document.querySelector('body').style.height = 'auto';
        document.querySelector('body').style.overflowY = 'default';

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

    return <section className="userInfoEdition userInfoEdition--stuff userInfoEdition--stuff--club siteWidthSuperNarrow">
        {deleteModal ? <div className="deleteCvModal">
            <button className="modal__close" onClick={() => { setDeleteModal(false); }}>
                <img className="btn__img" src={closeIcon} alt="zamknij" />
            </button>

            <div className="modal__inner">
                {deleted === -1 ? <>
                    <h3 className="modal__header">
                        {content.delete_cv_text}
                    </h3>

                    <div className="modal__buttons">
                        <button className="modal__btn" onClick={() => { deleteCvById(); }}>
                            {content.delete_cv_yes}
                        </button>
                        <button className="modal__btn" onClick={() => { setDeleteModal(false); }}>
                            {content.delete_cv_no}
                        </button>
                    </div>
                </> : <h3 className="modal__header">
                    {deleted === 1 ? content.cv_deleted : content.error}
                </h3>}
            </div>
        </div> : ''}

        {modal ? <div className="stuffModal">
            <button className="stuffModal__close" onClick={() => { setStatus(null); closeModal(); }}>
                <img className="btn__img" src={closeIcon} alt="zamknij" />
            </button>

            <h4 className="stuffModal__header">
                {type === 'experience' ? content.cv_type1 : (type === 'education' ? content.cv_type2 : content.cv_type3)}
            </h4>

            {!status ? <main className="stuffModal__form">
                <label className="stuffModal__label stuffModal__label--title">
                    {content.cv_input1}
                    <input className="stuffModal__input"
                           placeholder={content.cv_input1}
                           value={title}
                           onChange={(e) => { setTitle(e.target.value); }} />
                </label>
                <section className="stuffModal__dateLabel">
                    {content.cv_input2}
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
                    {content.cv_input3}
                    <textarea className="stuffModal__input stuffModal__textarea"
                              placeholder={content.cv_input3}
                              value={description}
                              onChange={(e) => { setDescription(e.target.value); }}>
                    </textarea>
                </label>

                {error ? <span className="stuffModal__error">
                    {error}
                </span> : ''}
                <button className="modal__header--stuffAdded__btn btn--addExperience btn--gradient center goldman stuffModal__submitBtn" onClick={() => { cvToEditId ? updateCvById() : addNewCv(); }}>
                    Dalej
                </button>
            </main> : <div className="modal__header--stuffAdded">
                <h3 className="modal__header modal__header--stuffAdded__header">
                    {status}
                </h3>
                <button className="modal__header--stuffAdded__btn btn--addExperience btn--gradient center goldman" onClick={() => { setStatus(null); closeModal(); }}>
                    Powrót
                </button>
            </div>}
        </div> : ''}

        <StuffExperience club={club} cvs={experience} openCvModal={openCvModal} deleteCvModal={deleteCvModal} />
        <StuffEducation club={club} cvs={education} openCvModal={openCvModal} deleteCvModal={deleteCvModal} />
        <StuffCourses club={club} cvs={courses} openCvModal={openCvModal} deleteCvModal={deleteCvModal} />

        {club && !testClub ? <a className="stuff__writeMsg" href={`/wiadomosci?new=${id}`}>
            <img className="btn__img" src={getImageUrl(content.img11)} alt="napisz" />
        </a> : ''}
    </section>
};

export default StuffInfoEdition;
