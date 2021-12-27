import React, {useState, useEffect, useRef} from 'react'
import pen from '../static/img/pen.svg'
import check from '../static/img/save-parameter.svg'

import { Range, getTrackBackground } from 'react-range';
import {
    updateUserBirthday,
    updateUserClub, updateUserEmail, updateUserLicenceNumber,
    updateUserPhoneNumber,
    updateUserSalary
} from "../helpers/user";
import UserProfileImage from "./UserProfileImage";
import {calculateAge} from "../helpers/others";
import heart from "../static/img/heart.svg";
import heartFilled from "../static/img/heart-filled.svg";
import {addToFavorites, deleteFromFavorites} from "../helpers/club";
import {isMail} from "../helpers/validation";

const UserInfoEdition = ({player, theme, clubProp, favorite}) => {
    const [values, setValues] = useState([player?.salary_from ? player?.salary_from : 1000, player?.salary_to ? player?.salary_to : 4000]);
    const [prevValues, setPrevValues] = useState([player?.salary_from ? player?.salary_from : 1000, player?.salary_to ? player?.salary_to : 4000]);

    const [fullName, setFullName] = useState("");
    const [age, setAge] = useState("");
    const [phoneNumber, setPhoneNumber] = useState(player.phone_number);
    const [club, setClub] = useState("-");
    const [email, setEmail] = useState(player.email);
    const [licence, setLicence] = useState("");

    const [editEmail, setEditEmail] = useState(false);
    const [editAge, setEditAge] = useState(false);
    const [editPhoneNumber, setEditPhoneNumber] = useState(false);
    const [editClub, setEditClub] = useState(false);
    const [editSalary, setEditSalary] = useState(false);
    const [editLicence, setEditLicence] = useState(false);

    const [favoritePlayer, setFavoritePlayer] = useState(false);

    const phoneNumberRef = useRef(null);
    const clubRef = useRef(null);
    const licenseRef = useRef(null);

    const STEP = 1;
    const MIN = 1000;
    const MAX = 30000;

    useEffect(() => {
        if(theme === 'dark') {
            setFavoritePlayer(true);
        }
    }, []);

    useEffect(() => {
        setFavoritePlayer(favorite);
    }, [favorite]);

    useEffect(() => {
        setFullName(player.first_name + " " + player.last_name);
        setEmail(player.email);
        setPhoneNumber(player.phone_number);
        setAge(player.birthday?.substr(0, 10));
        setClub(player.club);
        setLicence(player.licence_number);
        setValues([player.salary_from, player.salary_to]);
    }, [player]);

    const changeUserPhoneNumber = () => {
        setEditPhoneNumber(false);
        if(phoneNumber?.length < 15) {
            updateUserPhoneNumber(phoneNumber);
        }
    }

    const changeUserEmail = () => {
        if(isMail(email)) {
            setEditEmail(false);
            updateUserEmail(email);
        }
    }

    const changeUserSalary = () => {
        setEditSalary(false);
        const valueFrom = parseInt(values[0]);
        const valueTo = parseInt(values[1]);
        const diff = valueTo - valueFrom;
        if(diff >= 0 && diff <= 3000 && valueFrom >= 1000 && valueFrom <= 30000 && valueTo >= 1000 && valueFrom <= 30000) {
            updateUserSalary(values[0], values[1]);
        }
    }

    const changeUserClub = () => {
        setEditClub(false);
        updateUserClub(club);
    }

    const changeUserAge = () => {
        setEditAge(false);
        if(calculateAge(age) > 16) {
            updateUserBirthday(age);
        }
    }

    const changeUserLicence = () => {
        setEditLicence(false);
        updateUserLicenceNumber(licence);
    }

    const addPlayerToFavorites = () => {
        if(!favoritePlayer) {
            addToFavorites(player.id ? player.id : player.user_id);
        }
        else {
            deleteFromFavorites(player.id ? player.id : player.user_id);
        }
        setFavoritePlayer(!favoritePlayer);
    }

    useEffect(() => {
        if(editPhoneNumber) {
            phoneNumberRef.current.focus();
        }
    }, [editPhoneNumber]);

    useEffect(() => {
        if(editClub) {
            clubRef.current.focus();
            clubRef.current.select();
        }
    }, [editClub]);

    useEffect(() => {
        if(editLicence) {
            licenseRef.current.focus();
            licenseRef.current.select();
        }
    }, [editLicence]);

    const editUserSalaryFrom = (salaryFrom) => {
        if(salaryFrom <= 30000 && salaryFrom >= 0) {
            setValues([salaryFrom, values[1]]);
        }
    }

    const editUserSalaryTo = (salaryTo) => {
        if(salaryTo <= 30000 && salaryTo >= 0) {
                setValues([values[0], salaryTo]);
        }
    }

    const selectSalaryFromInput = () => {
        document.querySelector('.input--salary:first-of-type').select();
    }

    const selectSalaryToInput = () => {
        document.querySelector('.input--salary:last-of-type').select();
    }

    useEffect(() => {
        if(values?.length === 2) {
            const numberOfDigitsInSalaryFrom = values[0]?.toString()?.length;
            const numberOfDigitsInSalaryTo = values[1]?.toString()?.length;
            const betweenSalaryInputs = document.querySelector('.betweenSalaryInputs');

            if(betweenSalaryInputs) {
                if(numberOfDigitsInSalaryFrom < 5 && numberOfDigitsInSalaryTo < 5) {
                    betweenSalaryInputs.style.paddingLeft = '20px';
                }
                else {
                    betweenSalaryInputs.style.paddingLeft = '10px';
                }
            }
        }
    }, [values]);

    return <section className="userInfoEdition siteWidthSuperNarrow">
        <section className="userInfoEdition__section">
            <UserProfileImage user={player} club={clubProp} />
        </section>

        <section className={theme === 'dark' ? "userInfoEdition__form userInfoEdition__form--dark" : "userInfoEdition__form"}>
            <h2 className="userInfoEdition__fullName">
                {fullName}
                {theme === 'dark' ? <section className="comparedPlayer__icons">
                    <button className="comparedPlayer__icons__item" onClick={() => { addPlayerToFavorites(); }}>
                        <img className="btn__img" src={!favoritePlayer ? heart : heartFilled} alt="dodaj-do-ulubionych" />
                    </button>
                </section> : ""}
            </h2>

            <label className="userInfoEdition__form__field">
                <span className="userInfoEdition__key">
                    {theme === "dark" ? "Wiek" : "Data urodzenia"}
                </span>
                <span className="userInfoEdition__value">
                    <label className={editAge ? "label--edit" : "label--marginRightMinus"}>
                        <input value={theme === "dark" ? calculateAge(age) : age}
                               type={theme === "dark" ? "number" : "date"}
                               onChange={(e) => { setAge(e.target.value); }}
                               disabled={!editAge}
                               required={true}
                               className="input--editProfile"
                               name="age" />
                        {!editAge ? <button className="userInfoEdition__btn" onClick={() => { setEditAge(true); }}>
                            <img className="userInfoEdition__btn__img" src={pen} alt="edytuj" />
                        </button> : <button className="userInfoEdition__btn" onClick={() => { changeUserAge(); }}>
                            <img className="userInfoEdition__btn__img" src={check} alt="ok" />
                        </button>}
                    </label>
                </span>
            </label>
            {!(theme === 'dark') ? <>
                {player.adapter === 1 ? <label className="userInfoEdition__form__field userInfoEdition__form__field--mail">
                    <span className="userInfoEdition__key">
                        Mail
                    </span>
                    <span className="userInfoEdition__value">
                        {email}
                    </span>
                </label> : ""}
                <label className="userInfoEdition__form__field">
                    <span className="userInfoEdition__key">
                        Telefon
                    </span>
                        <span className="userInfoEdition__value">
                            <label className={editPhoneNumber ? "label--edit" : ""}>
                                <input value={phoneNumber}
                                       ref={phoneNumberRef}
                                       onKeyDown={(e) => { if(e.keyCode === 13) changeUserPhoneNumber(); }}
                                       onChange={(e) => { setPhoneNumber(e.target.value); }}
                                       disabled={!editPhoneNumber}
                                       className="input--editProfile"
                                       name="phoneNumber" />
                                {!editPhoneNumber ? <button className="userInfoEdition__btn" onClick={() => { setEditPhoneNumber(true); }}>
                                    <img className="userInfoEdition__btn__img" src={pen} alt="edytuj" />
                                </button> : <button className="userInfoEdition__btn" onClick={() => { changeUserPhoneNumber(); }}>
                                    <img className="userInfoEdition__btn__img" src={check} alt="ok" />
                                </button>}
                            </label>
                    </span>
                </label>
            </> : ""}
            <label className="userInfoEdition__form__field">
                <span className="userInfoEdition__key">
                    Aktualny klub
                </span>
                <span className="userInfoEdition__value">
                    <label className={editClub ? "label--edit" : ""}>
                        <input value={club}
                               ref={clubRef}
                               onKeyDown={(e) => { if(e.keyCode === 13) changeUserClub(); }}
                               onChange={(e) => { setClub(e.target.value); }}
                               disabled={!editClub}
                               className="input--editProfile"
                               name="club" />
                        {!editClub ? <button className="userInfoEdition__btn" onClick={() => { setEditClub(true); }}>
                            <img className="userInfoEdition__btn__img" src={pen} alt="edytuj" />
                        </button> : <button className="userInfoEdition__btn" onClick={() => { changeUserClub(); }}>
                            <img className="userInfoEdition__btn__img" src={check} alt="ok" />
                        </button>}
                    </label>
                </span>
            </label>
            <label className="userInfoEdition__form__field">
                <span className="userInfoEdition__key">
                    Nr licencji PZPS
                </span>
                <span className="userInfoEdition__value">
                    <label className={editLicence ? "label--edit" : ""}>
                        <input value={licence ? licence : "-"}
                               ref={licenseRef}
                               onKeyDown={(e) => { if(e.keyCode === 13) changeUserLicence(); }}
                               onChange={(e) => { setLicence(e.target.value); }}
                               disabled={!editLicence}
                               className="input--editProfile"
                               name="club" />
                        {!editLicence ? <button className="userInfoEdition__btn" onClick={() => { setEditLicence(true); }}>
                            <img className="userInfoEdition__btn__img" src={pen} alt="edytuj" />
                        </button> : <button className="userInfoEdition__btn" onClick={() => { changeUserLicence(); }}>
                            <img className="userInfoEdition__btn__img" src={check} alt="ok" />
                        </button>}
                    </label>
                </span>
            </label>
            <label className="userInfoEdition__form__field">
                <span className="userInfoEdition__key">
                    Wynagrodzenie (netto)
                </span>
                <span className="userInfoEdition__value userInfoEdition__value--salary">
                    {clubProp ? <span>
                        {values[0] ? values[0] : 1000} - {values[1] ? values[1] : 3000}
                    </span> : <>
                        <input className="input--editProfile input--salary"
                               value={values[0] ? values[0] : (values[0] === '' ? '' : 1000)}
                               onChange={(e) => { editUserSalaryFrom(e.target.value); }}
                               onClick={() => { selectSalaryFromInput(); }}
                               onKeyDown={(e) => { if(e.keyCode === 13) changeUserSalary(); }}
                               disabled={!editSalary}
                               type="number" />
                        <span className="betweenSalaryInputs">
                               -
                           </span>
                        <input className="input--editProfile input--salary"
                               value={values[1] ? values[1] : (values[1] === '' ? '' : 3000)}
                               onChange={(e) => { editUserSalaryTo(e.target.value); }}
                               onKeyDown={(e) => { if(e.keyCode === 13) changeUserSalary(); }}
                               onClick={() => { selectSalaryToInput(); }}
                               disabled={!editSalary}
                               type="number" />
                    </>}
                    {!clubProp ? (!editSalary ? <button className="userInfoEdition__btn" onClick={() => { setEditSalary(true); }}>
                        <img className="userInfoEdition__btn__img" src={pen} alt="edytuj" />
                    </button> : <button className="userInfoEdition__btn" onClick={() => { changeUserSalary(); }}>
                        <img className="userInfoEdition__btn__img" src={check} alt="ok" />
                    </button>) : ""}
                </span>
            </label>

            {editSalary ? <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexWrap: 'wrap'
                }}
            >
                <Range
                    values={values[0] ? values : [1000, 3000]}
                    step={STEP}
                    min={MIN}
                    max={MAX}
                    rtl={false}
                    onChange={(newValues) => {
                        const prevValues = values;
                        setValues(newValues);

                        if(prevValues[0] !== newValues[0]) {
                            /* User move lower bound */
                            if(newValues[0] > prevValues[0]) {
                                /* User increase lower bound */
                                if(newValues[0]+3000 < newValues[1]) {
                                    setValues([newValues[0], prevValues[1]]);
                                }
                                else {
                                    setValues(newValues);
                                }
                            }
                            else {
                                /* User decrease lower bound */
                                if(newValues[0]+3000 < newValues[1]) {
                                    setValues([newValues[0], newValues[0]+3000]);
                                }
                                else {
                                    setValues(newValues);
                                }
                            }
                        }
                        else {
                            /* User move higher bound */
                            if(newValues[1] > prevValues[1]) {
                                /* User increase higher bound */
                                if(newValues[0]+3000 < newValues[1]) {
                                    setValues([newValues[1]-3000, newValues[1]]);
                                }
                                else {
                                    setValues(newValues);
                                }
                            }
                            else {
                                /* User decrease higher bound */
                                if(newValues[0]+3000 < newValues[1]) {
                                    setValues([newValues[0], newValues[0]+3000]);
                                }
                                else {
                                    setValues(newValues);
                                }
                            }
                        }

                        if(newValues[0] < 0) {
                            setValues([0, values[1]]);
                        }
                        if(newValues[1] > 30000) {
                            setValues([values[0], 30000]);
                        }
                    }}
                    renderTrack={({ props, children }) => (
                        <div
                            onMouseDown={props.onMouseDown}
                            onTouchStart={props.onTouchStart}
                            style={{
                                ...props.style,
                                height: '20px',
                                width: '100%',
                                borderRadius: '50%',
                                display: 'flex',
                            }}
                        >
                            <div
                                ref={props.ref}
                                style={{
                                    height: '5px',
                                    width: '100%',
                                    borderRadius: '4px',
                                    border: '1px solid #707070',
                                    background: getTrackBackground({
                                        values: values[0] ? values : [1000, 3000],
                                        colors: ['#474747', '#E2B76D', '#474747'],
                                        min: MIN,
                                        max: MAX,
                                        rtl: false
                                    }),
                                    alignSelf: 'center'
                                }}
                            >
                                {children}
                            </div>
                        </div>
                    )}
                    renderThumb={({ index, props, isDragged }) => (
                        <div
                            {...props}
                            style={{
                                ...props.style,
                                height: '15px',
                                width: '15px',
                                borderRadius: '50%',
                                border: '1px solid #707070',
                                backgroundColor: '#ffffff',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                        >
                        </div>
                    )}
                />
            </div> : ""}
        </section>
    </section>
}

export default UserInfoEdition;
