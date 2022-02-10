import axios from "axios";
import settings from "../settings";

const { API_URL } = settings;

const getAdminById = (id) => {
    return axios.get(`${API_URL}/admin/get-admin-by-id`, {
        params: {
            id
        }
    });
}

const getAdminData = () => {
    return axios.get(`${API_URL}/admin/get-admin-data`, {
        withCredentials: true
    });
}

const getClubs = () => {
    return axios.get(`${API_URL}/admin/get-clubs`);
}

const getUsers = () => {
    return axios.get(`${API_URL}/admin/get-users`);
}

const changeAdminPassword = (oldPassword, newPassword) => {
    return axios.post(`${API_URL}/admin/change-password`, {
        oldPassword, newPassword
    }, {
        withCredentials: true
    });
}

const banUser = (id) => {
    return axios.post(`${API_URL}/admin/ban-user`, {
        id
    });
}

const unlockUser = (id) => {
    return axios.post(`${API_URL}/admin/unlock-user`, {
        id
    });
}

const deleteUser = (id) => {
    return axios.delete(`${API_URL}/admin/delete-user`, {
        params: {
            id
        }
    });
}

const changeUserName = (firstName, lastName, id) => {
    return axios.post(`${API_URL}/admin/edit-user-name`, {
        firstName, lastName, id
    });
}

const getUsersVideosNumber = () => {
    return axios.get(`${API_URL}/admin/get-users-videos-number`);
}

const getUsersParametersCompleted = () => {
    return axios.get(`${API_URL}/admin/get-users-parameters-completed`);
}

const getAdvancedUsersInfo = () => {
    return axios.get(`${API_URL}/admin/get-advanced-users-info`);
}

const getCustomFields = (lang) => {
    return axios.get(`${API_URL}/custom-field/get-all`, {
        params: {
            lang
        }
    });
}

const updateCustomFields = (data) => {
    return axios.post(`${API_URL}/custom-field/update`, data);
}

const updateCustomImages = (data, lang) => {
    const config = { headers: { 'Content-Type': 'multipart/form-data' } };
    let formData = new FormData();

    data.forEach((item, index) => {
        formData.append(`img${index+1}`, item.imageUpdated ? (item.img ? item.img.file : 'delete') : null);
    });

    data.append('lang', lang);

    return axios.post(`${API_URL}/custom-field/update-images`, formData, config);
}

const updateTerms = (terms, policy, cookies, language) => {
    return axios.post(`${API_URL}/custom-field/update-terms`, {
        terms,policy, cookies, language
    });
}

export { getAdminById, getAdminData, getClubs, getUsers, changeAdminPassword, banUser, unlockUser, deleteUser, changeUserName, getUsersVideosNumber, getUsersParametersCompleted, getAdvancedUsersInfo, getCustomFields, updateCustomFields, updateCustomImages, updateTerms }
