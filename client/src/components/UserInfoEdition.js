import React, { useState, useEffect } from 'react'
import example from '../static/img/man.webp'
import camera from '../static/img/camera.svg'
import pen from '../static/img/pen.svg'
import check from '../static/img/check.svg'

import { Range, getTrackBackground } from 'react-range';
import {
    updateUserBirthday,
    updateUserClub, updateUserLicenceNumber,
    updateUserPhoneNumber,
    updateUserSalary
} from "../helpers/user";

const UserInfoEdition = ({player}) => {
    const [values, setValues] = useState([player?.salary_from ? player?.salary_from : 1000, player?.salary_to ? player?.salary_to : 4000]);

    const [fullName, setFullName] = useState("");
    const [age, setAge] = useState("");
    const [phoneNumber, setPhoneNumber] = useState(player.phone_number);
    const [club, setClub] = useState("1");
    const [email, setEmail] = useState(player.email);
    const [licence, setLicence] = useState("");

    const [editAge, setEditAge] = useState(false);
    const [editPhoneNumber, setEditPhoneNumber] = useState(false);
    const [editClub, setEditClub] = useState(false);
    const [editSalary, setEditSalary] = useState(false);
    const [editLicence, setEditLicence] = useState(false);

    const STEP = 1;
    const MIN = 1000;
    const MAX = 30000;

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
        updateUserPhoneNumber(phoneNumber);
    }

    const changeUserSalary = () => {
        setEditSalary(false);
        updateUserSalary(values[0], values[1]);
    }

    const changeUserClub = () => {
        setEditClub(false);
        updateUserClub(club);
    }

    const changeUserAge = () => {
        setEditAge(false);
        updateUserBirthday(age);
    }

    const changeUserLicence = () => {
        setEditLicence(false);
        updateUserLicenceNumber(licence);
    }

    return <section className="userInfoEdition siteWidthSuperNarrow">
        <section className="userInfoEdition__section">
            <figure className="userInfoEdition__imgWrapper">
                <img className="userInfoEdition__img" src={example} alt="alt" />
                <button className="userInfoEdition__imgBtn">
                    <img className="userInfoEdition__imgBtn__img" src={camera} alt="zmien-zdjecie" />
                </button>
            </figure>
        </section>

        <section className="userInfoEdition__form">
            <h2 className="userInfoEdition__fullName">
                {fullName}
            </h2>

            <label className="userInfoEdition__form__field">
                <span className="userInfoEdition__key">
                    Data urodzenia
                </span>
                <span className="userInfoEdition__value">
                    <label className={editAge ? "label--edit" : "label--marginRightMinus"}>
                        <input value={age}
                               type="date"
                               onChange={(e) => { setAge(e.target.value); }}
                               disabled={!editAge}
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
            <label className="userInfoEdition__form__field">
                <span className="userInfoEdition__key">
                    Mail
                </span>
                <span className="userInfoEdition__value">
                    {email}
                </span>
            </label>
            <label className="userInfoEdition__form__field">
                <span className="userInfoEdition__key">
                    Telefon
                </span>
                <span className="userInfoEdition__value">
                    <label className={editPhoneNumber ? "label--edit" : ""}>
                        <input value={phoneNumber}
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
            <label className="userInfoEdition__form__field">
                <span className="userInfoEdition__key">
                    Aktualny klub
                </span>
                <span className="userInfoEdition__value">
                    <label className={editClub ? "label--edit" : ""}>
                        <input value={club}
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
                        <input value={licence}
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
                    Honorarium
                </span>
                <span className="userInfoEdition__value">
                    {values[0]} - {values[1]}
                    {!editSalary ? <button className="userInfoEdition__btn" onClick={() => { setEditSalary(true); }}>
                        <img className="userInfoEdition__btn__img" src={pen} alt="edytuj" />
                    </button> : <button className="userInfoEdition__btn" onClick={() => { changeUserSalary(); }}>
                        <img className="userInfoEdition__btn__img" src={check} alt="ok" />
                    </button>}
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
                    values={values}
                    step={STEP}
                    min={MIN}
                    max={MAX}
                    rtl={false}
                    onChange={(values) => {
                        setValues(values);

                        if(values[1] > values[0] + 3000) {
                            setValues([values[1]-3000, values[1]]);
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
                                        values,
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
