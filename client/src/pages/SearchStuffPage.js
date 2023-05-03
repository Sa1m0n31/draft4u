import React, {useEffect, useState, useContext} from 'react'
import Header from "../components/Header";
import Footer from "../components/Footer";
import {Splide, SplideSlide} from "@splidejs/react-splide";
import {addToFavorites, deleteFromFavorites} from "../helpers/club";
import {getImageUrl, isElementInArray} from "../helpers/others";
import filterIcon from '../static/img/filter.svg'
import rightArrow from '../static/img/right-arrow.svg'
import pokazWynikiBtn from '../static/img/pokaz-wyniki-btn.png'
import {ContentContext} from "../App";
import StuffCard from "./StuffCard";

const SearchStuffPage = ({club, favorites, playersProp}) => {
    const [players, setPlayers] = useState([]);
    const [playersWithoutSubscription, setPlayersWithoutSubscription] = useState([]);
    const [filteredPlayers, setFilteredPlayers] = useState([]);

    const [mobileFilters, setMobileFilters] = useState(false);

    const [currentPage, setCurrentPage] = useState(0);
    const [numberOfPages, setNumberOfPages] = useState(0);
    const [positionFilters, setPositionFilters] = useState([0]);

    const [initial, setInitial] = useState(true);

    const { content } = useContext(ContentContext);

    const [favoritesState, setFavoritesState] = useState([]);

    useEffect(() => {
        setFavoritesState(favorites);
    }, [favorites]);

    const filterPlayers = () => {
        /* Filter players */
        setFilteredPlayers(players?.filter((item) => {
            return (isPlayerInFilteredGroup(item.position));
        })?.concat(playersWithoutSubscription.filter((item) => {
            return (isPlayerInFilteredGroup(item.position));
        })));
    }

    useEffect(() => {
        filterPlayers();
    }, [positionFilters]);

    useEffect(() => {
        setCurrentPage(0);
        setNumberOfPages(Math.ceil(parseFloat(filteredPlayers.length / 9)));
    }, [filteredPlayers]);

    useEffect(() => {
        const activePlayers = playersProp.filter((item) => {
            return new Date() <= new Date(item.subscription);
        });
        const notActivePlayers = playersProp.filter((item) => {
            if(!item.subscription) return true;
            return new Date() > new Date(item.subscription);
        });

        setPlayersWithoutSubscription(notActivePlayers);
        setPlayers(activePlayers.concat(notActivePlayers));
        setFilteredPlayers(activePlayers.concat(notActivePlayers));
    }, [playersProp]);

    useEffect(() => {
        const shuffledPlayers = orderPlayersByInfo(shufflePlayers(players));
        setFilteredPlayers(shuffledPlayers.concat(playersWithoutSubscription));
    }, [players, playersWithoutSubscription]);

    const orderPlayersByInfo = (players) => {
        return players.sort((a, b) => {
            if(a.position === null) return 1;
            else if(b.position === null) return -1;
            else if(a.file_path === null) return 1;
            else if(b.file_path === null) return -1;
            else return -1;
        }).concat(playersWithoutSubscription.sort((a, b) => {
            if(a.position === null) return 1;
            else if(b.position === null) return -1;
            else if(a.file_path === null) return 1;
            else if(b.file_path === null) return -1;
            else return -1;
        }));
    }

    const shufflePlayers = (array) => {
        let currentIndex = array.length, randomIndex;

        while (currentIndex != 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
        }
        return array;
    }

    const isPlayerFavorite = (userId) => {
        if(!userId || !favoritesState.length) return false;

        return favoritesState.findIndex((item) => {
            return item.id === userId;
        }) !== -1;
    }

    const isPlayerInFilteredGroup = (position) => {
        if(isElementInArray(positionFilters, 0)) return true;
        else {
            return positionFilters.findIndex((item) => {
                return item + 10 === position;
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

    const options = {
        perPage: 1.5,
        focus: "center"
    }

    const goToTopOfTheWall = () => {
        document.querySelector(".searchFilters__position").scrollIntoView({
            top: 0,
            behavior: "smooth"
        });
    }

    const nextPage = () => {
        setInitial(false);
        setCurrentPage(currentPage+1);
    }

    const prevPage = () => {
        setInitial(false);
        setCurrentPage(currentPage-1);
    }

    useEffect(() => {
        if(!initial) goToTopOfTheWall();
    }, [currentPage]);

    const isIndexOnCurrentPage = (index) => {
        if(currentPage === 0) {
            return index < 9;
        }
        else {
            const playersBefore = currentPage * 9;
            return index >= playersBefore && index < playersBefore + 9;
        }
    }

    const showFilters = () => {
        setMobileFilters(true);
    }

    const hideFilters = () => {
        setMobileFilters(false);
    }

    const addPlayerToFavorites = (userId) => {
        if(!isPlayerFavorite(userId)) {
            addToFavorites(userId);
            setFavoritesState(prevState => {
                return [...prevState, {
                    id: userId,
                    user_id: userId
                }];
            });
        }
        else {
            deleteFromFavorites(userId);
            setFavoritesState(favoritesState.filter((item) => {
                return item.id !== userId;
            }));
        }
    }

    return <div className="container container--dark">
        <Header loggedIn={true} club={true} player={false} menu="light" theme="dark" profileImage={club.file_path} />

        {/* DESKTOP HEADER */}
        <header className="siteWidthSuperNarrow siteWidthSuperNarrow--1400 d-desktop max-1000">
            <img className="btn__img clubAccountHeader__img" src={getImageUrl(content.img5)} alt="klub" />
        </header>

        {/* MOBILE HEADER */}
        <header className="playersWall__mobileHeader d-mobile">
            <h2 className="playersWall__mobileHeader__header">
                {content.players}
            </h2>
            <button className="playersWall__mobileHeader__filterBtn" onClick={() => { showFilters(); }}>
                <img className="playersWall__mobileHeader__filterBtn__img" src={filterIcon} alt="filtruj" />
                {content.filters}
            </button>
        </header>
        {mobileFilters ? <aside className="playersWall__mobileFilters d-mobile">
            <header className="playersWall__mobileFilters__header">
                <button className="playersWall__mobileFilters__header__btn" onClick={() => { hideFilters(); }}>
                    <img className="btn__img playersWall__mobileFilters__header__btn__img" src={rightArrow} alt="wroc" />
                </button>
                <h3 className="playersWall__mobileFilters__header__h">
                    {content.filters}
                </h3>
            </header>
            <section className="searchFilters__position searchFilters__position--mobile">
                <span className="searchFilters__position__header">
                    {content.post}:
                </span>

                <span className="searchFilters__position__positions">
                    <button className={isPositionActive(0) ? "searchFilters__position__button gold" : "searchFilters__position__button"} onClick={() => { filterPosition(0); }}>
                        {content.all_text}
                </button>
                <button className={isPositionActive(1) ? "searchFilters__position__button gold" : "searchFilters__position__button"} onClick={() => { filterPosition(1); }}>
                    {content.post1}
                </button>
                <button className={isPositionActive(2) ? "searchFilters__position__button gold" : "searchFilters__position__button"} onClick={() => { filterPosition(2); }}>
                    {content.post2}
                </button>
                <button className={isPositionActive(3) ? "searchFilters__position__button gold" : "searchFilters__position__button"} onClick={() => { filterPosition(3); }}>
                    {content.post3}
                </button>
                <button className={isPositionActive(4) ? "searchFilters__position__button gold" : "searchFilters__position__button"} onClick={() => { filterPosition(4); }}>
                    {content.post4}
                </button>
                <button className={isPositionActive(5) ? "searchFilters__position__button gold" : "searchFilters__position__button"} onClick={() => { filterPosition(5); }}>
                    {content.post5}
                </button>
                </span>
            </section>
            <button className="button playersWall__mobileFilters__btn" onClick={() => { hideFilters() }}>
                <img className="btn__img" src={pokazWynikiBtn} alt="pokaz-wyniki" />
            </button>
        </aside> : ""}

        <aside className="siteWidthSuperNarrow siteWidthSuperNarrow--1400 searchFilters max-1000 d-desktop">
            <section className="searchFilters__position">
                <span className="searchFilters__position__header">
                    {content.post}:
                </span>

                <span className="searchFilters__position__positions">
                    <button className={isPositionActive(0) ? "searchFilters__position__button gold" : "searchFilters__position__button"} onClick={() => { filterPosition(0); }}>
                        {content.all_text}
                </button>
                <button className={isPositionActive(1) ? "searchFilters__position__button gold" : "searchFilters__position__button"} onClick={() => { filterPosition(1); }}>
                    {content.post1}
                </button>
                <button className={isPositionActive(2) ? "searchFilters__position__button gold" : "searchFilters__position__button"} onClick={() => { filterPosition(2); }}>
                    {content.post2}
                </button>
                <button className={isPositionActive(3) ? "searchFilters__position__button gold" : "searchFilters__position__button"} onClick={() => { filterPosition(3); }}>
                    {content.post3}
                </button>
                <button className={isPositionActive(4) ? "searchFilters__position__button gold" : "searchFilters__position__button"} onClick={() => { filterPosition(4); }}>
                    {content.post4}
                </button>
                <button className={isPositionActive(5) ? "searchFilters__position__button gold" : "searchFilters__position__button"} onClick={() => { filterPosition(5); }}>
                    {content.post5}
                </button>
                </span>
            </section>
        </aside>

        {/* MOBILE */}
        <main className="playersWall--mobile d-mobile">
            {filteredPlayers?.length ? <Splide options={options}>
                {filteredPlayers.map((item, index) => {
                    return <SplideSlide key={index}>
                        <StuffCard key={index}
                                    player={item}
                                    favoriteView={false}
                                    favorite={isPlayerFavorite(item.user_id)}
                                    addPlayerToFavorites={addPlayerToFavorites}
                                    balance={true} />
                    </SplideSlide>
                })}
            </Splide> : (players?.length ? <h3 className="playersWall__playersNotFoundHeader">
                {content.no_players_found}
            </h3> : "") }
        </main>

        {/* DESKTOP */}
        <main className="playersWall d-desktop siteWidthSuperNarrow siteWidthSuperNarrow--1400">
            {filteredPlayers?.length ? filteredPlayers.map((item, index) => {
                if(isIndexOnCurrentPage(index)) {
                    return <StuffCard key={index}
                                       player={item}
                                       favoriteView={false}
                                       favorite={isPlayerFavorite(item.user_id)}
                                       addPlayerToFavorites={addPlayerToFavorites}
                                       balance={true} />
                }
            }) : <h3 className="playersWall__playersNotFoundHeader">
                {content.no_players_found}
            </h3>}
        </main>

        <nav className="playersWall__buttons">
            {currentPage ? <button className="playersWall--nextPageBtn d-desktop" onClick={() => { prevPage(); }}>
                <span className="playersWall--nextPageBtn__arrowBack"> > </span> {content.back_text}
            </button> : ""}
            {currentPage < numberOfPages-1 ? <button className="playersWall--nextPageBtn d-desktop" onClick={() => { nextPage(); }}>
                {content.continue_text} <span className="playersWall--nextPageBtn__arrow"> > </span>
            </button> : ""}
        </nav>

        <Footer theme="dark" border={true} />
    </div>
}

export default SearchStuffPage;
