import React, {useEffect, useState} from 'react';
import {addEvent} from "../helpers/event";
import Calendar from 'react-calendar';
import calendarIcon from '../static/img/calendar-icon.svg';
import hourIcon from '../static/img/clock-icon.svg';
import {addTrailingZero} from "../helpers/others";
import AfterAddEvent from "./AfterAddEvent";
import AfterAddEventError from "./AfterAddEventError";
import DraftLoader from "./Loader";

const EventEditionModal = ({closeModal, clubId}) => {
    const [title, setTitle] = useState('');
    const [entriesDate, setEntriesDate] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [eventHour, setEventHour] = useState('');
    const [description, setDescription] = useState('');
    const [entriesCalendarVisible, setEntriesCalendarVisible] = useState(false);
    const [eventCalendarVisible, setEventCalendarVisible] = useState(false);
    const [status, setStatus] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(false);
    }, [status]);

    const addNewEvent = () => {
        setLoading(true);
        addEvent(clubId, title, entriesDate, eventDate, eventHour, description)
            .then((res) => {
                if(res?.data?.result) {
                    setStatus(1);
                }
                else {
                    setStatus(-1);
                }
            })
            .catch(() => {
                setStatus(-1);
            });
    }

    const convertDateToString = (date) => {
        if(date instanceof Date) {
            return `${addTrailingZero(date.getDate())}.${addTrailingZero(date.getMonth()+1)}.${date.getFullYear()}`;
        }
        return '';
    }

    useEffect(() => {
        setEntriesCalendarVisible(false);
    }, [entriesDate]);

    useEffect(() => {
        setEventCalendarVisible(false);
    }, [eventDate]);

    return <div className="modal modal--event">
        {!status ? <div className="modal__inner">
            <button className="btn btn--remove btn--modalClose"
                    onClick={closeModal}>
                &times;
            </button>

            {entriesCalendarVisible ? <div className="calendarModal">
                <Calendar value={entriesDate} onChange={setEntriesDate} />
            </div> : ''}
            {eventCalendarVisible ? <div className="calendarModal">
                <Calendar value={eventDate} onChange={setEventDate} />
            </div> : ''}

            <h4 className="modal__header modal__header--event goldman">
                Dodaj wydarzenie
            </h4>

            <input className="input input--event input--event--title"
                   value={title}
                   onChange={(e) => { setTitle(e.target.value); }}
                   placeholder="Tytuł wydarzenia" />

            <div className="modal__inner__fields">
                <label className="calendarWrapper">
                    <span className="calendarWrapper__value">
                        {!entriesDate ? 'Zapisy do' : <span>
                            {convertDateToString(entriesDate)}
                        </span>}
                    </span>
                    <button className="btn btn--openCalendar"
                            onClick={() => { setEntriesCalendarVisible(true); }}>
                        <img className="img" src={calendarIcon} alt="kalendarz" />
                    </button>
                </label>

                <label className="calendarWrapper">
                    <span className="calendarWrapper__value">
                        {!eventDate ? 'Data wydarzenia' : <span>
                            {convertDateToString(eventDate)}
                        </span>}
                    </span>
                    <button className="btn btn--openCalendar"
                            onClick={() => { setEventCalendarVisible(true); }}>
                        <img className="img" src={calendarIcon} alt="kalendarz" />
                    </button>
                </label>

                <label className="calendarWrapper">
                    <input className="input"
                           value={eventHour}
                           onChange={(e) => { setEventHour(e.target.value); }}
                           placeholder="Godzina" />
                    <figure className="btn btn--openCalendar">
                        <img className="img" src={hourIcon} alt="kalendarz" />
                    </figure>
                </label>
            </div>

            <textarea className="input input--event input--event--description"
                      value={description}
                      onChange={(e) => { setDescription(e.target.value); }}
                      placeholder="Opis" />

            {!loading ? <button className="btn btn--addEvent btn--gradient goldman"
                                disabled={!title || !entriesDate || !eventDate || !eventHour || !description}
                                onClick={() => { addNewEvent(); }}>
                Utwórz wydarzenie
            </button> : <div className="center">
                <DraftLoader />}
            </div>}
        </div> : (status === 1 ? <AfterAddEvent closeModal={closeModal} /> : <AfterAddEventError closeModal={closeModal} />)}
    </div>
};

export default EventEditionModal;
