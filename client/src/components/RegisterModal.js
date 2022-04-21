import React, {useRef, useState, useEffect, useContext} from 'react'
import closeIcon from '../static/img/close-grey.svg'
import playerImg from '../static/img/zawodnik-rejestracja.png'
import nextBtn from '../static/img/dalej-btn.png'
import registerBtnIcon from '../static/img/zarejestruj-btn.png'
import triangleDown from '../static/img/triangle-down.svg'
import successIcon from '../static/img/success.svg'
import loginBtn from '../static/img/zaloguj-btn.png'
import {isMail, isPasswordStrength} from "../helpers/validation";
import {isEmailAvailable} from "../helpers/user";
import {registerFromThirdParty, registerUser} from "../helpers/auth";
import DraftLoader from "./Loader";
import {ContentContext} from "../App";
import {getImageUrl} from "../helpers/others";
import playerZone from '../static/img/strefa-zawodnika-postac.png'
import playerZoneCaption from '../static/img/strefa-zawodnika-tekst.png'
import coachZone from '../static/img/strefa-asystenta-postac.png'
import coachZoneCaption from '../static/img/strefa-asystenta-napis.png'

const RegisterModal = (props) => {
    const { content } = useContext(ContentContext);

    const [step0, setStep0] = useState(true);
    const [accountType, setAccountType] = useState(-1);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [checkboxObligatory, setCheckboxObligatory] = useState(false);
    const [checkboxCompulsory, setCheckboxCompulsory] = useState(false);
    const [firstName, setFirstName] = useState(props.firstName ? props.firstName : "");
    const [lastName, setLastName] = useState(props.lastName ? props.lastName : "");
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
        setFirstName(props.firstName);
    }, [props.firstName]);

    useEffect(() => {
        setLastName(props.lastName);
    }, [props.lastName]);

    useEffect(() => {
       setSexesVisible(false);
    }, [sex]);

    useEffect(() => {
        if(props.registerFromThirdParty) {
            setCurrentStep(2);
            formStep1.current.style.display = "none";
            formStep2.current.style.display = "block";
        }
    }, [props.registerFromThirdParty]);

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

        if(sex === -1) sexFieldPlaceholder.current.textContent = content.register_input6;
        if(!birthday.length) birthdayOverlay.current.textContent = content.register_input7;
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
        if(!props.registerFromThirdParty) {
            closeModal();
            document.querySelector(".loginBoxWrapper").style.display = "block";
        }
        else {
            window.location = "/rozpocznij";
        }
    }

    const validateStep1 = (e) => {
        e.preventDefault();
        let error = false;

        if(password !== repeatPassword) {
            setPasswordError(content.identical_password_error);
            setPassword("");
            setRepeatPassword("");
            error = true;
        }
        if(!isPasswordStrength(password)) {
            setPasswordError(content.weak_password_error);
            setPassword("");
            setRepeatPassword("");
            error = true;
        }

        if(!isMail(email)) {
            setEmailError(content.email_error);
            setEmail("");
        }
        else {
            isEmailAvailable(email, accountType)
                .then(res => {
                    if(res?.data?.result !== 1) {
                        setEmailError(content.email_already_in_use);
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

    const calculateAge = (birthday) => { // birthday is a date
        const ageDifMs = Date.now() - new Date(birthday);
        const ageDate = new Date(ageDifMs); // miliseconds from epoch
        return ageDate.getUTCFullYear() - 1970;
    }

    const validateStep2 = (e) => {
        e.preventDefault();
        let error = false;

        if(!firstName?.length) {
            setFirstNameError(content.first_name_error);
            error = true;
        }
        if(!lastName?.length) {
            setLastNameError(content.last_name_error);
            error = true;
        }
        if(sex === -1) {
            setSexError(content.sex_error);
            sexFieldPlaceholder.current.textContent = "";
            error = true;
        }
        if(!birthday?.length) {
            setBirthdayError(content.date_of_birth_error);
            birthdayOverlay.current.textContent = "";
            error = true;
        }
        else if(calculateAge(birthday) < 14) {
            setBirthdayError(content.minimal_age_error);
            birthdayOverlay.current.textContent = "";
            birthdayOverlay.current.style.display = "block";
            error = true;
        }

        if(!checkboxCompulsory) {
            error = true;
            setCheckboxError(true);
        }

        if(!phoneNumber?.length) {
            error = true;
            setPhoneNumber("");
            setPhoneNumberError(content.phone_number_error)
        }
        else if((phoneNumber.length < 9)||(phoneNumber.length > 14)) {
            error = true;
            setPhoneNumber("");
            setPhoneNumberError(content.wrong_phone_number);
        }

        if(!error) {
            setLoading(true);

            /* REGISTER USER */
            if(!props.registerFromThirdParty) {
                registerUser(
                    email, password,
                    firstName, lastName, sex,
                    birthday, phoneNumber,
                    checkboxObligatory,
                    accountType === 1 ? 'true' : 'false'
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
            }
            else {
                registerFromThirdParty(
                    firstName, lastName, sex, birthday, phoneNumber, checkboxObligatory
                )
                    .then((res) => {
                       setLoading(false);
                       if(res?.data?.result) {
                           setUserRegistered(1);
                       }
                       else {
                           setUserRegistered(-1);
                       }
                    });
            }
        }
    }

    const chooseAccountType = (n) => {
        setAccountType(n);
        setStep0(false);
    }

    return <main className="registerModal__inner" ref={registerModal}>
        <button className={props.mobile ? "d-none" : "registerModal__closeBtn"} onClick={() => { closeModal(); }}>
            <img className="registerModal__closeBtn__img" src={closeIcon} alt="zamknij" />
        </button>

        <h3 className="registerModal__header">
            {props.registerFromThirdParty ? content.register_header_2 : content.register_header}
        </h3>

        {step0 ? <div className="registerModal__step0">
            <div className="registerModal__step0__buttons d-desktop-flex">
                <button className="registerModal__step0__btn" onClick={() => { chooseAccountType(0); }}>
                    <img className="registerModal__step0__btn__img" src={getImageUrl(content.img37)} alt="strefa-zawodnika" />
                </button>
                <button className="registerModal__step0__btn" onClick={() => { chooseAccountType(1); }}>
                    <img className="registerModal__step0__btn__img" src={getImageUrl(content.img36)} alt="strefa-asystenta" />
                </button>
            </div>
            <div className="registerModal__step0__buttons d-mobile">
                <button className="registerModal__step0__btn" onClick={() => { chooseAccountType(0); }}>
                    <img className="registerModal__step0__btn__img" src={getImageUrl(content.img35)} alt="strefa-zawodnika" />
                </button>
                <button className="registerModal__step0__btn" onClick={() => { chooseAccountType(1); }}>
                    <img className="registerModal__step0__btn__img" src={getImageUrl(content.img34)} alt="strefa-asystenta" />
                </button>
            </div>
        </div> : <>
            <img className={props.mobile ? "d-none" : "registerModal__img"} src={playerImg} alt="siatkarz" />

            {userRegistered === -1 ? <h4 className="registerModal__step">
                {props.registerFromThirdParty ? content.register_header_3 : `${content.register_step.split(' ')[0]} ${currentStep} ${content.register_step.split(' ').slice(1).join(' ')} 2`}
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
                               placeholder={emailError === "" ? content.register_input1 : ""} />
                    </label>
                    <label>
                        <input className={passwordError === "" ? "input" : "input input--error"}
                               onClick={() => { resetErrors(); }}
                               type="password"
                               value={password}
                               onChange={(e) => { setPassword(e.target.value); }}
                               placeholder={content.register_input2} />
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
                               placeholder={passwordError === "" ? content.register_input3 : ""} />
                    </label>
                    <label className="label--checkBtn label--marketingCheckbox">
                        <button className="registerForm__checkBtn" onClick={(e) => { handleCheckbox(e, 0); }}>
                            {checkboxObligatory ? <img className="registerModal__closeBtn__img" src={closeIcon} alt="zamknij" /> : ""}
                        </button>
                        {content.marketing_consent}
                    </label>

                    <button className="registerForm--nextBtn" onClick={(e) => { validateStep1(e); }}>
                        <img className="registerForm--nextBtn__img" src={getImageUrl(content.img12)} alt="dalej" />
                    </button>
                </section>

                {/* STEP 2 */}
                <section className="registerForm__section registerForm__section--2" ref={formStep2}>
                <span className={props.mobile ? "registerForm__flexFields registerForm__flexFields--mobile" : "registerForm__flexFields"}>
                    <label>
                    {firstNameError !== "" ? <span className="loginBox__error">
                        {firstNameError}
                </span> : ""}
                        <input className={firstNameError === "" ? "input" : "input input--error"}
                               onClick={() => { resetErrors(); }}
                               value={firstName}
                               onChange={(e) => { setFirstName(e.target.value); }}
                               placeholder={firstNameError === "" ? content.register_input4 : ""} />
                </label>
                    <label>
                    {lastNameError !== "" ? <span className="loginBox__error">
                        {lastNameError}
                </span> : ""}
                        <input className={lastNameError === "" ? "input" : "input input--error"}
                               onClick={() => { resetErrors(); }}
                               value={lastName}
                               onChange={(e) => { setLastName(e.target.value); }}
                               placeholder={lastNameError === "" ? content.register_input5 : ""} />
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
                            {sex === -1 ? content.register_input6 : (sex === 1 ? <span>{content.male}</span> : <span>{content.famale}</span>)}
                        </span>
                            <img className="triangleDownImg" src={triangleDown} alt="rozwin" />
                            {sexesVisible ? <section className="registerForm__select__options">
                                <button className="registerForm__select registerForm__select__option" onClick={() => { setSex(0); }}>
                                    {content.famale}
                                </button>
                                <button className="registerForm__select registerForm__select__option" onClick={() => { setSex(1); }}>
                                    {content.male}
                                </button>
                            </section> : ""}
                        </button>
                    </label>

                    <label className="inputDateWrapper">
                        {birthdayError !== "" ? <span className="loginBox__error">
                        {birthdayError}
                </span> : ""}
                        <span className="input--date__overlay" ref={birthdayOverlay}>
                        {content.register_input7}
                </span>
                        <input className={birthdayError === "" ? "input input--date" : "input input--date input--error"}
                               type="date"
                               onClick={() => { hideBirthdayOverlay(); resetErrors(); }}
                               value={birthday}
                               onChange={(e) => { hideBirthdayOverlay(); setBirthday(e.target.value); }}
                               placeholder={birthdayError === "" ? content.register_input7 : ""} />
                    </label>
                    <label>
                        {phoneNumberError !== "" ? <span className="loginBox__error">
                        {phoneNumberError}
                </span> : ""}
                        <input className={phoneNumberError === "" ? "input" : "input input--error"}
                               onClick={() => { resetErrors(); }}
                               value={phoneNumber}
                               onChange={(e) => { setPhoneNumber(e.target.value); }}
                               placeholder={phoneNumberError === "" ? content.register_input8 : ""} />
                    </label>

                    <label className="label--checkBtn">
                        <button className={!checkboxError ? "registerForm__checkBtn" : "registerForm__checkBtn input--error"} onClick={(e) => { resetErrors(); handleCheckbox(e, 1); }}>
                            {checkboxCompulsory ? <img className="registerModal__closeBtn__img" src={closeIcon} alt="zamknij" /> : ""}
                        </button>
                        <span>
                        {content.register_consent1.split(';')[0]}
                    </span>
                        <a href="/regulamin">
                            {content.register_consent1.split(';')[1]}
                        </a>
                        <span>
                        {content.register_consent1.split(';')[2]}
                    </span>
                        <a href="/polityka-prywatnosci">
                            {content.register_consent1.split(';')[3]}
                        </a>.
                    </label>

                    <button className="registerForm--nextBtn" onClick={(e) => { validateStep2(e); }}>
                        <img className="registerForm--nextBtn__img" src={getImageUrl(content.img8)} alt="zarejestruj" />
                    </button>
                </section>
            </form> : <section className="registerResult">
                <img className="registerResult__img" src={userRegistered === 1 ? successIcon : successIcon} alt="sukces" />
                <h4 className="registerResult__header">
                    {userRegistered === 1 ? <span>{content.after_register_text_1}<br/>{props.registerFromThirdParty ? content.after_register_text_3 : content.after_register_text_2}</span> : <span>{content.error}</span>}
                </h4>

                {userRegistered === 1 ? (props.mobile ? <a className="registerForm--nextBtn registerForm--nextBtn--login" href="/logowanie">
                    <img className="registerForm--nextBtn__img" src={getImageUrl(content.img14)} alt="zaloguj-sie" />
                </a> : <button className="registerForm--nextBtn registerForm--nextBtn--login" onClick={() => { goToLogin(); }}>
                    <img className="registerForm--nextBtn__img" src={getImageUrl(content.img14)} alt="zaloguj-sie" />
                </button>) : ""}
            </section>) }
        </>}

    </main>
}

export default RegisterModal;
