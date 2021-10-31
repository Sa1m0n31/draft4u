import React, {useEffect, useState} from 'react'
import Header from "../components/Header";
import ComparedPlayer from "../components/ComparedPlayer";
import ComparatorChart from "../components/ComparatorChart";
import Footer from "../components/Footer";
import floor from '../static/img/boisko.svg'
import playerPlaceholder from '../static/img/player-placeholder.svg'
import playerDraggable from '../static/img/player-draggable.svg'
import pencil from '../static/img/pen.svg'
import pen from '../static/img/pen-white.png';
import checkIcon from "../static/img/check-white.svg"
import downloadIcon from '../static/img/direct-download.svg'
import saveIcon from '../static/img/save.svg'
import {getFavoritesByClub} from "../helpers/club";
import {getTrackBackground, Range} from "react-range";

const CreateSquadPage = ({club}) => {
    const [editName, setEditName] = useState(false);
    const [name, setName] = useState("nazwa");
    const [positionFilters, setPositionFilters] = useState([0]);
    const [players, setPlayers] = useState([]);
    const [scrollbar, setScrollbar] = useState([1]);
    const [trackWidth, setTrackWidth] = useState(0);

    const [mobile, setMobile] = useState(false);

    useEffect(() => {
        getFavoritesByClub()
            .then((res) => {
                setPlayers(res?.data?.result);
                setTrackWidth(res?.data?.result?.length * 400);
            });
    }, []);

    const filterPosition = (n) => {
        if(isPositionActive(n)) {
            setPositionFilters(positionFilters.filter((item) => {
                return item !== n;
            }));
        }
        else {
            setPositionFilters([...positionFilters, n]);
        }
    }

    const isPositionActive = (n) => {
        return positionFilters.findIndex((item) => {
            return item === n;
        }) !== -1;
    }

    return <div className="container container--dark">
        <Header loggedIn={true} club={true} menu="light" theme="dark" profileImage={club.file_path} />

        <main className="createSquad siteWidth">
            <section className="createSquad__name">
                    <span className="userInfoEdition__value">
                    <label className={editName ? "label--edit" : ""}>
                        <input value={name}
                               onChange={(e) => { setName(e.target.value); }}
                               disabled={!editName}
                               className="input--editProfile"
                               name="phoneNumber" />
                        {!editName ? <button className="userInfoEdition__btn" onClick={() => { setEditName(true); }}>
                            <img className="userInfoEdition__btn__img" src={pen} alt="edytuj" />
                        </button> : <button className="userInfoEdition__btn" onClick={() => { setEditName(false); }}>
                            <img className="userInfoEdition__btn__img" src={checkIcon} alt="ok" />
                        </button>}
                    </label>
                    </span>
            </section>
            <main className="createSquad__main">
                <img className="btn__img createSquad__floor" src={floor} alt="boisko" />

                <div className="dropzone dropzone--player--1">
                    <img className="btn__img" src={playerPlaceholder} alt="zawodnik" />
                </div>
                <div className="dropzone dropzone--player--2">
                    <img className="btn__img" src={playerPlaceholder} alt="zawodnik" />
                </div>
                <div className="dropzone dropzone--player--3">
                    <img className="btn__img" src={playerPlaceholder} alt="zawodnik" />
                </div>
                <div className="dropzone dropzone--player--4">
                    <img className="btn__img" src={playerPlaceholder} alt="zawodnik" />
                </div>
                <div className="dropzone dropzone--player--5">
                    <img className="btn__img" src={playerPlaceholder} alt="zawodnik" />
                </div>
                <div className="dropzone dropzone--player--6">
                    <img className="btn__img" src={playerPlaceholder} alt="zawodnik" />
                </div>
                <div className="dropzone dropzone--player--7">
                    <img className="btn__img" src={playerPlaceholder} alt="zawodnik" />
                </div>
            </main>
            <section className="createSquad__settings">
                <section className="createSquad__line">
                    <button className="createSquad__btn" onClick={() => { }}>
                        <img className="btn__img" src={saveIcon} alt="zapisz-druzyne" />
                    </button>
                    <button className="createSquad__btn" onClick={() => { }}>
                        <img className="btn__img" src={downloadIcon} alt="eksportuj-do-pdf" />
                    </button>
                </section>

                <h3 className="createSquad__teamCostHeader">
                    Koszt drużyny:
                </h3>
                <h4 className="createSquad__teamCostHeader__value">
                    0 PLN
                </h4>
            </section>
        </main>
        <section className="createSquad__players siteWidthSuperNarrow siteWidthSuperNarrow--1400">
            <section className="searchFilters__position searchFilters__position--mobile">
                <span className="searchFilters__position__header">
                    Pozycja:
                </span>

                <span className="searchFilters__position__positions">
                    <button className={isPositionActive(0) ? "searchFilters__position__button gold" : "searchFilters__position__button"} onClick={() => { filterPosition(0); }}>
                    Wszyscy
                </button>
                <button className={isPositionActive(1) ? "searchFilters__position__button gold" : "searchFilters__position__button"} onClick={() => { filterPosition(1); }}>
                    Przyjmujący
                </button>
                <button className={isPositionActive(2) ? "searchFilters__position__button gold" : "searchFilters__position__button"} onClick={() => { filterPosition(2); }}>
                    Atakujący
                </button>
                <button className={isPositionActive(3) ? "searchFilters__position__button gold" : "searchFilters__position__button"} onClick={() => { filterPosition(3); }}>
                    Środkowy
                </button>
                <button className={isPositionActive(4) ? "searchFilters__position__button gold" : "searchFilters__position__button"} onClick={() => { filterPosition(4); }}>
                    Rozgrywający
                </button>
                <button className={isPositionActive(5) ? "searchFilters__position__button gold" : "searchFilters__position__button"} onClick={() => { filterPosition(5); }}>
                    Libero
                </button>
                </span>
            </section>

            <section className="createSquad__squad">
                <div className="createSquad__squad__track" style={{
                    transform: `translateX(-${(scrollbar[0] > 1 ? scrollbar[0] : 0)*trackWidth * 0.0101}px)`
                }} onScroll={() => { console.log("scroll"); }}>
                    {players.map((item, index) => {
                        return <div className={`createSquad__squad__item draggable draggable--player--${index+1}`}>

                        </div>
                    })}
                </div>
            </section>
            <section className="createSquad__scrollbar">
                <Range
                    step={1}
                    min={1}
                    max={100}
                    values={scrollbar}
                    onChange={(values) => {
                        setScrollbar(values);
                    }}
                    renderTrack={({ props, children }) => (
                        <div
                            onMouseDown={props.onMouseDown}
                            onTouchStart={props.onTouchStart}
                            style={{
                                ...props.style,
                                height: !mobile ? '20px' : '10px',
                                width: "100%",
                                borderRadius: '50%',
                                display: 'flex',
                            }}
                        >
                            <div
                                ref={props.ref}
                                style={{
                                    height: !mobile ? '15px' : '10px',
                                    width: '100%',
                                    border: '1px solid #707070',
                                    borderRight: 'none',
                                    borderLeft: 'none',
                                    background: getTrackBackground({
                                        values: scrollbar,
                                        colors: ['#474747', '#474747', '#474747'],
                                        min: 1,
                                        max: 100,
                                        rtl: false
                                    }),
                                    alignSelf: 'center'
                                }}
                            >
                                {children}
                            </div>
                        </div>
                    )}
                    renderThumb={({ props }) => (
                        <div
                            {...props}
                            style={{
                                ...props.style,
                                height: !mobile ? '20px' : '15px',
                                outline: 'none',
                                width: !mobile ? '200px' : '15px',
                                borderRadius: '20px',
                                backgroundColor: '#E2B76D',
                                border: '1px solid #707070',
                                zIndex: 3,
                                position: 'relative'
                            }}
                        />
                    )}
                />
            </section>
        </section>

        <Footer theme="dark" border={true} />
    </div>
}

export default CreateSquadPage;
