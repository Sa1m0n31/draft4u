import axios from "axios";
import settings from "../settings";

const { API_URL } = settings;

const addEvent = (clubId, title, expireDate, eventDate, eventHour, description) => {
    return axios.post(`${API_URL}/event/add`, {
        clubId, title, expireDate, eventDate, eventHour, description
    });
}

const deleteEvent = (id) => {
    return axios.delete(`${API_URL}/event/delete`, {
        params: {
            id
        }
    });
}

const getCurrentEvents = (page) => {
    return axios.get(`${API_URL}/event/get`, {
        params: {
            page
        }
    });
}

const getEventsByClub = (id) => {
    return axios.get(`${API_URL}/event/get-events-by-club`, {
        params: {
            id
        }
    });
}

const addEventEntry = (eventId, userId) => {
    return axios.post(`${API_URL}/event/add-entry`, {
        eventId, userId
    });
}

const acceptEventEntry = (eventId, userId) => {
    return axios.put(`${API_URL}/event/accept-entry`, {
        eventId, userId
    });
}

export { addEvent, getCurrentEvents, deleteEvent, getEventsByClub,
    addEventEntry, acceptEventEntry }
