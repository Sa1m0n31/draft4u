import React, {useContext, useEffect, useRef, useState} from 'react'
import mainBtn from '../static/img/contact-btn.png'
import mailIcon from '../static/img/icon-mail.svg'
import phoneIcon from '../static/img/icon-phone.svg'
import submitBtn from "../static/img/wyslij-btn.svg";
import {isMail} from "../helpers/validation";
import {sendClubForm} from "../helpers/club";
import closeIcon from '../static/img/close-grey.svg'
import {ContentContext} from "../App";
import {getImageUrl} from "../helpers/others";

const ContactInfo = () => {
    const [visible, setVisible] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [msg, setMsg] = useState("");

    const [nameError, setNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [confirmMsg, setConfirmMsg] = useState("");

    const contact = useRef(null);
    const contactMain = useRef(null);
    const toggleBtn = useRef(null);
    const toggleBtnMobile = useRef(null);

    const { content } = useContext(ContentContext);

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
        else {
            error = false;
        }

        if(!error) {
            sendClubForm(name, email, null, msg)
                .then((res) => {
                    setConfirmMsg(content.confirm_msg);
                });
        }
    }

    useEffect(() => {
        setName("");
        setEmail("");
        setMsg("");
    }, [confirmMsg]);

    const toggleContact = () => {
        if(visible) {
            Array.from(document.querySelectorAll('.contact__main>*')).forEach((item) => {
                item.style.opacity = '0';
            });
            setTimeout(() => {
                contactMain.current.style.transform = "scaleX(0)";
                toggleBtn.current.style.right = '0';
                setTimeout(() => {
                    contact.current.style.width = '0';
                    contact.current.style.minWidth = '0';
                }, 200);
            }, 400);
        }
        else {
            if(window.innerWidth > 768) {
                contact.current.style.width = '30%';
                contact.current.style.minWidth = '350px';
            }
            else {
                contact.current.style.width = '100%';
                contact.current.style.minWidth = '350px';
            }
            contactMain.current.style.transform = "scaleX(1)";
            toggleBtn.current.style.right = '100%';
            setTimeout(() => {
                Array.from(document.querySelectorAll('.contact__main>*')).forEach((item) => {
                    item.style.opacity = '1';
                });
            }, 400);
        }
        setVisible(!visible);
    }

    return <div className="contact" ref={contact}>
        <button className="contact__btn d-desktop" ref={toggleBtn} onClick={() => { toggleContact(); }}>
            <img className="contact__btn__img" src={mainBtn} alt="kontakt" />
            <span>
                {content.contact_header}
            </span>
        </button>
        <button className="contact__btn--mobile d-mobile" ref={toggleBtnMobile} onClick={() => { toggleContact(); }}>
            <img className="contact__btn__img" src={mailIcon} alt="kontakt" />
            <span>
                {content.contact_header}
            </span>
        </button>

        <div className="contact__main" ref={contactMain}>
            <button className="modal--close" onClick={() => { toggleContact(); }}>
                <img className="btn__img" src={closeIcon} alt="zamknij" />
            </button>
            <h3 className="contact__main__header">
                {content.contact_header2}
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
                           placeholder={!nameError ? content.contact_input1 : ""} />
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
                           placeholder={!emailError ? content.contact_input2 : ""} />
                </label>
                <label>
                <textarea className="textarea"
                          value={msg}
                          onChange={(e) => { setMsg(e.target.value); }}
                          placeholder={content.contact_input3} />
                </label>

                {confirmMsg ? <h4 className="clubForm__confirmMsg">
                    {confirmMsg}
                </h4> : <button className="registerForm--nextBtn" onClick={(e) => { handleSubmit(e); }}>
                    <img className="registerForm--nextBtn__img" src={getImageUrl(content.img11)} alt="dalej" />
                </button>}
            </form>
            <section className="contact__main__bottom d-desktop">
                <h4 className="contact__main__bottom__header">
                    {content.contact_text}
                </h4>
                <a className="contact__main__bottom__item" href="tel:+48790731997">
                    <img className="contact__main__bottom__icon" src={phoneIcon} alt="telefon" />
                    790 731 997
                </a>
                <a className="contact__main__bottom__item" href="tel:+48535480814">
                    <img className="contact__main__bottom__icon" src={phoneIcon} alt="telefon" />
                    535 480 814
                </a>
                <a className="contact__main__bottom__item" href="mailto:biuro@draft4u.com.pl">
                    <img className="contact__main__bottom__icon" src={mailIcon} alt="telefon" />
                    biuro@draft4u.com.pl
                </a>
            </section>
        </div>
    </div>
}

export default ContactInfo;
