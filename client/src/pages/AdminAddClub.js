import React, { useState, useEffect } from 'react'
import AdminTop from "../components/AdminTop";
import PanelMenu from "../components/PanelMenu";
import {getLeagues} from "../helpers/club";
import mapImg from '../static/img/poland.svg'
import {isElementInArray} from "../helpers/others";
import settings from "../settings";
import trashIcon from "../static/img/trash-black.svg";
import Dropzone from "react-dropzone-uploader";

const AdminAddClub = ({admin}) => {
    const [status, setStatus] = useState(-1);
    const [name, setName] = useState("");
    const [league, setLeague] = useState(-1);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [x, setX] = useState(-1);
    const [y, setY] = useState(-1);
    const [img, setImg] = useState(null);
    const [updateMode, setUpdateMode] = useState(false);
    const [updateImage, setUpdateImage] = useState(false);
    const [imageUpdated, setImageUpdated] = useState(false);
    const [leagues, setLeagues] = useState([]);

    useEffect(() => {
        getLeagues()
            .then((res) => {
                console.log(res?.data?.result);
                setLeagues(res?.data?.result);
            })
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

    }

    const deleteImg = () => {

    }

    const addPointOnMap = (e) => {
        const rect = e.target.getBoundingClientRect();
        console.log(rect);
        const x = e.clientX - rect.left; //x position within the element.
        const y = e.clientY - rect.top;  //y position within the element.
        console.log("Left? : " + x + " ; Top? : " + y + ".");
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
                    {status !== -1 ? <span className="admin__status">
                        {status === 1 ? <span className="admin__status__inner admin__status--success">
                            Notyfikacja została dodana
                        </span> : (status === 2) ? <span className="admin__status__inner admin__status--success">
                            Notyfikacja została zaktualizowana
                        </span> : <span className="admin__status__inner admin__status--error">
                            Coś poszło nie tak... Skontaktuj się z administratorem systemu
                        </span>}
                    </span> : ""}
                </header>
                <main className="admin__flex">
                    <section className="admin__main__form">
                        <label className="admin__label">
                            Nazwa klubu
                            <input className="admin__input admin__input--title"
                                   name="name"
                                   value={name}
                                   onChange={(e) => { setName(e.target.value); }}
                                   placeholder="Tu wpisz nazwę klubu" />
                        </label>
                        <label className="admin__label">
                            Liga
                            {leagues.map((item, index) => {
                                return <label className="admin__notificationChecklist__item" key={index}>
                                    <button className={league === item.id ? "admin__notificationChecklist__btn admin__notificationChecklist__btn--selected" : "admin__notificationChecklist__btn"} onClick={() => { setLeague(item.id); }}>
                                    </button>
                                    {item.name} {item.sex ? " mężczyzn" : "kobiet"}
                                </label>
                            })}
                        </label>
                        <label className="admin__label">
                            Login
                            <input className="admin__input admin__input--title"
                                   name="username"
                                   value={username}
                                   onChange={(e) => { setUsername(e.target.value); }}
                                   placeholder="Tu wpisz login klubu" />
                        </label>
                        <label className="admin__label">
                            Hasło
                            <input className="admin__input admin__input--title"
                                   name="password"
                                   type="password"
                                   value={password}
                                   onChange={(e) => { setPassword(e.target.value); }}
                                   placeholder="Tu wpisz hasło klubu" />
                        </label>
                        <label className="admin__label">
                            Powtórz hasło
                            <input className="admin__input admin__input--title"
                                   name="repeatPassword"
                                   value={repeatPassword}
                                   onChange={(e) => { setRepeatPassword(e.target.value); }}
                                   placeholder="Powtórz wpisane hasło" />
                        </label>
                        <label className="admin__label">
                            Logo klubu
                            <span className="admin__label__imgUpload">
                                {updateImage ? <figure className="admin__label__imgUpload__updateImgWrapper">
                                    <img className="admin__label__imgUpload__updateImg" src={`${settings.API_URL}/image?url=/media/notifications/${updateImage}`} alt="foto" />
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
                    </section>
                    <section className="admin__mapWrapper">
                        <label className="admin__label">
                            Wybierz lokalizację klubu
                        </label>
                        <section className="admin__map" onClick={(e) => { addPointOnMap(e); }}>
                            <img className="admin__map__img" src={mapImg} alt="polska" />
                        </section>

                        <span className="admin__label admin__label--disclaimer">
                            <b>Uwaga:</b> Na mapie zaznaczone są lokalizacje aktualnie dodanych klubów. Jeśli chcesz dodać kolejny klub w tym samym mieście, najedź myszką na
                            odpowiednią lokalizację i kliknij "Dodaj w tej lokalizacji". Jeśli chcesz dodać klub w mieście, którego nie ma jeszcze na mapie - kliknij,
                            w miejscu na mapie, gdzie chcesz dodać klub.
                        </span>

                        <button className="admin__btn admin__btn--addNotification"
                                disabled={status !== -1}
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
