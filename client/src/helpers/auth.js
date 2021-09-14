import axios from "axios";
import settings from "../settings";

const { API_URL } = settings;

const loginUser = (email, password) => {
    return axios.post(`http://localhost:5000/auth/login`, {
        username: email,
        password: password
    });
}

const loginFacebook = () => {
    return axios.get(`${API_URL}/auth/facebook`, {
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    });
}

const loginGoogle = () => {
    return axios.get(`${API_URL}/auth/google`);
}

export { loginUser, loginFacebook, loginGoogle }
