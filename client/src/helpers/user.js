import axios from "axios";
import settings from "../settings";

const { API_URL } = settings;

const isEmailAvailable = (email, accountType) => {
    return axios.get(`${API_URL}/user/is-email-available`, {
        params: {
            email,
            type: accountType
        }
    })
}

const setPasswordRemindToken = (email) => {
    return axios.post(`${API_URL}/user/password-remind`, {
        email
    });
}

const checkIfRemindPasswordTokenOk = (token) => {
    return axios.get(`${API_URL}/user/check-remind-password-token`, {
        params: {
            token
        }
    });
}

const changeUserPassword = (oldPassword, newPassword) => {
    return axios.post(`${API_URL}/user/change-password`, {
        oldPassword, newPassword
    }, {
        withCredentials: true
    });
}

const resetPassword = (email, password) => {
    return axios.post(`${API_URL}/user/reset-password`, {
        email, password
    });
}

const getUserData = () => {
    return axios.get(`${API_URL}/user/get-user-data`, {
        headers: {
            'Access-Control-Allow-Origin': settings.API_URL
        },
        withCredentials: true
    });
}

const putConfig = { headers: {'Content-Type': 'application/json'} };

const updateUserEmail = (email) => {
    return axios.put(`${API_URL}/user/update-user-email`, {
        email
    }, {
        withCredentials: true
    });
}

const updateUserLicenceNumber = (licenceNumber) => {
    return axios.put(`${API_URL}/user/update-user-license-number`, {
        licenceNumber
    }, {
        withCredentials: true
    });
}

const updateUserExperience = (experience) => {
    return axios.put(`${API_URL}/user/update-user-experience`, {
        experience
    }, {
        withCredentials: true
    });
}

const updateUserPhoneNumber = (phoneNumber) => {
    return axios.put(`${API_URL}/user/update-user-phone-number`, {
        phoneNumber
    }, {
        withCredentials: true
    });
}

const updateUserClub = (club) => {
    return axios.put(`${API_URL}/user/update-user-club`, {
        club
    }, {
        withCredentials: true
    });
}

const updateUserSalary = (salaryFrom, salaryTo) => {
    return axios.put(`${API_URL}/user/update-user-salary`, {
        salaryFrom, salaryTo
    }, {
        withCredentials: true
    });
}

const updateUserBirthday = (birthday) => {
    return axios.put(`${API_URL}/user/update-user-birthday`, {
        birthday
    }, {
        withCredentials: true
    });
}

const updateUserAttackRange = (attackRange) => {
    return axios.put(`${API_URL}/user/update-user-attack-range`, {
        attackRange
    }, {
        withCredentials: true
    });
}

const updateUserVerticalRange = (verticalRange) => {
    return axios.put(`${API_URL}/user/update-user-vertical-range`, {
        verticalRange
    }, {
        withCredentials: true
    });
}

const updateUserBlockRange = (blockRange) => {
    return axios.put(`${API_URL}/user/update-user-block-range`, {
        blockRange
    }, {
        withCredentials: true
    });
}

const updateUserWeight = (weight) => {
    return axios.put(`${API_URL}/user/update-user-weight`, {
        weight
    }, {
        withCredentials: true
    });
}

const updateUserHeight = (height) => {
    return axios.put(`${API_URL}/user/update-user-height`, {
        height
    }, {
        withCredentials: true
    });
}

const updateUserPosition = (position) => {
    let positionId;
    switch(position) {
        case 'atakujący':
            positionId = 1;
            break;
        case 'rozgrywający':
            positionId = 2;
            break;
        case 'przyjmujący':
            positionId = 3;
            break;
        case 'środkowy':
            positionId = 4;
            break;
        default:
            positionId = 5;
            break;
    }

    return axios.put(`${API_URL}/user/update-user-position`, {
        position: positionId
    }, {
        withCredentials: true
    });
}

const updateUserCountry = (id) => {
    return axios.put(`${API_URL}/user/update-user-country`, {
        country: id
    }, {
        withCredentials: true
    });
}

const updateUserStuffPosition = (position) => {
    let positionId;
    switch(position.toLowerCase()) {
        case 'trener':
            positionId = 1;
            break;
        case 'asystent':
            positionId = 2;
            break;
        case 'fizjoterapeuta':
            positionId = 3;
            break;
        case 'trener przygotowania':
            positionId = 4;
            break;
        default:
            positionId = 5;
            break;
    }

    return axios.put(`${API_URL}/user/update-user-stuff-position`, {
        position: positionId
    }, {
        withCredentials: true
    });
}

const getAllPositions = () => {
    return axios.get(`${API_URL}/user/get-all-positions`);
}

// INSERT INTO stuff_positions VALUES (1, 'Trener');
// INSERT INTO stuff_positions VALUES (2, 'Asystent');
// INSERT INTO stuff_positions VALUES (3, 'Fizjoterapeuta');
// INSERT INTO stuff_positions VALUES (4, 'Trener przygotowania');
// INSERT INTO stuff_positions VALUES (5, 'Statystyk');

