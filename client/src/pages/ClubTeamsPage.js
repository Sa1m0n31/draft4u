import React, {useEffect, useState, useRef, useContext} from 'react'
import Header from "../components/Header";
import Footer from "../components/Footer";
import {deleteSquad, getClubSquads} from "../helpers/squad";
import trashIcon from '../static/img/trash-black.svg'
import editIcon from '../static/img/pen-white.png'
import floor from '../static/img/boisko.svg'
import playerPlaceholder from "../static/img/player-placeholder.svg";
import playerDraggable from "../static/img/player-draggable.svg";
import settings from "../settings";
import profilePicture from "../static/img/profile-picture.png";
import closeIcon from '../static/img/close-grey.svg'
import {unicodeToUTF8} from "../helpers/others";
import {ContentContext} from "../App";
import {TestClubContext} from "../wrappers/ClubWrapper";

const ClubTeamsPage = ({club}) => {
    const [teams, setTeams] = useState([]);
    const [players, setPlayers] = useState([]);
    const [teamToDelete, setTeamToDelete] = useState(-1);
    const [currentTeam, setCurrentTeam] = useState(-1);
    const [deleteModal, setDeleteModal] = useState(false);
    const [deleteResult, setDeleteResult] = useState(-1);
    const [loaded, setLoaded] = useState(false);

    const { content } = useContext(ContentContext);
    const { testClub } = useContext(TestClubContext);

    const deleteModalRef = useRef(null);

    useEffect(() => {
        getClubSquads()
            .then((res) => {
                setPlayers(res?.data?.result);
                setTeams(res?.data?.result?.filter((v,i,a)=>a.findIndex(t=>(t.squad_id === v.squad_id))===i));
                setLoaded(true);
            });
        setCurrentTeam(-1);
    }, [deleteResult]);

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

    useEffect(() => {
        if(deleteModal) {
            deleteModalRef.current.style.opacity = "1";
            deleteModalRef.current.style.zIndex = "50";
        }
        else {
            setTeamToDelete(-1);
            deleteModalRef.current.style.opacity = "0";
            setTimeout(() => {
                deleteModalRef.current.style.zIndex = "-1";
            }, 200);
        }
    }, [deleteModal]);

    useEffect(() => {
        if(deleteResult !== -1) {
            setTimeout(() => {
                setDeleteResult(-1);
                setDeleteModal(false);
            }, 3000);
        }
    }, [deleteResult]);

    const deleteTeam = (id) => {
        deleteSquad(id)
            .then((res) => {
                if(res?.data?.result) setDeleteResult(1);
                else setDeleteResult(0);
            });
    }

    const openDeleteModal = (e, id) => {
        e.preventDefault();
        e.stopPropagation();
        setTeamToDelete(id);
        setDeleteModal(true);
    }

    return <div className="container container--dark">
        <Header loggedIn={true} club={true} menu="light" theme="dark" profileImage={club.file_path} />

        <div className="modal modal--deleteSquad" ref={deleteModalRef}>
            <div className="modal__inner">
                <button className="modal__close" onClick={() => { setDeleteModal(false); }}>
                    <img className="btn__img" src={closeIcon} alt="zamknij" />
                </button>

                {deleteResult === -1 ? <>
                    <h3 className="modal__header">
                        {content.delete_team}
                    </h3>

                    <div className="modal__buttons">
                        <button className="modal__btn" onClick={() => { deleteTeam(teamToDelete); }}>
                            {content.delete_team_yes}
                        </button>
                        <button className="modal__btn" onClick={() => { setDeleteModal(false); }}>
                            {content.delete_team_no}
                        </button>
                    </div>
                </> : <h3 className="modal__header">
                    {deleteResult === 1 ? content.team_deleted : content.error}
                </h3>}
            </div>
        </div>

        <main className="clubTeams siteWidthSuperNarrow siteWidthSuperNarrow--1400">
            <h1 className="clubTeams__header">
                {content.saved_teams}
            </h1>

            {teams.length ? <header className="clubTeams__tableHeader">
                <h4 className="clubTeams__tableHeader__header">
                    {content.name}
                </h4>
                <h4 className="clubTeams__tableHeader__header">
                    {content.teams_col1}
                </h4>
                <h4 className="clubTeams__tableHeader__header d-desktop">
                    {content.teams_col2}
                </h4>
                <h4 className="clubTeams__tableHeader__header d-desktop">
                    {content.teams_col3}
                </h4>
                <h4 className="clubTeams__tableHeader__header d-desktop">
                    {content.teams_col4}
                </h4>
            </header> : ""}
            {teams.length ? teams.map((item, index) => {
                return <section className="clubTeams__team" key={index}>
                    <button className={currentTeam === index ? "clubTeams__item clubTeams__item--gold" : "clubTeams__item"} onClick={() => { if(currentTeam !== index) setCurrentTeam(index); else setCurrentTeam(-1); }}>
                        <span className="clubTeams__item__col">
                            {item.name}
                        </span>
                            <span className="clubTeams__item__col">
                            {item.created_at.substring(0, 10)}
                        </span>
                            <span className="clubTeams__item__col d-desktop">
                                {formatBigNumber(calculateTeamMinSalary(item.squad_id)) ? (formatBigNumber(calculateTeamMinSalary(item.squad_id)) + " PLN") : "-"}
                            </span>
                            <span className="clubTeams__item__col d-desktop">
                                {formatBigNumber(calculateTeamMaxSalary(item.squad_id)) ? (formatBigNumber(calculateTeamMaxSalary(item.squad_id)) + " PLN") : "-"}
                            </span>
                            <span className="clubTeams__item__col d-desktop">
                            <button className="clubTeams__button clubTeams__button--trash" onClick={(e) => { openDeleteModal(e, item.squad_id); }}>
                                <img className="btn__img" src={trashIcon} alt="usun" />
                            </button>
                            <a className="clubTeams__button" onClick={(e) => { e.stopPropagation(); }} href={`/sklady?id=${item.squad_id}`}>
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
                            <button className="clubTeams__button clubTeams__button--trash" onClick={(e) => { openDeleteModal(e, item.squad_id); }}>
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
                                            {item.first_name} {testClub ? '******' : item.last_name}
                                        </h3>
                                        <h4 className="createSquad__squad__item__dragging__header__position">
                                            {item?.position ? unicodeToUTF8(item.position) : ""}
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
            }) : <section className="noTeams">
                {loaded ? <h3 className="noTeams__header">
                    {content.no_teams_found}
                </h3> : ""}
            </section> }
        </main>

        <Footer theme="dark" border={true} />
    </div>
}

export default ClubTeamsPage;
