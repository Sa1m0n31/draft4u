import React, { useEffect, useState, useRef } from 'react'
import ReactSiema from 'react-siema'

import logo1 from '../static/img/zzaksa.png';
import logo2 from '../static/img/jw.png';
import {getClubs} from "../helpers/admin";
import settings from "../settings";

const ClubSlider = () => {
    const [logos, setLogos] = useState([]);

    let slider = useRef(null);

    useEffect(() => {
        /* Get club's logos */
        getClubs()
            .then((res) => {
                const result = res?.data?.result;
                if(result) {
                    if(result.length > 3) {
                        for(let i=0; i<10; i++) {
                            setLogos(prevState => {
                                return prevState.concat(result.map((item) => {
                                    return item.file_path;
                                }));
                            })
                        }
                    }
                    else {
                        setLogos(result.map((item) => {
                            return item.file_path;
                        }));
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
                        <img className="clubCarousel__item__img" src={`${settings.API_URL}/image?url=/media/users/${item}`} alt="logo-klubu" />
                    </figure>
                })}
            </ReactSiema>
        </main>
    </section>
}

export default ClubSlider;
