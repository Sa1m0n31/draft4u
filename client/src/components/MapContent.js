import React, {useState, useEffect, useRef, useContext} from 'react'
import poland from '../static/img/poland.svg'
import england from '../static/img/mapa-wielka-brytania.svg'
import europe from '../static/img/mapa-europa.png'
import {getAllClubs, getClubLocations} from '../helpers/club'
import { Range } from 'react-range';
import manIcon from '../static/img/woman.svg'
import womanIcon from '../static/img/man.svg'
import settings from "../settings";
import ReactSiema from 'react-siema'
import {ContentContext} from "../App";
import arrowDownBlack from '../static/img/arrow-down-black.svg'

const MapContent = () => {
    const { content, language } = useContext(ContentContext);

    const [clubs, setClubs] = useState([]);
    const [filteredClubs, setFilteredClubs] = useState([]);
    const [dots, setDots] = useState([]);
    const [filteredDots, setFilteredDots] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [currentDotClubs, setCurrentDotClubs] = useState([]);
    const [rangeValue, setRangeValue] = useState([0]);

    const [country, setCountry] = useState(0);
    const [countries, setCountries] = useState(["Polska", "Wielka Brytania"]);
    const [countryMap, setCountryMap] = useState(europe);

    const [sex, setSex] = useState([0]);
    const [league, setLeague] = useState([0]);

    const clubsWrapper = useRef(null);
    let slider = useRef(null);

    document.addEventListener("click", () => {
        hideClubsOnMap();
    });

    useEffect(() => {
        if(language === 'pl') {
            setCountries(countries?.map((item) => {
                if(item === 'Polska' || item === 'Poland') return 'Polska';
                else return 'Wielka Brytania';
            }));
        }
        else {
            setCountries(countries?.map((item) => {
                if(item === 'Polska' || item === 'Poland') return 'Poland';
                else return 'Great Britain';
            }));
        }
    }, [language]);

    const setMaleDots = () => {
        setFilteredDots(dots.filter((item) => {
            return item.leagues.split(';').findIndex((item) => {
                return parseInt(item.toString()) < 5;
            }) !== -1 && item.country === country;
        }));
    }
    const setFemaleDots = () => {
        setFilteredDots(dots.filter((item) => {
            return item.leagues.split(';').findIndex((item) => {
                return parseInt(item.toString()) > 4;
            }) !== -1 && item.country === country;
        }));
    }

    const setDotsByLeague = (gender, n) => {
        if(gender) {
            setFilteredDots(dots.filter((item) => {
                return item.leagues.split(';').findIndex((item) => {
                    return parseInt(item.toString()) === n;
                }) !== -1 && item.country === country;
            }));
        }
        else {
            setFilteredDots(dots.filter((item) => {
                return item.leagues.split(';').findIndex((item) => {
                    return parseInt(item.toString()) === n+4;
                }) !== -1 && item.country === country;
            }));
        }
    }

    useEffect(() => {
        getClubLocations()
            .then((res) => {
                const allDots = res?.data?.result?.filter((item) => {
                    return item.x !== 0 && item.y !== 0;
                });
                setDots(allDots);
                // setFilteredDots(allDots.filter((item) => {
                //     return item.leagues.split(';').findIndex((item) => {
                //         return parseInt(item.toString()) < 5;
                //     }) !== -1;
                // }));
            });

        getAllClubs()
            .then(res => {
                if(res?.data?.result) {
                    const allClubs = res.data.result.filter((item) => {
                        return item?.active && item?.file_path;
                    });
                    setClubs(allClubs);
                    setFilteredClubs(allClubs);
                    // setFilteredClubs(allClubs.filter((item) => {
                    //     return item.sex;
                    // }));
                    setLoaded(true);
                }
            });
    }, []);

    useEffect(() => {
        if(clubs.length) {
            let buttons = clubs;

            const uniqueArray = buttons.filter((item, index) => {
                return index === buttons.findIndex(obj => {
                    return obj.x === item.x && obj.y === item.y;
                });
            });
        }
    }, [clubs]);

    useEffect(() => {
        if(loaded) {
            if(window.innerWidth > 996) clubsWrapper.current.style.opacity = "0";
            if(sex[0] === 0) {
                setTimeout(() => {
                    setFilteredClubs(clubs.filter((item) => {
                        if(!league[0]) return item.sex && item.country === country;
                        else return item.sex && parseInt(item.league) === league[0] && item.country === country;
                    }));
                    if(league[0]) setDotsByLeague(1, league[0]);
                    else setMaleDots();

                    if(window.innerWidth > 996) clubsWrapper.current.style.opacity = "1";
                }, 500);
            }
            else {
                setTimeout(() => {
                    setFilteredClubs(clubs.filter((item) => {
                        if(!league[0]) return !item.sex && item.country === country;
                        else return !item.sex && parseInt(item.league) === league[0]+4 && item.country === country;
                    }));
                    if(league[0]) setDotsByLeague(0, league[0]);
                    else setFemaleDots();

                    if(window.innerWidth > 996) clubsWrapper.current.style.opacity = "1";
                }, 500);
            }
        }
    }, [sex, league, country]);

    const hideClubsOnMap = () => {
        document.querySelectorAll(".mapDot__btn").forEach((item, i, array) => {
            item.style.background = "#fff";
        });

        document.querySelectorAll(".mapDot__btn__details").forEach((item, i, array) => {
            item.style.display = "none";
        });
    }

    const showClubsOnMap = (e, index) => {
        e.stopPropagation();

        document.querySelectorAll(".mapDot__btn").forEach((item, i, array) => {
            item.style.background = "#fff";
            if(i === array.length-1) {
                document.getElementById(`mapDot-${index}`).style.background = "#E2B76D";
            }
        });

        document.querySelectorAll('.mapDot').forEach((item) => {
            item.style.zIndex = '3';
        });
        document.querySelector(`.mapDot:nth-of-type(${index+1})`).style.zIndex = '100';

        document.querySelectorAll(".mapDot__btn__details").forEach((item, i, array) => {
            item.style.display = "none";
            if(i === array.length-1) {
                document.getElementById(`mapDot__btn-${index}`).style.display = "flex";
            }
        });
    }

    const getClubsByDot = (x, y) => {
        setCurrentDotClubs(clubs.filter((item) => {
            if(item.x === x && item.y === y) {
                if(league[0]) {
                    if(sex[0] === 0) {
                        return (item.sex && item.league === league[0])
                    }
                    else {
                        return (!item.sex && item.league === league[0]+4)
                    }
                }
                else {
                    return (sex[0] === 0 && item.sex) || (sex[0] === 1 && !item.sex);
                }
            }
            else return false;
        }));
    }

    useEffect(() => {
            switch(parseInt(country)) {
                case 0:
                    setCountryMap(europe);
                    break;
                case 1:
                    setCountryMap(poland);
                    if(language === 'pl') setCountries(["Polska", "Wielka Brytania"]);
                    else setCountries(["Poland", "Great Britain"]);
                    break;
                case 2:
                    setCountryMap(england);
                    if(language === 'pl') setCountries(["Wielka Brytania", "Polska"]);
                    else setCountries(['Great Britain', 'Poland']);
                    break;
                default:
                    break;
            }
    }, [country]);

    useEffect(() => {
        setFilteredDots(dots?.filter((item) => {
            return item.country === country;
        }));
    }, [country]);

    return <main className="mapContent">
        <header className="mapContent__header">
            <h2 className="player__header">
                {content.map_header}
            </h2>
            {country ? <section className="mapContent__countrySelectWrapper">
                <button className="mapContent__countrySelect mapContent__countrySelect--main">
                    {countries[0]}
                    <img className="mapContent__countrySelect__arrow d-desktop-900" src={arrowDownBlack} alt="rozwin" />
                </button>
                <button className="mapContent__countrySelect mapContent__countrySelect--hidden" onClick={() => { setCountry(country === 1 ? 2 : 1); }}>
                    {countries[1]}
                </button>
                <button className="mapContent__countrySelect mapContent__countrySelect--hidden" onClick={() => { setCountry(0); }}>
                    {language === 'pl' ? 'Europa' : 'Europe'}
                </button>
            </section>: ""}

            {country ? <section className="mapContent__filters">
                <section className="mapContent__header__item mapContent__filters--sex">
                    <h3 className="mapContent__header__item__header">
                        {content.map_gender}
                    </h3>
                    <Range
                        step={1}
                        min={0}
                        max={1}
                        values={sex}
                        onChange={(values) => {
                            setSex(values);
                        }}
                        renderTrack={({ props, children }) => (
                            <div
                                {...props}
                                style={{
                                    ...props.style,
                                    height: '15px',
                                    width: '50px',
                                    borderRadius: '9px',
                                    backgroundColor: '#474747'
                                }}
                            >
                                {children}
                            </div>
                        )}
                        renderThumb={({ props }) => (
                            <div
                                {...props}
                                style={{
                                    ...props.style,
                                    height: '20px',
                                    outline: 'none',
                                    width: '20px',
                                    borderRadius: '50%',
                                    backgroundColor: '#fff',
                                    border: '1px solid #707070'
                                }}
                            />
                        )}
                    />
                    <aside className="mapContent__header__item__labels">
                        <img className="mapContent__header__item__labels__img" src={womanIcon} alt="damskie" />
                        <img className="mapContent__header__item__labels__img" src={manIcon} alt="meskie" />
                    </aside>
                </section>

                {country === 1 ? <section className="mapContent__header__item">
                    <h3 className="mapContent__header__item__header">
                        {content.map_leagues}
                    </h3>
                    <Range
                        step={1}
                        min={0}
                        max={100}
                        values={rangeValue}
                        onChange={(values) => {
                            const currentRange = values[0];
                            if(currentRange < 20) {
                                setRangeValue([0]);
                                setLeague([0]);
                            }
                            else if(currentRange < 40) {
                                setRangeValue([35]);
                                setLeague([1]);
                            }
                            else if(currentRange < 60) {
                                setRangeValue([56]);
                                setLeague([2]);
                            }
                            else if(currentRange < 80) {
                                setRangeValue([76]);
                                setLeague([3]);
                            }
                            else {
                                setRangeValue([100]);
                                setLeague([4]);
                            }
                        }}
                        renderTrack={({ props, children }) => (
                            <div
                                {...props}
                                style={{
                                    ...props.style,
                                    height: '15px',
                                    width: '400px',
                                    maxWidth: '100%',
                                    borderRadius: '9px',
                                    backgroundColor: '#474747'
                                }}
                            >
                                {children}
                            </div>
                        )}
                        renderThumb={({ props }) => (
                            <div
                                {...props}
                                style={{
                                    ...props.style,
                                    height: '20px',
                                    outline: 'none',
                                    width: '20px',
                                    borderRadius: '50%',
                                    backgroundColor: '#fff',
                                    border: '1px solid #707070'
                                }}
                            />
                        )}
                    />
                    <aside className="mapContent__header__item__labels">
                        <span>{language === 'pl' ? 'Wszystko' : 'All clubs'}</span>
                        <span>{sex[0] ? "Tauron Liga" : "Plus Liga"}</span>
                        <span>{content.map_league1}</span>
                        <span>{content.map_league2}</span>
                        <span>{content.map_league3}</span>
                    </aside>
                </section> : ""}
            </section> : ""}
        </header>

        <section className="mapContent__clubsWrapper">
            <section className="mapImg">
                <img className="mapImg__img" src={countryMap} alt="mapa-polski" />

                {/* Countries dots */}
                {!country ? <>
                    <section className="mapDot mapDot--poland">
                        <button className="mapDot__btn" onClick={() => { setCountry(1); }}></button>
                    </section>
                    <section className="mapDot mapDot--england">
                        <button className="mapDot__btn" onClick={() => { setCountry(2); }}></button>
                    </section>
                </> : ""}

                {filteredDots.map((item, index) => {
                    return <section className="mapDot" key={index} style={{top: `${item.y}%`, left: `${item.x}%`}}>
                        <button className="mapDot__btn" id={`mapDot-${index}`} onClick={(e) => { getClubsByDot(item.x, item.y); showClubsOnMap(e, index); }}>
                            <span className={item.x < 30 ? "mapDot__btn__details mapDot__btn__details--west" : (item.x > 70 ? "mapDot__btn__details mapDot__btn__details--east" : "mapDot__btn__details")}
                                  id={`mapDot__btn-${index}`}>
                                {/* Show club's logos */}
                                {currentDotClubs?.map((item, index) => {
                                    return <div className="mapDot__btn__details__singleClub">
                                        <figure className="mapDot__btn__details__imgWrapper" key={index}>
                                            <img className="mapDot__btn__details__img" src={`${settings.IMAGE_URL}/image?url=/media/clubs/${item.file_path}`} alt="logo" />
                                        </figure>
                                        <section className="mapDot__btn__details__data">
                                            {item.city ? <span>
                                                <b>{content.map_location}:</b> {item.city}
                                            </span> : ""}
                                            {item.nip ? <span>
                                                <b>NIP:</b> {item.nip}
                                            </span> : ""}
                                            {item.krs ? <span>
                                                <b>KRS:</b> {item.krs}
                                            </span> : ""}
                                        </section>
                                    </div>
                                })}
                            </span>
                        </button>
                    </section>
                })}
            </section>

            {/* Desktop */}
            <section className="mapContent__clubs d-desktop-900" ref={clubsWrapper}>
                {filteredClubs.length ? filteredClubs.map((item, index) => {
                    return <figure key={index} className="mapContent__clubs__imgWrapper">
                        <img className="mapContent__clubs__img" src={`${settings.IMAGE_URL}/image?url=/media/clubs/${item.file_path}`} alt={item.name} />
                    </figure>
                }) : <h3 className="noClubsHeader">
                    {content.no_clubs}
                </h3>}
            </section>

            {/* Mobile */}
            <div className="d-mobile-900 mapContent__clubs--mobile">
                <ReactSiema
                    perPage={3}
                    ref={(siema) => { slider = siema }}
                    loop={true}
                >
                    {filteredClubs.length ? filteredClubs?.map((item, index) => {
                        return <div key={index}>
                            <img className="mapContent__clubs__img" src={`${settings.IMAGE_URL}/image?url=/media/clubs/${item.file_path}`} alt={item.name} />
                        </div>
                    }) : <h2 className="noClubsHeader">
                        {content.no_clubs}
                    </h2>}
                </ReactSiema>
            </div>
        </section>
    </main>
}

export default MapContent;
