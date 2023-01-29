import React, {useEffect, useState} from 'react';
import Header from "../components/Header";
import Footer from "../components/Footer";
import {acceptEventEntry, deleteEvent, getEventsByClub} from "../helpers/event";
import {addTrailingZero, groupBy} from "../helpers/others";
import DeleteEventModal from "../components/DeleteEventModal";

const ClubEvents = ({club}) => {
    const [events, setEvents] = useState([]);
    const [accepted, setAccepted] = useState(false);
    const [deleteCandidate, setDeleteCandidate] = useState(0);
    const [deleted, setDeleted] = useState(-1);

    useEffect(() => {
        if(club?.id) {
            getEventsByClub(club.id)
                .then((res) => {
                    if(res?.data?.result) {
                        setEvents(Object.entries(groupBy(res.data.result, 'event_id')));
                    }
                });
        }
    }, [club, accepted, deleted]);

    const convertDateToString = (date) => {
        if(date instanceof Date) {
            return `${addTrailingZero(date.getDate())}.${addTrailingZero(date.getMonth()+1)}.${date.getFullYear()}`;
        }
        const newDate = new Date(date);
        if(newDate instanceof Date) {
            return `${addTrailingZero(newDate.getDate())}.${addTrailingZero(newDate.getMonth()+1)}.${newDate.getFullYear()}`;
        }
        return '';
    }

    const acceptEntry = (eventId, userId, userIdentity) => {
        acceptEventEntry(eventId, userId, userIdentity)
            .then((res) => {
                setAccepted(p => !p);
            });
    }

    const deleteEventById = () => {
        deleteEvent(deleteCandidate)
            .then((res) => {
               if(res?.data?.result === 1) {
                   setDeleted(1);
               }
               else {
                   setDeleted(0);
               }
            })
            .catch(() => {
                setDeleted(0);
            });
    }

    return <div className="container container--dark">
        <Header loggedIn={true} club={true} menu="light" theme="dark" profileImage={club.file_path} />

        {deleteCandidate ? <DeleteEventModal closeModal={() => { setDeleteCandidate(0); }}
                                             deleted={deleted}
                                             confirmDelete={() => { deleteEventById(); }} /> : ''}

        <div className="events siteWidth">
            <h1 className="events__header">
                Twoje wydarzenia
            </h1>

            {events[0]?.length ? events.map((item, index) => {
                const eventInfo = item[1][0];
                const entries = item[1];

                console.log(entries[0]);

                return <div className="events__item"
                            key={index}>
                    <button className="btn btn--deleteEvent"
                            onClick={() => { setDeleteCandidate(entries[0].event_id); }}>
                        Usuń wydarzenie
                    </button>

                    <h3 className="events__item__text">
                       {eventInfo.title}
                    </h3>
                    <h4 className="events__item__text events__item__text--date">
                        <b>Zapisy do: </b> {convertDateToString(eventInfo.expire_date)}
                    </h4>
                    <h5 className="events__item__text events__item__text--date">
                        <b>Data wydarzenia: </b> {convertDateToString(eventInfo.event_date)}
                    </h5>
                    <p className="events__item__text events__item__text--desc">
                        <b>Opis: </b> {eventInfo.description}
                    </p>

                    {entries?.length ? <>
                        <h5 className="events__item__entries__header">
                            Zapisani zawodnicy:
                        </h5>

                        <div className="events__item__entries">
                            {entries.map((item, index) => {
                                if(item.user_id) {
                                    return <a className="events__item__entry"
                                              href={`/profil-zawodnika?id=${item.user_id}`}
                                              key={index}>
                                        <h5 className="events__item__entry__name">
                                            {item.first_name} {item.last_name}
                                        </h5>

                                        {item.accepted ? <span className="events__item__entry__info">
                                        Zaakceptowany
                                    </span> : <div className="events__item__entry__buttons">
                                            <button className="btn btn--acceptEntry btn--gradient goldman center"
                                                    onClick={(e) => { e.stopPropagation();
                                                    e.preventDefault();
                                                    acceptEntry(item.event_id, item.user_id, item.id); }}>
                                                Zaakceptuj
                                            </button>
                                        </div>}
                                    </a>
                                }
                                else {
                                    return '';
                                }
                            })}
                        </div>
                    </> : ''}
                </div>
            }) : ''}
        </div>

        <Footer border={true} />
    </div>
};

export default ClubEvents;
