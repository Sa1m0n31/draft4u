import React, { useEffect, useState, useRef } from 'react'
import Header from "../components/Header";
import example from "../static/img/zzaksa.png";
import placeholder from "../static/img/placeholder.png";
import Footer from "../components/Footer";
import { Range, getTrackBackground } from 'react-range';
import SingleFilter from "../components/SingleFilter";
import {Splide, SplideSlide} from "@splidejs/react-splide";
import PlayerCard from "../components/PlayerCard";
import {getAllPlayers, isPlayerFavorite} from "../helpers/club";
import {calculateAge, isElementInArray} from "../helpers/others";
import compareBtn from '../static/img/compare-btn.png'
import settings from "../settings";
import man from '../static/img/profile-picture.png'

const SearchPlayersPage = ({club, favorites}) => {
    const [players, setPlayers] = useState([]);
    const [filteredPlayers, setFilteredPlayers] = useState([]);

    const [currentPage, setCurrentPage] = useState(0);
    const [numberOfPages, setNumberOfPages] = useState(0);
    const [positionFilters, setPositionFilters] = useState([0]);

    const [sex, setSex] = useState([0]);
    const [age, setAge] = useState([16, 50]);
    const [weight, setWeight] = useState([40, 150]);
    const [height, setHeight] = useState([140, 250]);
    const [blockRange, setBlockRange] = useState([150, 350]);
    const [attackRange, setAttackRange] = useState([150, 350]);
    const [verticalRange, setVerticalRange] = useState([150, 350]);
    const [salary, setSalary] = useState([1000, 30000]);

    const [comparator, setComparator] = useState([0, 0, 0]);

    const filterPlayers = () => {
        const gender = sex[0] === 0; // TRUE - man, FALSE - woman

        /* Determine filters that are turned on */
        const isAgeOn = age[0] !== 16 || age[1] !== 50;
        const isWeightOn = weight[0] !== 40 || weight[1] !== 150;
        const isHeightOn = height[0] !== 140 || height[1] !== 250;
        const isBlockRangeOn = blockRange[0] !== 150 || blockRange[1] !== 350;
        const isAttackRangeOn = attackRange[0] !== 150 || attackRange[1] !== 350;
        const isVerticalRangeOn = verticalRange[0] !== 150 || verticalRange[1] !== 350;
        const isSalaryOn = salary[0] !== 1000 || salary[1] !== 30000;

        /* Filter players */
        setFilteredPlayers(players.filter((item) => {
            const playersAge = calculateAge(item.birthday);
            return (item.sex === gender)
                    &&(isPlayerInFilteredGroup(item.position))
                    &&((playersAge >= age[0] && playersAge <= age[1]) || !isAgeOn)
                    &&((item.weight >= weight[0] && item.weight <= weight[1]) || !isWeightOn)
                    &&((item.height >= height[0] && item.height <= height[1]) || !isHeightOn)
                    &&((item.attack_range >= attackRange[0] && item.attack_range <= attackRange[1]) || !isAttackRangeOn)
                    &&((item.block_range >= blockRange[0] && item.block_range <= blockRange[1]) || !isBlockRangeOn)
                    &&((item.vertical_range >= verticalRange[0] && item.vertical_range <= verticalRange[1]) || !isVerticalRangeOn)
                    &&((item.salary_from >= salary[0] && item.salary_to <= salary[1]) || !isSalaryOn)
        }));
    }

    useEffect(() => {
        filterPlayers();
    }, [players, sex, age, weight, height, blockRange, attackRange, verticalRange, salary, positionFilters]);

    useEffect(() => {
        setCurrentPage(0);
        setNumberOfPages(Math.ceil(parseFloat(filteredPlayers.length / 9)));
    }, [filteredPlayers]);

    useEffect(() => {
        getAllPlayers()
            .then((res) => {
                setPlayers(res?.data?.result);
                setFilteredPlayers(res?.data?.result);
            });
    }, []);

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

    const options = {
        perPage: 1.2,
        focus: "center"
    }

    const goToTopOfTheWall = () => {
        document.querySelector(".searchFilters__position").scrollIntoView({
            top: 0,
            behavior: "smooth"
        });
    }

    const nextPage = () => {
        setCurrentPage(currentPage+1);
        goToTopOfTheWall();
    }

    const prevPage = () => {
        setCurrentPage(currentPage-1);
        goToTopOfTheWall();
    }

    const isIndexOnCurrentPage = (index) => {
        if(currentPage === 0) {
            return index < 9;
        }
        else {
            const playersBefore = currentPage * 9;
            return index >= playersBefore && index < playersBefore + 9;
        }
    }

    const isPlayerInComparator = (player) => {
        return comparator.findIndex((item) => {
            return item.user_id === player.user_id;
        }) !== -1;
    }

    const addPlayerToComparator = (player) => {
        if(!isPlayerInComparator(player)) {
            let playerAdded = false;
            setComparator(comparator.map((item, index) => {
                if(((item === 0)&&(!playerAdded))||((index === 2)&&(!playerAdded))) {
                    playerAdded = true;
                    return player;
                }
                else {
                    return item;
                }
            }));
        }
        else {
            setComparator(comparator.map((item) => {
                if(item) {
                    if(item.user_id === player.user_id) return 0;
                    else return item;
                }
                else {
                    return item;
                }
            }));
        }
    }

    return <div className="container container--dark">
        <Header loggedIn={true} club={true} menu="light" theme="dark" profileImage={example} />

        <header className="siteWidthSuperNarrow siteWidthSuperNarrow--1400">
            <img className="btn__img clubAccountHeader__img" src={placeholder} alt="klub" />
        </header>

        <aside className="siteWidthSuperNarrow siteWidthSuperNarrow--1400 searchFilters">
            <section className="searchFilters__filters">
                <SingleFilter value={sex} changeValue={setSex} min={0} max={1} step={1} width="5%" header="Płeć" />
                <SingleFilter value={age} changeValue={setAge} min={16} max={50} step={1} width="20%" header="Wiek" />
                <SingleFilter value={weight} changeValue={setWeight} min={40} max={150} step={1} width="30%" header="Waga" />
                <SingleFilter value={height} changeValue={setHeight} min={140} max={250} step={1} width="30%" header="Wzrost" />

                <SingleFilter value={attackRange} changeValue={setAttackRange} min={150} max={350} step={1} width="30%" header="Zasięg w ataku" />
                <SingleFilter value={verticalRange} changeValue={setVerticalRange} min={150} max={350} step={1} width="30%" header="Zasięg dosiężny" />
                <SingleFilter value={blockRange} changeValue={setBlockRange} min={150} max={350} step={1} width="30%" header="Zasięg w bloku" />

                <SingleFilter value={salary} changeValue={setSalary} min={1000} max={30000} step={1} width="100%" header="Wynagrodzenie" />
            </section>
            <section className="searchFilters__position">
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
        </aside>

        {/* MOBILE */}
        <main className="playersWall--mobile d-mobile">
            <Splide options={options}>
                {filteredPlayers.map((item, index) => {
                    return <SplideSlide key={index}>
                        <PlayerCard key={index} player={item} favoriteView={false} />
                    </SplideSlide>
                })}
            </Splide>
        </main>

        {/* DESKTOP */}
        <main className="playersWall d-desktop siteWidthSuperNarrow siteWidthSuperNarrow--1400">
            {filteredPlayers.map((item, index) => {
               if(isIndexOnCurrentPage(index)) {
                    return <PlayerCard key={index} player={item} favoriteView={false} favorite={isPlayerFavorite(favorites, item.user_id)} balance={true} addPlayerToComparator={addPlayerToComparator} />
                }
            })}
        </main>

        <nav className="playersWall__buttons">
            {currentPage ? <button className="playersWall--nextPageBtn d-desktop" onClick={() => { prevPage(); }}>
                <span className="playersWall--nextPageBtn__arrowBack"> > </span> Wróć
            </button> : ""}
            {currentPage < numberOfPages-1 ? <button className="playersWall--nextPageBtn d-desktop" onClick={() => { nextPage(); }}>
                Dalej <span className="playersWall--nextPageBtn__arrow"> > </span>
            </button> : ""}
        </nav>

        <section className="playersWall__compareSection siteWidthSuperNarrow siteWidthSuperNarrow--1400 d-desktop">
            {comparator.map((item, index) => {
                return <section className="playersWall__compareSection__item" key={index}>
                    <figure className="playersWall__compareSection__item__imgWrapper">
                        <img className="playersWall__compareSection__item__img" src={!item ? placeholder : item.file_path ? `${settings.API_URL}/image?url=/media/users/${item.file_path}` : man} alt="porownaj-graczy" />
                    </figure>
                    <h3 className="playersWall__compareSection__item__name">
                        {!item ? "Imię i nazwisko" : item.first_name + " " + item.last_name}
                    </h3>
                </section>
            })}
            <a className="button button--hover button--compare" href={`/porownywarka?first=${comparator[0].user_id}&second=${comparator[1].user_id}&third=${comparator[2].user_id}`}>
                <img className="btn__img" src={compareBtn} alt="porownaj" />
            </a>
        </section>

        <Footer theme="dark" border={true} />
    </div>
}

export default SearchPlayersPage;
