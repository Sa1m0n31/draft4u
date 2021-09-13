import axios from "axios";
import settings from "../settings";

const { API_URL } = settings;

const loginUser = (email, password) => {
    return axios.post(`http://localhost:5000/auth/login`, {
        username: email,
        password: password
    });
}

export { loginUser }
