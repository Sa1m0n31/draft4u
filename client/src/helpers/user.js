import axios from "axios";
import settings from "../settings";

const { API_URL } = settings;

const isEmailAvailable = (email) => {
    return axios.get(`${API_URL}/user/is-email-available`, {
        params: {
            email
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

const changeUserPassword = (email, password) => {
    return axios.post(`${API_URL}/user/change-password`, {
        email, password
    });
}

const getUserData = () => {
    return axios.get(`${API_URL}/user/get-user-data`, {
        headers: {
            'Access-Control-Allow-Origin': 'http://localhost:3000'
        },
        withCredentials: true
    });
}

const putConfig = { headers: {'Content-Type': 'application/json'} };

const updateUserLicenceNumber = (licenceNumber) => {
    return axios.put(`${API_URL}/user/update-user-license-number`, {
        licenceNumber
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
    console.log(position);
    return axios.put(`${API_URL}/user/update-user-position`, {
        position
    }, {
        withCredentials: true
    });
}

const getAllPositions = () => {
    return axios.get(`${API_URL}/user/get-all-positions`);
}

export { isEmailAvailable, setPasswordRemindToken, checkIfRemindPasswordTokenOk, changeUserPassword, getUserData,
    updateUserLicenceNumber, updateUserPhoneNumber,
    updateUserClub, updateUserSalary, updateUserBirthday,
    updateUserAttackRange, updateUserVerticalRange, updateUserBlockRange,
    updateUserHeight, updateUserWeight, updateUserPosition,
    getAllPositions
}
