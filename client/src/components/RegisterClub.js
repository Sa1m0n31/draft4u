import React, {useContext, useEffect, useRef, useState} from 'react';
import {isMail, isPasswordStrength} from "../helpers/validation";
import {ContentContext} from "../App";
import AfterRegister from "./AfterRegister";
import DraftLoader from "./Loader";
import {isLoginAvailable, registerClub} from "../helpers/club";

const RegisterClub = (props) => {
    const { content } = useContext(ContentContext);

    const [accountType, setAccountType] = useState(-1);

    const [email, setEmail] = useState("");
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
    const [checkboxError, setCheckboxError] = useState(false);

    const [userRegistered, setUserRegistered] = useState(0);
    const [loading, setLoading] = useState(false);

    let formStep1 = useRef(null);
    let formStep2 = useRef(null);

    useEffect(() => {
        if(props.registerFromThirdParty && formStep1 && formStep2) {
            if(formStep1.current && formStep2.current) {
                formStep1.current.style.display = "none";
                formStep2.current.style.display = "block";
            }
        }
    }, [props.registerFromThirdParty, formStep1, formStep2]);

    useEffect(() => {
        setAccountType(props.type);
    }, [props.type]);

    const resetErrors = (e) => {
        if(e) e.preventDefault();

        setEmailError("");
        setPasswordError("");

        setNameError('');
        setLoginError('');
        setCityError('');
        setCheckboxError(false);
    }

    const handleCheckbox = (e, n) => {
        e.preventDefault();
        if(n === 1) setCheckboxCompulsory(!checkboxCompulsory);
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

        if(!error) {
            formStep1.current.style.display = "none";
            formStep2.current.style.display = "block";
        }
    }

    const validateStep2 = (e) => {
        e.preventDefault();

        let error = false;

        if(!name?.length) {
            setNameError('Wpisz nazwę klubu');
            error = true;
        }
        if(!login?.length) {
            setLoginError('Wpisz swój login');
            error = true;
        }
        if(!city?.length) {
            setCityError('Wpisz miasto klubu');
            error = true;
        }

        if(!error) {
            setLoading(true);

            isLoginAvailable(login)
                .then((res) => {
                    if(res?.data?.result === 1) {
                        /* REGISTER CLUB */
                        registerClub(name, login, password, email, city)
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
        {/* STEP 1 */}
        <section className="registerForm__section registerForm__section--1 registerForm__section--club" ref={formStep1}>
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

            <button className="registerForm--nextBtn btn--gradient goldman" onClick={(e) => { validateStep1(e); }}>
                Dalej
            </button>
        </section>

        {/* STEP 2 */}
        <section className="registerForm__section registerForm__section--2 registerForm__section--2--club" ref={formStep2}>
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

            <label className="inputPhoneWrapper">
                {loginError !== "" ? <span className="loginBox__error">
                        {loginError}
                </span> : ""}
                <input className={loginError === "" ? "input" : "input input--error"}
                       onClick={() => { resetErrors(); }}
                       value={login}
                       onChange={(e) => { setLogin(e.target.value); }}
                       placeholder={loginError === "" ? 'Login' : ""} />
            </label>

            <label>
                {cityError !== "" ? <span className="loginBox__error">
                        {cityError}
                </span> : ""}
                <input className={cityError === "" ? "input" : "input input--error"}
                       onClick={() => { resetErrors(); }}
                       value={city}
                       onChange={(e) => { setCity(e.target.value); }}
                       placeholder={cityError === "" ? 'Miasto' : ""} />
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
    </> : <AfterRegister club={true} />
};

export default RegisterClub;
