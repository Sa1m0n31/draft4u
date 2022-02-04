import React, { useEffect, useState, useRef } from 'react'
import ReactSiema from 'react-siema'
import settings from "../settings";
import {getAllClubs} from "../helpers/club";

const ClubSlider = () => {
    const [logos, setLogos] = useState([]);
    const [randomized, setRandomized] = useState(false);

    let slider = useRef(null);

    useEffect(() => {
        /* Get club's logos */
        getAllClubs()
            .then((res) => {
                const result = res?.data?.result;
                if(result) {
                    const arrToConcat = shuffleArray(result.filter((item) => {
                        return item.active;
                    }).map((item) => {
                        return item.file_path;
                    }));
                    for(let i=0; i<10; i++) {
                        setLogos(prevState => {
                            return prevState.concat(arrToConcat);
                        });
                    }
                }
            });

        /* Initialize carousel */
        carouselInit(slider);
    }, []);

    const carouselInit = (slider) => {
        setInterval(() => {
            if(slider) {
                slider.next();
            }
        }, 4000);
    }

    const shuffleArray = (arr) => {
        let array = arr;
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    return <section className="clubCarousel">
        <main className="clubCarousel__inner">
            <h3 className="clubCarousel__header">
                Kluby
            </h3>
            <ReactSiema perPage={{
                100: 3,
                1400: 4
            }}
                        ref={(siema) => { slider = siema }}
                        loop={true}>
                {logos?.map((item, index) => {
                    return <figure className="clubCarousel__item" key={index}>
                        <img className="clubCarousel__item__img" src={`${settings.API_URL}/image?url=/media/clubs/${item}`} alt="logo" />
                    </figure>
                })}
            </ReactSiema>
        </main>
    </section>
}

export default ClubSlider;
