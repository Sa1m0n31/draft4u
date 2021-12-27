import React, { useState, useEffect } from 'react';
import img3 from "../static/img/strefa-zawodnika-2.png";
import submitBtn from '../static/img/wyslij-btn.svg'
import {isMail} from "../helpers/validation";
import {sendClubForm} from "../helpers/club";

const ClubForm = () => {
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
            setNameError("Uzupełnij to pole");
        }
        else if(!email) {
            setEmailError("Wpisz swój adres e-mail");
        }
        else if(!isMail(email)) {
            setEmailError("Wpisz poprawny adres e-mail");
            setEmail("");
        }
        else if(!phone) {
            setPhoneError("Wpisz swój numer telefonu");
        }
        else {
            error = false;
        }

        if(!error) {
            sendClubForm(name, email, phone, msg)
                .then((res) => {
                     setConfirmMsg("Wiadomość została wysłana. Skontaktujemy się z Tobą najszybciej, jak to możliwe!");
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
                Skontaktuj się z nami
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
                           placeholder={!nameError ? "Imię i nazwisko / Nazwa klubu" : ""} />
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
                           placeholder={!emailError ? "Adres e-mail" : ""} />
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
                           placeholder={!phoneError ? "Nr telefonu" : ""} />
                </label>
                <label>
                <textarea className="textarea"
                          value={msg}
                          onChange={(e) => { setMsg(e.target.value); }}
                          placeholder="Wiadomość (opcjonalnie)" />
                </label>

                {confirmMsg ? <h4 className="clubForm__confirmMsg">
                    {confirmMsg}
                </h4> : <button className="registerForm--nextBtn" onClick={(e) => { handleSubmit(e); }}>
                    <img className="registerForm--nextBtn__img" src={submitBtn} alt="dalej" />
                </button>}
            </form>
        </article>
    </section>
};

export default ClubForm;
