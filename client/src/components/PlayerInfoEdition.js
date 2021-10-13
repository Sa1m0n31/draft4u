import React, {useState, useEffect, useRef} from 'react'
import pen from "../static/img/pen.svg";

import check from "../static/img/check.svg";
import {
    getAllPositions,
    updateUserAttackRange,
    updateUserBlockRange,
    updateUserHeight, updateUserPosition,
    updateUserVerticalRange,
    updateUserWeight
} from "../helpers/user";

import Chart from "react-apexcharts";

const PlayerInfoEdition = ({player}) => {
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

    const chartRef = useRef(null);

    useEffect(() => {
        getAllPositions()
            .then(res => {
                setPositions(res?.data?.result);
            });
    }, []);

    useEffect(() => {
        const div = document.createElement("div");
        div.textContent = "test";
       document.querySelector(".apexcharts-grid").appendChild(div);
    }, [height]);

    useEffect(() => {
        console.log(player.vertical_range);
        setAttackRange(player.attack_range);
        setVerticalRange(player.vertical_range);
        setBlockRange(player.block_range);
        setWeight(player.weight);
        setHeight(player.height);
        setPosition(player.name);
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
            categories: [`Wzrost`, "Waga", "Zasięg w ataku", "Zasięg dosiężny", "Zasięg w bloku"],
            labels: {
                show: true,
                style: {
                    colors: ["#3d3d3d", "#3d3d3d", "#3d3d3d", "#3d3d3d", "#3d3d3d", "#3d3d3d"],
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
                    strokeColors: '#3d3d3d',
                    fill: {
                        colors: ['#3d3d3d']
                    }
                }
            }
        },
        yaxis: {
            show: false
        }
        // dataLabels: {
        //     enabled: true,
        //     textAnchor: 'end',
        //     offsetY: 50,
        //     distributed: true
        // }
    }

    const series = [
        {
            name: "Twój wynik",
            data: [height, weight, attackRange, verticalRange, blockRange]
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

    return <section className="playerInfoEdition siteWidthSuperNarrow">
        <section className="userInfoEdition__form">
            <label className="userInfoEdition__form__field">
                <span className="userInfoEdition__key">
                    Zasięg w ataku
                </span>
                <span className="userInfoEdition__value">
                    <label className={editAttackRange ? "label--edit" : ""}>
                        <input value={attackRange ? attackRange : 0}
                               type="number"
                               onChange={(e) => { setAttackRange(e.target.value); }}
                               disabled={!editAttackRange}
                               max={400}
                               className="input--editProfile"
                               name="attackRange" />
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
                    Zasięg dosiężny
                </span>
                <span className="userInfoEdition__value">
                    <label className={editVerticalRange ? "label--edit" : ""}>
                        <input value={verticalRange ? verticalRange : 0}
                               type="number"
                               onChange={(e) => { setVerticalRange(e.target.value); }}
                               disabled={!editVerticalRange}
                               className="input--editProfile"
                               max={400}
                               name="verticalRange" />
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
                        <input value={blockRange ? blockRange : 0}
                               type="number"
                               onChange={(e) => { setBlockRange(e.target.value); }}
                               disabled={!editBlockRange}
                               className="input--editProfile"
                               max={400}
                               name="blockRange" />
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
                        <input value={height ? height : 0}
                               type="number"
                               onChange={(e) => { setHeight(e.target.value); }}
                               disabled={!editHeight}
                               className="input--editProfile"
                               max={300}
                               name="height" />
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
                        <input value={weight ? weight : 0}
                               type="number"
                               onChange={(e) => { setWeight(e.target.value); }}
                               disabled={!editWeight}
                               className="input--editProfile"
                               max={200}
                               name="weight" />
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
                                                onChange={(e) => { console.log(e.target); setPosition(e.target.value); }}
                        >
                            {positions?.map((item, index) => {
                                return <option value={item.name} key={index}>
                                    {item.name}
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
