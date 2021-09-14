const express = require("express");
const router = express.Router();
const db = require("../database/db");

router.get("/is-email-available", (request, response) => {
   const email = request.query.email;

   if(email) {
       const query = 'SELECT * FROM users WHERE email = $1';
       const values = [email];
       db.query(query, values, (err, res) => {
          if(res) {
              if(res.rowCount > 0) {
                  response.send({
                      result: 0
                  });
              }
              else {
                  response.send({
                      result: 1
                  });
              }
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

module.exports = router;
