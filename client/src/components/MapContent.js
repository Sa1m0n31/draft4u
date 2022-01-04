import React, {useState, useEffect, useRef} from 'react'

import poland from '../static/img/poland.svg'
import {getAllClubs, getClubLocations} from '../helpers/club'
import { Range, getTrackBackground } from 'react-range';
import manIcon from '../static/img/woman.svg'
import womanIcon from '../static/img/man.svg'
import settings from "../settings";
import ReactSiema from 'react-siema'

const MapContent = () => {
    const [clubs, setClubs] = useState([]);
    const [filteredClubs, setFilteredClubs] = useState([]);
    const [dots, setDots] = useState([]);
    const [filteredDots, setFilteredDots] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [currentDotClubs, setCurrentDotClubs] = useState([]);
    const [rangeValue, setRangeValue] = useState([0]);

    const [sex, setSex] = useState([0]);
    const [league, setLeague] = useState([0]);

    const clubsWrapper = useRef(null);
    let slider = useRef(null);

    document.addEventListener("click", () => {
        hideClubsOnMap();
    });

    const setMaleDots = () => {
        setFilteredDots(dots.filter((item) => {
            return item.leagues.split(';').findIndex((item) => {
                return parseInt(item.toString()) < 5;
            }) !== -1;
        }));
    }
    const setFemaleDots = () => {
        setFilteredDots(dots.filter((item) => {
            return item.leagues.split(';').findIndex((item) => {
                return parseInt(item.toString()) > 4;
            }) !== -1;
        }));
    }

    const setDotsByLeague = (gender, n) => {
        if(gender) {
            setFilteredDots(dots.filter((item) => {
                return item.leagues.split(';').findIndex((item) => {
                    return parseInt(item.toString()) === n;
                }) !== -1;
            }));
        }
        else {
            setFilteredDots(dots.filter((item) => {
                return item.leagues.split(';').findIndex((item) => {
                    return parseInt(item.toString()) === n+4;
                }) !== -1;
            }));
        }
    }

    useEffect(() => {
        getClubLocations()
            .then((res) => {
                const allDots = res?.data?.result;
                setDots(allDots);
                setFilteredDots(allDots.filter((item) => {
                    return item.leagues.split(';').findIndex((item) => {
                        return parseInt(item.toString()) < 5;
                    }) !== -1;
                }));
            });

        getAllClubs()
            .then(res => {
                if(res?.data?.result) {
                    const allClubs = res.data.result.filter((item) => {
                        return item?.active;
                    });
                    setClubs(allClubs);
                    setFilteredClubs(allClubs.filter((item) => {
                        return item.sex;
                    }));
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
                        if(!league[0]) return item.sex;
                        else return item.sex && parseInt(item.league) === league[0];
                    }));
                    if(league[0]) setDotsByLeague(1, league[0]);
                    else setMaleDots();

                    if(window.innerWidth > 996) clubsWrapper.current.style.opacity = "1";
                }, 500);
            }
            else {
                setTimeout(() => {
                    setFilteredClubs(clubs.filter((item) => {
                        if(!league[0]) return !item.sex;
                        else return !item.sex && parseInt(item.league) === league[0]+4;
                    }));
                    if(league[0]) setDotsByLeague(0, league[0]);
                    else setFemaleDots();

                    if(window.innerWidth > 996) clubsWrapper.current.style.opacity = "1";
                }, 500);
            }
        }
    }, [sex, league]);

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

    return <main className="mapContent">
        <header className="mapContent__header">
            <h2 className="player__header">
                Nasze drużyny
            </h2>

            <section className="mapContent__filters">
                <section className="mapContent__header__item">
                    <h3 className="mapContent__header__item__header">
                        Płeć
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

                <section className="mapContent__header__item">
                    <h3 className="mapContent__header__item__header">
                        Liga
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
                        <span>Wszystkie</span>
                        <span>{sex[0] ? "Tauron Liga" : "Plus Liga"}</span>
                        <span>1. Liga</span>
                        <span>2. Liga</span>
                        <span>3. Liga</span>
                    </aside>
                </section>
            </section>
        </header>

        <section className="mapContent__clubsWrapper">
            <section className="mapImg">
                <img className="mapImg__img" src={poland} alt="mapa-polski" />

                {filteredDots.map((item, index) => {
                    return <section className="mapDot" key={index} style={{top: `${item.y}%`, left: `${item.x}%`}}>
                        <button className="mapDot__btn" id={`mapDot-${index}`} onClick={(e) => { getClubsByDot(item.x, item.y); showClubsOnMap(e, index); }}>
                            <span className={item.x < 30 ? "mapDot__btn__details mapDot__btn__details--west" : (item.x > 70 ? "mapDot__btn__details mapDot__btn__details--east" : "mapDot__btn__details")}
                                  id={`mapDot__btn-${index}`}>
                                {/* Show club's logos */}
                                {currentDotClubs?.map((item, index) => {
                                    return <div className="mapDot__btn__details__singleClub">
                                        <figure className="mapDot__btn__details__imgWrapper" key={index}>
                                            <img className="mapDot__btn__details__img" src={`${settings.API_URL}/image?url=/media/clubs/${item.file_path}`} alt="logo" />
                                        </figure>
                                        <section className="mapDot__btn__details__data">
                                            {item.city ? <span>
                                                <b>Siedziba:</b> {item.city}
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
                        <img className="mapContent__clubs__img" src={`${settings.API_URL}/image?url=/media/clubs/${item.file_path}`} alt={item.name} />
                    </figure>
                }) : <h3 className="noClubsHeader">
                    Brak klubów
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
                            <img className="mapContent__clubs__img" src={`${settings.API_URL}/image?url=/media/clubs/${item.file_path}`} alt={item.name} />
                        </div>
                    }) : <h2 className="noClubsHeader">
                        Brak klubów
                    </h2>}
                </ReactSiema>
            </div>
        </section>
    </main>
}

export default MapContent;
