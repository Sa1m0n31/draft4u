import React, {useState, useEffect, useRef} from 'react'
import AdminTop from "../components/AdminTop";
import PanelMenu from "../components/PanelMenu";
import {
    addClub,
    changeClubPasswordFromAdminPanel,
    getClubById,
    getClubLocations,
    getLeagues,
    updateClub
} from "../helpers/club";
import mapImg from '../static/img/poland.svg'
import settings from "../settings";
import trashIcon from "../static/img/trash-black.svg";
import Dropzone from "react-dropzone-uploader";

const AdminAddClub = ({admin}) => {
    const [name, setName] = useState("");
    const [league, setLeague] = useState(-1);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [repeatNewPassword, setRepeatNewPassword] = useState("");
    const [x, setX] = useState(null);
    const [y, setY] = useState(null);
    const [nip, setNip] = useState("");
    const [krs, setKrs] = useState("");
    const [city, setCity] = useState("");
    const [email, setEmail] = useState("");
    const [img, setImg] = useState(null);
    const [updateMode, setUpdateMode] = useState(false);
    const [updateImage, setUpdateImage] = useState(false);
    const [imageUpdated, setImageUpdated] = useState(false);
    const [leagues, setLeagues] = useState([]);
    const [locationSelected, setLocationSelected] = useState(0);
    const [clubLocations, setClubLocations] = useState([]);

    const [nameError, setNameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [locationError, setLocationError] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [leagueError, setLeagueError] = useState("");
    const [newPasswordError, setNewPasswordError] = useState("");

    const [addResult, setAddResult] = useState(-1);
    const [passwordChangeStatus, setPasswordChangeStatus] = useState(-1);

    const [clubId, setClubId] = useState("");

    const currentClubPoint = useRef(null);
    const mapWrapper = useRef(null);

    useEffect(() => {
        getLeagues()
            .then((res) => {
                setLeagues(res?.data?.result?.sort((a, b) => {
                    if(a.name > b.name) return 1;
                    else return -1;
                }));
            });

        getClubLocations()
            .then((res) => {
                setClubLocations(res?.data?.result);
            });

        const params = new URLSearchParams(window.location.search);
        const clubToUpdate = params.get('id');

        if(clubToUpdate) {
            setClubId(clubToUpdate);
            setUpdateMode(true);
            getClubById(clubToUpdate)
                .then((res) => {
                    const result = res?.data?.result;
                    if(result) {
                        setName(result.name);
                        setUsername(result.login);
                        setX(result.x);
                        setY(result.y);
                        setLeague(result.league);
                        setLocationSelected(2);
                        setUpdateImage(result.file_path);
                        setNip(result.nip);
                        setKrs(result.krs);
                        setCity(result.city);
                        setEmail(result.email);
                    }
                });
        }
    }, []);

    const getUploadImage = (img) => {
        console.log(img);
    }

    const handleChangeStatus = (status) => {
        if(updateMode) {
            setImageUpdated(true);
            setUpdateImage(null);
        }
        setImg(status);
    }

    const handleSubmit = () => {
        if(!name) {
            setNameError("Podaj nazwę klubu");
            return 0;
        }
        if(league === -1) {
            setLeagueError("Wybierz ligę");
            return 0;
        }
        if(!username) {
            setUsernameError("Wpisz login klubu");
            return 0;
        }
        if(!locationSelected) {
            setLocationError("Wybierz lokalizację klubu");
            return 0;
        }

        if(!updateMode) {
            if(!password || !repeatPassword) {
                setPasswordError("Wpisz dwukrotnie poprawne hasło");
                return 0;
            }
            if(password !== repeatPassword) {
                setPasswordError("Podane hasła muszą być identyczne");
                return 0;
            }

            addClub(name, league, username, password, x, y, img?.file, nip, krs, city, email)
                .then((res) => {
                    setAddResult(res?.data?.result);
                    window.scrollTo(0, 0);
                });
        }
        else {
            updateClub(clubId, name, league, username, x, y, imageUpdated ? (img ? img.file : 'delete') : null, nip, krs, city, email)
                .then((res) => {
                    setAddResult(res?.data?.result);
                    window.scrollTo(0, 0);
                });
        }
    }

    const deleteImg = () => {
        if(img) {
            img.remove();
            setImg(null);
        }
        if(updateImage) {
            setUpdateImage(null);
        }
        setImageUpdated(true);
    }

    const addPointOnMap = (e) => {
        if(!locationSelected) {
            const mapWidth = parseInt(window.getComputedStyle(mapWrapper.current).getPropertyValue('width').split(',')[0]);
            const mapHeight = parseInt(window.getComputedStyle(mapWrapper.current).getPropertyValue('height').split(',')[0]);

            const rect = e.target.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position within the element.
            const y = e.clientY - rect.top;  // y position within the element.

            currentClubPoint.current.style.top = y + "px";
            currentClubPoint.current.style.left = x + "px";

            const xPercent = (x / mapWidth * 100).toFixed(2);
            const yPercent = (y / mapHeight * 100).toFixed(2);

            setX(xPercent);
            setY(yPercent);

            setLocationSelected(1);
        }
    }

    useEffect(() => {
        if(!locationSelected) {
            if(document.querySelector(".clubPoint--selected")) {
                document.querySelector(".clubPoint--selected").style.background = "#282828";
            }

            currentClubPoint.current.style.opacity = "0";
            currentClubPoint.current.style.zIndex = "-1";
        }
        else if(locationSelected === 1) {
            setLocationError("");
            currentClubPoint.current.style.opacity = "1";
            currentClubPoint.current.style.zIndex = "2";
            if(document.querySelector(".clubPoint--selected")) {
                document.querySelector(".clubPoint--selected").style.background = " #e2b76d";
            }
        }
        else {
            setLocationError("");
            if(document.querySelector(".clubPoint--selected")) {
                document.querySelector(".clubPoint--selected").style.background = " #e2b76d";
            }
        }
    }, [locationSelected]);

    useEffect(() => {
        if(league !== -1) setLeagueError("");
    }, [league]);

    useEffect(() => {
        if(nameError || leagueError || passwordError || usernameError || locationError) {
            window.scrollTo(0, 0);
        }
    }, [nameError, leagueError, passwordError, usernameError, locationError]);

    useEffect(() => {
        if(passwordChangeStatus !== -1) window.scrollTo(0, 0);
    }, [passwordChangeStatus]);

    const chooseOldLocation = (newX, newY) => {
        if(!locationSelected) {
            setX(newX);
            setY(newY);
            setLocationSelected(2);
        }
    }

    const changeClubPassword = () => {
        if(newPassword !== repeatNewPassword) {
            setNewPasswordError("Podane hasła nie są identyczne");
            return 0;
        }
        if(!newPassword || !repeatNewPassword) {
            setNewPasswordError("Wpisz dwukrotnie nowe hasło");
            return 0;
        }

        changeClubPasswordFromAdminPanel(clubId, newPassword)
            .then((res) => {
                setPasswordChangeStatus(res?.data?.result);
            });
    }

    return <div className="container container--dark container--admin">
        <AdminTop />
        <main className="admin">
            <PanelMenu menuOpen={0} />
            <main className="admin__main">
                <header className="admin__flex">
                    <h1 className="admin__main__header">
                        Dodaj nowy klub
                    </h1>
                    {addResult !== -1 ? <span className="admin__status">
                        {addResult === 1 ? <span className="admin__status__inner admin__status--success">
                            Klub został dodany
                        </span> : (addResult === 2) ? <span className="admin__status__inner admin__status--success">
                            Klub został zaktualizowany
                        </span> : (addResult === 0 ? <span className="admin__status__inner admin__status--error">
                            Coś poszło nie tak... Skontaktuj się z administratorem systemu
                        </span> : <span className="admin__status__inner admin__status--error">
                            Klub o podanym loginie lub nazwie już istnieje
                        </span>)}
                    </span> : ""}
                    {passwordChangeStatus !== -1 ?  <span className="admin__status">
                        {passwordChangeStatus === 1 ? <span className="admin__status__inner admin__status--success">
                            Hasło zostało zmienione
                        </span> : <span className="admin__status__inner admin__status--error">
                            Coś poszło nie tak... Skontaktuj się z administratorem systemu
                        </span>}
                    </span> : ""}
                </header>
                <main className="admin__flex">
                    <section className="admin__main__form admin__main__form--addClub">
                        <label className="admin__label" onClick={() => { setNameError(""); }}>
                            Nazwa klubu
                            <input className="admin__input admin__input--title"
                                   name="name"
                                   value={!nameError ? name : ""}
                                   onChange={(e) => { setName(e.target.value); }}
                                   placeholder={nameError ? "" : "Tu wpisz nazwę klubu"} />
                            {nameError !== "" ? <span className="loginBox__error">
                                {nameError}
                             </span> : ""}
                        </label>
                        <label className="admin__label">
                            Liga
                            {leagueError !== "" ? <span className="loginBox__error loginBox__error--leagueError">
                                {leagueError}
                             </span> : ""}
                            {leagues.map((item, index) => {
                                return <label className="admin__notificationChecklist__item" key={index}>
                                    <button className={league === item.id ? "admin__notificationChecklist__btn admin__notificationChecklist__btn--selected" : "admin__notificationChecklist__btn"} onClick={() => { setLeague(item.id); }}>
                                    </button>
                                    {item.name} {item.sex ? " mężczyzn" : "kobiet"}
                                </label>
                            })}
                        </label>
                        <label className="admin__label" onClick={() => { setUsernameError(""); }}>
                            Login
                            <input className="admin__input admin__input--title"
                                   name="username"
                                   autoComplete="off"
                                   value={!usernameError ? username : ""}
                                   onChange={(e) => { setUsername(e.target.value); }}
                                   placeholder={usernameError ? "" : "Tu wpisz login klubu"} />
                            {usernameError !== "" ? <span className="loginBox__error">
                                {usernameError}
                             </span> : ""}
                        </label>
                        {updateMode ? "" : <>
                            <label className="admin__label" onClick={() => { setPasswordError(""); }}>
                                Hasło
                                <input className="admin__input admin__input--title"
                                       name="password"
                                       type="password"
                                       value={!passwordError ? password : ""}
                                       onChange={(e) => { setPassword(e.target.value); }}
                                       placeholder={passwordError ? "" : "Tu wpisz hasło klubu"} />
                                {passwordError !== "" ? <span className="loginBox__error">
                                {passwordError}
                             </span> : ""}
                            </label>
                            <label className="admin__label" onClick={() => { setPasswordError(""); }}>
                                Powtórz hasło
                                <input className="admin__input admin__input--title"
                                       name="repeatPassword"
                                       type="password"
                                       value={!passwordError ? repeatPassword : ""}
                                       onChange={(e) => { setRepeatPassword(e.target.value); }}
                                       placeholder="Powtórz wpisane hasło" />
                            </label>
                        </>}
                        <label className="admin__label">
                            NIP
                            <input className="admin__input admin__input--title"
                                   name="nip"
                                   autoComplete="off"
                                   value={nip}
                                   onChange={(e) => { setNip(e.target.value); }}
                                   placeholder="Tu wpisz NIP klubu" />
                        </label>
                        <label className="admin__label">
                            KRS
                            <input className="admin__input admin__input--title"
                                   name="krs"
                                   autoComplete="off"
                                   value={krs}
                                   onChange={(e) => { setKrs(e.target.value); }}
                                   placeholder="Tu wpisz KRS klubu" />
                        </label>
                        <label className="admin__label">
                            Siedziba
                            <input className="admin__input admin__input--title"
                                   name="city"
                                   autoComplete="off"
                                   value={city}
                                   onChange={(e) => { setCity(e.target.value); }}
                                   placeholder="Tu wpisz siedzibę klubu" />
                        </label>
                        <label className="admin__label">
                            Kontaktowy adres email
                            <input className="admin__input admin__input--title"
                                   name="email"
                                   autoComplete="off"
                                   value={email}
                                   onChange={(e) => { setEmail(e.target.value); }}
                                   placeholder="Tu wpisz kontaktowy adres email" />
                        </label>
                        <label className="admin__label">
                            Logo klubu
                            <span className="admin__label__imgUpload">
                                {updateImage ? <figure className="admin__label__imgUpload__updateImgWrapper">
                                    <img className="admin__label__imgUpload__updateImg" src={`${settings.API_URL}/image?url=/media/clubs/${updateImage}`} alt="foto" />
                                </figure> : ""}
                                {img || updateImage ? <button className="admin__label__imgUpload__trashBtn" onClick={(e) => { e.stopPropagation(); e.preventDefault(); deleteImg(); }}>
                                    <img className="btn__img" src={trashIcon} alt="usun" />
                                </button> : ""}
                                <Dropzone
                                    canRemove={true}
                                    getUploadParams={getUploadImage}
                                    onChangeStatus={(status) => { handleChangeStatus(status); }}
                                    accept="image/*"
                                    maxFiles={1} />
                            </span>
                        </label>
                        {updateMode ? <>
                            <h3 className="updateMode__header">
                                Zmień hasło klubu
                            </h3>
                            <label className="admin__label" onClick={() => { setNewPasswordError(""); }}>
                                Nowe hasło
                                <input className="admin__input admin__input--title"
                                       name="newPassword"
                                       type="password"
                                       value={!newPasswordError ? newPassword : ""}
                                       onChange={(e) => { setNewPassword(e.target.value); }}
                                       placeholder={!newPasswordError ? "Wpisz nowe hasło" : ""} />
                                {newPasswordError !== "" ? <span className="loginBox__error loginBox__error--300">
                                    {newPasswordError}
                                </span> : ""}
                            </label>
                            <label className="admin__label" onClick={() => { setNewPasswordError(""); }}>
                                Powtórz nowe hasło
                                <input className="admin__input admin__input--title"
                                       name="repeatNewPassword"
                                       type="password"
                                       value={!newPasswordError ? repeatNewPassword : ""}
                                       onChange={(e) => { setRepeatNewPassword(e.target.value); }}
                                       placeholder="Powtórz nowe hasło" />
                            </label>
                            <button className="admin__btn" onClick={() => { changeClubPassword(); }}>
                                Zmień hasło
                            </button>
                        </> : ""}
                    </section>
                    <section className="admin__mapWrapper">
                        <section className="admin__flex admin__flex--mapHeader">
                            <label className="admin__label">
                                Wybierz lokalizację klubu
                            </label>
                            {locationSelected ? <button className="admin__btn admin__btn--removeLocation" onClick={() => { setLocationSelected(false); }}>
                                Usuń aktualną lokalizację
                            </button> : ""}
                            {locationError !== "" ? <span className="loginBox__error loginBox__error--location">
                                {locationError}
                             </span> : ""}
                        </section>
                        <section className="admin__map" onClick={(e) => { addPointOnMap(e); }} ref={mapWrapper}>
                            <img className="admin__map__img" src={mapImg} alt="polska" />

                            <button className="clubPoint" ref={currentClubPoint}>

                            </button>

                            {clubLocations?.map((item, index) => {
                                return <button key={index} className={item.x === x && item.y === y ? "clubPoint clubPoint--selected" : "clubPoint clubPoint--otherClub"} style={{
                                    left: item.x + "%",
                                    top: item.y + "%"
                                }} onClick={(e) => { e.stopPropagation(); chooseOldLocation(item.x, item.y); }}>

                                </button>
                            })}
                        </section>

                        <span className="admin__label admin__label--disclaimer">
                            <b>Uwaga:</b> Na mapie zaznaczone są lokalizacje aktualnie dodanych klubów. Jeśli chcesz dodać kolejny klub w tym samym mieście, najedź myszką na
                            odpowiednią lokalizację i kliknij w czarny punkt. Jeśli chcesz dodać klub w mieście, którego nie ma jeszcze na mapie - kliknij,
                            w miejscu na mapie, gdzie chcesz dodać klub.
                        </span>

                        <button className="admin__btn admin__btn--addNotification"
                                onClick={() => { handleSubmit(); }}>
                            {updateMode ? "Zaktualizuj" : "Dodaj klub"}
                        </button>
                    </section>
                </main>
            </main>
        </main>
    </div>
}

export default AdminAddClub;
