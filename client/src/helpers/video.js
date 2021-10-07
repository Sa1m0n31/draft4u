import axios from "axios";
import settings from "../settings";

const { API_URL } = settings;

const uploadVideo = (file, userId, play) => {
    const config = { headers: { 'Content-Type': 'multipart/form-data' } };
    let formData = new FormData();
    formData.append('file', file);
    formData.append('userId', userId);
    formData.append('play', play);

    return axios.post(`${API_URL}/video/upload`, formData, config)
}

const getUserVideos = (userId) => {
    return axios.get(`${API_URL}/video/get-user-videos`, {
        params: {
            id: userId
        }
    });
}

export { uploadVideo, getUserVideos }
