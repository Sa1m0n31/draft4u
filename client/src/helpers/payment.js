import axios from "axios";
import settings from "../settings";

const { API_URL } = settings;

const getPaymentMethods = () => {
    return axios.get(`${API_URL}/payment/get-payment-methods`);
}

const registerPayment = (amount, method, email, userId, type) => {
    return axios.post(`${API_URL}/payment/register-payment`, {
        amount, method, email, userId, type
    });
}

const chargeCard = (token, cardNumber, cardDate, cvv, clientName) => {
    return axios.post(`${API_URL}/payment/charge-card`, {
        token, cardNumber, cardDate, cvv, clientName
    });
}

export { getPaymentMethods, registerPayment, chargeCard }
