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

router.get("/get-club-data", (request, response) => {
   const clubId = request.user;

   const query = 'SELECT c.id, c.name, c.x, c.y, i.file_path FROM clubs c JOIN images i ON c.logo = i.id WHERE c.id = $1';
   const values = [clubId];

   db.query(query, values, (err, res) => {
      if(res) {
          response.send({
              result: res.rows[0]
          });
      }
      else {
          response.send({
              result: 0
          });
      }
   });
});

router.get("/get-all-players", (request, response) => {
   const query = 'SELECT u.id as user_id, * FROM users u LEFT OUTER JOIN images i ON u.profile_picture = i.id';

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
