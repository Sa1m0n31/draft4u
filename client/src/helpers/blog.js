import axios from "axios";
import settings from "../settings";

const { API_URL } = settings;

const generateImageLink = (img) => {
    const config = { headers: { 'Content-Type': 'multipart/form-data' } };
    let formData = new FormData();
    formData.append('image', img);

    return axios.post(`${API_URL}/image/add`, formData, config);
}

const addArticle = (title, image, content) => {
    const config = { headers: { 'Content-Type': 'multipart/form-data' } };
    let formData = new FormData();
    formData.append('image', image);
    formData.append('title', title);
    formData.append('content', content);

    return axios.post(`${API_URL}/blog/add`, formData, config);
}

const updateArticle = (id, title, image, content) => {
    const config = { headers: { 'Content-Type': 'multipart/form-data' } };
    let formData = new FormData();
    formData.append('id', id);
    formData.append('image', image);
    formData.append('title', title);
    formData.append('content', content);

    return axios.post(`${API_URL}/blog/update`, formData, config);
}

const getAllArticles = () => {
    return axios.get(`${API_URL}/blog/get-all`);
}

const getArticle = (id) => {
    return axios.get(`${API_URL}/blog/get`, {
        params: {
            id
        }
    });
}

const deleteArticle = (id) => {
    return axios.delete(`${API_URL}/blog/delete`, {
        params: {
            id
        }
    });
}

export { generateImageLink, addArticle, updateArticle, getAllArticles, getArticle, deleteArticle }
