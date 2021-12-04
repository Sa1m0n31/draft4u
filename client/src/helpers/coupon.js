import axios from "axios";
import settings from "../settings";

const { API_URL } = settings;

const getAllCoupons = () => {
    return axios.get(`${API_URL}/coupon/get-all`);
}

const getCoupon = (id) => {
    return axios.get(`${API_URL}/coupon/get`, {
        params: {
            id
        }
    });
}

const addCoupon = (title, discount, from, to, limit) => {
    return axios.post(`${API_URL}/coupon/add`, {
        title, discount, from, to, limit
    });
}

const updateCoupon = (id, title, discount, from, to, limit) => {
    return axios.post(`${API_URL}/coupon/update`, {
        id, title, discount, from, to, limit
    });
}

const deleteCoupon = (id) => {
    return axios.delete(`${API_URL}/coupon/delete`, {
        params: {
            id
        }
    });
}

export { getAllCoupons, getCoupon, addCoupon, updateCoupon, deleteCoupon }
