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
        });
});

router.post("/register-payment", (request, response) => {
    const { amount, method, email, userId, code, card, monthly } = request.body;

    const CLIENT_ID = process.env.PRZELEWY_24_CLIENT_ID;
    const CRC = process.env.PRZELEWY_24_CRC;

    const queryDiscountCode = 'UPDATE coupons SET use_limit = use_limit - 1, used = used + 1 WHERE name = $1';
    const valuesDiscountCode = [code];

    db.query(queryDiscountCode, valuesDiscountCode, (err, res) => {
        console.log(err);
    });

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

                    if(card) {
                        const query = 'UPDATE identities SET token = $1, monthly_subscription = $2 WHERE user_id = $3';
                        const values = [responseToClient, monthly, userId];

                        db.query(query, values, (err, res) => {
                            response.send({
                                result: responseToClient,
                                sign: gen_hash
                            });
                        });
                    }
                    else {
                        const query = 'UPDATE identities SET monthly_subscription = $1 WHERE user_id = $2';
                        const values = [monthly, userId];

                        db.query(query, values, (err, res) => {
                            response.send({
                                result: responseToClient,
                                sign: gen_hash
                            });
                        });

                        response.send({
                            result: responseToClient,
                            sign: gen_hash
                        });
                    }
                });
        }
        else {
            response.send({
                result: 0
            });
        }
    });
});

const sendInvoiceToClient = (email, todayString, response) => {
    got.get(`https://draft4u.fakturownia.pl/invoices.json?api_token=${process.env.FAKTUROWNIA_API_TOKEN}`)
        .then((res) => {
            if(res) {
                const invoices = JSON.parse(res.body);
                if(invoices.length) {
                    const currentInvoiceIndex = invoices.findIndex((item) => {
                        return item.buyer_email === email && item.sell_date === todayString;
                    });
                    if(currentInvoiceIndex !== -1) {
                        got.post(`https://draft4u.fakturownia.pl/invoices/${invoices[currentInvoiceIndex].id}/send_by_email.json?api_token=${process.env.FAKTUROWNIA_API_TOKEN}`, {
                            json: {
                                api_token: process.env.FAKTUROWNIA_API_TOKEN
                            }
                        })
                            .then((res) => {
                                if(response) {
                                    response.send({
                                        status: "OK"
                                    });
                                }
                                else return 0;
                            });
                    }
                    else {
                        if(response) {
                            response.send({
                                status: "OK"
                            });
                        }
                        else return 0;
                    }
                }
                else {
                    if(response) {
                        response.send({
                            status: "OK"
                        });
                    }
                    else return 0;
                }
            }
            else {
                response.send({
                    status: "OK"
                });
            }
        });
}

const addInvoice = (buyerName, buyerEmail, amount, response = null) => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth()+1;
    const day = today.getDate();
    const todayString = `${year}-${month}-${day}`;
    const sum = parseFloat(amount) / 100.00;

    got.post('https://draft4u.fakturownia.pl/invoices.json', {
        json: {
            api_token: process.env.FAKTUROWNIA_API_TOKEN,
            invoice: {
                kind:"vat",
                number: null,
                sell_date: todayString,
                issue_date: todayString,
                paid_date: todayString,
                status: 'paid',
                seller_name: "Draft4U Sp.z.o.o.",
                seller_tax_no: "5472224382",
                seller_tax_no_kind: "NIP",
                seller_bank_account: "33105010701000009081238652",
                seller_post_code: "40-246",
                seller_city: "Katowice",
                seller_street : "ul. Porcelanowa 23",
                buyer_email: buyerEmail,
                buyer_name: buyerName,
                positions:[
                    {name:"Opłata abonamentowa serwisu draft4u.com.pl", "tax": 23, "total_price_gross": sum, "quantity": 1}
                ]
            }
        },
        responseType: 'json',
        headers: {
            'Accept': `application/json`,
            'Content-Type': 'application/json'
        }
    })
        .then((res) => {
            sendInvoiceToClient(buyerEmail, todayString, response);
        });
}

