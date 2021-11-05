import React, {useEffect, useState} from 'react'
import Header from "../components/Header";
import Footer from "../components/Footer";
import {getClubSquads} from "../helpers/squad";
import trashIcon from '../static/img/trash-black.svg'
import editIcon from '../static/img/pen-white.png'
import floor from '../static/img/boisko.svg'
import playerPlaceholder from "../static/img/player-placeholder.svg";
import {getPositionById, isElementInArray} from "../helpers/others";
import playerDraggable from "../static/img/player-draggable.svg";
import trash from "../static/img/trash-black.svg";
import settings from "../settings";
import profilePicture from "../static/img/profile-picture.png";

const ClubTeamsPage = ({club}) => {
    const [teams, setTeams] = useState([]);
    const [players, setPlayers] = useState([]);
    const [currentTeam, setCurrentTeam] = useState(-1);

    useEffect(() => {
        getClubSquads()
            .then((res) => {
                console.log(res?.data?.result);
                setPlayers(res?.data?.result);
                setTeams(res?.data?.result?.filter((v,i,a)=>a.findIndex(t=>(t.squad_id === v.squad_id))===i));
            });
    }, []);

    useEffect(() => {

    }, [players]);

    const getSquad = (team) => {
        return players.filter((item) => {
            return item.squad_id === team;
        });
    }

    const calculateTeamMinSalary = (team) => {
        return players.reduce((prev, current) => {
            const addValue = current.squad_id === team ? current.salary_from : 0;
            return prev + addValue;
        }, 0);
    }

    const calculateTeamMaxSalary = (team) => {
        return players.reduce((prev, current) => {
            const addValue = current.squad_id === team ? current.salary_to : 0;
            return prev + addValue;
        }, 0);
    }

    const formatBigNumber = (num) => {
        let str = num.toString();
        switch(str.length) {
            case 4:
                return str[0] + " " + str.substring(1, 4);
            case 5:
                return str.substring(0, 2) + " " + str.substring(2, 5);
            case 6:
                return str.substring(0, 3) + " " + str.substring(3, 6);
            default:
                break;
        }
    }

    return <div className="container container--dark">
        <Header loggedIn={true} club={true} menu="light" theme="dark" profileImage={club.file_path} />

        <main className="clubTeams siteWidthSuperNarrow siteWidthSuperNarrow--1400">
            <h1 className="clubTeams__header">
                Zapisane składy
            </h1>

            {teams.map((item, index) => {
                return <section className="clubTeams__team" key={index}>
                    <button className={currentTeam === index ? "clubTeams__item clubTeams__item--gold" : "clubTeams__item"} onClick={() => { if(currentTeam !== index) setCurrentTeam(index); else setCurrentTeam(-1); }}>
                        <span className="clubTeams__item__col">
                            {item.name}
                        </span>
                            <span className="clubTeams__item__col">
                            {item.created_at.substring(0, 10)}
                        </span>
                            <span className="clubTeams__item__col d-desktop">
                                {formatBigNumber(calculateTeamMinSalary(item.squad_id))} PLN
                            </span>
                            <span className="clubTeams__item__col d-desktop">
                                {formatBigNumber(calculateTeamMaxSalary(item.squad_id))} PLN
                            </span>
                            <span className="clubTeams__item__col d-desktop">
                            <button className="clubTeams__button clubTeams__button--trash" onClick={() => {}}>
                                <img className="btn__img" src={trashIcon} alt="usun" />
                            </button>
                            <a className="clubTeams__button" href={`/sklady?id=${item.squad_id}`}>
                                <img className="btn__img" src={editIcon} alt="edytuj" />
                            </a>
                        </span>
                    </button>
                    {currentTeam === index ? <>
                        <section className="clubTeams__teamSection d-mobile">
                            <span className="clubTeams__item__col">
                                {formatBigNumber(calculateTeamMinSalary(item.squad_id))} PLN
                            </span>
                            <span className="clubTeams__item__col">
                                {formatBigNumber(calculateTeamMaxSalary(item.squad_id))} PLN
                            </span>
                        </section>
                        <section className="clubTeams__teamSection d-mobile">
                            <a className="clubTeams__button" onClick={() => {}} href={`/sklady?id=${item.squad_id}`}>
                                <img className="btn__img" src={editIcon} alt="edytuj" />
                            </a>
                            <button className="clubTeams__button clubTeams__button--trash" onClick={() => {}}>
                                <img className="btn__img" src={trashIcon} alt="usun" />
                            </button>
                        </section>
                    </> : ""}

                    {currentTeam === index ?  <section className="clubTeams__floor">
                        <img className="btn__img clubTeams__floor__img" src={floor} alt="boisko" />

                        {getSquad(item.squad_id)?.map((item, index) => {
                            return <div className={`dropzone dropzone--active dropzone--player--${index+1}`} key={index}>
                                <div className="createSquad__squad__item__dragging draggable">
                                    <img className="createSquad__squad__item__dragging__img" src={playerDraggable} alt="zawodnik" />

                                    <figure className="createSquad__squad__item__dragging__imgWrapper">
                                        <img className="createSquad__squad__item__dragging__img" src={item.file_path ? `${settings.API_URL}/image?url=/media/users/${item.file_path}`: profilePicture} alt={"Jan"} />
                                    </figure>

                                    <section className="createSquad__squad__item__dragging__header">
                                        <h3 className="createSquad__squad__item__dragging__header__name">
                                            {item.first_name} {item.last_name}
                                        </h3>
                                        <h4 className="createSquad__squad__item__dragging__header__position">
                                            {item.position}
                                        </h4>
                                    </section>
                                </div>

                                <img className="btn__img" src={playerPlaceholder} alt="zawodnik" />
                            </div>
                        })}

                        {[1, 2, 3, 4, 5, 6, 7].map((n) => {
                            if(getSquad(item.squad_id).length < n) {
                                return <div className={`dropzone dropzone--active dropzone--player--${n}`} key={n}>
                                    <img className="btn__img" src={playerPlaceholder} alt="zawodnik" />
                                </div>
                            }
                        })}
                    </section> : ""}
                </section>
            })}
        </main>

        <Footer theme="dark" border={true} />
    </div>
}

export default ClubTeamsPage;
