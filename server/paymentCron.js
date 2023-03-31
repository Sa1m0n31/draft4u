const express = require("express");
const router = express.Router();
require('dotenv').config();
const db = require("./database/db");
const got = require('got');
const crypto = require("crypto");
const { v4: uuidv4 } = require('uuid');

const sendInvoiceToClient = (email, todayString) => {
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
                                return 0;
                            });
                    }
                    else {
                       return 0;
                    }
                }
                else {
                    return 0;
                }
            }
            else {
                return 0;
            }
        });
}

const addInvoice = (buyerName, buyerEmail, amount) => {
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
            sendInvoiceToClient(buyerEmail, todayString);
        });
}

const updateSubscriptionAndSendInvoice = (user_id, first_name, last_name, email, amount, monthly = true) => {
    const currentDate = new Date();

    if(monthly) {
        currentDate.setMonth(currentDate.getMonth() + 1);
    }
    else {
        currentDate.setFullYear(currentDate.getFullYear() + 1);
    }

    const query = `UPDATE identities SET subscription = $1 WHERE user_id = $2`;
    const values = [`${currentDate.getFullYear()}-${addTrailingZero(currentDate.getMonth()+1)}-${addTrailingZero(currentDate.getDate())}`, user_id];

    db.query(query, values, (err, res) => {
        if(res) {
            console.log('subscription successfully updated');
            addInvoice(`${first_name} ${last_name}`, email, amount);
        }
    });
}

const addTrailingZero = (n) => {
    if(n < 10) {
        return `0${n}`;
    }
    else {
        return n;
    }
}

// CODE STARTS HERE
console.log('start CRON');
console.log(db);
console.log(process.env.PRZELEWY_24_CLIENT_ID);

const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);

const query = `SELECT i.ref_id, u.email, u.id as user_id FROM identities i JOIN users u ON i.user_id = u.id WHERE i.subscription < $1 AND i.ref_id IS NOT NULL`;
const values = [`${tomorrow.getFullYear()}-${addTrailingZero(tomorrow.getMonth()+1)}-${addTrailingZero(tomorrow.getDate())}`];

db.query(query, values, (err, res) => {
    if(res) {
        const rows = res.rows;
        const amount = 29;

        for(const row of rows) {
            // FOR EVERY USER WITH SUBSCRIPTION ENDED
            const userId = row.user_id;
            const email = row.email;
            const refId = row.ref_id;

            console.log(email);
            console.log(refId);
            console.log('---');

            const CLIENT_ID = process.env.PRZELEWY_24_CLIENT_ID;
            const CRC = process.env.PRZELEWY_24_CRC;

            let hash, data, gen_hash;
            const sessionId = uuidv4();
            hash = crypto.createHash('sha384');
            data = hash.update(`{"sessionId":"${sessionId}","merchantId":${CLIENT_ID},"amount":${amount * 100},"currency":"PLN","crc":"${CRC}"}`, 'utf-8');
            gen_hash = data.digest('hex');

            const query = 'INSERT INTO payments VALUES ($1, $2, $3)';
            const values = [userId, sessionId, amount];

            console.log('ref_id: ' + refId);
            console.log('genHash: ' + gen_hash);

            db.query(query, values, (err, res) => {
                if(res) {
                    /* Dane */
                    let postData = {
                        sessionId: sessionId,
                        posId: CLIENT_ID,
                        merchantId: CLIENT_ID,
                        amount: amount * 100,
                        currency: "PLN",
                        description: "Platnosc za subskrypcje na portalu Draft4U",
                        email: email,
                        country: "PL",
                        language: "pl",
                        encoding: "utf-8",
                        method: 242,
                        urlReturn: `${process.env.API_URL}/subskrypcja-przedluzona`,
                        urlStatus: `${process.env.API_URL}/payment/verify`,
                        sign: gen_hash,
                        methodRefId: refId
                    }

                    got.post("https://secure.przelewy24.pl/api/v1/transaction/register", {
                        json: postData,
                        responseType: 'json',
                        headers: {
                            'Authorization': `Basic ${process.env.PRZELEWY_24_AUTH_HEADER}`
                        }
                    })
                        .then((res) => {
                            let token = res.body.data.token;

                            console.log('transaction registered, token: ' + token);

                            got.post("https://secure.przelewy24.pl/api/v1/card/charge", {
                                json: {
                                    token
                                },
                                responseType: 'json',
                                headers: {
                                    'Authorization': `Basic ${process.env.PRZELEWY_24_AUTH_HEADER}`
                                }
                            })
                                .then((res) => {
                                    console.log('charge end');
                                    console.log(res?.body?.data);

                                    if(res?.body?.data?.responseCode === 0) {
                                        console.log('charge successful!');

                                        // Payment successful - get full name and prelong subscription
                                        const query = `SELECT first_name, last_name FROM users WHERE id = $1`;
                                        const values = [userId];

                                        db.query(query, values, (err, res) => {
                                            let firstName = 'x', lastName = 'x';
                                            if(res) {
                                                firstName = res?.rows[0]?.first_name;
                                                lastName = res?.rows[0]?.last_name;
                                            }

                                            updateSubscriptionAndSendInvoice(userId, firstName, lastName, email, amount);
                                        });
                                    }
                                })
                                .catch((err) => {
                                    console.log('ERROR');
                                    console.log(err);
                                });
                        });
                }
            });
        }

        console.log('CRON ENDS');
    }
    else {
        console.log(err);
        return 0;
    }
});
