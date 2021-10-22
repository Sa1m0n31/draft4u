import axios from "axios";
import settings from "../settings";

const { API_URL } = settings;

const getAllClubs = () => {
    return axios.get(`${API_URL}/club/get-all`);
}

const isClubLoggedIn = () => {
    return axios
}

export { getAllClubs }
