import axios from "axios";
import settings from "../settings";

const { API_URL } = settings;

const generateImageLink = (img) => {
    const config = { headers: { 'Content-Type': 'multipart/form-data' } };
    let formData = new FormData();
    formData.append('image', img);

    return axios.post(`${API_URL}/image/add`, formData, config);
}

const addArticle = (title, image, content, excerpt) => {
    const config = { headers: { 'Content-Type': 'multipart/form-data' } };
    let formData = new FormData();
    formData.append('image', image);
    formData.append('title', title);
    formData.append('content', content);
    formData.append('excerpt', excerpt);

    return axios.post(`${API_URL}/blog/add`, formData, config);
}

const updateArticle = (id, title, image, content, excerpt) => {
    const config = { headers: { 'Content-Type': 'multipart/form-data' } };
    let formData = new FormData();
    formData.append('id', id);
    formData.append('title', title);
    formData.append('content', content);
    formData.append('excerpt', excerpt);
    if(image) {
        if(image === 'delete') {
            formData.append('imgUpdate', 'delete');
        }
        else {
            formData.append('image', image);
            formData.append('imgUpdate', 'true');
        }
    }

    return axios.post(`${API_URL}/blog/update`, formData, config);
}

const getAllArticles = () => {
    return axios.get(`${API_URL}/blog/get-all`);
}

const getLastArticle = () => {
    return axios.get(`${API_URL}/blog/get-last-article`);
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

const getArticleBySlug = (slug) => {
    return axios.get(`${API_URL}/blog/get-article-by-slug`, {
        params: {
            slug
        }
    });
}

export { generateImageLink, addArticle, updateArticle, getAllArticles, getArticle, deleteArticle, getLastArticle, getArticleBySlug }
