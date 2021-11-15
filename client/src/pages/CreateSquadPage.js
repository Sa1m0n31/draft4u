import React, {useEffect, useState} from 'react'
import Header from "../components/Header";
import Footer from "../components/Footer";
import floor from '../static/img/boisko.svg'
import playerPlaceholder from '../static/img/player-placeholder.svg'
import playerDraggable from '../static/img/player-draggable.svg'
import pen from '../static/img/pen-white.png';
import checkIcon from "../static/img/check-white.svg"
import saveIcon from '../static/img/save.svg'
import {getFavoritesByClub} from "../helpers/club";
import {getTrackBackground, Range} from "react-range";
import settings from "../settings";
import profilePicture from '../static/img/profile-picture.png'
import {getPositionById, isElementInArray} from "../helpers/others";
import interact from 'interactjs'
import trash from '../static/img/trash-black.svg'
import {addSquad, getSquadById} from "../helpers/squad";
import {isObject} from "chart.js/helpers";
import arrowDownGrey from '../static/img/arrow-down-grey.svg'

const CreateSquadPage = ({club}) => {
    const [editName, setEditName] = useState(false);
    const [name, setName] = useState("");
    const [positionFilters, setPositionFilters] = useState([0]);
    const [players, setPlayers] = useState([]);
    const [scrollbar, setScrollbar] = useState([1]);
    const [trackWidth, setTrackWidth] = useState(0);
    const [filteredPlayers, setFilteredPlayers] = useState([]);
    const [mobile, setMobile] = useState(false);
    const [flexBasis, setFlexBasis] = useState(0);
    const [selectedPlayers, setSelectedPlayers] = useState([]);
    const [playersOnCourt, setPlayersOnCourt] = useState([]);
    const [newPlayerOnCourt, setNewPlayerOnCourt] = useState(-1);
    const [minCost, setMinCost] = useState(0);
    const [maxCost, setMaxCost] = useState(0);
    const [currentDrag, setCurrentDrag] = useState(-1);
    const [teamSaved, setTeamSaved] = useState("");
    const [team, setTeam] = useState([]);
    const [updateTeam, setUpdateTeam] = useState([]);
    const [updateMode, setUpdateMode] = useState(false);
    const [filtersVisible, setFiltersVisible] = useState(false);
    const [availablePlaces, setAvailablePlaces] = useState([0, 0, 0, 0, 0, 0, 0]);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const id = params.get('id');

        if(id) {
            getSquadById(id)
                .then((res) => {
                    setUpdateMode(true);
                    const result = res?.data?.result;
                    setName(result[0]?.name);
                    setUpdateTeam(result);
                    setTeam(result);

                    const updateTeamLength = result.length;
                    console.log(result);
                    setAvailablePlaces(availablePlaces.map((item, index) => {
                        if(index < updateTeamLength) return result[index].id;
                        else return item;
                    }));

                    setMinCost(res?.data?.result?.reduce((prev, current) => {
                        return prev + current.salary_from;
                    }, 0));

                    setMaxCost(res?.data?.result?.reduce((prev, current) => {
                        return prev + current.salary_to;
                    }, 0));
                });
        }

        checkIfMobile();

        window.addEventListener("resize", () => {
            checkIfMobile();
        });

        window.addEventListener("resize", (event) => {
            checkIfMobile();
        });
    }, []);

    const checkIfMobile = () => {
        if(window.innerWidth < 768) setMobile(true);
        else setMobile(false);
    }

    useEffect(() => {
        console.log(window.innerWidth);
       if(window.innerWidth < 768) {
           console.log(document.querySelectorAll(".createSquad__squad__item__dragging"));
           Array.from(document.querySelectorAll(".createSquad__squad__item__dragging")).forEach((item) => {
               item.classList.remove("draggable");
           });
       }
    }, []);

    useEffect(() => {
        getFavoritesByClub()
            .then((res) => {
                setPlayers(res?.data?.result);
                setFilteredPlayers(res?.data?.result);
                setTrackWidth(res?.data?.result?.length * 480);
                setFlexBasis(100 / res?.data?.result?.length);
            });
    }, []);

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

        interact(".dropzone--active").dropzone({
            accept: ".draggable",
            overlap: 0.1,
            ondragenter: function(event) {
                event.target.style.opacity = ".5";
            },
            ondrop: function(event) {
                const draggingElement = event.relatedTarget;
                const dropzoneElement = event.target;

                dropzoneElement.style.opacity = "1";
                dropzoneElement.classList.remove("dropzone--active");

                dropzoneElement.appendChild(draggingElement);
                draggingElement.classList.add("element--dropped");
                draggingElement.classList.remove("draggable");

                const droppedPlayerIndex = parseInt(draggingElement.id.split("-")[1]);
                setNewPlayerOnCourt(droppedPlayerIndex);
            },
            ondragleave: function(event) {
                event.target.style.opacity = "1";
            }
        });
    }, [players]);

    useEffect(() => {
        setTeam(players.filter((item, index) => {
            return isElementInArray(playersOnCourt, index);
        }).concat(updateTeam));
    }, [playersOnCourt]);

    useEffect(() => {
        if(newPlayerOnCourt >= 0) {
            setPlayersOnCourt([...playersOnCourt, newPlayerOnCourt]);
        }
        else {
            if(newPlayerOnCourt !== -999999) {
                setPlayersOnCourt(playersOnCourt.filter((item) => {
                    return item !== newPlayerOnCourt * -1;
                }));
            }
            else {
                setPlayersOnCourt(playersOnCourt.filter((item) => {
                    return item;
                }));
            }
        }
    }, [newPlayerOnCourt]);

    useEffect(() => {
        setMinCost(playersOnCourt.concat(updateTeam).reduce((prev, current, index) => {
            if(isObject(current)) {
                return prev + current?.salary_from;
            }
            else {
                const player = players[current];
                return prev + (player?.salary_from ? player.salary_from : 0);
            }
        }, 0));
        setMaxCost(playersOnCourt.concat(updateTeam).reduce((prev, current, index) => {
            if(isObject(current)) {
                return prev + current?.salary_to;
            }
            else {
                const player = players[current];
                return prev + (player?.salary_to ? player.salary_to : 0);
            }
        }, 0));
    }, [playersOnCourt, updateTeam]);

    useEffect(() => {
        if(teamSaved !== "") {
            setTimeout(() => {
                setTeamSaved("");
            }, 2000);
        }
    }, [teamSaved]);

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

    const mobileAddToSquad = (e, playerIndex, playerId) => {
        if(window.innerWidth < 776 && !isElementInArray(availablePlaces, playerId)) {
            const draggingElement = document.querySelector(`#draggable-${playerIndex}`);
            const firstAvailableIndex = availablePlaces.findIndex((item) => {
                return !item;
            });
            const dropzoneElement = document.querySelector(`.dropzone--player--${firstAvailableIndex+1}`);

            dropzoneElement.style.opacity = "1";
            dropzoneElement.classList.remove("dropzone--active");

            dropzoneElement.appendChild(draggingElement);
            draggingElement.classList.add("element--dropped");

            const droppedPlayerIndex = parseInt(draggingElement.id.split("-")[1]);
            setNewPlayerOnCourt(droppedPlayerIndex);

            setSelectedPlayers([...selectedPlayers, playerIndex]);

            draggingElement.style.opacity = "1";

            setAvailablePlaces(availablePlaces.map((item, index) => {
                if(index === firstAvailableIndex) return playerId;
                else return item;
            }));

            Array.from(document.querySelectorAll(".createSquad__squad__item__dragging")).forEach((item) => {
                console.log(item);
                item.classList.remove("draggable");
            });
        }
    }

    const startDragging = (e, playerIndex) => {
        if(!isElementInArray(selectedPlayers, playerIndex) && !(window.innerWidth < 768)) {
            setCurrentDrag(playerIndex);

            const elementToDrag = document.getElementById(`draggable-${playerIndex}`);

            const x = e.pageX - 50;
            const y = e.pageY - 50;

            elementToDrag.style.opacity = "1";

            const dropzone = document.getElementById(`createSquad__squad__itemWrapper--${playerIndex}`);
            dropzone.removeChild(elementToDrag);
            document.querySelector(".container").appendChild(elementToDrag);

            elementToDrag.style.top = `${y}px`;
            elementToDrag.style.left = `${x}px`;
            elementToDrag.style.width = "auto";

            setSelectedPlayers([...selectedPlayers, playerIndex]);
        }
    }

    const removePlayerFromCourt = (id, playerId) => {
        if(id) setNewPlayerOnCourt(id * -1);
        else setNewPlayerOnCourt(-999999);

        console.log("remove player from court");
        console.log(id);
        console.log(playerId);

        setSelectedPlayers(selectedPlayers.filter((item) => {
            return item !== id;
        }));
        setAvailablePlaces(availablePlaces.map((item) => {
            if(item === playerId) return 0;
            else return item;
        }));

        const elementToRemove = document.getElementById(`draggable-${id}`);
        const parentOfElementToRemove = document.getElementById(`createSquad__squad__itemWrapper--${id}`);

        elementToRemove.parentElement.classList.add("dropzone--active");
        elementToRemove.parentElement.removeChild(elementToRemove);

        parentOfElementToRemove.appendChild(elementToRemove);
        elementToRemove.style.top = "0";
        elementToRemove.style.left = "0";
        elementToRemove.style.transform = "none";
        elementToRemove.style.opacity = "0";
        elementToRemove.style.width = "100%";

        elementToRemove.setAttribute('data-x', 0);
        elementToRemove.setAttribute('data-y', 0);

        // elementToRemove.classList.remove("element--dropped");
        elementToRemove.classList.add("draggable");
    }

    const saveTeam = () => {
        if(!name.length) {
            setTeamSaved("Wpisz nazwę swojego składu");
        }
        else if(!team.length) {
            setTeamSaved("Wybierz co najmniej jednego zawodnika do swojego składu");
        }
        else {
            console.log(team);
            addSquad(name, team)
                .then((res) => {
                    console.log(res?.data?.result);
                    if(res?.data?.result === 2) setTeamSaved("Drużyna została zaktualizowana");
                    else if(res?.data?.result === 1) setTeamSaved("Drużyna została dodana");
                    else setTeamSaved("Coś poszło nie tak... Prosimy spróbować później");
                });
        }
    }

    const exportTeam = () => {

    }

    const isPlayerInUpdateTeam = (player) => {
        return updateTeam.findIndex((item) => {
            return item?.id === player?.id;
        }) !== -1;
    }

    useEffect(() => {
        setTeam(players.filter((item, index) => {
            return isElementInArray(playersOnCourt, index);
        }).concat(updateTeam));
    }, [updateTeam]);

    const removePlayerFromUpdateTeam = (id) => {
        setUpdateTeam(updateTeam.map((item) => {
            if(item?.id === id) return null;
            else return item;
        }));
        setAvailablePlaces(availablePlaces.map((item) => {
            if(item === id) return 0;
            else return item;
        }));
    }

    const toggleFiltersVisibility = () => {
        setFiltersVisible(!filtersVisible);
    }

    return <div className="container container--dark">
        <Header loggedIn={true} club={true} menu="light" theme="dark" profileImage={club.file_path} />

        <main className="createSquad siteWidth">
            <section className="createSquad__name">
                    <span className="userInfoEdition__value">
                    <label className={editName ? "label--edit" : ""}>
                        <input value={name}
                               placeholder="Nazwa"
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
            <main className={teamSaved === "" ? "createSquad__main" : "createSquad__main hide"}>
                <img className="btn__img createSquad__floor" src={floor} alt="boisko" />

                {[1, 2, 3, 4, 5, 6, 7].map((item, index) => {
                   return <div className={!updateTeam.length >= item ? `dropzone dropzone--player--${item}` : `dropzone dropzone--active dropzone--player--${item}`}>
                       <img className="btn__img" src={playerPlaceholder} alt="zawodnik" />

                       {updateTeam[item-1] ? <>
                           <div className="createSquad__squad__item__dragging createSquad__squad__item__dragging--update">
                               <img className="createSquad__squad__item__dragging__img" src={playerDraggable} alt="zawodnik" />

                               <button className="createSquad__squad__item__dragging__trashBtn" onClick={() => { removePlayerFromUpdateTeam(updateTeam[item-1].id); }}>
                                   <img className="createSquad__squad__item__dragging__trashBtn__img" src={trash} alt="usun" />
                               </button>

                               <figure className="createSquad__squad__item__dragging__imgWrapper">
                                   <img className="createSquad__squad__item__dragging__img" src={profilePicture} alt={`test`} />
                               </figure>

                               <section className="createSquad__squad__item__dragging__header">
                                   <h3 className="createSquad__squad__item__dragging__header__name">
                                       {updateTeam[item-1].first_name} {updateTeam[item-1].last_name}
                                   </h3>
                                   <h4 className="createSquad__squad__item__dragging__header__position">
                                       {getPositionById(updateTeam[item-1].position)}
                                   </h4>
                               </section>
                           </div>
                       </> : ""}
                   </div>
                })}
            </main>

            <main className={teamSaved !== "" ? "teamSaved" : "teamSaved hide"}>
                <h2 className="teamSaved__header">
                    {teamSaved}
                </h2>
            </main>
            <section className="createSquad__settings">
                <section className="createSquad__line">
                    <button className="createSquad__btn" onClick={() => { saveTeam(); }}>
                        <img className="btn__img" src={saveIcon} alt="zapisz-druzyne" />
                    </button>
                    {/*<button className="createSquad__btn" onClick={() => { exportTeam(); }}>*/}
                    {/*    <img className="btn__img" src={downloadIcon} alt="eksportuj-do-pdf" />*/}
                    {/*</button>*/}
                </section>

                <h3 className="createSquad__teamCostHeader d-desktop">
                    Koszt drużyny:
                </h3>
                <h4 className="createSquad__teamCostHeader__value d-desktop">
                    {!minCost && !maxCost ? 0 : minCost + " - " + maxCost} PLN
                </h4>
            </section>
        </main>
        <section className="createSquad__players">
            <section className="searchFilters__position searchFilters__position--mobile siteWidthSuperNarrow siteWidthSuperNarrow--1400">
                <span className="searchFilters__position__header">
                    Pozycja:
                </span>

                <section className="searchFilters__positionList d-mobile">
                    {[0, 1, 2, 3, 4, 5].map((item) => {
                        if(isPositionActive(item)) {
                            if(item) {
                                return <span>
                                    {getPositionById(item)}
                                </span>
                            }
                            else {
                                return <span>
                                    Wszyscy
                                </span>
                            }
                        }
                    })}
                </section>

                <button className={filtersVisible ? "searchFilters__arrowDownBtn searchFilters__arrowDownBtn--rotate d-mobile" : "searchFilters__arrowDownBtn d-mobile"} onClick={() => { toggleFiltersVisibility(); }}>
                    <img className="btn__img" src={arrowDownGrey} alt="zwin/rozwin" />
                </button>

                {filtersVisible ? <span className="searchFilters__position__positions searchFilters__position__positions--mobile d-mobile">
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
                </span> : ""}

                <span className="searchFilters__position__positions d-desktop">
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
                <section className="createSquad__squad siteWidthSuperNarrow siteWidthSuperNarrow--1400">
                    <div className="createSquad__squad__track"
                         style={{
                        width: `${trackWidth}px`,
                        transform: `translateX(-${(scrollbar[0] > 1 ? scrollbar[0] : 0)*trackWidth * 0.0101}px)`
                    }}>

                        {players?.map((item, index) => {
                            if(isPlayerInFilteredGroup(item.position) && !isPlayerInUpdateTeam(item)) {
                                return <div className={`createSquad__squad__itemWrapper`}
                                            style={{
                                                flexBasis: `${flexBasis}%`
                                            }}
                                            id={`createSquad__squad__itemWrapper--${index}`}
                                            onMouseDown={(e) => { startDragging(e, index); }} key={index}
                                            onClick={(e) => { mobileAddToSquad(e, index, item.id); }}
                                            >
                                    <div className={isElementInArray(selectedPlayers, index) ? (!mobile ? "createSquad__squad__item__dragging draggable" : "createSquad__squad__item__dragging") : (!mobile ? "createSquad__squad__item__dragging draggable opacity-0" : "createSquad__squad__item__dragging opacity-0")} id={`draggable-${index}`} key={index}>
                                        <img className="createSquad__squad__item__dragging__img" src={playerDraggable} alt="zawodnik" />

                                        <button className="createSquad__squad__item__dragging__trashBtn" onClick={(e) => { e.stopPropagation(); removePlayerFromCourt(index, item.id); }}>
                                            <img className="createSquad__squad__item__dragging__trashBtn__img" src={trash} alt="usun" />
                                        </button>

                                        <figure className="createSquad__squad__item__dragging__imgWrapper">
                                            <img className="createSquad__squad__item__dragging__img" src={item.file_path ? `${settings.API_URL}/image?url=/media/users/${item.file_path}` : profilePicture} alt={item.last_name} />
                                        </figure>

                                        <section className="createSquad__squad__item__dragging__header">
                                            <h3 className="createSquad__squad__item__dragging__header__name">
                                                {item.first_name} {item.last_name}
                                            </h3>
                                            <h4 className="createSquad__squad__item__dragging__header__position">
                                                {getPositionById(item.position)}
                                            </h4>
                                        </section>
                                    </div>

                                    {!isElementInArray(selectedPlayers, index) ? <div className="createSquad__squad__item">
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
                                    </div> : ""}
                                </div>
                            }
                        })}
                    </div>
                </section>

                <span className="createSquad__squadWrapper__overlay"></span>
            </section>

            {/* DESKTOP SCROLLBAR */}
            <section className="createSquad__scrollbar siteWidthSuperNarrow siteWidthSuperNarrow--1400 d-desktop">
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
