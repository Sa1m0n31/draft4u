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

    const query = 'SELECT id.id as identity, u.id, u.id as user_id, u.email, u.first_name, u.last_name, u.sex, u.birthday, u.phone_number, u.attack_range, u.vertical_range, u.block_range, u.height, u.weight, u.salary_from, u.salary_to, u.licence_number, u.club, u.position, i.file_path FROM favorites f JOIN users u ON f.user_id = u.id JOIN identities id ON id.user_id = u.id LEFT OUTER JOIN images i ON i.id = u.profile_picture WHERE f.club_id = $1';
    const values = [clubId];

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

router.get("/is-player-favorite", (request, response) => {
   const userId = request.query.id;
   const club = request.user;

   const query = 'SELECT * FROM favorites WHERE user_id = $1 AND club_id = $2';
   const values = [userId, club];

   db.query(query, values, (err, res) => {
      if(res) {
          if(res.rows) {
              if(res.rows.length) {
                  response.send({
                      result: 1
                  });
              }
              else {
                  response.send({
                      result: 0
                  });
              }
          }
          else {
              response.send({
                  result: 0
              });
          }
      }
      else {
          response.send({
              result: 0
          });
      }
   });
});

router.get('/get-favorites-by-player', (request, response) => {
    const userId = request.user;

    const query = 'SELECT c.name, i.file_path FROM favorites f JOIN clubs c ON c.id = f.club_id JOIN users u ON u.id = f.user_id JOIN identities id ON id.user_id = u.id LEFT OUTER JOIN images i ON i.id = c.logo WHERE id.id = $1';
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
