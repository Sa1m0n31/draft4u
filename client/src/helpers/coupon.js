import axios from "axios";
import settings from "../settings";

const { API_URL } = settings;

const getAllCoupons = () => {
    return axios.get(`${API_URL}/coupon/get-all`);
}

export { getAllCoupons }