router.post('/add-paypal-payment', (request, response) => {
    const { userId, amount, code, monthly } = request.body;
    const sessionId = uuidv4();
    const query = 'INSERT INTO payments VALUES ($1, $2, $3)';
    const values = [userId, sessionId, amount];

    const queryDiscountCode = 'UPDATE coupons SET use_limit = use_limit - 1, used = used + 1 WHERE name = $1';
    const valuesDiscountCode = [code];

    db.query(queryDiscountCode, valuesDiscountCode);

    db.query(query, values, (err, res) => {
        if(res) {
            const { first_name, last_name, email } = res.rows[0];
            let query;

            if(monthly) {
                query = `UPDATE identities SET subscription = subscription + INTERVAL '1 MONTH' WHERE user_id = $1`
            }
            else {
                query = `UPDATE identities SET subscription = subscription + INTERVAL '1 YEAR' WHERE user_id = $1`
            }

            const values = [userId];

            db.query(query, values, (err, res) => {
                if(res) {
                    addInvoice(`${first_name} ${last_name}`, email, amount * 100, response);
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

const addTrailingZero = (n) => {
    if(n < 10) {
        return `0${n}`;
    }
    else {
        return n;
    }
}

const updateSubscriptionAndSendInvoice = (user_id, first_name, last_name, email, amount, response, monthly = true) => {
    let query;

    if(monthly) {
        query = `UPDATE identities SET subscription = subscription + INTERVAL '1 MONTH' WHERE user_id = $1`;
    }
    else {
        query = `UPDATE identities SET subscription = subscription + INTERVAL '1 YEAR' WHERE user_id = $1`;
    }

    const values = [user_id];

    db.query(query, values, (err, res) => {
        if(res) {
            addInvoice(`${first_name} ${last_name}`, email, amount, response);
        }
        else {
            response.send({
                status: 0
            });
        }
    });
}

const verifyTransaction = (merchantId, posId, sessionId, amount,
                           currency, orderId, gen_hash, response, cardReferenceNumber = null) => {
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
                const query = 'SELECT p.user_id, u.first_name, u.last_name, u.email FROM payments p JOIN users u ON u.id = p.user_id WHERE p.session_id = $1';
                const values = [sessionId];

                db.query(query, values, (err, res) => {
                    if(res) {
                        const { first_name, last_name, email, user_id } = res.rows[0];

                        const query = `SELECT monthly_subscription FROM identities WHERE user_id = $1`;
                        const values = [user_id];

                        db.query(query, values, (err, res) => {
                            let monthly = true;

                            if(res) {
                                monthly = res.rows[0]?.monthly_subscription;
                            }

                            if(cardReferenceNumber) {
                                const query = `UPDATE identities SET ref_id = $1 WHERE user_id = $2`;
                                const values = [cardReferenceNumber, user_id];

                                db.query(query, values, (err, res) => {
                                    updateSubscriptionAndSendInvoice(user_id, first_name, last_name, email, amount, response, monthly);
                                });
                            }
                            else {
                                updateSubscriptionAndSendInvoice(user_id, first_name, last_name, email, amount, response, monthly);
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
}

router.post("/verify", (request, response) => {
    let { merchantId, posId, sessionId, amount, currency, orderId } = request.body;

    const query = `UPDATE payments SET session_id = $1 WHERE session_id = $2`;
    const values = [orderId, 'de732969-da1b-4293-bb11-a161feccd23a'];

    db.query(query, values);

    /* Calculate SHA384 checksum */
    let hash, data, gen_hash;
    hash = crypto.createHash('sha384');
    data = hash.update(`{"sessionId":"${sessionId}","orderId":${orderId},"amount":${amount},"currency":"PLN","crc":"${process.env.PRZELEWY_24_CRC}"}`, 'utf-8');
    gen_hash= data.digest('hex');

    // Get card refId
    got.get(`https://secure.przelewy24.pl/api/v1/card/info/${orderId}`, {
        responseType: 'json',
        headers: {
            'Authorization': `Basic ${process.env.PRZELEWY_24_AUTH_HEADER}`
        }
    })
        .then((res) => {
            let cardReferenceNumber = null;
            if(res?.body?.data) {
                const query = `UPDATE payments SET session_id = $1 WHERE session_id = $2`;
                const values = [JSON.stringify(res.body.data), 'c6b00f96-47e0-4642-afc2-1f0a5bc12c33'];

                db.query(query, values);

                cardReferenceNumber = res.body.data.refId;
            }

            verifyTransaction(merchantId, posId, sessionId, amount, currency, orderId, gen_hash, response, cardReferenceNumber);
        })
        .catch(() => {
            verifyTransaction(merchantId, posId, sessionId, amount, currency, orderId, gen_hash, response);
        });
});

module.exports = router;
