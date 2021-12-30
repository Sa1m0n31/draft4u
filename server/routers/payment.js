const express = require("express");
const router = express.Router();
const db = require("../database/db");
const got = require('got');
const crypto = require("crypto");
const { v4: uuidv4 } = require('uuid');

router.get("/get-payment-methods", (request, response) => {
    got.get("https://secure.przelewy24.pl/api/v1/payment/methods/pl", {
        responseType: 'json',
        headers: {
            'Authorization': `Basic ${process.env.PRZELEWY_24_AUTH_HEADER}`
        }
    })
        .then((res) => {
            response.send({
                result: res.body.data
            });
        })
});

router.post("/register-payment", (request, response) => {
    const { amount, method, email, userId } = request.body;

    const CLIENT_ID = process.env.PRZELEWY_24_CLIENT_ID;
    const CRC = process.env.PRZELEWY_24_CRC;

    let hash, data, gen_hash;
    const sessionId = uuidv4();
    hash = crypto.createHash('sha384');
    data = hash.update(`{"sessionId":"${sessionId}","merchantId":${CLIENT_ID},"amount":${parseFloat(amount)*100},"currency":"PLN","crc":"${CRC}"}`, 'utf-8');
    gen_hash = data.digest('hex');

    const query = 'INSERT INTO payments VALUES ($1, $2, $3)';
    const values = [userId, sessionId, amount];

    db.query(query, values, (err, res) => {
        if(res) {
            /* Dane */
            let postData;
            if(method !== -1) {
                postData = {
                    sessionId: sessionId,
                    posId: CLIENT_ID,
                    merchantId: CLIENT_ID,
                    amount: parseFloat(request.body.amount) * 100,
                    currency: "PLN",
                    description: "Platnosc za subskrypcje na portalu Draft4U",
                    email: email,
                    country: "PL",
                    language: "pl",
                    encoding: "utf-8",
                    method: method,
                    urlReturn: `${process.env.API_URL}/subskrypcja-przedluzona`,
                    urlStatus: `${process.env.API_URL}/payment/verify`,
                    sign: gen_hash
                };
            }
            else {
                postData = {
                    sessionId: sessionId,
                    posId: CLIENT_ID,
                    merchantId: CLIENT_ID,
                    amount: parseFloat(request.body.amount) * 100,
                    currency: "PLN",
                    description: "Platnosc za subskrypcje na portalu Draft4U",
                    email: email,
                    country: "PL",
                    language: "pl",
                    encoding: "utf-8",
                    urlReturn: `${process.env.API_URL}/subskrypcja-przedluzona`,
                    urlStatus: `${process.env.API_URL}/payment/verify`,
                    sign: gen_hash
                };
            }

            got.post("https://secure.przelewy24.pl/api/v1/transaction/register", {
                json: postData,
                responseType: 'json',
                headers: {
                    'Authorization': `Basic ${process.env.PRZELEWY_24_AUTH_HEADER}`
                }
            })
                .then((res) => {
                    let responseToClient = res.body.data.token;

                    response.send({
                        result: responseToClient,
                        sign: gen_hash
                    });
                });
        }
        else {
            response.send({
                result: 0
            });
        }
    });
});

router.post("/verify", (request, response) => {
    let { merchantId, posId, sessionId, amount, currency, orderId } = request.body;

    /* Calculate SHA384 checksum */
    let hash, data, gen_hash;
    hash = crypto.createHash('sha384');
    data = hash.update(`{"sessionId":"${sessionId}","orderId":${orderId},"amount":${amount},"currency":"PLN","crc":"${process.env.PRZELEWY_24_CRC}"}`, 'utf-8');
    gen_hash= data.digest('hex');

    got.put("https://secure.przelewy24.pl/api/v1/transaction/verify", {
        json: {
            merchantId,
            posId,
            sessionId,
            amount,
            currency,
            orderId,
            sign: gen_hash
        },
        responseType: 'json',
        headers: {
            'Authorization': `Basic ${process.env.PRZELEWY_24_AUTH_HEADER}`
        }
    })
        .then(res => {
            if(res.body.data.status === 'success') {
                const query = 'SELECT user_id FROM payments WHERE session_id = $1';
                const values = [sessionId];

                db.query(query, values, (err, res) => {
                    if(res) {
                        const { user_id } = res.rows[0];
                        const query = `UPDATE identities SET subscription = '2023-01-31' WHERE user_id = $1`;
                        const values = [user_id];

                        db.query(query, values, (err, res) => {
                            if(res) {
                                response.send({
                                    status: "OK"
                                });
                            }
                            else {
                                response.send({
                                    status: 0
                                });
                            }
                        });
                    }
                    else {
                        response.send({
                            status: 0
                        });
                    }
                });
            }
            else {
                response.send({
                    status: 0
                });
            }
        });
});

module.exports = router;
