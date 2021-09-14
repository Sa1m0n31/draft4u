import axios from "axios";
import settings from "../settings";

const { API_URL } = settings;

const isLoggedIn = () => {
    return axios.get(`${API_URL}/auth/auth`);
}

const loginUser = (email, password) => {
    return axios.post(`http://localhost:5000/auth/login`, {
        username: email,
        password: password
    }, {
        withCredentials: true
    });
}

const loginFacebook = () => {
    return axios.get(`${API_URL}/auth/facebook`, {
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        withCredentials: true
    });
}

const loginGoogle = () => {
    return axios.get(`${API_URL}/auth/google`);
}

export { isLoggedIn, loginUser, loginFacebook, loginGoogle }
