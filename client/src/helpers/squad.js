import axios from "axios";
import settings from "../settings";

const { API_URL } = settings;

const addSquad = (name, players) => {
    return axios.post(`${API_URL}/squad/add`, {
        name, players
    }, {
        withCredentials: true
    });
}

const getClubSquads = () => {
    return axios.get(`${API_URL}/squad/get-club-squads`, {
        withCredentials: true
    });
}

export { addSquad, getClubSquads }
