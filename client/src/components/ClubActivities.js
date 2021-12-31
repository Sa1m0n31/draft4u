import React, {useEffect, useState} from 'react'
import {getUserFavorites, getUserVisited} from "../helpers/user";
import headerImg from '../static/img/aktywnosci-klubu.jpg'
import settings from "../settings";

const ClubActivities = () => {
    const [visitors, setVisitors] = useState([]);
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        getUserVisited()
            .then((res) => {
                setVisitors(res?.data?.result);
            });

        getUserFavorites()
            .then((res) => {
                setFavorites(res?.data?.result);
            });
    }, []);

    return <section className="clubActivities siteWidthSuperNarrow">
        <figure className="clubActivities__imgHeader">
            <img className="btn__img" src={headerImg} alt="aktywnosci-klubow" />
        </figure>
        <h3 className="clubActivities__subheader">
            Twój profil odwiedzili
        </h3>
        <section className="clubActivities__list">
            {visitors.length ? visitors.map((item, index) => {
                return <img key={index} className="clubActivities__img" src={`${settings.API_URL}/image?url=/media/clubs/${item.file_path}`} alt="klub" />
            }) : <h3 className="clubActivities__empty">
                Póki co nikt nie odwiedził Twojego profilu...
            </h3>}
        </section>

        <h3 className="clubActivities__subheader">
            Twój profil polubili
        </h3>
        <section className="clubActivities__list">
            {favorites.length ? favorites.map((item, index) => {
                return <img key={index} className="clubActivities__img" src={`${settings.API_URL}/image?url=/media/clubs/${item.file_path}`} alt="klub" />
            }) : <h3 className="clubActivities__empty">
                Póki co nikt nie polubił Twojego profilu...
            </h3> }
        </section>

    </section>
}

export default ClubActivities;
