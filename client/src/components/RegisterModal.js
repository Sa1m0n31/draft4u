import React, { useRef, useState, useEffect } from 'react'
import closeIcon from '../static/img/close-grey.svg'
import playerImg from '../static/img/siatkarz.png'
import nextBtn from '../static/img/dalej-btn.png'
import registerBtnIcon from '../static/img/zarejestruj-btn.png'
import triangleDown from '../static/img/triangle-down.svg'
import successIcon from '../static/img/success.svg'
import loginBtn from '../static/img/zaloguj-btn.png'
import {isMail, isPasswordStrength} from "../helpers/validation";
import {isEmailAvailable} from "../helpers/user";
import {registerUser} from "../helpers/auth";
import DraftLoader from "./Loader";

const RegisterModal = ({mobile}) => {
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
    const [checkboxError, setCheckboxError] = useState(false);

    const [userRegistered, setUserRegistered] = useState(-1);
    const [loading, setLoading] = useState(false);

    let registerModal = useRef(null);
    let formStep1 = useRef(null);
    let formStep2 = useRef(null);
    let birthdayOverlay = useRef(null);
    let sexField = useRef(null);
    let sexFieldPlaceholder = useRef(null);

    useEffect(() => {
       setSexesVisible(false);
    }, [sex]);

    const resetErrors = (e) => {
        if(e) e.preventDefault();

        setEmailError("");
        setPasswordError("");

        setFirstNameError("");
        setLastNameError("");
        setBirthdayError("");
        setPhoneNumberError("");
        setSexError("");
        setCheckboxError(false);

        if(sex === -1) sexFieldPlaceholder.current.textContent = "Płeć";
        if(!birthday.length) birthdayOverlay.current.textContent = "Data urodzenia";
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

    const goToLogin = () => {
        closeModal();
        document.querySelector(".loginBoxWrapper").style.display = "block";
    }

    const validateStep1 = (e) => {
        e.preventDefault();
        let error = false;

        if(password !== repeatPassword) {
            setPasswordError("Podane hasła nie są identyczne");
            setPassword("");
            setRepeatPassword("");
            error = true;
        }
        if(!isPasswordStrength(password)) {
            setPasswordError("Hasło musi zawierać co najmniej 8 znaków, jedną wielką literę i jedną cyfrę");
            setPassword("");
            setRepeatPassword("");
            error = true;
        }

        if(!isMail(email)) {
            setEmailError("Podaj poprawny adres email");
            setEmail("");
        }
        else {
            isEmailAvailable(email)
                .then(res => {
                    if(res?.data?.result !== 1) {
                        setEmailError("Podany adres email jest już zajęty");
                        setEmail("");
                    }
                    else if(!error) {
                        setCurrentStep(2);
                        formStep1.current.style.display = "none";
                        formStep2.current.style.display = "block";
                    }
                });
        }
    }

    const validateStep2 = (e) => {
        e.preventDefault();
        let error = false;

        if(!firstName.length) {
            setFirstNameError("Wpisz swoje imię");
            error = true;
        }
        if(!lastName.length) {
            setLastNameError("Wpisz swoje nazwisko");
            error = true;
        }
        if(sex === -1) {
            setSexError("Wybierz płeć");
            sexFieldPlaceholder.current.textContent = "";
            error = true;
        }
        if(!birthday.length) {
            setBirthdayError("Wybierz datę urodzenia");
            birthdayOverlay.current.textContent = "";
            error = true;
        }
        if(!checkboxCompulsory) {
            error = true;
            setCheckboxError(true);
        }

        if(!phoneNumber.length) {
            error = true;
            setPhoneNumber("");
            setPhoneNumberError("Wpisz swój numer telefonu")
        }
        else if((phoneNumber.length < 9)||(phoneNumber.length > 14)) {
            error = true;
            setPhoneNumber("");
            setPhoneNumberError("Podaj poprawny numer telefonu");
        }

        if(!error) {
            setLoading(true);

            /* REGISTER USER */
            setTimeout(() => {
                registerUser(
                    email, password,
                    firstName, lastName, sex,
                    birthday, phoneNumber
                )
                    .then(res => {
                        setLoading(false);
                        if(res?.data?.result) {
                            setUserRegistered(1);
                        }
                        else {
                            setUserRegistered(-1);
                        }
                    });
            }, 5000);

        }
    }

    return <main className="registerModal__inner" ref={registerModal}>
        <button className={mobile ? "d-none" : "registerModal__closeBtn"} onClick={() => { closeModal(); }}>
            <img className="registerModal__closeBtn__img" src={closeIcon} alt="zamknij" />
        </button>

        <img className={mobile ? "d-none" : "registerModal__img"} src={playerImg} alt="siatkarz" />

        <h3 className="registerModal__header">
            Rejestracja
        </h3>
        {userRegistered === -1 ? <h4 className="registerModal__step">
            Krok {currentStep} z 2
        </h4> : ""}

        {loading ? <div className="loaderWrapper--register">
            <DraftLoader />
        </div> : (userRegistered === -1 ? <form className="registerForm">
            {/* STEP 1 */}
            <section className="registerForm__section registerForm__section--1" ref={formStep1}>
                <label>
                    {emailError !== "" ? <span className="loginBox__error">
                        {emailError}
                </span> : ""}
                    <input className={emailError === "" ? "input" : "input input--error"}
                           onClick={() => { resetErrors(); }}
                           value={email}
                           onChange={(e) => { setEmail(e.target.value); }}
                           placeholder={emailError === "" ? "E-mail" : ""} />
                </label>
                <label>
                    <input className={passwordError === "" ? "input" : "input input--error"}
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
                    <input className={passwordError === "" ? "input" : "input input--error"}
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

            {/* STEP 2 */}
            <section className="registerForm__section registerForm__section--2" ref={formStep2}>
                <span className={mobile ? "registerForm__flexFields registerForm__flexFields--mobile" : "registerForm__flexFields"}>
                    <label>
                    {firstNameError !== "" ? <span className="loginBox__error">
                        {firstNameError}
                </span> : ""}
                        <input className={firstNameError === "" ? "input" : "input input--error"}
                               onClick={() => { resetErrors(); }}
                               value={firstName}
                               onChange={(e) => { setFirstName(e.target.value); }}
                               placeholder={firstNameError === "" ? "Imię" : ""} />
                </label>
                    <label>
                    {lastNameError !== "" ? <span className="loginBox__error">
                        {lastNameError}
                </span> : ""}
                        <input className={lastNameError === "" ? "input" : "input input--error"}
                               onClick={() => { resetErrors(); }}
                               value={lastName}
                               onChange={(e) => { setLastName(e.target.value); }}
                               placeholder={lastNameError === "" ? "Nazwisko" : ""} />
                </label>
                </span>

                <label>
                    {sexError !== "" ? <span onClick={(e) => { resetErrors(e); }} className="loginBox__error">
                        {sexError}
                </span> : ""}
                    <button className={sexError === "" ? "registerForm__select"  : "registerForm__select input--error" }
                            ref={sexField}
                            onClick={(e) => { showSexes(e); }}>
                        <span className="sexFieldPlaceholder" ref={sexFieldPlaceholder}>
                            {sex === -1 ? "Płeć" : (sex === 1 ? <span>Mężczyzna</span> : <span>Kobieta</span>)}
                        </span>
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
                    <input className={birthdayError === "" ? "input input--date" : "input input--date input--error"}
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
                    <input className={phoneNumberError === "" ? "input" : "input input--error"}
                           onClick={() => { resetErrors(); }}
                           value={phoneNumber}
                           onChange={(e) => { setPhoneNumber(e.target.value); }}
                           placeholder={phoneNumberError === "" ? "Numer telefonu" : ""} />
                </label>

                <label className="label--checkBtn">
                    <button className={!checkboxError ? "registerForm__checkBtn" : "registerForm__checkBtn input--error"} onClick={(e) => { resetErrors(); handleCheckbox(e, 1); }}>
                        {checkboxCompulsory ? <img className="registerModal__closeBtn__img" src={closeIcon} alt="zamknij" /> : ""}
                    </button>
                    Akceptuję Regulamin i Politykę prywatności i coś tam jeszcze lorem ipsum dolor sit amet ności i coś tam jeszczeności i coś tam jeszczeności i coś tam jeszcze
                </label>

                <button className="registerForm--nextBtn" onClick={(e) => { validateStep2(e); }}>
                    <img className="registerForm--nextBtn__img" src={registerBtnIcon} alt="zarejestruj" />
                </button>
            </section>
        </form> : <section className="registerResult">
            <img className="registerResult__img" src={userRegistered === 1 ? successIcon : successIcon} alt="sukces" />
            <h4 className="registerResult__header">
                {userRegistered === 1 ? <span>Udało się<br/>Na podany adres email wysłaliśmy link weryfikacyjny</span> : <span>Coś poszło nie tak<br/>Prosimy spróbować później</span>}
            </h4>

            {userRegistered === 1 ? <button className="registerForm--nextBtn registerForm--nextBtn--login" onClick={() => { goToLogin(); }}>
                <img className="registerForm--nextBtn__img" src={loginBtn} alt="zaloguj-sie" />
            </button> : ""}
        </section>) }

    </main>
}

export default RegisterModal;
