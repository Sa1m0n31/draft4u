const express = require("express");
const router = express.Router();
const db = require("../database/db");

router.get("/get-all", (request, response) => {
    const query = 'SELECT c.id, c.name, c.x, c.y, c.league, l.sex, i.file_path FROM clubs c JOIN images i ON c.logo = i.id JOIN leagues l ON c.league = l.id';
    db.query(query, (err, res) => {
       if(res) {
            response.send({
                result: res.rows
            })
       }
       else {
           response.send({
               result: 0
           });
       }
    });
});

module.exports = router;
