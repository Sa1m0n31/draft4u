import React, {useState, useEffect} from 'react'

import poland from '../static/img/poland.svg'
import { getAllClubs } from '../helpers/club'
import { Range, getTrackBackground } from 'react-range';
import manIcon from '../static/img/man.svg'
import womanIcon from '../static/img/women.svg'
import settings from "../settings";
import useEmblaCarousel from 'embla-carousel-react'

const MapContent = () => {
    const [clubs, setClubs] = useState([]);
    const [filteredClubs, setFilteredClubs] = useState([]);
    const [dots, setDots] = useState([]);

    const [sex, setSex] = useState([0]);
    const [league, setLeague] = useState([0]);

    const [clubCarousel, setClubCarousel] = useEmblaCarousel({
        loop: true,
        dragFree: true,
        skipSnaps: false
    });

    useEffect(() => {
        getAllClubs()
            .then(res => {
                if(res?.data?.result) {
                    console.log(res.data.result);
                    setClubs(res.data.result);
                    setFilteredClubs(res.data.result.filter((item) => {
                        return item.sex;
                    }));
                    setDots(res.data.result);
                }
            });
    }, []);

    const sortClubsByCoordinates = (a, b) => {
        console.log(a.x + " " + b.x);
        if(a.x > b.x) {
            return 1;
        }
        else if(a.x < b.x) {
            return 0;
        }
        else {
            return 1;
        }
    }

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
        if(sex[0] === 0) {
            setFilteredClubs(clubs.filter((item) => {
                return item.sex;
            }));
        }
        else {
            setFilteredClubs(clubs.filter((item) => {
                return !item.sex;
            }));
        }
    }, [sex]);

    const showClubsOnMap = (index) => {
        document.querySelectorAll(".mapDot__btn").forEach((item, i, array) => {
            item.style.background = "#fff";
            if(i === array.length-1) {
                document.getElementById(`mapDot-${index}`).style.background = "#E2B76D";
            }
        });

        document.querySelectorAll(".mapDot__btn__details").forEach((item, i, array) => {
            item.style.display = "none";
            if(i === array.length-1) {
                document.getElementById(`mapDot__btn-${index}`).style.display = "flex";
            }
        });
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
                        max={3}
                        values={league}
                        onChange={(values) => {
                            setLeague(values);

                        }}
                        renderTrack={({ props, children }) => (
                            <div
                                {...props}
                                style={{
                                    ...props.style,
                                    height: '15px',
                                    width: '350px',
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
                        <span>Plus Liga</span>
                        <span>1. Liga</span>
                        <span>2. Liga</span>
                    </aside>
                </section>
            </section>
        </header>

        <section className="mapContent__clubsWrapper">
            <section className="mapImg">
                <img className="mapImg__img" src={poland} alt="mapa-polski" />

                {dots.map((item, index) => {
                    return <section className="mapDot" key={index} style={{top: `${item.y}%`, left: `${item.x}%`}}>
                        <button className="mapDot__btn" id={`mapDot-${index}`} onClick={() => { showClubsOnMap(index); }}>
                            <span className="mapDot__btn__details" id={`mapDot__btn-${index}`}>
                                {/* Show club's logos */}
                            </span>
                        </button>
                    </section>
                })}
            </section>

            <section className="mapContent__clubs d-desktop-900">
                {filteredClubs.map((item, index) => {
                    return <figure key={index}>
                        <img className="mapContent__clubs__img" src={`${settings.API_URL}/image?url=/media/clubs/${item.file_path}`} alt={item.name} />
                    </figure>
                })}
            </section>
            <div className="d-mobile-900-flex">
                <div className="d-mobile-900-flex" ref={clubCarousel}>
                    <div>
                        {filteredClubs.map((item, index) => {
                            return <div key={index}>
                                <img className="mapContent__clubs__img" src={`${settings.API_URL}/image?url=/media/clubs/${item.file_path}`} alt={item.name} />
                            </div>
                        })}
                    </div>
                </div>
            </div>
        </section>
    </main>
}

export default MapContent;
