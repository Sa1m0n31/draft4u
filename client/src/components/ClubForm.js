import React, {useState, useEffect, useContext} from 'react';
import img3 from "../static/img/strefa-zawodnika-2.png";
import submitBtn from '../static/img/wyslij-btn.svg'
import {isMail} from "../helpers/validation";
import {sendClubForm} from "../helpers/club";
import {ContentContext} from "../App";
import {getImageUrl} from "../helpers/others";

const ClubForm = () => {
    const { content } = useContext(ContentContext);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [msg, setMsg] = useState("");

    const [nameError, setNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [phoneError, setPhoneError] = useState("");
    const [confirmMsg, setConfirmMsg] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        let error = true;

        if(!name) {
            setNameError(content.name_error);
        }
        else if(!email) {
            setEmailError(content.email_error);
        }
        else if(!isMail(email)) {
            setEmailError(content.email_error);
            setEmail("");
        }
        else if(!phone) {
            setPhoneError(content.phone_number_error);
        }
        else {
            error = false;
        }

        if(!error) {
            sendClubForm(name, email, phone, msg)
                .then((res) => {
                     setConfirmMsg(content.confirm_msg);
                });
        }
    }

    useEffect(() => {
        setName("");
        setEmail("");
        setPhone("");
        setMsg("");
    }, [confirmMsg]);

    return <section className="clubForm player__section player__flex player__flex--section player__section--1 club__section">
        <figure className="player__flex__imgWrapper">
            <img className="player__flex__img player__flex__imgWrapper--clubImg3" src={img3} alt="widok" />
        </figure>

        <article className="player__flex__content">
            <h3 className="player__header">
                {content.club_zone_contact_form_header}
            </h3>
            <form className="clubForm__inner">
                <label>
                    {nameError !== "" ? <span className="loginBox__error">
                        {nameError}
                </span> : ""}
                    <input className="input"
                           type="text"
                           value={name}
                           onChange={(e) => { setName(e.target.value); }}
                           onClick={() => { setNameError(""); }}
                           placeholder={!nameError ? content.club_zone_contact_form_input1 : ""} />
                </label>
                <label>
                    {emailError !== "" ? <span className="loginBox__error">
                        {emailError}
                </span> : ""}
                    <input className="input"
                           type="text"
                           value={email}
                           onChange={(e) => { setEmail(e.target.value); }}
                           onClick={() => { setEmailError(""); }}
                           placeholder={!emailError ? content.club_zone_contact_form_input2 : ""} />
                </label>
                <label>
                    {phoneError !== "" ? <span className="loginBox__error">
                        {phoneError}
                </span> : ""}
                    <input className="input"
                           type="number"
                           value={phone}
                           onChange={(e) => { setPhone(e.target.value); }}
                           onClick={() => { setPhoneError(""); }}
                           placeholder={!phoneError ? content.club_zone_contact_form_input3 : ""} />
                </label>
                <label>
                <textarea className="textarea"
                          value={msg}
                          onChange={(e) => { setMsg(e.target.value); }}
                          placeholder={content.club_zone_contact_form_input4} />
                </label>

                {confirmMsg ? <h4 className="clubForm__confirmMsg">
                    {confirmMsg}
                </h4> : <div className="registerForm__btnWrapper">
                    <button className="registerForm--nextBtn" onClick={(e) => { handleSubmit(e); }}>
                        <img className="registerForm--nextBtn__img" src={getImageUrl(content.img10)} alt="dalej" />
                    </button>
                </div> }
            </form>
        </article>
    </section>
};

export default ClubForm;
