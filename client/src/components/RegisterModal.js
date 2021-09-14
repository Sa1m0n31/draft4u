import React, { useRef, useState, useEffect } from 'react'
import closeIcon from '../static/img/close-grey.svg'
import playerImg from '../static/img/siatkarz.png'
import nextBtn from '../static/img/dalej-btn.png'
import registerBtnIcon from '../static/img/zarejestruj-btn.png'
import triangleDown from '../static/img/triangle-down.svg'
import successIcon from '../static/img/success.svg'
import {isMail, isPasswordStrength} from "../helpers/validation";
import {isEmailAvailable} from "../helpers/user";

const RegisterModal = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [checkboxObligatory, setCheckboxObligatory] = useState(false);
    const [checkboxCompulsory, setCheckboxCompulsory] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [sex, setSex] = useState(-1);
    const [birthday, setBirthday] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    const [currentStep, setCurrentStep] = useState(1);
    const [sexesVisible, setSexesVisible] = useState(false);

    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [firstNameError, setFirstNameError] = useState("");
    const [lastNameError, setLastNameError] = useState("");
    const [sexError, setSexError] = useState("");
    const [birthdayError, setBirthdayError] = useState("");
    const [phoneNumberError, setPhoneNumberError] = useState("");

    let registerModal = useRef(null);
    let formStep1 = useRef(null);
    let formStep2 = useRef(null);
    let birthdayOverlay = useRef(null);

    useEffect(() => {
        setSexesVisible(false);
    }, [sex]);

    const resetErrors = () => {
        setEmailError("");
        setPasswordError("");
    }

    const closeModal = () => {
        document.querySelector(".registerModal").style.display = "none";
    }

    const handleCheckbox = (e, n) => {
        e.preventDefault();
        if(n === 1) setCheckboxCompulsory(!checkboxCompulsory);
        else setCheckboxObligatory(!checkboxObligatory);
    }

    const showSexes = (e) => {
        e.preventDefault();
        setSexesVisible(!sexesVisible);
    }

    const hideBirthdayOverlay = () => {
        birthdayOverlay.current.style.display = "none";
    }

    const validateStep1 = (e) => {
        e.preventDefault();

        if(!isMail(email)) {
            setEmailError("Podaj poprawny adres email");
            setEmail("");
        }
        if(password !== repeatPassword) {
            setPasswordError("Podane hasła nie są identyczne");
            setPassword("");
            setRepeatPassword("");
        }
        if(!isPasswordStrength(password)) {
            setPasswordError("Hasło musi zawierać co najmniej 8 znaków, jedną wielką literę i jedną cyfrę");
            setPassword("");
            setRepeatPassword("");
        }

        isEmailAvailable(email)
            .then(res => {
                if(res?.data?.result !== 1) {
                    setEmailError("Podany adres email jest już zajęty");
                    setEmail("");
                }
                else {
                    setCurrentStep(2);
                    formStep1.current.style.display = "none";
                    formStep2.current.style.display = "block";
                }
            });
    }

    const validateStep2 = () => {

    }

    return <main className="registerModal__inner" ref={registerModal}>
        <button className="registerModal__closeBtn" onClick={() => { closeModal(); }}>
            <img className="registerModal__closeBtn__img" src={closeIcon} alt="zamknij" />
        </button>

        <img className="registerModal__img" src={playerImg} alt="siatkarz" />

        <h3 className="registerModal__header">
            Rejestracja
        </h3>
        <h4 className="registerModal__step">
            Krok {currentStep} z 2
        </h4>

        <form className="registerForm">
            <section className="registerForm__section registerForm__section--1" ref={formStep1}>
                <label>
                    {emailError !== "" ? <span className="loginBox__error">
                        {emailError}
                </span> : ""}
                    <input className="input"
                           onClick={() => { resetErrors(); }}
                           value={email}
                           onChange={(e) => { setEmail(e.target.value); }}
                           placeholder={emailError === "" ? "E-mail" : ""} />
                </label>
                <label>
                    <input className="input"
                           onClick={() => { resetErrors(); }}
                           type="password"
                           value={password}
                           onChange={(e) => { setPassword(e.target.value); }}
                           placeholder="Hasło" />
                </label>
                <label>
                    {passwordError !== "" ? <span className="loginBox__error">
                        {passwordError}
                </span> : ""}
                    <input className="input"
                           onClick={() => { resetErrors(); }}
                           type="password"
                           value={repeatPassword}
                           onChange={(e) => { setRepeatPassword(e.target.value); }}
                           placeholder={passwordError === "" ? "Powtórz hasło" : ""} />
                </label>
                <label className="label--checkBtn">
                    <button className="registerForm__checkBtn" onClick={(e) => { handleCheckbox(e, 0); }}>
                        {checkboxObligatory ? <img className="registerModal__closeBtn__img" src={closeIcon} alt="zamknij" /> : ""}
                    </button>
                    Wyrażam zgodę na otrzymywanie informacji handlowych drogą elektroniczną, w szczególności w celu przedstawiania informacji o promocjach, konkursach i ofertach bonusowych.
                </label>

                <button className="registerForm--nextBtn" onClick={(e) => { validateStep1(e); }}>
                    <img className="registerForm--nextBtn__img" src={nextBtn} alt="dalej" />
                </button>
            </section>

            <section className="registerForm__section registerForm__section--2" ref={formStep2}>
                <span className="registerForm__flexFields">
                    <label>
                    {firstNameError !== "" ? <span className="loginBox__error">
                        {firstNameError}
                </span> : ""}
                        <input className="input"
                               onClick={() => { resetErrors(); }}
                               value={firstName}
                               onChange={(e) => { setFirstName(e.target.value); }}
                               placeholder={firstNameError === "" ? "Imię" : ""} />
                </label>
                    <label>
                    {lastNameError !== "" ? <span className="loginBox__error">
                        {lastNameError}
                </span> : ""}
                        <input className="input"
                               onClick={() => { resetErrors(); }}
                               value={lastName}
                               onChange={(e) => { setLastName(e.target.value); }}
                               placeholder={lastNameError === "" ? "Nazwisko" : ""} />
                </label>
                </span>

                <label>
                    <button className="registerForm__select" onClick={(e) => { showSexes(e); }}>
                        {sex === -1 ? "Płeć" : sex === 1 ? <span>Mężczyzna</span> : <span>Kobieta</span>}
                        <img className="triangleDownImg" src={triangleDown} alt="rozwin" />
                        {sexesVisible ? <section className="registerForm__select__options">
                            <button className="registerForm__select registerForm__select__option" onClick={() => { setSex(0); }}>
                                Kobieta
                            </button>
                            <button className="registerForm__select registerForm__select__option" onClick={() => { setSex(1); }}>
                                Mężczyzna
                            </button>
                        </section> : ""}
                    </button>
                </label>

                <label className="inputDateWrapper">
                    {birthdayError !== "" ? <span className="loginBox__error">
                        {birthdayError}
                </span> : ""}
                <span className="input--date__overlay" ref={birthdayOverlay}>
                    Data urodzenia
                </span>
                    <input className="input input--date"
                           type="date"
                           onClick={() => { hideBirthdayOverlay(); resetErrors(); }}
                           value={birthday}
                           onChange={(e) => { hideBirthdayOverlay(); setBirthday(e.target.value); }}
                           placeholder={birthdayError === "" ? "Data urodzenia" : ""} />
                </label>
                <label>
                    {phoneNumberError !== "" ? <span className="loginBox__error">
                        {phoneNumberError}
                </span> : ""}
                    <input className="input"
                           onClick={() => { resetErrors(); }}
                           value={phoneNumber}
                           onChange={(e) => { setPhoneNumber(e.target.value); }}
                           placeholder={phoneNumberError === "" ? "Numer telefonu" : ""} />
                </label>

                <label className="label--checkBtn">
                    <button className="registerForm__checkBtn" onClick={(e) => { handleCheckbox(e, 1); }}>
                        {checkboxCompulsory ? <img className="registerModal__closeBtn__img" src={closeIcon} alt="zamknij" /> : ""}
                    </button>
                     Akceptuję Regulamin i Politykę prywatności i coś tam jeszcze lorem ipsum dolor sit amet ności i coś tam jeszczeności i coś tam jeszczeności i coś tam jeszcze
                </label>

                <button className="registerForm--nextBtn" onClick={(e) => { validateStep2(e); }}>
                    <img className="registerForm--nextBtn__img" src={registerBtnIcon} alt="zarejestruj" />
                </button>
            </section>
        </form>

    </main>
}

export default RegisterModal;
