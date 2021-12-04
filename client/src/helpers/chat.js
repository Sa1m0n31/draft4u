import axios from "axios";
import settings from "../settings";

const { API_URL } = settings;

const getChatContent = (id) => {
    return axios.get(`${API_URL}/chat/get-chat-content`, {
        params: {
            id
        }
    });
}

const getUserMessages = () => {
    return axios.get(`${API_URL}/chat/get-user-messages`, {
        withCredentials: true
    });
}

const getClubMessages = () => {
    return axios.get(`${API_URL}/chat/get-club-messages`, {
        withCredentials: true
    });
}

const addMessage = (chatId, content, isClub) => {
    return axios.post(`${API_URL}/chat/add-message`, {
        chatId, content, isClub
    });
}

const addImageToMessage = (chatId, image, isClub) => {
    const config = { headers: { 'Content-Type': 'multipart/form-data' }, withCredentials: true };
    let formData = new FormData();
    formData.append('image', image);
    formData.append('chatId', chatId);
    formData.append('isClub', isClub);

    return axios.post(`${API_URL}/chat/add-image-to-message`, formData, config);
}

const markAsRead = (chatId, isClub) => {
    return axios.post(`${API_URL}/chat/mark-as-read`, {
        chatId, isClub
    });
}

const isMessageRead = (chatId) => {
    return axios.get(`${API_URL}/chat/is-chat-read`, {
        params: {
            id: chatId
        }
    });
}

export { getChatContent, getUserMessages, getClubMessages, addMessage, markAsRead, addImageToMessage, isMessageRead }
