const express = require("express");
const router = express.Router();
const db = require("../database/db");

router.post("/add", (request, response) => {
    const clubId = request.user;
    const userId = request.body.userId;

    const query = 'INSERT INTO visited VALUES ($1, $2, NOW())';
    const values = [clubId, userId];

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

module.exports = router;
