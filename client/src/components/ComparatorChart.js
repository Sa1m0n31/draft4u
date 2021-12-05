import React, {useEffect} from 'react'
import Chart from "react-apexcharts";

const ComparatorChart = ({datasets}) => {
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
                    colors: ['rgba(255, 255, 255, .8)', 'rgba(255, 255, 255, .8)', 'rgba(255, 255, 255, .8)', 'rgba(255, 255, 255, .8)', 'rgba(255, 255, 255, .8)'],
                    fontSize: "26px",
                    fontFamily: 'Arial'
                }
            }
        },
        fill: {
            colors: ['#EE7700AD', '#D4C289', '#A9A9A9'],
            opacity: .7
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
    }

    const series = [
        {
            name: datasets[0].first_name + " " + datasets[0].last_name,
            data: [datasets[0].height, datasets[0].weight, datasets[0].attack_range, datasets[0].vertical_range, datasets[0].block_range]
        },
        {
            name: datasets[1].first_name + " " + datasets[1].last_name,
            data: [datasets[1].height, datasets[1].weight, datasets[1].attack_range, datasets[1].vertical_range, datasets[1].block_range]
        },
        {
            name: datasets[2].first_name + " " + datasets[2].last_name,
            data: [datasets[2].height, datasets[2].weight, datasets[2].attack_range, datasets[2].vertical_range, datasets[2].block_range]
        }
    ]

    useEffect(() => {
        console.log(datasets);
    }, []);

    return <section className="comparator__chart d-desktop">
        <Chart
            options={options}
            series={series}
            type="radar"
            width="1300"
        />
    </section>
}

export default ComparatorChart;
