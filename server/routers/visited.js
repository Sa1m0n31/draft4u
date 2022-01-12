const express = require("express");
const router = express.Router();
const db = require("../database/db");

router.post("/add", (request, response) => {
    const clubId = request.user;
    const userId = request.body.userId;

    const query = 'INSERT INTO visited VALUES ($1, $2, NOW()) ON CONFLICT(club_id, user_id) DO UPDATE SET created_at = NOW()';
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

router.get("/get-visited-by-player", (request, response) => {
   const userId = request.user;

   const query = 'SELECT c.name, i.file_path FROM visited v JOIN clubs c ON c.id = v.club_id JOIN users u ON u.id = v.user_id JOIN identities id ON id.user_id = u.id LEFT OUTER JOIN images i ON i.id = c.logo WHERE id.id = $1 ORDER BY v.created_at DESC';
   const values = [userId];

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
