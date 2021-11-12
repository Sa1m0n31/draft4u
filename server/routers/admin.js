const express = require("express");
const router = express.Router();
const db = require("../database/db");

router.get("/get-admin-by-id", (request, response) => {
   const id = request.query.id;

   const query = 'SELECT login FROM admins WHERE id = $1';
   const values = [id];

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

router.get("/get-admin-data", (request, response) => {
    const adminId = request.user;

    if(adminId) {
        const query = 'SELECT login FROM admins WHERE id = $1';
        const values = [adminId];

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
    }
    else {
        response.send({
            result: 0
        });
    }
});

router.get("/get-clubs", (request, response) => {
   const query = 'SELECT * FROM clubs';

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

router.get("/get-users", (request, response) => {
    const query = 'SELECT i.id, i.user_id, u.first_name, u.last_name, u.email FROM users u JOIN identities i ON u.id = i.user_id';

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
