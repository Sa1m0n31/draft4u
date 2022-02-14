import React, {useContext, useEffect, useState} from 'react'
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
import {getPositionById, getUniqueListBy, isElementInArray} from "../helpers/others";
import interact from 'interactjs'
import trash from '../static/img/trash-black.svg'
import {addSquad, getSquadById} from "../helpers/squad";
import {isObject} from "chart.js/helpers";
import arrowDownGrey from '../static/img/arrow-down-grey.svg'
import {ContentContext} from "../App";

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
    const [teamSaved, setTeamSaved] = useState("");
    const [team, setTeam] = useState([]);
    const [updateTeam, setUpdateTeam] = useState([]);
    const [updateMode, setUpdateMode] = useState(false);
    const [filtersVisible, setFiltersVisible] = useState(false);
    const [availablePlaces, setAvailablePlaces] = useState([0, 0, 0, 0, 0, 0, 0]);
    const [teamsJoined, setTeamsJoined] = useState(false);

    const { content } = useContext(ContentContext);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const id = params.get('id');

        if(id) {
            getFavoritesByClub()
                .then((res) => {
                    setPlayers(res?.data?.result);
                    setFilteredPlayers(res?.data?.result);
                    setFlexBasis(100 / res?.data?.result?.length);

                    getSquadById(id)
                        .then((res) => {
                            setUpdateMode(true);
                            const result = res?.data?.result;
                            setName(result[0]?.name);
                            setUpdateTeam(result);
                            // setTeam(result);

                            const updateTeamLength = result.length;
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
                });
        }
        else {
            getFavoritesByClub()
                .then((res) => {
                    setPlayers(res?.data?.result);
                    setFilteredPlayers(res?.data?.result);
                    setTrackWidth(res?.data?.result?.length * 510);
                    setFlexBasis(100 / res?.data?.result?.length);
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

    const addUpdateTeamPlayersToSquad = () => {
        const allPlayersWrappers = Array.from(document.querySelectorAll(".createSquad__squad__itemWrapper"));
        let indexesToAdd = [];
        allPlayersWrappers.reverse().forEach((item, index) => {
            if(index < updateTeam.length) {
                const itemWrapperId = item.getAttribute('id');
                const draggingElement = document.querySelector(`#${itemWrapperId}>.createSquad__squad__item__dragging`);
                const firstActiveDropzone = document.querySelector('.dropzone--active');
                firstActiveDropzone.classList.remove('dropzone--active');

                item.removeChild(draggingElement);
                firstActiveDropzone.appendChild(draggingElement);

                draggingElement.classList.add("element--dropped");
                draggingElement.style.opacity = '1';

                indexesToAdd.push(parseInt(itemWrapperId.split('--')[1]));
            }

            if(index === updateTeam.length-1) {
                setSelectedPlayers(indexesToAdd);
                setPlayersOnCourt(indexesToAdd);
            }
        });
    }

    const checkIfMobile = () => {
        if(window.innerWidth < 768) setMobile(true);
        else setMobile(false);
    }

    useEffect(() => {
        if(window.innerWidth < 768) {
           Array.from(document.querySelectorAll(".createSquad__squad__item__dragging")).forEach((item) => {
               item.classList.remove("draggable");
           });
       }
    }, []);

    useEffect(() => {
        const join = players.concat(updateTeam);
        setTrackWidth((getUniqueListBy(join, 'id').length - numberOfSelectedPlayersInUpdateTeam()) * 510);
        setFlexBasis((100 / ((getUniqueListBy(join, 'id').length) - numberOfSelectedPlayersInUpdateTeam())).toFixed(2));
        setTeamsJoined(true);

        setPlayers(join);
        setFilteredPlayers(join);
    }, [updateTeam]);

    useEffect(() => {
        addUpdateTeamPlayersToSquad();
    }, [teamsJoined, players]);

    useEffect(() => {
        interact(".draggable").draggable({
            listeners: {
                move (event) {
                    const target = event.target;

                    target.classList.remove('element--dropped');

                    const dataX = target.getAttribute('data-x');
                    const dataY = target.getAttribute('data-y');
                    const initialX = parseFloat(dataX) || 0;
                    const initialY = parseFloat(dataY) || 0;

                    const deltaX = event.dx;
                    const deltaY = event.dy;

                    const newX = initialX + deltaX;
                    const newY = initialY + deltaY;

                    target.style.opacity = "1";

                    target
                        .style
                        .transform = `translate(${newX}px, ${newY}px)`;

                    target.setAttribute('data-x', newX);
                    target.setAttribute('data-y', newY);
                },
                end (event) {
                    if(!event.relatedTarget) {
                        /* Wroc zawodnika */
                        const draggingElement = event.target;
                        const draggingElementId = parseInt(draggingElement.getAttribute('id').split('-')[1]);
                        const draggingElementParent = document.getElementById(`createSquad__squad__itemWrapper--${draggingElementId}`);

                        setSelectedPlayers(selectedPlayers.filter((item) => {
                            return item !== parseInt(draggingElementId);
                        }));
                        if(draggingElementId) setNewPlayerOnCourt(-1 * draggingElementId);
                        else setNewPlayerOnCourt(-999999);

                        draggingElement.style.top = "0";
                        draggingElement.style.left = "0";
                        draggingElement.style.transform = "none";
                        draggingElement.style.opacity = "0";
                        draggingElement.style.width = "100%";

                        draggingElement.setAttribute('data-x', 0);
                        draggingElement.setAttribute('data-y', 0);

                        draggingElement.classList.add("draggable");

                        if(draggingElementParent) {
                            draggingElementParent.appendChild(draggingElement);
                        }
                    }
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
                event.stopPropagation();
                const draggingElement = event.relatedTarget;
                const dropzoneElement = event.target;

                dropzoneElement.style.opacity = "1";
                dropzoneElement.classList.remove("dropzone--active");

                dropzoneElement.appendChild(draggingElement);
                draggingElement.classList.add("element--dropped");

                const droppedPlayerIndex = parseInt(draggingElement.id.split("-")[1]);
                setNewPlayerOnCourt(droppedPlayerIndex);
            },
            ondragleave: function(event) {
                event.target.style.opacity = "1";
            }
        });
    }, [players, selectedPlayers]);

    useEffect(() => {
        setTeam(players.filter((item, index) => {
            return isElementInArray(playersOnCourt, index);
        }));
    }, [playersOnCourt]);

    useEffect(() => {
        if(newPlayerOnCourt >= 0) {
            if(!isElementInArray(playersOnCourt, newPlayerOnCourt)) {
                setPlayersOnCourt([...playersOnCourt, newPlayerOnCourt]);
            }
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
        setMinCost(playersOnCourt.reduce((prev, current, index) => {
            if(isObject(current)) {
                return prev + current?.salary_from;
            }
            else {
                const player = players[current];
                return prev + (player?.salary_from ? player.salary_from : 0);
            }
        }, 0));
        setMaxCost(playersOnCourt.reduce((prev, current, index) => {
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
        if(!isPositionActive(0)) {
            if(n) {
                if(isPositionActive(n)) {
                    setPositionFilters(positionFilters.filter((item) => {
                        return item !== n;
                    }));
                }
                else {
                    setPositionFilters([...positionFilters, n]);
                }
            }
            else {
                setPositionFilters([0]);
            }
        }
        else {
            if(isPositionActive(n)) {
                setPositionFilters(positionFilters.filter((item) => {
                    return (item !== n) && (item);
                }));
            }
            else {
                const currentPositionFilters = positionFilters.filter((item) => {
                    return item;
                });
                setPositionFilters([...currentPositionFilters, n]);
            }
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
                item.classList.remove("draggable");
            });
        }
    }

    const isPlayerInCurrentTeam = (player) => {
        return selectedPlayers.findIndex(((item) => {
            return players[item]?.id === player?.id;
        })) !== -1;
    }

    const isPlayerInCurrentFilter = (player) => {
        return filteredPlayers.findIndex((item) => {
            return item?.id === player?.id;
        }) !== -1;
    }

    const numberOfSelectedPlayersFromCurrentFilter = () => {
        return selectedPlayers.filter((item) => {
            return isPlayerInCurrentFilter(players[item]) && !isPlayerInUpdateTeam(players[item]);
        }).length;
    }

    const numberOfSelectedPlayersInUpdateTeam = () => {
        return Array.from(getUniqueListBy(filteredPlayers, 'id')).filter((item) => {
            return isElementInArray(updateTeam.map((item) => {
                return item.id;
            }), item.id) && isPlayerInCurrentTeam(item);
        }).length;
    }

    const numberOfFavoritesSelectedPlayersInUpdateTeam = () => {
        return filteredPlayers.length - Array.from(getUniqueListBy(filteredPlayers, 'id')).length;
    }

    useEffect(() => {
        /* Trzeba odjac selectedPlayers z aktualnie filtrowanej grupy */
        let remainingItems
        numberOfFavoritesSelectedPlayersInUpdateTeam();
        if(updateMode) {
            remainingItems = filteredPlayers.length - numberOfSelectedPlayersInUpdateTeam() - numberOfSelectedPlayersFromCurrentFilter() - numberOfFavoritesSelectedPlayersInUpdateTeam();
        }
        else {
            remainingItems = filteredPlayers.length - numberOfSelectedPlayersFromCurrentFilter();
        }

        setTrackWidth(remainingItems * 510);

            const allPlayersWrappers = Array.from(document.querySelectorAll('.createSquad__squad__itemWrapper'));
            if(allPlayersWrappers) {
                allPlayersWrappers?.forEach((item) => {
                    if(!item.textContent.length) {
                        if(window.innerWidth > 768) item.style.width = '0';
                        item.style.flexBasis = '0';
                        item.style.margin = '0';
                    }
                    else {
                        if(window.innerWidth > 768) item.style.width = '510px';
                        else item.style.marginBottom = '20px';
                        item.style.flexBasis = `${100 / (remainingItems)}%`;
                    }
                });
            }
    }, [selectedPlayers, filteredPlayers]);

    const checkActiveDropzones = () => {
        Array.from(document.querySelectorAll('.dropzone')).forEach((item) => {
           if(item.childElementCount < 2) item.classList.add('dropzone--active');
           else item.classList.remove('dropzone--active');
        });
    }

    const startDragging = (e, playerIndex) => {
        if(!(window.innerWidth < 768)) {
            let elementToDrag = document.getElementById(`draggable-${playerIndex}`);

            let x, y;

            elementToDrag.style.opacity = "1";

            x = e.pageX - 50;
            y = e.pageY - 50;

            if(!isElementInArray(selectedPlayers, playerIndex) && playerIndex >= 0) {
                /* Element from bottom menu */
                const dropzone = document.getElementById(`createSquad__squad__itemWrapper--${playerIndex}`);
                dropzone.removeChild(elementToDrag);
                setSelectedPlayers([...selectedPlayers, playerIndex]);
            }
            else {
                /* Element dragged from one position to another */
                elementToDrag.setAttribute('data-x', '0');
                elementToDrag.setAttribute('data-y', '0');
                elementToDrag.classList.remove('element--dropped');
            }

            // elementToDrag.classList.remove('element--dropped');
            elementToDrag.style.top = `${y}px`;
            elementToDrag.style.left = `${x}px`;
            elementToDrag.style.transform = 'none';
            elementToDrag.style.width = "auto";
            document.querySelector(".container").appendChild(elementToDrag);

            checkActiveDropzones();
        }
    }

    const removePlayerFromCourt = (id, playerId) => {
        if(playersOnCourt.findIndex((item) => {
            return item === id;
        }) !== -1) {
            if(id) setNewPlayerOnCourt(id * -1);
            else setNewPlayerOnCourt(-999999);

            setSelectedPlayers(selectedPlayers.filter((item) => {
                return item !== id;
            }));
            setAvailablePlaces(availablePlaces.map((item) => {
                if(item === playerId) return 0;
                else return item;
            }));

            const elementToRemove = document.getElementById(`draggable-${id}`);
            const parentOfElementToRemove = document.getElementById(`createSquad__squad__itemWrapper--${id}`);
            parentOfElementToRemove.style.transition = 'none';

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

            elementToRemove.classList.add("draggable");
        }
    }

    const saveTeam = () => {
        if(!name.length) {
            setTeamSaved(content.team_error1);
        }
        else if(!team.length) {
            setTeamSaved(content.team_error2);
        }
        else {
            addSquad(name, team)
                .then((res) => {
                    if(res?.data?.result === 2) setTeamSaved(content.team_updated);
                    else if(res?.data?.result === 1) setTeamSaved(content.team_added);
                    else setTeamSaved(content.error);
                });
        }
    }

    const isPlayerInUpdateTeam = (player) => {
        return updateTeam.findIndex((item) => {
            return item?.id === player?.id;
        }) !== -1;
    }

    const toggleFiltersVisibility = () => {
        setFiltersVisible(!filtersVisible);
    }

    const getScrollAreaWidth = () => {
        return parseInt(window.getComputedStyle(document.querySelector('.createSquad__squad')).getPropertyValue('width').split('p')[0]);
    }

    useEffect(() => {
        checkActiveDropzones();
    }, [updateTeam]);

    return <div className="container container--dark">
        <Header loggedIn={true} club={true} menu="light" theme="dark" profileImage={club.file_path} />

        <main className="createSquad siteWidth">
            <section className="createSquad__name">
                    <span className="userInfoEdition__value">
                    <label className={editName ? "label--edit" : ""}>
                        <input value={name}
                               placeholder={content.team_name}
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
                   return <div className={!updateTeam.length-1 >= item ? `dropzone dropzone--active` : `dropzone dropzone--active dropzone--player--${item}`}>
                       <img className="btn__img" src={playerPlaceholder} alt="zawodnik" />
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
                </section>

                <h3 className="createSquad__teamCostHeader d-desktop">
                    {content.cost_of_the_team}:
                </h3>
                <h4 className="createSquad__teamCostHeader__value d-desktop">
                    {!minCost && !maxCost ? 0 : minCost + " - " + maxCost} PLN
                </h4>
            </section>
        </main>
        <section className="createSquad__players">
            <section className="searchFilters__position searchFilters__position--mobile siteWidthSuperNarrow siteWidthSuperNarrow--1400">
                <span className="searchFilters__position__header">
                    {content.position}:
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
                                    {content.all_text}
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
                    {content.all_text}
                    </button>
                    <button className={isPositionActive(3) ? "searchFilters__position__button gold" : "searchFilters__position__button"} onClick={() => { filterPosition(3); }}>
                        {content.position3}
                    </button>
                    <button className={isPositionActive(1) ? "searchFilters__position__button gold" : "searchFilters__position__button"} onClick={() => { filterPosition(1); }}>
                          {content.position1}
                    </button>
                    <button className={isPositionActive(4) ? "searchFilters__position__button gold" : "searchFilters__position__button"} onClick={() => { filterPosition(4); }}>
                          {content.position4}
                    </button>
                    <button className={isPositionActive(2) ? "searchFilters__position__button gold" : "searchFilters__position__button"} onClick={() => { filterPosition(2); }}>
                          {content.position2}
                    </button>
                    <button className={isPositionActive(5) ? "searchFilters__position__button gold" : "searchFilters__position__button"} onClick={() => { filterPosition(5); }}>
                          {content.position5}
                    </button>
                </span> : ""}

                <span className="searchFilters__position__positions d-desktop">
                    <button className={isPositionActive(0) ? "searchFilters__position__button gold" : "searchFilters__position__button"} onClick={() => { filterPosition(0); }}>
                     {content.all_text}
                    </button>
                    <button className={isPositionActive(3) ? "searchFilters__position__button gold" : "searchFilters__position__button"} onClick={() => { filterPosition(3); }}>
                          {content.position3}
                    </button>
                    <button className={isPositionActive(1) ? "searchFilters__position__button gold" : "searchFilters__position__button"} onClick={() => { filterPosition(1); }}>
                          {content.position1}
                    </button>
                    <button className={isPositionActive(4) ? "searchFilters__position__button gold" : "searchFilters__position__button"} onClick={() => { filterPosition(4); }}>
                          {content.position4}
                    </button>
                    <button className={isPositionActive(2) ? "searchFilters__position__button gold" : "searchFilters__position__button"} onClick={() => { filterPosition(2); }}>
                          {content.position2}
                    </button>
                    <button className={isPositionActive(5) ? "searchFilters__position__button gold" : "searchFilters__position__button"} onClick={() => { filterPosition(5); }}>
                          {content.position5}
                    </button>
                </span>
            </section>

            <section className="createSquad__squadWrapper">
                <section className="createSquad__squad siteWidthSuperNarrow siteWidthSuperNarrow--1400">
                    <div className="createSquad__squad__track"
                         style={{
                        width: `${trackWidth}px`,
                        transform: `translateX(-${scrollbar[0] > 1 ? trackWidth * scrollbar[0] / 100 - getScrollAreaWidth() : 0}px)`
                    }}>

                        {players?.map((item, index) => {
                            if(1) {
                                if(!isPlayerInCurrentTeam(item) && isPlayerInFilteredGroup(item.position)) {
                                    return <div className={`createSquad__squad__itemWrapper`}
                                                style={{
                                                    flexBasis: `${flexBasis}%`
                                                }}
                                                id={`createSquad__squad__itemWrapper--${index}`}
                                                onMouseDown={(e) => { startDragging(e, index); }} key={index}
                                                onClick={(e) => { mobileAddToSquad(e, index, item.id); }}
                                    >
                                        <div className={isElementInArray(selectedPlayers, index) ? (!mobile ? "createSquad__squad__item__dragging draggable" : "createSquad__squad__item__dragging") : (!mobile ? "createSquad__squad__item__dragging draggable opacity-0" : "createSquad__squad__item__dragging opacity-0")}
                                             id={`draggable-${index}`} key={index}>
                                            <img className="createSquad__squad__item__dragging__img" src={playerDraggable} alt="zawodnik" />

                                            <button className="createSquad__squad__item__dragging__trashBtn"
                                                    onMouseDown={(e) => { e.stopPropagation(); removePlayerFromCourt(index, item.id); }}
                                                    onClick={(e) => { e.stopPropagation(); removePlayerFromCourt(index, item.id); }}>
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
                                                        {content.player_parameter_11}
                                                    </h4>
                                                    <h4 className="createSquad__squad__item__data__value">
                                                        {item.height ? item.height + " cm" : "-"}
                                                    </h4>
                                                    <h4 className="createSquad__squad__item__data__key">
                                                        {content.player_parameter_12}
                                                    </h4>
                                                    <h4 className="createSquad__squad__item__data__value">
                                                        {item.weight ? item.weight + " kg" : "-"}
                                                    </h4>
                                                </section>
                                                <section className="createSquad__squad__item__data__section">
                                                    <h4 className="createSquad__squad__item__data__key">
                                                        {content.player_parameter_7}
                                                    </h4>
                                                    <h4 className="createSquad__squad__item__data__value">
                                                        {item.salary_from ? item.salary_from + " - " + item.salary_to + " PLN" : "-"}
                                                    </h4>
                                                </section>
                                            </section>
                                        </div> : ""}
                                    </div>
                                }
                                else {
                                    return <div className={`createSquad__squad__itemWrapper-1`}
                                                style={{
                                                    flexBasis: `0`,
                                                    width: '0'
                                                }}
                                                id={`createSquad__squad__itemWrapper--${index}`}
                                                onMouseDown={(e) => { startDragging(e, index); }} key={index}
                                                onClick={(e) => { mobileAddToSquad(e, index, item.id); }}
                                    >
                                        <div className={isElementInArray(selectedPlayers, index) ? (!mobile ? "createSquad__squad__item__dragging draggable" : "createSquad__squad__item__dragging") : (!mobile ? "createSquad__squad__item__dragging draggable opacity-0" : "createSquad__squad__item__dragging opacity-0")}
                                             id={`draggable-${index}`} key={index}>
                                            <img className="createSquad__squad__item__dragging__img" src={playerDraggable} alt="zawodnik" />

                                            <button className="createSquad__squad__item__dragging__trashBtn"
                                                    onMouseDown={(e) => { e.stopPropagation(); removePlayerFromCourt(index, item.id); }}
                                                    onClick={(e) => { e.stopPropagation(); removePlayerFromCourt(index, item.id); }}>
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
                                                        {content.player_parameter_11}
                                                    </h4>
                                                    <h4 className="createSquad__squad__item__data__value">
                                                        {item.height ? item.height + " cm" : "-"}
                                                    </h4>
                                                    <h4 className="createSquad__squad__item__data__key">
                                                        {content.player_parameter_12}
                                                    </h4>
                                                    <h4 className="createSquad__squad__item__data__value">
                                                        {item.weight ? item.weight + " kg" : "-"}
                                                    </h4>
                                                </section>
                                                <section className="createSquad__squad__item__data__section">
                                                    <h4 className="createSquad__squad__item__data__key">
                                                        {content.player_parameter_7}
                                                    </h4>
                                                    <h4 className="createSquad__squad__item__data__value">
                                                        {item.salary_from ? item.salary_from + " - " + item.salary_to + " PLN" : "-"}
                                                    </h4>
                                                </section>
                                            </section>
                                        </div> : ""}
                                    </div>
                                }
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
                                    height: !mobile ? '16px' : '10px',
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
