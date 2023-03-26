import React, {useContext, useEffect, useState} from 'react';
import {addEventEntry} from "../helpers/event";
import calendarIcon from '../static/img/calendar-icon.svg';
import hourIcon from '../static/img/clock-icon.svg';
import {addTrailingZero} from "../helpers/others";
import AfterAddEventError from "./AfterAddEventError";
import DraftLoader from "./Loader";
import AfterAddEntry from "./AfterAddEntry";
import {ContentContext} from "../App";

const EventInfoModal = ({closeModal, event, userId, entryDisabled}) => {
    const { language } = useContext(ContentContext);

    const [status, setStatus] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(false);
    }, [status]);

    const signUpForEvent = () => {
        setLoading(true);

        addEventEntry(event.id, userId.id)
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
        const newDate = new Date(date);
        if(newDate instanceof Date) {
            return `${addTrailingZero(newDate.getDate())}.${addTrailingZero(newDate.getMonth()+1)}.${newDate.getFullYear()}`;
        }
        return '';
    }

    return <div className="modal modal--event modal--eventInfo">
        {!status ? <div className="modal__inner">
            <button className="btn btn--remove btn--modalClose"
                    onClick={closeModal}>
                &times;
            </button>

            <h4 className="modal__header modal__header--event goldman">
                {language === 'pl' ? 'Szczegóły wydarzenia' : 'Event details'}
            </h4>

            <input className="input input--event input--event--title"
                   value={event?.title}
                   disabled={true} />

            <div className="modal__inner__fields">
                <label className="calendarWrapper">
                    <span className="calendarWrapper__value">
                        <span className="eventInfoModal__text">
                            {language === 'pl' ? 'Zapisy do:' : 'Registration to:'}
                        </span>
                        <span>
                            {convertDateToString(event?.expire_date)}
                        </span>
                    </span>
                    <button className="btn btn--openCalendar"
                            disabled={true}>
                        <img className="img" src={calendarIcon} alt="kalendarz" />
                    </button>
                </label>

                <label className="calendarWrapper">
                    <span className="calendarWrapper__value">
                        <span className="eventInfoModal__text">
                            {language === 'pl' ? 'Data:' : 'Date:'}
                        </span>
                        <span>
                            {`${convertDateToString(event?.event_date)}, ${event?.event_hour}`}
                        </span>
                    </span>
                    <button className="btn btn--openCalendar"
                            disabled={true}>
                        <img className="img" src={hourIcon} alt="kalendarz" />
                    </button>
                </label>
            </div>

            <textarea className="input input--event input--event--description"
                      value={event?.description}
                      disabled={true} />

            {!loading ? (entryDisabled ? <button className="btn btn--addEvent btn--gradient goldman"
                                                 onClick={() => { signUpForEvent(); }}>
                {language === 'pl' ? 'Zapisz się na wydarzenie' : 'Join event'}
            </button> : <button className="btn btn--addEvent btn--gradient goldman"
                                onClick={() => { closeModal(); }}>
                {language === 'pl' ? 'Powrót' : 'Back'}
            </button>) : <div className="center">
                <DraftLoader />
            </div>}
        </div> : (status === 1 ? <AfterAddEntry closeModal={closeModal} /> : <AfterAddEventError closeModal={closeModal} />)}
    </div>
};

export default EventInfoModal;
