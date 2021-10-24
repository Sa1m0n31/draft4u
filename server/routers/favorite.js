const express = require("express");
const router = express.Router();
const db = require("../database/db");

router.post("/add", (request, response) => {
   const clubId = request.user;
   const userId = request.body.userId;

   const query = 'INSERT INTO favorites VALUES ($1, $2, NOW())';
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

router.delete("/delete", (request, response) => {
    const clubId = request.user;
    const userId = request.query.userId;

    const query = 'DELETE FROM favorites WHERE club_id = $1 AND user_id = $2';
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
    })
});

router.get("/get-favorites-by-club", (request, response) => {
    const clubId = request.user;

    console.log(clubId);

    const query = 'SELECT * FROM favorites WHERE club_id = $1';
    const values = [clubId];

    db.query(query, values, (err, res) => {
       if(res) {
           console.log(res.rows);
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
