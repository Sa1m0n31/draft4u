import React from 'react'

import zaksa from '../static/img/zzaksa.png'

const ClubActivities = () => {
    const clubs = [
        zaksa, zaksa, zaksa, zaksa, zaksa, zaksa
    ]

    return <section className="clubActivities siteWidthSuperNarrow">
        <h2 className="clubActivities__header">
            Aktywność klubów
        </h2>
        <h3 className="clubActivities__subheader">
            Twój profil odwiedzili
        </h3>
        <section className="clubActivities__list">
            {clubs.map((item, index) => {
                return <img key={index} className="clubActivities__img" src={item} alt="klub" />
            })}
        </section>

        <h3 className="clubActivities__subheader">
            Twój profil polubili
        </h3>
        <section className="clubActivities__list">
            {clubs.map((item, index) => {
                return <img key={index} className="clubActivities__img" src={item} alt="klub" />
            })}
        </section>

    </section>
}

export default ClubActivities;
