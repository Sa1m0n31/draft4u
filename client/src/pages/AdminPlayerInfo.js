import React, {useState, useEffect, useRef} from 'react'
import AdminTop from "../components/AdminTop";
import PanelMenu from "../components/PanelMenu";
import {getIdentityById, getUserById} from "../helpers/user";
import {unicodeToUTF8} from "../helpers/others";
import placeholderProfileImage from '../static/img/profile-picture.png'
import settings from "../settings";
import {changeUserName} from "../helpers/admin";
import {getUserVideos} from "../helpers/video";
import ModalVideoPlayer from "../components/ModalVideoPlayer";
import {Splide, SplideSlide} from "@splidejs/react-splide";
import playBtn from "../static/img/play-button.svg";
import {Player} from "video-react";

const AdminPlayerInfo = ({admin}) => {
    const [id, setId] = useState(null);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [age, setAge] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [club, setClub] = useState("-");
    const [email, setEmail] = useState("");
    const [licence, setLicence] = useState("");
    const [attackRange, setAttackRange] = useState(null);
    const [verticalRange, setVerticalRange] = useState(null);
    const [blockRange, setBlockRange] = useState(null);
    const [weight, setWeight] = useState(null);
    const [height, setHeight] = useState(null);
    const [position, setPosition] = useState(null);
    const [salaryFrom, setSalaryFrom] = useState(0);
    const [salaryTo, setSalaryTo] = useState(0);
    const [profileImage, setProfileImage] = useState("");
    const [videos, setVideos] = useState(null);
    const [addResult, setAddResult] = useState(-1);

    const [playVideo, setPlayVideo] = useState(-1);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const userId = params.get('id');

        if(userId) {
            getUserById(userId)
                .then((res) => {
                    const player = res?.data?.result;
                    if(player) {
                        setId(player.id);
                        setFirstName(player.first_name);
                        setLastName(player.last_name);
                        setEmail(player.email);
                        setPhoneNumber(player.phone_number);
                        setAge(player.birthday?.substr(0, 10));
                        setClub(player.club);
                        setLicence(player.licence_number);
                        setSalaryFrom(player.salary_from);
                        setSalaryTo(player.salary_to);
                        setAttackRange(player.attack_range);
                        setVerticalRange(player.vertical_range);
                        setBlockRange(player.block_range);
                        setWeight(player.weight);
                        setHeight(player.height);
                        if(player.file_path) setProfileImage(`${settings.IMAGE_URL}/image?url=/media/users/${player.file_path}`);
                        if(player.name) setPosition(unicodeToUTF8(player.name));

                        getUserVideos(player.id)
                            .then((res) => {
                                setVideos(res?.data?.result);
                            });
                    }
                });
        }
    }, []);

    const handleSubmit = () => {
        if(firstName && lastName) {
            changeUserName(firstName, lastName, id)
                .then((res) => {
                    if(res?.data?.result) setAddResult(1);
                    else setAddResult(0);
                });
        }
    }

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [addResult]);

    let player = useRef(null)

    const closeModalVideoPlayer = () => {
        setPlayVideo(-1);
    }

    const options = {
        perPage: 2.2,
        focus: 'center'
    }

    return <div className="container container--dark container--admin">
        <AdminTop />
        <main className="admin">
            <PanelMenu menuOpen={1} />
            <main className="admin__main">
                <header className="admin__flex">
                    <h1 className="admin__main__header">
                        Dane zawodnika
                    </h1>
                    {addResult !== -1 ? <span className="admin__status">
                        {addResult === 1 ? <span className="admin__status__inner admin__status--success">
                            Imię i nazwisko zostało zmienione
                        </span> : (addResult === 2) ? <span className="admin__status__inner admin__status--success">
                            Imię i nazwisko zostało zmienione
                        </span> : (addResult === 0 ? <span className="admin__status__inner admin__status--error">
                            Coś poszło nie tak... Skontaktuj się z administratorem systemu
                        </span> : <span className="admin__status__inner admin__status--error">
                            Coś poszło nie tak... Skontaktuj się z administratorem systemu
                        </span>)}
                    </span> : ""}
                </header>
                <main className="admin__flex">
                    <section className="admin__main__form admin__main__form--addClub">
                        <figure className="admin__profileImgWrapper">
                            <img className="btn__img" src={profileImage ? profileImage : placeholderProfileImage} alt="zdjecie-profilowe" />
                        </figure>
                        <label className="admin__label">
                            Imię
                            <input className="admin__input admin__input--title"
                                   name="name"
                                   value={firstName}
                                   onChange={(e) => { setFirstName(e.target.value); }}
                                   placeholder={firstName ? "" : "Tu wpisz imię zawodnika"} />
                        </label>
                        <label className="admin__label">
                            Nazwisko
                            <input className="admin__input admin__input--title"
                                   name="lastMame"
                                   value={lastName}
                                   onChange={(e) => { setLastName(e.target.value); }}
                                   placeholder={lastName ? "" : "Tu wpisz nazwisko zawodnika"} />
                        </label>
                        <button className="admin__btn" onClick={() => { handleSubmit(); }}>
                            Zmień imię i nazwisko
                        </button>
                    </section>
                    <section className="admin__main__form admin__main__form--secondColumn">
                        <label className="admin__label admin__label--admin">
                            <b>E-mail:</b> {email}
                        </label>
                        <label className="admin__label admin__label--admin">
                            <b>Nr telefonu:</b> {phoneNumber}
                        </label>
                        <label className="admin__label admin__label--admin">
                            <b>Data urodzenia:</b> {age}
                        </label>
                        <label className="admin__label admin__label--admin">
                            <b>Klub:</b> {club}
                        </label>
                        <label className="admin__label admin__label--admin">
                            <b>Nr licencji PZPS:</b> {licence}
                        </label>
                        <label className="admin__label admin__label--admin">
                            <b>Wynagrodzenie:</b> {salaryFrom} - {salaryTo}
                        </label>
                        <label className="admin__label admin__label--admin">
                            <b>Pozycja:</b> {position}
                        </label>
                        <label className="admin__label admin__label--admin">
                            <b>Wzrost:</b> {height}
                        </label>
                        <label className="admin__label admin__label--admin">
                            <b>Waga:</b> {weight}
                        </label>
                        <label className="admin__label admin__label--admin">
                            <b>Zasięg w ataku:</b> {attackRange}
                        </label>
                        <label className="admin__label admin__label--admin">
                            <b>Zasięg w bloku:</b> {blockRange}
                        </label>
                        <label className="admin__label admin__label--admin">
                            <b>Wyskok dosiężny:</b> {verticalRange}
                        </label>
                    </section>
                </main>
                <section className="playerVideoView siteWidthSuperNarrow">
                    {playVideo !== -1 ? <ModalVideoPlayer closeModal={closeModalVideoPlayer} source={`${settings.API_URL}/video/get?url=/videos/${videos[playVideo].file_path}`} /> : ""}

                    {videos?.length ? <main className={club ? "playerVideoView__carousel playerVideoView__carousel--empty" : "playerVideoView__carousel"}>
                        {videos?.length ? <Splide options={options}>
                            {videos?.map((item, index) => {
                                return <SplideSlide key={index}>
                                    <div onClick={(e) => { e.preventDefault(); e.stopPropagation(); setPlayVideo(index); }}>
                                        <h4 className="video__title">
                                            {item.name}
                                        </h4>
                                        <span className="playerVideoView__overlay"></span>
                                        <button className="playBtn playBtn--marginLeftMinus">
                                            <img className="btn__img" src={playBtn} alt="odtworz" />
                                        </button>
                                        <Player ref={(pl) => { player = pl }} width={200} height={100} src={`${settings.API_URL}/video/get?url=/videos/${item.file_path}`} />
                                    </div>
                                </SplideSlide>
                            })}
                        </Splide> : <h3 className="noVideosHeader">
                            Ten zawodnik nie dodał jeszcze żadnych filmików
                        </h3>}
                    </main> : ""}
                </section>
            </main>
        </main>
    </div>
}

export default AdminPlayerInfo;
