const express = require("express");
const router = express.Router();
const db = require("../database/db");
const got = require('got');
const crypto = require("crypto");
const { v4: uuidv4 } = require('uuid');

const CLIENT_ID = '138354';
const CRC = 'ef7a62121d72feb8';
const API_KEY = '54786dbb9ffa663808ff4a15db32713f'

router.get("/get-payment-methods", (request, response) => {
    got.get("https://sandbox.przelewy24.pl/api/v1/payment/methods/pl", {
        responseType: 'json',
        headers: {
            'Authorization': 'Basic MTM4MzU0OjU0Nzg2ZGJiOWZmYTY2MzgwOGZmNGExNWRiMzI3MTNm' // tmp
        }
    })
        .then((res) => {
            console.log(res.body.data);
            response.send({
                result: res.body.data
            });
        })
});

router.post("/register-payment", (request, response) => {
    const { amount, method, email } = request.body;

    let hash, data, gen_hash;
    const sessionId = uuidv4();
    hash = crypto.createHash('sha384');
    data = hash.update(`{"sessionId":"${sessionId}","merchantId":${CLIENT_ID},"amount":${parseFloat(amount)*100},"currency":"PLN","crc":"${CRC}"}`, 'utf-8');
    gen_hash = data.digest('hex');

    /* Dane */
    let postData = {
        sessionId: sessionId,
        posId: CLIENT_ID,
        merchantId: CLIENT_ID,
        amount: parseFloat(request.body.amount) * 100,
        currency: "PLN",
        description: "Platnosc za subskrypcje na portalu Draft4U",
        email: email,
        country: "PL",
        language: "pl",
        method: method,
        urlReturn: "http://localhost:3000",
        urlStatus: "http://drafcik.skylo-test1.pl/payment/verify",
        sign: gen_hash
    };

    console.log(postData);

    got.post("https://sandbox.przelewy24.pl/api/v1/transaction/register", {
        json: postData,
        responseType: 'json',
        headers: {
            'Authorization': 'Basic MTM4MzU0OjU0Nzg2ZGJiOWZmYTY2MzgwOGZmNGExNWRiMzI3MTNm'
        }
    })
        .then((res) => {
            let responseToClient = res.body.data.token;

            response.send({
                result: responseToClient
            });
        });
});

router.post("/verify", (request, response) => {

});

module.exports = router;
