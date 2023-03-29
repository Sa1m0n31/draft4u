import React, {useContext, useEffect, useRef, useState} from 'react';
import {isMail, isPasswordStrength} from "../helpers/validation";
import {ContentContext} from "../App";
import AfterRegister from "./AfterRegister";
import DraftLoader from "./Loader";
import {isLoginAvailable, registerClub, sendClubForm} from "../helpers/club";

const RegisterClub = (props) => {
    const { language, content } = useContext(ContentContext);

    const [accountType, setAccountType] = useState(-1);

    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [checkboxCompulsory, setCheckboxCompulsory] = useState(false);
    const [name, setName] = useState('');
    const [login, setLogin] = useState('');
    const [city, setCity] = useState('');

    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [nameError, setNameError] = useState('');
    const [loginError, setLoginError] = useState('');
    const [cityError, setCityError] = useState('');
    const [phoneNumberError, setPhoneNumberError] = useState('');
    const [checkboxError, setCheckboxError] = useState(false);

    const [userRegistered, setUserRegistered] = useState(0);
    const [loading, setLoading] = useState(false);

    let formStep1 = useRef(null);
    let formStep2 = useRef(null);

    useEffect(() => {
        setAccountType(props.type);
    }, [props.type]);

    const resetErrors = (e) => {
        if(e) e.preventDefault();

        setEmailError("");
        setNameError('');
        setPhoneNumberError('');
        setCheckboxError(false);
    }

    const handleCheckbox = (e, n) => {
        e.preventDefault();
        if(n === 1) setCheckboxCompulsory(!checkboxCompulsory);
    }

    const validateStep1 = (e) => {
        e.preventDefault();
        let error = false;

        if(!isMail(email)) {
            setEmailError(content.email_error);
            setEmail("");
            error = true;
        }
        if(!phoneNumber) {
            setPhoneNumberError(content.phone_number_error);
            setPhoneNumber('');
            error = true;
        }

        if(!error) {
            setLoading(true);

            isLoginAvailable(login)
                .then((res) => {
                    if(res?.data?.result === 1) {
                        /* REGISTER CLUB */
                        sendClubForm(name, email, phoneNumber, '')
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
                        setLogin('');
                        setLoginError('Podany login jest zajęty');
                        setLoading(false);
                    }
                });
        }
    }

    return userRegistered === 0 ? <>
        <section className="registerForm__section registerForm__section--1 registerForm__section--club" ref={formStep1}>
            <label>
                {nameError !== "" ? <span className="loginBox__error">
                        {nameError}
                </span> : ""}
                <input className={nameError === "" ? "input" : "input input--error"}
                       onClick={() => { resetErrors(); }}
                       value={name}
                       onChange={(e) => { setName(e.target.value); }}
                       placeholder={nameError === "" ? 'Nazwa klubu' : ""} />
            </label>
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

            {!loading ? <button className="registerForm--nextBtn btn--gradient goldman" onClick={(e) => { validateStep1(e); }}>
                {language === 'pl' ? 'Wyślij zgłoszenie' : 'Send application'}
            </button> : <div className="center registerLoader">
                <DraftLoader />
            </div>}
        </section>
    </> : <AfterRegister club={true} />
};

export default RegisterClub;
