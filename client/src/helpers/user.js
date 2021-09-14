import axios from "axios";
import settings from "../settings";

const { API_URL } = settings;

const isEmailAvailable = (email) => {
    return axios.get(`${API_URL}/user/is-email-available`, {
        params: {
            email
        }
    })
}

export { isEmailAvailable }
