import axios from "axios";
import settings from "../settings";

const { API_URL } = settings;

const getPaymentMethods = () => {
    return axios.get(`${API_URL}/payment/get-payment-methods`);
}

const registerPayment = (amount, method, email) => {
    return axios.post(`${API_URL}/payment/register-payment`, {
        amount, method, email
    });
}

export { getPaymentMethods, registerPayment }
