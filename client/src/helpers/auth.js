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

const loginApple = () => {
    return axios.get(`${API_URL}/auth/apple`);
}

const registerUser = (email, password, firstName, lastName, sex, birthday, phoneNumber) => {
    return axios.post(`${API_URL}/auth/register-local`, {
        email, password, firstName, lastName, sex, birthday, phoneNumber
    });
}

const verifyUser = (token) => {
    return axios.get(`${API_URL}/auth/verification`, {
        params: {
            token
        }
    });
}

export { isLoggedIn, loginUser, loginFacebook, loginGoogle, loginApple, registerUser, verifyUser }
