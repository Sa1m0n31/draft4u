import React, {useState, useEffect, useRef, useContext} from 'react'
import pen from '../static/img/pen.svg'
import check from '../static/img/save-parameter.svg'

import { Range, getTrackBackground } from 'react-range';
import {
    updateUserBirthday,
    updateUserClub, updateUserEmail, updateUserExperience, updateUserLicenceNumber,
    updateUserPhoneNumber,
    updateUserSalary
} from "../helpers/user";
import UserProfileImage from "./UserProfileImage";
import {calculateAge} from "../helpers/others";
import heart from "../static/img/heart.svg";
import heartFilled from "../static/img/heart-filled.svg";
import {addToFavorites, deleteFromFavorites} from "../helpers/club";
import {isMail} from "../helpers/validation";
import {ContentContext, StuffContext} from "../App";
import {TestClubContext} from "../wrappers/ClubWrapper";

const UserInfoEdition = ({player, theme, clubProp, favorite}) => {
    const { content } = useContext(ContentContext);
    const { testClub } = useContext(TestClubContext);
    const { isStuff } = useContext(StuffContext);

    const [values, setValues] = useState([player?.salary_from ? player?.salary_from : 1000, player?.salary_to ? player?.salary_to : 4000]);

    const [fullName, setFullName] = useState("");
    const [age, setAge] = useState("");
    const [phoneNumber, setPhoneNumber] = useState(player.phone_number);
    const [club, setClub] = useState("-");
    const [email, setEmail] = useState(player.email);
    const [licence, setLicence] = useState("");
    const [experience, setExperience] = useState("");
    const [leagues, setLeagues] = useState([]);

    const [editEmail, setEditEmail] = useState(false);
    const [editAge, setEditAge] = useState(false);
    const [editPhoneNumber, setEditPhoneNumber] = useState(false);
    const [editClub, setEditClub] = useState(false);
    const [editSalary, setEditSalary] = useState(false);
    const [editLicence, setEditLicence] = useState(false);
    const [editExperience, setEditExperience] = useState(false);

    const [favoritePlayer, setFavoritePlayer] = useState(false);

    const phoneNumberRef = useRef(null);
    const clubRef = useRef(null);
    const licenseRef = useRef(null);
    const emailRef = useRef(null);
    const experienceRef = useRef(null);

    const STEP = 100;
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
        setLeagues(setLeaguesByExperience(player.experience));
        setValues([player.salary_from, player.salary_to]);
    }, [player]);

    const setLeaguesByExperience = (experience) => {
        if(experience) {
            return experience.split(',').map((item) => {
                const name = item.trim();
                if(name === 'Plus Liga' || name === 'Tauron Liga') return 0;
                else if(name === content.map_league1) return 1;
                else if(name === content.map_league2) return 2;
                else if(name === content.map_league3) return 3;
            });
        }
        else {
            return [];
        }
    }

    const changeUserPhoneNumber = (tab) => {
        setEditPhoneNumber(false);
        if(phoneNumber?.length < 15) {
            updateUserPhoneNumber(phoneNumber);
        }

        if(tab) setEditClub(true);
    }

    const changeUserEmail = (tab) => {
        if(isMail(email)) {
            setEditEmail(false);
            updateUserEmail(email);
        }

        if(tab) setEditPhoneNumber(true);
    }

    const changeUserSalary = (tab) => {
        setEditSalary(false);
        const valueFrom = parseInt(values[0]);
        const valueTo = parseInt(values[1]);
        const diff = valueTo - valueFrom;
        if(diff >= 0 && diff <= 3000 && valueFrom >= 1000 && valueFrom <= 30000 && valueTo >= 1000 && valueFrom <= 30000) {
            updateUserSalary(values[0], values[1]);
        }

        if(tab) setEditAge(true);
    }

    const changeUserClub = (tab) => {
        setEditClub(false);
        updateUserClub(club);

        if(tab) setEditLicence(true);
    }

    const changeUserAge = (tab) => {
        setEditAge(false);
        if(calculateAge(age) > 16) {
            updateUserBirthday(age);
        }

        if(tab) setEditEmail(true);
    }

    const changeUserLicence = (tab) => {
        setEditLicence(false);
        updateUserLicenceNumber(licence);

        if(tab) setEditExperience(true);
    }

    const changeUserExperience = (tab) => {
        setEditExperience(false);
        updateUserExperience(experience);

        if(tab) setEditSalary(true);
    }

    const getLeaguesFromLeaguesIndexes = () => {
        return leagues.sort().map((item) => {
            switch(item) {
                case 0:
                    if(player?.sex) return 'Plus Liga';
                    else return 'Tauron Liga';
                case 1:
                    return content.map_league1;
                case 2:
                    return content.map_league2;
                default:
                    return content.map_league3;
            }
        });
    }

    useEffect(() => {
        if(leagues?.length) setExperience(getLeaguesFromLeaguesIndexes().join(', '));
    }, [leagues]);

    const isLeagueSelected = (n) => {
        return leagues.findIndex((item) => {
            return item === n;
        }) !== -1;
    }

    const chooseLeague = (n) => {
        if(!isLeagueSelected(n)) {
            setLeagues([...leagues, n]);
        }
        else {
            setLeagues((prevState) => {
                return prevState.filter((item) => {
                    return item !== n;
                });
            });
        }
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
        if(editEmail) {
            emailRef.current.focus();
            emailRef.current.select();
        }
    }, [editEmail]);

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
        const salaryTo = values[1];
        if(salaryFrom <= 30000 && salaryFrom >= 0) {
            if((salaryTo - salaryFrom > 3000) && (salaryFrom.toString().length >= 4)) setValues([parseInt(salaryFrom), (parseInt(salaryFrom)+3000)]);
            else setValues([parseInt(salaryFrom), parseInt(salaryTo)]);
        }
    }

    const editUserSalaryTo = (salaryTo) => {
        const salaryFrom = values[0];
        if(salaryTo <= 30000 && salaryTo >= 0) {
            if(salaryTo - salaryFrom > 3000) setValues([parseInt(salaryTo)-3000, parseInt(salaryTo)]);
            else setValues([parseInt(salaryFrom), parseInt(salaryTo)]);
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

    useEffect(() => {
        if(email?.split('@')?.length > 1) {
            if(email?.split('@')[1] === 'facebookauth') {
                setEmail('-');
            }
        }
    }, [email]);

    return <section className="userInfoEdition siteWidthSuperNarrow">
        <section className="userInfoEdition__section">
            <UserProfileImage user={player} club={clubProp} />
        </section>

        <section className={theme === 'dark' ? "userInfoEdition__form userInfoEdition__form--dark" : "userInfoEdition__form"}>
            <h2 className="userInfoEdition__fullName">
                {player?.first_name} {!testClub ? player?.last_name : '******'}
                {theme === 'dark' ? <section className="comparedPlayer__icons">
                    <button className="comparedPlayer__icons__item" onClick={() => { addPlayerToFavorites(); }}>
                        <img className="btn__img" src={!favoritePlayer ? heart : heartFilled} alt="dodaj-do-ulubionych" />
                    </button>
                </section> : ""}
            </h2>

            <label className="userInfoEdition__form__field">
                <span className="userInfoEdition__key">
                    {theme === "dark" ? content.age : content.player_parameter_1}
                </span>
                <span className="userInfoEdition__value">
                    <label className={editAge ? "label--edit" : "label--marginRightMinus"}>
                        <input value={theme === "dark" ? calculateAge(age) : age}
                               type={theme === "dark" ? "number" : "date"}
                               onChange={(e) => { setAge(e.target.value); }}
                               onKeyDown={(e) => { if(e.keyCode === 13 || e.keyCode === 9) changeUserAge(e.keyCode === 9); }}
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
           <label className="userInfoEdition__form__field">
                <span className="userInfoEdition__key">
                    {content.player_parameter_2}
                </span>
               <span className="userInfoEdition__value">
                <label className={editEmail ? "label--edit" : "label--edit--email"}>
                    <input value={email?.split('@')[1] === 'facebookauth' ? '-' : (testClub ? '******' : email)}
                           ref={emailRef}
                           onKeyDown={(e) => { if(e.keyCode === 13 || e.keyCode === 9) changeUserEmail(e.keyCode === 9); }}
                           onChange={(e) => { setEmail(e.target.value); }}
                           disabled={!editEmail}
                           className="input--editProfile"
                           name="email" />
                    {/*{!editEmail ? <button className="userInfoEdition__btn" onClick={() => { setEditEmail(true); }}>*/}
                    {/*    <img className="userInfoEdition__btn__img" src={pen} alt="edytuj" />*/}
                    {/*</button> : <button className="userInfoEdition__btn" onClick={() => { changeUserEmail(); }}>*/}
                    {/*    <img className="userInfoEdition__btn__img" src={check} alt="ok" />*/}
                    {/*</button>}*/}
                </label>
            </span>
            </label>
            <label className="userInfoEdition__form__field">
                <span className="userInfoEdition__key">
                    {content.player_parameter_3}
                </span>
                    <span className="userInfoEdition__value">
                        <label className={editPhoneNumber ? "label--edit" : ""}>
                            <input value={testClub ? '******' : phoneNumber}
                                   ref={phoneNumberRef}
                                   onKeyDown={(e) => { if(e.keyCode === 13 || e.keyCode === 9) changeUserPhoneNumber(e.keyCode === 9); }}
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
                    {content.player_parameter_4}
                </span>
                <span className="userInfoEdition__value">
                    <label className={editClub ? "label--edit" : ""}>
                        <input value={club}
                               ref={clubRef}
                               onKeyDown={(e) => { if(e.keyCode === 13 || e.keyCode === 9) changeUserClub(e.keyCode === 9); }}
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
            {isStuff ? '' : <>
                <label className="userInfoEdition__form__field">
                <span className="userInfoEdition__key">
                    {content.player_parameter_5}
                </span>
                    <span className="userInfoEdition__value">
                    <label className={editLicence ? "label--edit" : ""}>
                        <input value={licence ? licence : "-"}
                               ref={licenseRef}
                               onKeyDown={(e) => { if(e.keyCode === 13 || e.keyCode === 9) changeUserLicence(e.keyCode === 9); }}
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
                <div className={editExperience ? "userInfoEdition__form__field userInfoEdition__form__field--experience" : "userInfoEdition__form__field"}
                     onKeyDown={(e) => { if(e.keyCode === 13 || e.keyCode === 9) changeUserExperience(e.keyCode === 9); }}
                >
                <span className="userInfoEdition__key">
                    {content.player_parameter_6}
                </span>
                    <span className="userInfoEdition__value userInfoEdition__value--experience">
                    <label>
                        <span className="input--editProfile input--editProfile--experience">
                            {editExperience ? "" : (!experience ? "-" : experience)}
                        </span>
                        {!editExperience ? <button className="userInfoEdition__btn" onClick={() => { setEditExperience(true); }}>
                            <img className="userInfoEdition__btn__img" src={pen} alt="edytuj" />
                        </button> : <button type="button" className="userInfoEdition__btn" onClick={() => { changeUserExperience(); }}>
                            <img className="userInfoEdition__btn__img" src={check} alt="ok" />
                        </button>}
                    </label>
                </span>
                    {editExperience ? <div className="experienceSection">
                        <span>
                            {content.map_leagues}:
                        </span>
                        <button className={isLeagueSelected(0) ? "experienceSection__btn experienceSection__btn--selected" : "experienceSection__btn"} onClick={() => { chooseLeague(0); }}>
                            {player?.sex ? "Plus Liga" : "Tauron Liga"}
                        </button>
                        <button className={isLeagueSelected(1) ? "experienceSection__btn experienceSection__btn--selected" : "experienceSection__btn"} onClick={() => { chooseLeague(1); }}>
                            {content.map_league1}
                        </button>
                        <button className={isLeagueSelected(2) ? "experienceSection__btn experienceSection__btn--selected" : "experienceSection__btn"} onClick={() => { chooseLeague(2); }}>
                            {content.map_league2}
                        </button>
                        <button className={isLeagueSelected(3) ? "experienceSection__btn experienceSection__btn--selected" : "experienceSection__btn"} onClick={() => { chooseLeague(3); }}>
                            {content.map_league3}
                        </button>
                    </div> : ""}
                </div>
            </>}
            <label className="userInfoEdition__form__field"
                    onKeyDown={(e) => { if(e.keyCode === 13 || e.keyCode === 9) changeUserSalary(e.keyCode === 9); }}
            >
                <span className="userInfoEdition__key">
                    {content.player_parameter_7}
                </span>
                <span className="userInfoEdition__value userInfoEdition__value--salary">
                    {clubProp ? <span>
                        {values[0] ? values[0] : 1000} - {values[1] ? values[1] : 3000}
                    </span> : <>
                        <input className="input--editProfile input--salary"
                               value={values[0] ? values[0] : (values[0] === '' ? '' : 1000)}
                               onChange={(e) => { editUserSalaryFrom(e.target.value); }}
                               onClick={() => { selectSalaryFromInput(); }}
                               onKeyDown={(e) => { if(e.keyCode === 13 || e.keyCode === 9) changeUserSalary(); }}
                               disabled={!editSalary}
                               type="number" />
                        <span className="betweenSalaryInputs">
                               -
                           </span>
                        <input className="input--editProfile input--salary"
                               value={values[1] ? values[1] : (values[1] === '' ? '' : 3000)}
                               onChange={(e) => { editUserSalaryTo(e.target.value); }}
                               onKeyDown={(e) => { if(e.keyCode === 13 || e.keyCode === 9) changeUserSalary(); }}
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
