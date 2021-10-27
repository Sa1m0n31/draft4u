import React, {useEffect, useState} from 'react'
import profile from '../static/img/profile-picture.png'

import heart from '../static/img/heart.svg'
import heartFilled from '../static/img/heart-filled.svg'
import balance from '../static/img/balance.svg'
import writeMsgBtn from '../static/img/napisz-wiadomosc.png'
import {getUserById, getUserData} from "../helpers/user";
import {calculateAge, getPositionById} from "../helpers/others";
import settings from "../settings";

const ComparedPlayer = ({player, color}) => {
    return <section className="comparedPlayer">
        <figure className="comparedPlayer__imgWrapper" id={`comparedPlayer--${color}`}>
            <img className="comparedPlayer__img" src={player.file_path ? `${settings.API_URL}/image?url=/media/users/${player.file_path}` : profile} alt="profilowe" />
        </figure>
        <h2 className="comparedPlayer__fullName">
            {player.first_name} {player.last_name}
        </h2>
        <section className="comparedPlayer__icons">

        </section>
        <section className="comparedPlayer__section">
            <section className="comparedPlayer__section__item">
                <span className="comparedPlayer__section__key">
                    Wiek
                </span>
                <span className="comparedPlayer__section__value">
                    {calculateAge(player.birthday)}
                </span>
            </section>
            <section className="comparedPlayer__section__item">
                <span className="comparedPlayer__section__key">
                    Honorarium
                </span>
                <span className="comparedPlayer__section__value">
                    {player.salary_from ? player.salary_from + " - " + player.salary_to : "-"}
                </span>
            </section>
            <section className="comparedPlayer__section__item">
                <span className="comparedPlayer__section__key">
                    Aktualny klub
                </span>
                <span className="comparedPlayer__section__value">
                    {player.club ? player.club : "-"}
                </span>
            </section>
        </section>

        <section className="comparedPlayer__section">
            <section className="comparedPlayer__section__item">
                <span className="comparedPlayer__section__key">
                    Zasięg w ataku
                </span>
                <span className="comparedPlayer__section__value">
                    {player.attack_range ? player.attack_range : "-"}
                </span>
            </section>
            <section className="comparedPlayer__section__item">
                <span className="comparedPlayer__section__key">
                    Zasięg dosiężny
                </span>
                <span className="comparedPlayer__section__value">
                    {player.vertical_range ? player.vertical_range : "-"}
                </span>
            </section>
            <section className="comparedPlayer__section__item">
                <span className="comparedPlayer__section__key">
                    Zasięg w bloku
                </span>
                <span className="comparedPlayer__section__value">
                    {player.block_range ? player.block_range : "-"}
                </span>
            </section>
            <section className="comparedPlayer__section__item">
                <span className="comparedPlayer__section__key">
                    Waga
                </span>
                <span className="comparedPlayer__section__value">
                    {player.weight ? player.weight + " kg" : "-"}
                </span>
            </section>
            <section className="comparedPlayer__section__item">
                <span className="comparedPlayer__section__key">
                    Wzrost
                </span>
                <span className="comparedPlayer__section__value">
                    {player.height ? player.height + " cm" : "-"}
                </span>
            </section>
            <section className="comparedPlayer__section__item">
                <span className="comparedPlayer__section__key">
                    Pozycja
                </span>
                <span className="comparedPlayer__section__value">
                    {player.position ? getPositionById(player.position) : "-"}
                </span>
            </section>
        </section>

        <section className="comparedPlayer__videoSection">

        </section>

        <a className="button button--hover button--comparedPlayer">
            <img className="btn__img" src={writeMsgBtn} alt="napisz-wiadomosc" />
        </a>
    </section>
}

export default ComparedPlayer;
