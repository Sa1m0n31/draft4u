const express = require("express");
const router = express.Router();
const db = require("../database/db");

router.post("/add", (request, response) => {

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
