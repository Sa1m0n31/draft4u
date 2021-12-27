import axios from "axios";
import settings from "../settings";

const { API_URL } = settings;

const isPlayerFavorite = (list, playerId) => {
    console.log(list);
    if(!list) return false;
    return list?.findIndex((item) => {
        return item.id === playerId;
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
    return axios.get(`${API_URL}/club/get-three-newest`, {
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

const getClubById = (id) => {
    return axios.get(`${API_URL}/club/get-club-by-id`, {
        params: {
            id
        }
    });
}

const getLeagues = () => {
    return axios.get(`${API_URL}/league/get`)
}

const getClubLocations = () => {
    return axios.get(`${API_URL}/club/get-locations`);
}

const addClub = (name, league, login, password, x, y, img, nip, krs, city, email) => {
    const config = { headers: { 'Content-Type': 'multipart/form-data' } };
    let formData = new FormData();
    formData.append('name', name);
    formData.append('league', league);
    formData.append('login', login);
    formData.append('password', password);
    formData.append('image', img);
    formData.append('x', x);
    formData.append('y', y);
    formData.append('nip', nip);
    formData.append('krs', krs);
    formData.append('city', city);
    formData.append('email', email);

    return axios.post(`${API_URL}/club/add`, formData, config);
}

const updateClub = (clubId, name, league, login, x, y, img, nip, krs, city, email) => {
    const config = { headers: { 'Content-Type': 'multipart/form-data' } };
    let formData = new FormData();
    formData.append('clubId', clubId);
    formData.append('name', name);
    formData.append('league', league);
    formData.append('login', login);
    formData.append('x', x);
    formData.append('y', y);
    formData.append('nip', nip);
    formData.append('krs', krs);
    formData.append('city', city);
    formData.append('email', email);
    if(img) {
        if(img === 'delete') {
            formData.append('imgUpdate', 'delete');
        }
        else {
            formData.append('image', img);
            formData.append('imgUpdate', 'true');
        }
    }
    return axios.post(`${API_URL}/club/update`, formData, config);
}

const changeClubPassword = (oldPassword, newPassword) => {
    return axios.post(`${API_URL}/club/change-password`, {
        oldPassword, newPassword
    }, {
        withCredentials: true
    });
}

const changeClubPasswordFromAdminPanel = (clubId, oldPassword, newPassword) => {
    return axios.post(`${API_URL}/club/change-club-password-from-admin-panel`, {
        clubId, oldPassword, newPassword
    });
}

const sendClubForm = (name, mail, phone, msg) => {
    return axios.post(`${API_URL}/club/send-form`, {
        name, mail, phone, msg
    });
}

export { isPlayerInFavorites, addToVisited, getAllClubs, getClubData, getAllPlayers, getFavoritesByClub, getClubLocations, isPlayerFavorite, addToFavorites, deleteFromFavorites, getThreeNewest, getPlayerHighlight, getClubById, getLeagues, addClub, updateClub, changeClubPasswordFromAdminPanel, changeClubPassword, sendClubForm }
