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
import settings from "../settings";
import profilePicture from '../static/img/profile-picture.png'
import {getPositionById, isElementInArray} from "../helpers/others";
import { useDrag, useDrop } from "react-dnd";
import interact from 'interactjs'

const CreateSquadPage = ({club}) => {
    const [editName, setEditName] = useState(false);
    const [name, setName] = useState("nazwa");
    const [positionFilters, setPositionFilters] = useState([0]);
    const [players, setPlayers] = useState([]);
    const [scrollbar, setScrollbar] = useState([1]);
    const [trackWidth, setTrackWidth] = useState(0);
    const [filteredPlayers, setFilteredPlayers] = useState([]);
    const [mobile, setMobile] = useState(false);

    useEffect(() => {
        interact(".draggable").draggable({
            listeners: {
                move (event) {
                    const target = event.target;

                    const dataX = target.getAttribute('data-x');
                    const dataY = target.getAttribute('data-y');
                    const initialX = parseFloat(dataX) || 0;
                    const initialY = parseFloat(dataY) || 0;

                    const deltaX = event.dx;
                    const deltaY = event.dy;

                    const newX = initialX + deltaX;
                    const newY = initialY + deltaY;

                    // target.remove();
                    // document.querySelector(".container").appendChild(target);

                    target.style.opacity = "1";

                    target
                        .style
                        .transform = `translate(${newX}px, ${newY}px)`;

                    target.setAttribute('data-x', newX);
                    target.setAttribute('data-y', newY);
                }
            }
        });
    }, []);

    useEffect(() => {
        getFavoritesByClub()
            .then((res) => {
                setPlayers(res?.data?.result);
                setFilteredPlayers(res?.data?.result);
                setTrackWidth(res?.data?.result?.length * 300);
            });
    }, []);

    const filterPlayers = () => {
        setFilteredPlayers(players.filter((item) => {
            return isPlayerInFilteredGroup(item.position);
        }));
    }

    useEffect(() => {
        filterPlayers();
    }, [positionFilters]);

    const isPlayerInFilteredGroup = (position) => {
        if(isElementInArray(positionFilters, 0)) return true;
        else {
            return positionFilters.findIndex((item) => {
                return item === position;
            }) !== -1;
        }
    }

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

    const draggableOptions = {
        onmove: event => {
            const target = event.target
            // keep the dragged position in the data-x/data-y attributes
            const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
            const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy

            // translate the element
            target.style.webkitTransform =
                target.style.transform =
                    'translate(' + x + 'px, ' + y + 'px)'

            // update the posiion attributes
            target.setAttribute('data-x', x);
            target.setAttribute('data-y', y);
        }
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
        <section className="createSquad__players">
            <section className="searchFilters__position searchFilters__position--mobile siteWidthSuperNarrow siteWidthSuperNarrow--1400">
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

            <section className="createSquad__squadWrapper">
                <span className="createSquad__squadWrapper__overlay"></span>

                <section className="createSquad__squad siteWidthSuperNarrow siteWidthSuperNarrow--1400">
                    <div className="createSquad__squad__track" style={{
                        transform: `translateX(-${(scrollbar[0] > 1 ? scrollbar[0] : 0)*trackWidth * 0.0101}px)`
                    }} onScroll={() => { console.log("scroll"); }}>

                        {filteredPlayers?.map((item, index) => {
                            return <div className={`createSquad__squad__itemWrapper`}>
                                <div className="createSquad__squad__item__dragging draggable">
                                    <img className="createSquad__squad__item__dragging__img" src={playerDraggable} alt="zawodnik" />
                                </div>
                                <div className="createSquad__squad__item">
                                    <figure className="createSquad__squad__item__imgWrapper">
                                        <img className="createSquad__squad__item__img" src={item.file_path ? `${settings.API_URL}/image?url=/media/users/${item.file_path}` : profilePicture} alt={item.first_name + " " + item.last_name} />
                                    </figure>
                                    <section className="createSquad__squad__item__data">
                                        <h3 className="createSquad__squad__item__name">
                                            {item.first_name} {item.last_name}
                                        </h3>
                                        <h4 className="createSquad__squad__item__position">
                                            {getPositionById(item.position)}
                                        </h4>
                                        <section className="createSquad__squad__item__data__section">
                                            <h4 className="createSquad__squad__item__data__key">
                                                Wzrost
                                            </h4>
                                            <h4 className="createSquad__squad__item__data__value">
                                                {item.height ? item.height + " cm" : "-"}
                                            </h4>
                                            <h4 className="createSquad__squad__item__data__key">
                                                Waga
                                            </h4>
                                            <h4 className="createSquad__squad__item__data__value">
                                                {item.weight ? item.weight + " kg" : "-"}
                                            </h4>
                                        </section>
                                        <section className="createSquad__squad__item__data__section">
                                            <h4 className="createSquad__squad__item__data__key">
                                                Honorarium
                                            </h4>
                                            <h4 className="createSquad__squad__item__data__value">
                                                {item.salary_from ? item.salary_from + " - " + item.salary_to + " PLN" : "-"}
                                            </h4>
                                        </section>
                                    </section>
                                </div>
                            </div>
                        })}
                    </div>
                </section>

                <span className="createSquad__squadWrapper__overlay"></span>
            </section>


            <section className="createSquad__scrollbar siteWidthSuperNarrow siteWidthSuperNarrow--1400">
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
