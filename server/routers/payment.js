const express = require("express");
const router = express.Router();
const db = require("../database/db");
const got = require('got');
const crypto = require("crypto");
const { v4: uuidv4 } = require('uuid');

const CLIENT_ID = '138354';
const CRC = 'ef7a62121d72feb8';
const API_KEY = '0f29ea02277d56caa4696ad7838fb87f'

router.get("/get-payment-methods", (request, response) => {
    got.get("https://sandbox.przelewy24.pl/api/v1/payment/methods/pl", {
        responseType: 'json',
        headers: {
            'Authorization': 'Basic MTM4MzU0OjU0Nzg2ZGJiOWZmYTY2MzgwOGZmNGExNWRiMzI3MTNm' // tmp
        }
    })
        .then((res) => {
            response.send({
                result: res.body.data
            });
        })
});

router.post("/register-payment", (request, response) => {
    const { amount, method, email, userId, type } = request.body;
    let paymentType;

    if(type === 'miesięczny') paymentType = 1;
    else if(type === '3 miesięczny') paymentType = 2;
    else paymentType = 3;

    let hash, data, gen_hash;
    const sessionId = uuidv4();
    hash = crypto.createHash('sha384');
    data = hash.update(`{"sessionId":"${sessionId}","merchantId":${CLIENT_ID},"amount":${parseFloat(amount)*100},"currency":"PLN","crc":"${CRC}"}`, 'utf-8');
    gen_hash = data.digest('hex');

    const query = 'INSERT INTO payments VALUES ($1, $2, $3)';
    const values = [userId, sessionId, paymentType];

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
                    method: method,
                    urlReturn: "https://drafcik.skylo-test1.pl",
                    urlStatus: "https://drafcik.skylo-test1.pl/payment/verify",
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
                    urlReturn: "https://drafcik.skylo-test1.pl",
                    urlStatus: "https://drafcik.skylo-test1.pl/payment/verify",
                    sign: gen_hash
                };
            }

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
    data = hash.update(`{"sessionId":"${sessionId}","orderId":${orderId},"amount":${amount},"currency":"PLN","crc":"${CRC}"}`, 'utf-8');
    gen_hash= data.digest('hex');

    got.put("https://sandbox.przelewy24.pl/api/v1/transaction/verify", {
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
            'Authorization': 'Basic MTM4MzU0OjU0Nzg2ZGJiOWZmYTY2MzgwOGZmNGExNWRiMzI3MTNm' // tmp
        }
    })
        .then(res => {
            if(res.body.data.status === 'success') {
                const query = 'SELECT user_id, type FROM payments WHERE session_id = $1';
                const values = [sessionId];

                db.query(query, values, (err, res) => {
                    if(res) {
                        const { user_id, type } = res.rows[0];
                        let query = '';
                        const values = [type, user_id];

                        switch(type) {
                            case 1:
                                query = `UPDATE subscriptions SET expire = expire + INTERVAL '30 DAY', type = $1 WHERE user_id = $2`;
                                break;
                            case 2:
                                query = `UPDATE subscriptions SET expire = expire + INTERVAL '90 DAY', type = $1 WHERE user_id = $2`;
                                break;
                            default:
                                query = `UPDATE subscriptions SET expire = expire + INTERVAL '365 DAY', type = $1 WHERE user_id = $2`;
                                break;
                        }

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

router.post("/charge-card", (request, response) => {
   const { token, cardNumber, cardDate, cvv, clientName } = request.body;

   const postData = {
       transactionToken: token, cardNumber, cardDate: "042024", cvv, clientName
   }

   console.log(postData);

   response.send({
       result: postData
   });

   got.post("https://sandbox.przelewy24.pl/api/v1/card/pay", {
       json: postData,
       responseType: 'json',
       headers: {
           'Authorization': 'Basic MTM4MzU0OjU0Nzg2ZGJiOWZmYTY2MzgwOGZmNGExNWRiMzI3MTNm'
       }
   })
       .then((res) => {
          console.log(res.body);
          response.send({
              result: 1
          });
       });
});

module.exports = router;
