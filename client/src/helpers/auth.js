import axios from "axios";
import settings from "../settings";

const { API_URL } = settings;

const isLoggedIn = () => {
    return axios.get(`${API_URL}/auth/auth`, {
        withCredentials: true
    });
}

const loginUser = (email, password) => {
    return axios.post(`${API_URL}/auth/login`, {
        username: email,
        password: password
    }, {
        headers: {
            'Access-Control-Allow-Origin': 'http://localhost:3000'
        },
        withCredentials: true
    });
}

const loginFacebook = () => {
    return axios.post(`${API_URL}/auth/facebook`, {
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        withCredentials: true
    })
        .then(res => {
            console.log(res.data.result);
        });
}

const loginGoogle = () => {
    return axios.get(`${API_URL}/auth/google`)
        .then(res => {
            console.log("hi");
            console.log(res);
        })
        .catch(err => {
            console.log(err);
            console.log("err");
        })
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

const logoutUser = () => {
    return axios.get(`${API_URL}/auth/logout`);
}

export { isLoggedIn, loginUser, loginFacebook, loginGoogle, loginApple, registerUser, verifyUser, logoutUser }
