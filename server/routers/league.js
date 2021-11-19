const express = require("express");
const router = express.Router();
const db = require("../database/db");

router.get("/get", (request, response) => {
   const query = 'SELECT * FROM leagues';
   const values = [];

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

module.exports = router;
