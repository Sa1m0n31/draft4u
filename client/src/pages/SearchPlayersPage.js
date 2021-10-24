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
import {calculateAge} from "../helpers/others";

const SearchPlayersPage = ({club, favorites}) => {
    const [players, setPlayers] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [positionFilters, setPositionFilters] = useState([0]);

    const [sex, setSex] = useState([0]);
    const [age, setAge] = useState([16, 50]);
    const [weight, setWeight] = useState([40, 150]);
    const [height, setHeight] = useState([140, 250]);
    const [blockRange, setBlockRange] = useState([150, 350]);
    const [attackRange, setAttackRange] = useState([150, 350]);
    const [verticalRange, setVerticalRange] = useState([150, 350]);
    const [salary, setSalary] = useState([1000, 30000]);

    useEffect(() => {
        getAllPlayers()
            .then((res) => {
                setPlayers(res?.data?.result);
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
                {players.map((item, index) => {
                    return <SplideSlide key={index}>
                        <PlayerCard key={index} player={item} favoriteView={false} />
                    </SplideSlide>
                })}
            </Splide>
        </main>

        {/* DESKTOP */}
        <main className="playersWall d-desktop siteWidthSuperNarrow siteWidthSuperNarrow--1400">
            {players.map((item, index) => {
                return <PlayerCard key={index} player={item} favoriteView={false} favorite={isPlayerFavorite(favorites, item.user_id)} balance={true} />
            })}
        </main>

        <nav className="playersWall__buttons">
            {currentPage ? <button className="playersWall--nextPageBtn d-desktop" onClick={() => { prevPage(); }}>
                <span className="playersWall--nextPageBtn__arrowBack"> > </span> Wróć
            </button> : ""}
            <button className="playersWall--nextPageBtn d-desktop" onClick={() => { nextPage(); }}>
                Dalej <span className="playersWall--nextPageBtn__arrow"> > </span>
            </button>
        </nav>

        <Footer theme="dark" border={true} />
    </div>
}

export default SearchPlayersPage;
