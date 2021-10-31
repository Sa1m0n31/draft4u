import axios from "axios";
import settings from "../settings";

const { API_URL } = settings;

const isPlayerFavorite = (list, playerId) => {
    // console.log(list);
    // console.log(playerId);
    // console.log(list.findIndex((item) => {
    //     return item.user_id === playerId;
    // }) !== -1);
    return list.findIndex((item) => {
        return item.user_id === playerId;
    }) !== -1;
}

const isPlayerInFavorites = (userId) => {
    return axios.get(`${API_URL}/favorite/is-player-favorite`, {
        params: {
            id: userId
        },
        withCredentials: true
    });
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
    return axios.get(`${API_URL}/club/get-all-players`, {
        withCredentials: true
    });
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

const addToVisited = (userId) => {
    return axios.post(`${API_URL}/visited/add`, {
        userId
    }, {
        withCredentials: true
    });
}

const getThreeNewest = () => {
    return axios.get(`${API_URL}/club/get-three-newest`);
}

const getThreeFavorites = () => {
    return axios.get(`${API_URL}/club/get-three-favorites`, {
        withCredentials: true
    });
}

const getPlayerHighlight = (userId) => {
    return axios.get(`${API_URL}/club/get-player-highlight`, {
        params: {
            player: userId
        },
        withCredentials: true
    });
}

export { isPlayerInFavorites, addToVisited, getAllClubs, getClubData, getAllPlayers, getFavoritesByClub, isPlayerFavorite, addToFavorites, deleteFromFavorites, getThreeFavorites, getThreeNewest, getPlayerHighlight }