const getAllStuffPositions = () => {
    return axios.get(`${API_URL}/user/get-all-stuff-positions`);
}

/*
INSERT INTO video_categories VALUES (1, 'atak');
INSERT INTO video_categories VALUES (2, 'blok');
INSERT INTO video_categories VALUES (3, 'serwis');
INSERT INTO video_categories VALUES (4, 'highlights');
INSERT INTO video_categories VALUES (5, 'pelen mecz');
INSERT INTO video_categories VALUES (6, 'rozegranie');
INSERT INTO video_categories VALUES (7, 'obrona');
INSERT INTO video_categories VALUES (8, 'przyjęcie');
 */
const getPlayElementsByPosition = (position) => {
    switch(position) {
        case 'atakujący':
            return ['atak', 'blok', 'serwis', 'highlights', 'pelen mecz'];
            break;
        case 'przyjmujący':
            return ['atak', 'przyjęcie', 'serwis', 'blok', 'highlights'];
            break;
        case 'rozgrywający':
            return ['rozegranie', 'blok', 'serwis', 'atak', 'obrona', 'highlights', 'pelen mecz'];
            break;
        case 'libero':
            return ['przyjecie', 'obrona', 'rozegranie', 'highlights', 'pelen mecz'];
            break;
        case 'środkowy':
            return ['blok', 'atak', 'serwis', 'highlights', 'pelen mecz'];
            break;
        default:
            break;
    }
}

const editProfileImage = (userId, image) => {
    const config = { headers: { 'Content-Type': 'multipart/form-data' }, withCredentials: true };
    let formData = new FormData();
    formData.append('image', image);

    return axios.post(`${API_URL}/user/edit-profile-image`, formData, config);
}

const getUserProfileImage = (userId) => {
    return axios.get(`${API_URL}/user/get-user-profile-image`, {
        params: {
            userId
        }
    });
}

const getUserSubscription = (userId) => {
    return axios.get(`${API_URL}/auth/get-user-subscription`, {
        params: {
            user: userId
        }
    });
}

const getUserById = (userId) => {
    return axios.get(`${API_URL}/user/get-user-by-id`, {
        params: {
            id: userId
        }
    });
}

const getUserFavorites = () => {
    return axios.get(`${API_URL}/favorite/get-favorites-by-player`, {
       withCredentials: true
    });
}

const getUserVisited = () => {
    return axios.get(`${API_URL}/visited/get-visited-by-player`, {
        withCredentials: true
    });
}

const getIdentityById = (id) => {
    return axios.get(`${API_URL}/user/get-identity-by-id`, {
        params: {
            id
        }
    });
}

const addCv = (type, title, from, to, description) => {
    return axios.post(`${API_URL}/user/add-cv`, {
        type, title, from, to, description
    }, {
        withCredentials: true
    });
}

const updateCv = (id, title, from, to, description) => {
    return axios.post(`${API_URL}/user/update-cv`, {
        id, title, from, to, description
    }, {
        withCredentials: true
    });
}

const deleteCv = (id) => {
    return axios.delete(`${API_URL}/user/delete-cv`, {
        params: {
            id
        }
    });
}

const getCvs = (id) => {
    return axios.get(`${API_URL}/user/get-player-cvs`, {
        params: {
            id
        },
        withCredentials: true
    });
}

const isUserWithTwoAccounts = () => {
    return axios.get(`${API_URL}/user/is-user-with-two-accounts`, {
        withCredentials: true
    });
}

const getSecondAccountData = () => {
    return axios.get(`${API_URL}/user/second-account-data`, {
        withCredentials: true
    });
}

const getUserToClubNotifications = (userId) => {
    return axios.get(`${API_URL}/user/get-user-to-clubs-notifications`, {
        params: {
            id: userId
        }
    });
}

const sendUserToClubNotification = (userId, clubId) => {
    return axios.post(`${API_URL}/user/send-user-to-club-notification`, {
        userId, clubId
    });
}

export { isEmailAvailable, setPasswordRemindToken, checkIfRemindPasswordTokenOk, changeUserPassword, getUserData,
    updateUserLicenceNumber, updateUserPhoneNumber, updateUserEmail, updateUserExperience,
    updateUserClub, updateUserSalary, updateUserBirthday,
    updateUserAttackRange, updateUserVerticalRange, updateUserBlockRange,
    updateUserHeight, updateUserWeight, updateUserPosition,
    getAllPositions, getPlayElementsByPosition, editProfileImage, getUserProfileImage, getUserSubscription,
    getUserById, getUserFavorites, getUserVisited,
    getIdentityById, resetPassword, updateUserCountry,
    addCv, updateCv, deleteCv, getCvs, getAllStuffPositions, updateUserStuffPosition,
    isUserWithTwoAccounts, getSecondAccountData, sendUserToClubNotification, getUserToClubNotifications
}
