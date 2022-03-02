import React, {useEffect, useState, useContext} from 'react'
import Header from "../components/Header";
import Footer from "../components/Footer";
import SingleFilter from "../components/SingleFilter";
import {Splide, SplideSlide} from "@splidejs/react-splide";
import PlayerCard from "../components/PlayerCard";
import {
    addToFavorites,
    deleteFromFavorites,
    getFavoritesByClub,
} from "../helpers/club";
import {calculateAge, getImageUrl, isElementInArray} from "../helpers/others";
import filterIcon from '../static/img/filter.svg'
import rightArrow from '../static/img/right-arrow.svg'
import pokazWynikiBtn from '../static/img/pokaz-wyniki-btn.png'
import trashIcon from "../static/img/trash-black.svg";
import settings from "../settings";
import profileImg from "../static/img/profile-picture.png";
import {ContentContext} from "../App";

const Favorites = ({club, favorites}) => {
    const { content } = useContext(ContentContext);

    const [players, setPlayers] = useState([]);
    const [filteredPlayers, setFilteredPlayers] = useState([]);
    const [favoritesState, setFavoritesState] = useState([]);
    const [mobileFilters, setMobileFilters] = useState(false);

    const [currentPage, setCurrentPage] = useState(null);
    const [numberOfPages, setNumberOfPages] = useState(0);
    const [positionFilters, setPositionFilters] = useState([0]);
    const [initial, setInitial] = useState(true);

    const [sex, setSex] = useState([0]);
    const [age, setAge] = useState([16, 50]);
    const [weight, setWeight] = useState([40, 150]);
    const [height, setHeight] = useState([140, 250]);
    const [blockRange, setBlockRange] = useState([150, 350]);
    const [attackRange, setAttackRange] = useState([150, 350]);
    const [verticalRange, setVerticalRange] = useState([20, 130]);
    const [salary, setSalary] = useState([1000, 30000]);

    const [comparator, setComparator] = useState([0, 0, 0]);

    useEffect(() => {
        setFavoritesState(favorites);
    }, [favorites]);

    const filterPlayers = () => {
        const gender = sex[0] === 0; // TRUE - man, FALSE - woman

        /* Determine filters that are turned on */
        const isAgeOn = age[0] !== 16 || age[1] !== 50;
        const isWeightOn = weight[0] !== 40 || weight[1] !== 150;
        const isHeightOn = height[0] !== 140 || height[1] !== 250;
        const isBlockRangeOn = blockRange[0] !== 150 || blockRange[1] !== 350;
        const isAttackRangeOn = attackRange[0] !== 150 || attackRange[1] !== 350;
        const isVerticalRangeOn = verticalRange[0] !== 20 || verticalRange[1] !== 130;
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
        if(!initial) setCurrentPage(0);
        setNumberOfPages(Math.ceil(parseFloat(filteredPlayers.length / 9)));
    }, [filteredPlayers]);

    useEffect(() => {
        getFavoritesByClub()
            .then((res) => {
                const pl = res?.data?.result?.filter((item) => {
                    const splittedId = item.identity?.split('-');
                    return splittedId[splittedId.length-1] !== 'stuff';
                });
                setPlayers(pl);
                setFilteredPlayers(pl);
            });
    }, []);

    useEffect(() => {
        const comparatorFromLocalStorage = JSON.parse(localStorage.getItem('draft4u-comparator'));
        if(comparatorFromLocalStorage) {
            setComparator(comparatorFromLocalStorage);
        }
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

    const isPlayerInComparator = (player) => {
        return comparator.findIndex((item) => {
            return item.user_id === player.user_id;
        }) !== -1;
    }

    const addPlayerToComparator = (player) => {
        if(!isPlayerInComparator(player)) {
            /* Three players in comparator */
            if(comparator.filter((item) => {
                return item;
            }).length === 3) {
                window.scrollTo(0,document.body.scrollHeight);
                return 0;
            }

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
        return 1;
    }

    useEffect(() => {
        localStorage.setItem('draft4u-comparator', JSON.stringify(comparator));
    }, [comparator]);

    const areThreeToCompare = (e) => {
        if(comparator?.filter((item) => {
            return item;
        }).length < 2) {
            e.preventDefault();
        }
    }

    const deleteFromComparator = (itemToDelete) => {
        setComparator(comparator.map((item) => {
            if(item.user_id !== itemToDelete.user_id) return item;
            else return 0;
        }));
    }

    const isPlayerFavorite = (userId) => {
        if(!userId || !favoritesState.length) return false;

        return favoritesState.findIndex((item) => {
            return item.id === userId;
        }) !== -1;
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
        <Header loggedIn={true} club={true} menu="light" theme="dark" profileImage={club.file_path} />

        {/* DESKTOP HEADER */}
        <header className="siteWidthSuperNarrow siteWidthSuperNarrow--1400 d-desktop">
            <img className="btn__img clubAccountHeader__img" src={getImageUrl(content.img6)} alt="klub" />
        </header>

        {/* MOBILE HEADER */}
        <header className="playersWall__mobileHeader d-mobile">
            <h2 className="playersWall__mobileHeader__header">
                {content.favorite_players}
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
            <section className="searchFilters__filters">
                <SingleFilter mobile={true} value={sex} changeValue={setSex} min={0} max={1} step={1} width="25%" header={content.map_gender} />
                <SingleFilter mobile={true} value={age} changeValue={setAge} min={16} max={50} step={1} width="65%" header={content.age} />
                <SingleFilter mobile={true} value={weight} changeValue={setWeight} min={40} max={150} step={1} width="100%" header={content.player_parameter_12} />
                <SingleFilter mobile={true} value={height} changeValue={setHeight} min={140} max={250} step={1} width="100%" header={content.player_parameter_11} />

                <SingleFilter mobile={true} value={attackRange} changeValue={setAttackRange} min={150} max={350} step={1} width="100%" header={content.player_parameter_8} />
                <SingleFilter mobile={true} value={verticalRange} changeValue={setVerticalRange} min={20} max={130} step={1} width="100%" header={content.player_parameter_9} />
                <SingleFilter mobile={true} value={blockRange} changeValue={setBlockRange} min={150} max={350} step={1} width="100%" header={content.player_parameter_10} />

                <SingleFilter mobile={true} value={salary} changeValue={setSalary} min={1000} max={30000} step={1} width="100%" header={content.player_parameter_7} />
            </section>
            <section className="searchFilters__position searchFilters__position--mobile">
                <span className="searchFilters__position__header">
                    {content.position}:
                </span>

                <span className="searchFilters__position__positions">
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
            <button className="button playersWall__mobileFilters__btn" onClick={() => { hideFilters() }}>
                <img className="btn__img" src={pokazWynikiBtn} alt="pokaz-wyniki" />
            </button>
        </aside> : ""}

        <aside className="siteWidthSuperNarrow siteWidthSuperNarrow--1400 searchFilters d-desktop">
            <section className="searchFilters__filters">
                <SingleFilter value={sex} changeValue={setSex} min={0} max={1} step={1} width="5%" header={content.map_gender} />
                <SingleFilter value={age} changeValue={setAge} min={16} max={50} step={1} width="20%" header={content.age} />
                <SingleFilter value={weight} changeValue={setWeight} min={40} max={150} step={1} width="30%" header={content.player_parameter_12} />
                <SingleFilter value={height} changeValue={setHeight} min={140} max={250} step={1} width="30%" header={content.player_parameter_11} />

                <SingleFilter value={attackRange} changeValue={setAttackRange} min={150} max={350} step={1} width="30%" header={content.player_parameter_8} />
                <SingleFilter value={verticalRange} changeValue={setVerticalRange} min={20} max={130} step={1} width="30%" header={content.player_parameter_9} />
                <SingleFilter value={blockRange} changeValue={setBlockRange} min={150} max={350} step={1} width="30%" header={content.player_parameter_10} />

                <SingleFilter value={salary} changeValue={setSalary} min={1000} max={30000} step={1} width="100%" header={content.player_parameter_7} />
            </section>
            <section className="searchFilters__position">
                <span className="searchFilters__position__header">
                    {content.position}:
                </span>

                <span className="searchFilters__position__positions">
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
        </aside>

        {/* MOBILE */}
        <main className="playersWall--mobile d-mobile">
            {filteredPlayers?.length ? <Splide options={options}>
                {filteredPlayers.map((item, index) => {
                    return <SplideSlide key={index}>
                        <PlayerCard key={index}
                                    player={item}
                                    favoriteView={true}
                                    inComparator={isPlayerInComparator(item)}
                                    favorite={isPlayerFavorite(item.user_id)}
                                    addPlayerToFavorites={addPlayerToFavorites}
                                    balance={true}
                                    addPlayerToComparator={addPlayerToComparator} />
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
                    return <PlayerCard key={index}
                                       player={item}
                                       favoriteView={true}
                                       inComparator={isPlayerInComparator(item)}
                                       favorite={isPlayerFavorite(item.user_id)}
                                       addPlayerToFavorites={addPlayerToFavorites}
                                       balance={true}
                                       addPlayerToComparator={addPlayerToComparator} />
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

        <section className="playersWall__compareSection siteWidthSuperNarrow siteWidthSuperNarrow--1400 d-desktop">
            {comparator.map((item, index) => {
                return <section className="playersWall__compareSection__item" key={index}>
                    {item ?  <button className="playersWall__compareSection__item__deleteBtn" onClick={() => { deleteFromComparator(item); }}>
                        <img className="btn__img" src={trashIcon} alt="usun" />
                    </button> : ""}
                    <figure className="playersWall__compareSection__item__imgWrapper">
                        {item ? <img className="playersWall__compareSection__item__img" src={item.file_path ? `${settings.API_URL}/image?url=/media/users/${item.file_path}` : profileImg} alt="porownaj-graczy" /> : ""}
                    </figure>
                    <h3 className="playersWall__compareSection__item__name">
                        {!item ? content.first_and_last_name : item.first_name + " " + item.last_name}
                    </h3>
                </section>
            })}
            <a className="button button--hover button--compare" onClick={(e) => { areThreeToCompare(e); }} href={`/porownywarka?first=${comparator[0].user_id}&second=${comparator[1].user_id}&third=${comparator[2].user_id}`}>
                <img className="btn__img" src={getImageUrl(content.img24)} alt="porownaj" />
            </a>
        </section>

        <Footer theme="dark" border={true} />
    </div>
}

export default Favorites;
