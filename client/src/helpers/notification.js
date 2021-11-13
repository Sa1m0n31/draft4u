import axios from "axios";
import settings from "../settings";

const { API_URL } = settings;

const addNotification = (title, link, content, img, receivers) => {
    const config = { headers: { 'Content-Type': 'multipart/form-data' } };
    let formData = new FormData();
    formData.append('title', title);
    formData.append('link', link);
    formData.append('content', content);
    formData.append('image', img);
    formData.append('receivers', receivers);

    return axios.post(`${API_URL}/notification/add`, formData, config);
}

const getAllNotifications = () => {
    return axios.get(`${API_URL}/notification/get-all`);
}

const getClubNotifications = () => {
    return axios.get(`${API_URL}/notification/get-club-notifications`, {
        withCredentials: true
    });
}

const getUserNotifications = () => {
    return axios.get(`${API_URL}/notification/get-user-notifications`, {
        withCredentials: true
    });
}

const readNotification = (notification) => {
    return axios.post(`${API_URL}/notification/read-notification`, {
        notification
    }, {
        withCredentials: true
    });
}

const updateNotification = (id, title, link, content, img, receivers) => {
    const config = { headers: { 'Content-Type': 'multipart/form-data' } };
    let formData = new FormData();
    formData.append('id', id);
    formData.append('title', title);
    formData.append('link', link);
    formData.append('content', content);
    formData.append('receivers', receivers);
    if(img) {
        if(img === 'delete') {
            formData.append('imgUpdate', 'delete');
        }
        else {
            formData.append('image', img);
            formData.append('imgUpdate', 'true');
        }
    }

    return axios.post(`${API_URL}/notification/update`, formData, config);
}

const deleteNotification = (id) => {
    return axios.delete(`${API_URL}/notification/delete`, {
        params: {
            id
        }
    });
}

const getNotification = (id) => {
    return axios.get(`${API_URL}/notification/get-single`, {
        params: {
            id
        }
    })
}

export { addNotification, updateNotification, getAllNotifications, getUserNotifications, getClubNotifications, readNotification, deleteNotification, getNotification }
