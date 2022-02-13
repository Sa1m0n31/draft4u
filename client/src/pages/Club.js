import React, {useContext} from 'react'
import Header from "../components/Header";
import Footer from "../components/Footer";
import header from '../static/img/header-klub.jpg'
import img1 from '../static/img/strefa-zawodnika-1.png'
import img2 from '../static/img/strefa-klubowa-2.png'
import img3 from '../static/img/strefa-zawodnika-2.png'
import img4 from '../static/img/klub-porownywarka.png'
import img5 from '../static/img/czat.png'
import PlayerFAQ from "../components/PlayerFAQ";
import ClubForm from "../components/ClubForm";
import {ContentContext} from "../App";
import {getImageUrl} from "../helpers/others";

const Club = () => {
    const { content } = useContext(ContentContext);

    return <div className="container container--dark container--club">
        <Header theme="dark" menu="light" clubPage={true} />
        <main className="club">
            <figure className="player__firstImgWrapper">
                <img className="player__firstImgWrapper__img" src={getImageUrl(content.img3)} alt="draft4u" />
            </figure>

            <section className="player__section player__flex player__flex--section player__section--1 club__section">
                <figure className="player__flex__imgWrapper player__flex__imgWrapper--phone">
                    <img className="player__flex__img" src={img1} alt="widok" />
                </figure>

                <article className="player__flex__content">
                    <h2 className="player__header">
                        {content.club_zone_header1}
                    </h2>
                    <p className="player__flex__text">
                        {content.club_zone_text1}
                    </p>
                </article>
            </section>

            <section className="player__section player__flex player__flex--section player__section--1 club__section">
                <article className="player__flex__content">
                    <h2 className="player__header">
                        {content.club_zone_header2}
                    </h2>
                    <p className="player__flex__text player__flex__text--marginRight">
                        {content.club_zone_text2}
                    </p>
                </article>

                <figure className="player__flex__imgWrapper">
                    <img className="player__flex__img player__flex__imgWrapper--clubImg2" src={img4} alt="widok" />
                </figure>
            </section>

            <section className="player__section player__flex player__flex--section player__section--1 club__section club__section--beforeChat">
                <figure className="player__flex__imgWrapper">
                    <img className="player__flex__img player__flex__imgWrapper--clubImg3" src={img3} alt="widok" />
                </figure>

                <article className="player__flex__content">
                    <h2 className="player__header">
                        {content.club_zone_header3}
                    </h2>
                    <p className="player__flex__text">
                        {content.club_zone_text3}
                    </p>
                </article>
            </section>

            <section className="player__section player__flex player__flex--section player__section--1 club__section player__flex--section--chat">
                <article className="player__flex__content player__flex__content--chat">
                    <h2 className="player__header">
                        {content.club_zone_header4}
                    </h2>
                    <p className="player__flex__text">
                        {content.club_zone_text4}
                    </p>
                </article>

                <figure className="player__flex__imgWrapper player__flex__imgWrapper--chat">
                    <img className="player__flex__img player__flex__imgWrapper--clubImg3" src={img5} alt="widok" />
                </figure>
            </section>

            <section className="player__section player__flex player__flex--section player__section--1 club__section">
                <figure className="player__flex__imgWrapper">
                    <img className="player__flex__img player__flex__imgWrapper--clubImg2" src={img2} alt="widok" />
                </figure>

                <article className="player__flex__content">
                    <h2 className="player__header">
                        {content.club_zone_header5}
                    </h2>
                    <p className="player__flex__text">
                        {content.club_zone_text5}
                    </p>
                </article>
            </section>

            <ClubForm />

            <PlayerFAQ />
        </main>
        <Footer theme="dark" border={true} />
    </div>
}

export default Club;
