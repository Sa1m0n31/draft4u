const express = require("express");
const router = express.Router();
const db = require("../database/db");

router.post("/add", (request, response) => {
    const { title, discount, from, to, limit } = request.body;

    const query = `INSERT INTO coupons VALUES (nextval('coupons_id'), $1, $2, $3, $4, $5)`;
    const values = [title, discount, from, to, limit];

    db.query(query, values, (err, res) => {
        if(res) {
            response.send({
                result: 1
            });
        }
        else {
            response.send({
                result: 0
            });
        }
    });
});

router.post("/update", (request, response) => {
   const { id, title, discount, from, to, limit } = request.body;

   const query = 'UPDATE coupons SET name = $1, discount = $2, from = $3, to = $4, use_limit = $5 WHERE id = $6';
   const values = [title, discount, from, to, limit, id];

    db.query(query, values, (err, res) => {
        if(res) {
            response.send({
                result: 1
            });
        }
        else {
            response.send({
                result: 0
            });
        }
    });
});

router.delete("/delete", (request, response) => {
    const id = request.query.id;

    const query = 'DELETE FROM coupons WHERE id = $1';
    const values = [id];

    db.query(query, values, (err, res) => {
        if(res) {
            response.send({
                result: 1
            });
        }
        else {
            response.send({
                result: 0
            });
        }
    })
})

router.get("/get", (request, response) => {
   const id = request.query.id;

   const query = 'SELECT * FROM coupons WHERE id = $1';
   const values = [id];

    db.query(query, values, (err, res) => {
        if(res) {
            response.send({
                result: res.rows
            });
        }
        else {
            response.send({
                result: 0
            });
        }
    });
});

router.get("/get-all", (request, response) => {
    const query = 'SELECT * FROM coupons';

    db.query(query, [], (err, res) => {
       if(res) {
           response.send({
               result: res.rows
           });
       }
       else {
           response.send({
               result: 0
           });
       }
    });
});

module.exports = router;
