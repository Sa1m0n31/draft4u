import axios from "axios";
import settings from "../settings";

const { API_URL } = settings;

const addComment = (postId, userId, clubId, content) => {
    return axios.post(`${API_URL}/post/add-comment`, {
        postId, userId, clubId, content
    });
}

const addPost = (userId, clubId, content, image) => {
    const config = { headers: { 'Content-Type': 'multipart/form-data' } };
    let formData = new FormData();
    formData.append('userId', userId);
    formData.append('clubId', clubId);
    formData.append('content', content);
    formData.append('image', image);

    return axios.post(`${API_URL}/post/add`, formData, config);
}

const deleteComment = (id) => {
    return axios.delete(`${API_URL}/post/delete-comment`, {
        params: {
            id
        }
    });
}

const deletePost = (id) => {
    return axios.delete(`${API_URL}/post/delete`, {
        params: {
            id
        }
    });
}

const getPosts = (page) => {
    return axios.get(`${API_URL}/post/get`, {
        params: {
            page
        }
    });
}

export { addComment, addPost, deleteComment, deletePost, getPosts }
