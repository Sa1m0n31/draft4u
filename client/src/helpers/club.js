import axios from "axios";
import settings from "../settings";

const { API_URL } = settings;

const isPlayerFavorite = (list, playerId) => {
    return list.findIndex((item) => {
        return item.user_id === playerId;
    }) !== -1;
}

const getAllClubs = () => {
    return axios.get(`${API_URL}/club/get-all`);
}

const getClubData = () => {
    return axios.get(`${API_URL}/club/get-club-data`, {
        withCredentials: true
    });
}

const getAllPlayers = () => {
    return axios.get(`${API_URL}/club/get-all-players`);
}

const getFavoritesByClub = () => {
    return axios.get(`${API_URL}/favorite/get-favorites-by-club`, {
        withCredentials: true
    });
}

const addToFavorites = (userId) => {
    return axios.post(`${API_URL}/favorite/add`, {
        userId
    }, {
        withCredentials: true
    });
}

const deleteFromFavorites = (userId) => {
    return axios.delete(`${API_URL}/favorite/delete`, {
        params: {
          userId
        },
        withCredentials: true
    });
}

export { getAllClubs, getClubData, getAllPlayers, getFavoritesByClub, isPlayerFavorite, addToFavorites, deleteFromFavorites }
