import React, {useContext, useEffect, useRef, useState} from 'react';
import {isMail, isPasswordStrength} from "../helpers/validation";
import {getUserData, isEmailAvailable} from "../helpers/user";
import {registerFromThirdParty, registerUser} from "../helpers/auth";
import triangleDown from "../static/img/triangle-down.svg";
import {ContentContext} from "../App";
import AfterRegister from "./AfterRegister";
import DraftLoader from "./Loader";
import LoadingPage from "../pages/LoadingPage";

const RegisterUser = (props) => {
    const { content } = useContext(ContentContext);

    const [accountType, setAccountType] = useState(-1);

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
    const [render, setRender] = useState(false);

    const [userRegistered, setUserRegistered] = useState(0);
    const [loading, setLoading] = useState(false);

    let formStep1 = useRef(null);
    let formStep2 = useRef(null);
    let birthdayOverlay = useRef(null);
    let sexField = useRef(null);
    let sexFieldPlaceholder = useRef(null);

    useEffect(() => {
        if(props.thirdParty) {
            getUserData()
                .then((res) => {
                    if(res?.data?.result) {
                        if(res.data.result.active) {
                            window.location = "/tablica";
                        }
                        else {
                            setFirstName(res.data.result.first_name);
                            setLastName(res.data.result.last_name);
                            setRender(true);
                        }
                    }
                    else {
                        setRender(true);
                    }
                })
                .catch((e) => {
                    setRender(true);
                });
        }
        else {
            setRender(true);
        }
    }, [props.thirdParty]);

    useEffect(() => {
        if(props.thirdParty && formStep1 && formStep2) {
            setCurrentStep(2);
            if(formStep1.current && formStep2.current) {
                formStep1.current.style.display = "none";
                formStep2.current.style.display = "block";
            }
        }
    }, [props.thirdParty, formStep1, formStep2]);

    useEffect(() => {
        setAccountType(props.type);
    }, [props.type]);

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
            if(!props.thirdParty) {
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

    return userRegistered === 0 ? <>
        {!render ? <div className="fixed">
            <LoadingPage />
        </div> : ''}

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
                <input className={passwordError === "" ? "input input--password" : "input input--password input--error"}
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
                <input className={passwordError === "" ? "input input--password" : "input input--password input--error"}
                       onClick={() => { resetErrors(); }}
                       type="password"
                       value={repeatPassword}
                       onChange={(e) => { setRepeatPassword(e.target.value); }}
                       placeholder={passwordError === "" ? content.register_input3 : ""} />
            </label>
            <label className="label--checkBtn label--marketingCheckbox">
                <button className={checkboxObligatory ? "registerForm__checkBtn registerForm__checkBtn--checked" : "registerForm__checkBtn"}
                        onClick={(e) => { handleCheckbox(e, 0); }}>

                </button>
                {content.marketing_consent}
            </label>

            <button className="registerForm--nextBtn btn--gradient goldman" onClick={(e) => { validateStep1(e); }}>
                {content.continue_text}
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
            <label className="inputPhoneWrapper">
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
                <button className={!checkboxError ? (checkboxCompulsory ? "registerForm__checkBtn registerForm__checkBtn--checked" : "registerForm__checkBtn") : "registerForm__checkBtn input--error"}
                        onClick={(e) => { resetErrors(); handleCheckbox(e, 1); }}>

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
                </a>
            </label>

            {!loading ? <button className="registerForm--nextBtn registerForm--nextBtn--last goldman btn--gradient"
                                onClick={(e) => { validateStep2(e); }}>
                {content.register}
            </button> : <div className="center registerLoader">
                <DraftLoader />
            </div>}
        </section>
    </> : <AfterRegister thirdParty={props.thirdParty} />;
};

export default RegisterUser;
