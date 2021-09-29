import React, {useState, useEffect} from 'react'

import poland from '../static/img/poland.svg'
import { getAllClubs } from '../helpers/club'

const MapContent = () => {
    const [clubs, setClubs] = useState([]);
    const [dots, setDots] = useState([]);

    useEffect(() => {
        getAllClubs()
            .then(res => {
                if(res?.data?.result) {
                    console.log(res.data.result);
                    setClubs(res.data.result);
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

            // setDots(buttons.filter((item, index) => {
            //     return index === buttons.findIndex(obj => {
            //         return obj.x === item.x && obj.y === item.y;
            //     });
            // }));

            // console.log(clubs);
            // clubs.forEach((clubItem) => {
            //     if(buttons.length) {
            //         buttons.forEach((btnItem, index, array) => {
            //             console.log(clubItem.x + " " + clubItem.y + " vs " + btnItem.x + " " + btnItem.y);
            //             if((clubItem.x === btnItem.x)&&(clubItem.y === btnItem.y)) {
            //                 console.log("duplicate");
            //                 return 0;
            //             }
            //             if(index === array.length - 1) {
            //                 console.log("add new: " + clubItem.x + " " + clubItem.y);
            //                 buttons.push({
            //                     x: clubItem.x,
            //                     y: clubItem.y
            //                 });
            //             }
            //         });
            //         console.log("end");
            //         console.log(buttons);
            //     }
            //     else {
            //         buttons.push({
            //             x: clubItem.x,
            //             y: clubItem.y
            //         })
            //     }
            // });
            //
            // console.log(buttons);
        }
    }, [clubs]);

    return <main className="mapContent">
        <header className="mapContent__header">
            <h2 className="player__header">
                Nasze drużyny
            </h2>
        </header>

        <section className="mapImg">
            <img className="mapImg__img" src={poland} alt="mapa-polski" />

            {dots.map((item, index) => {
                console.log(item);
                return <section className="mapDot" key={index} style={{top: `${item.y}%`, left: `${item.x}%`}}>
                    <button className="mapDot__btn">

                    </button>
                </section>
            })}
        </section>
    </main>
}

export default MapContent;
