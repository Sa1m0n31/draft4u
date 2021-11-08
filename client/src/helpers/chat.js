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

export { getChatContent, getUserMessages, getClubMessages, addMessage }
