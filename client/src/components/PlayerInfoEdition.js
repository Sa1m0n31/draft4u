import React, {useState, useEffect, useRef} from 'react'
import pen from "../static/img/pen.svg";

import check from "../static/img/save-parameter.svg";
import {
    getAllPositions,
    updateUserAttackRange,
    updateUserBlockRange,
    updateUserHeight, updateUserPosition,
    updateUserVerticalRange,
    updateUserWeight
} from "../helpers/user";

import Chart from "react-apexcharts";
import {unicodeToUTF8} from "../helpers/others";

const PlayerInfoEdition = ({player, theme}) => {
    const [editAttackRange, setEditAttackRange] = useState(false);
    const [editVerticalRange, setEditVerticalRange] = useState(false);
    const [editBlockRange, setEditBlockRange] = useState(false);
    const [editHeight, setEditHeight] = useState(false);
    const [editWeight, setEditWeight] = useState(false);
    const [editPosition, setEditPosition] = useState(false);

    const [attackRange, setAttackRange] = useState(null);
    const [verticalRange, setVerticalRange] = useState(null);
    const [blockRange, setBlockRange] = useState(null);
    const [weight, setWeight] = useState(null);
    const [height, setHeight] = useState(null);
    const [position, setPosition] = useState(null);

    const [positions, setPositions] = useState([]);

    const attackRangeRef = useRef(null);
    const verticalRangeRef = useRef(null);
    const blockRangeRef = useRef(null);
    const heightRef = useRef(null);
    const weightRef = useRef(null);

    useEffect(() => {
        getAllPositions()
            .then(res => {
                setPositions(res?.data?.result?.map((item) => {
                    return unicodeToUTF8(item.name);
                }));
            });
    }, []);

    useEffect(() => {
        const div = document.createElement("div");
        div.textContent = "test";
        document.querySelector(".apexcharts-grid").appendChild(div);
    }, [height]);

    useEffect(() => {
        setAttackRange(player.attack_range);
        setVerticalRange(player.vertical_range);
        setBlockRange(player.block_range);
        setWeight(player.weight);
        setHeight(player.height);
        if(player.name) setPosition(unicodeToUTF8(player.name));
    }, [player]);

    const options = {
        chart: {
            id: "basic-bar"
        },
        responsive: [
            {
              breakpoint: 1400,
              options: {
                  chart: {
                      width: 800
                  }
              }
            },
            {
                breakpoint: 958,
                options: {
                    chart: {
                        width: 700
                    },
                    xaxis: {
                        labels: {
                            style: {
                                fontSize: '13px'
                            }
                        }
                    }
                }
            },
            {
                breakpoint: 576,
                options: {
                    chart: {
                        width: 500
                    },
                    xaxis: {
                        labels: {
                            style: {
                                fontSize: '10px'
                            }
                        }
                    }
                }
            }
        ],
        xaxis: {
            categories: [`Wzrost`, "Waga", "Zasięg w ataku", "Wyskok dosiężny", "Zasięg w bloku"],
            labels: {
                show: true,
                style: {
                    colors: theme === 'dark' ? ["#fff", "#fff", "#fff", "#fff", "#fff", "#fff"] : ["#3d3d3d", "#3d3d3d", "#3d3d3d", "#3d3d3d", "#3d3d3d", "#3d3d3d"],
                    fontSize: "18px",
                    fontFamily: 'Arial'
                }
            }
        },
        fill: {
            colors: ['#D9AA66'],
            opacity: 1
        },
        stroke: {
            show: false
        },
        markers: {
            colors: "#fff",
            strokeColors: "#fff",
            size: 2
        },
        plotOptions: {
            radar: {
                polygons: {
                    connectorColors: 'rgba(255, 255, 255, .3)',
                    strokeColors: theme === 'dark' ? ['#fff', '#282828', '#282828', '#fff'] : '#3d3d3d',
                    fill: {
                        colors: theme === 'dark' ? ['#282828'] : ['#3d3d3d']
                    }
                }
            }
        },
        yaxis: {
            show: false
        }
    }

    const series = [
        {
            name: theme === 'dark' ? 'Wynik' : "Twój wynik",
            data: [height, weight * 2.1, attackRange, verticalRange * 2.5, blockRange]
        }
    ]

    const changeUserAttackRange = () => {
        setEditAttackRange(false);
        updateUserAttackRange(attackRange);
    }

    const changeUserVerticalRange = () => {
        setEditVerticalRange(false);
        updateUserVerticalRange(verticalRange);
    }

    const changeUserBlockRange = () => {
        setEditBlockRange(false);
        updateUserBlockRange(blockRange);
    }

    const changeUserWeight = () => {
        setEditWeight(false);
        updateUserWeight(weight);
    }

    const changeUserHeight = () => {
        setEditHeight(false);
        updateUserHeight(height);
    }

    const changeUserPosition = () => {
        setEditPosition(false);
        updateUserPosition(position);
    }

    useEffect(() => {
        if(editBlockRange) {
            blockRangeRef.current.focus();
            blockRangeRef.current.select();
        }
    }, [editBlockRange]);

    useEffect(() => {
        if(editVerticalRange) {
            verticalRangeRef.current.focus();
            verticalRangeRef.current.select();
        }
    }, [editVerticalRange]);

    useEffect(() => {
        if(editAttackRange) {
            attackRangeRef.current.focus();
            attackRangeRef.current.select();
        }
    }, [editAttackRange]);

    useEffect(() => {
        if(editHeight) {
            heightRef.current.focus();
            heightRef.current.select();
        }
    }, [editHeight]);

    useEffect(() => {
        if(weightRef) {
            weightRef.current.focus();
            weightRef.current.select();
        }
    }, [editWeight]);

    return <section className="playerInfoEdition siteWidthSuperNarrow">
        <section className={theme === 'dark' ? "userInfoEdition__form userInfoEdition__form--dark" : "userInfoEdition__form"}>
            <label className="userInfoEdition__form__field">
                <span className="userInfoEdition__key">
                    Zasięg w ataku
                </span>
                <span className="userInfoEdition__value">
                    <label className={editAttackRange ? "label--edit" : ""}>
                        <input value={attackRange ? attackRange : (attackRange !== '' ? 0 : '')}
                               type="number"
                               ref={attackRangeRef}
                               onKeyDown={(e) => { if(e.keyCode === 13) changeUserAttackRange(); }}
                               onChange={(e) => { setAttackRange(prevState => {
                                   if(e.target.value?.toString()?.length > 3) return prevState;
                                   else return e.target.value;
                               }); }}
                               disabled={!editAttackRange}
                               max={400}
                               className="input--editProfile"
                               name="attackRange" /> cm
                        {!editAttackRange ? <button className="userInfoEdition__btn" onClick={() => { setEditAttackRange(true); }}>
                            <img className="userInfoEdition__btn__img" src={pen} alt="edytuj" />
                        </button> : <button className="userInfoEdition__btn" onClick={() => { changeUserAttackRange(); }}>
                            <img className="userInfoEdition__btn__img" src={check} alt="ok" />
                        </button>}
                    </label>
                </span>
            </label>
            <label className="userInfoEdition__form__field">
                <span className="userInfoEdition__key">
                    Wyskok dosiężny
                </span>
                <span className="userInfoEdition__value">
                    <label className={editVerticalRange ? "label--edit" : ""}>
                        <input value={verticalRange ? verticalRange : (verticalRange === '' ? '' : 0)}
                               type="number"
                               ref={verticalRangeRef}
                               onKeyDown={(e) => { if(e.keyCode === 13) changeUserVerticalRange(); }}
                               onChange={(e) => { setVerticalRange(prevState => {
                                   if(e.target.value?.toString()?.length > 3) return prevState;
                                   else return e.target.value;
                               }); }}
                               disabled={!editVerticalRange}
                               className="input--editProfile"
                               max={400}
                               name="verticalRange" /> cm
                        {!editVerticalRange ? <button className="userInfoEdition__btn" onClick={() => { setEditVerticalRange(true); }}>
                            <img className="userInfoEdition__btn__img" src={pen} alt="edytuj" />
                        </button> : <button className="userInfoEdition__btn" onClick={() => { changeUserVerticalRange(); }}>
                            <img className="userInfoEdition__btn__img" src={check} alt="ok" />
                        </button>}
                    </label>
                </span>
            </label>
            <label className="userInfoEdition__form__field">
                <span className="userInfoEdition__key">
                    Zasięg w bloku
                </span>
                <span className="userInfoEdition__value">
                    <label className={editBlockRange ? "label--edit" : ""}>
                        <input value={blockRange ? blockRange : (blockRange === '' ? '' : 0)}
                               type="number"
                               ref={blockRangeRef}
                               onKeyDown={(e) => { if(e.keyCode === 13) changeUserBlockRange(); }}
                               onChange={(e) => { setBlockRange(prevState => {
                                   if(e.target.value?.toString()?.length > 3) return prevState;
                                   else return e.target.value;
                               }); }}
                               disabled={!editBlockRange}
                               className="input--editProfile"
                               max={400}
                               name="blockRange" /> cm
                        {!editBlockRange ? <button className="userInfoEdition__btn" onClick={() => { setEditBlockRange(true); }}>
                            <img className="userInfoEdition__btn__img" src={pen} alt="edytuj" />
                        </button> : <button className="userInfoEdition__btn" onClick={() => { changeUserBlockRange(); }}>
                            <img className="userInfoEdition__btn__img" src={check} alt="ok" />
                        </button>}
                    </label>
                </span>
            </label>
            <label className="userInfoEdition__form__field">
                <span className="userInfoEdition__key">
                    Wzrost
                </span>
                <span className="userInfoEdition__value">
                    <label className={editHeight ? "label--edit" : 0}>
                        <input value={height ? height : (height === '' ? '' : 0)}
                               type="number"
                               ref={heightRef}
                               onKeyDown={(e) => { if(e.keyCode === 13) changeUserHeight(); }}
                               onChange={(e) => { setHeight(prevState => {
                                   if(e.target.value?.toString()?.length > 3) return prevState;
                                   else return e.target.value;
                               }); }}
                               disabled={!editHeight}
                               className="input--editProfile"
                               max={300}
                               name="height" /> cm
                        {!editHeight ? <button className="userInfoEdition__btn" onClick={() => { setEditHeight(true); }}>
                            <img className="userInfoEdition__btn__img" src={pen} alt="edytuj" />
                        </button> : <button className="userInfoEdition__btn" onClick={() => { changeUserHeight(); }}>
                            <img className="userInfoEdition__btn__img" src={check} alt="ok" />
                        </button>}
                    </label>
                </span>
            </label>
            <label className="userInfoEdition__form__field">
                <span className="userInfoEdition__key">
                    Waga
                </span>
                <span className="userInfoEdition__value">
                    <label className={editWeight ? "label--edit" : 0}>
                        <input value={weight ? weight : (weight === '' ? '' : 0)}
                               type="number"
                               ref={weightRef}
                               onKeyDown={(e) => { if(e.keyCode === 13) changeUserWeight(); }}
                               onChange={(e) => { setWeight(prevState => {
                                   if(e.target.value?.toString()?.length > 3) return prevState;
                                   else return e.target.value;
                               }); }}
                               disabled={!editWeight}
                               className="input--editProfile"
                               max={200}
                               name="weight" /> kg
                        {!editWeight ? <button className="userInfoEdition__btn" onClick={() => { setEditWeight(true); }}>
                            <img className="userInfoEdition__btn__img" src={pen} alt="edytuj" />
                        </button> : <button className="userInfoEdition__btn" onClick={() => { changeUserWeight(); }}>
                            <img className="userInfoEdition__btn__img" src={check} alt="ok" />
                        </button>}
                    </label>
                </span>
            </label>
            <label className="userInfoEdition__form__field">
                <span className="userInfoEdition__key">
                    Pozycja na boisku
                </span>
                <span className="userInfoEdition__value">
                    <label className={editPosition ? "label--edit" : ""}>
                        {editPosition ? <select className="select--editProfile"
                                                disabled={!editPosition}
                                                value={position}
                                                onChange={(e) => { setPosition(e.target.value); }}
                        >
                            {positions?.map((item, index) => {
                                return <option value={item} key={index}>
                                    {item}
                                </option>
                            })}
                        </select> : <input className="input--editProfile"
                                           disabled={true}
                                           value={position ? position : "-"} />}

                        {!editPosition ? <button className="userInfoEdition__btn userInfoEdition__btn--position" onClick={() => { setEditPosition(true); }}>
                            <img className="userInfoEdition__btn__img" src={pen} alt="edytuj" />
                        </button> : <button className="userInfoEdition__btn" onClick={() => { changeUserPosition(); }}>
                            <img className="userInfoEdition__btn__img" src={check} alt="ok" />
                        </button>}
                    </label>
                </span>
            </label>
        </section>

        <section className="userInfoEdition__graphSection" id="playerGraph">
            <Chart
                options={options}
                series={series}
                type="radar"
                width="900"
            />
        </section>
    </section>
}

export default PlayerInfoEdition;
