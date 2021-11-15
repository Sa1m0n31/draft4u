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

router.get("/get-club-by-id", (request, response) => {
   const id = request.query.id;

    const query = 'SELECT c.id, c.name, i.file_path FROM clubs c LEFT OUTER JOIN images i ON c.logo = i.id WHERE c.id = $1';
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

router.get("/get-all-players", (request, response) => {
   const query = 'SELECT u.id as user_id, u.first_name, u.salary_from, u.salary_to, u.sex, u.position, u.last_name, i.file_path, u.birthday, u.weight, u.height, u.block_range, u.attack_range, u.vertical_range FROM users u LEFT OUTER JOIN images i ON u.profile_picture = i.id';

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

router.get("/get-three-newest", (request, response) => {
   const club = request.user;

   const query = 'SELECT u.id as user_id, u.first_name, u.last_name, i.file_path, u.birthday, u.weight, u.height, u.block_range, u.attack_range, u.vertical_range, f.club_id FROM users u LEFT OUTER JOIN images i ON u.profile_picture = i.id LEFT OUTER JOIN favorites f ON f.user_id = u.id WHERE f.club_id = $1 OR f.club_id IS NULL ORDER BY u.id DESC LIMIT 3';
   const values = [club];

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

router.get("/get-three-favorites", (request, response) => {
    const club = request.user;

    const query = 'SELECT u.id, u.first_name, u.last_name, i.file_path, u.birthday, u.weight, u.height, u.block_range, u.attack_range, u.vertical_range FROM favorites f JOIN users u ON f.user_id = u.id LEFT OUTER JOIN images i ON u.profile_picture = i.id WHERE f.club_id = $1 ORDER BY f.created_at DESC LIMIT 3';
    const values = [club];

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

router.get("/get-favorites", (request, response) => {
    const club = request.user;

    const query = 'SELECT * FROM favorites f JOIN users u ON f.user_id = u.id WHERE f.club_id = $1 ORDER BY f.created_at';
    const values = [club];

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

router.get("/get-player-highlight", (request, response) => {
    const userId = request.query.player;

    const query = 'SELECT v.file_path FROM videos v JOIN users u ON v.user_id = u.id WHERE u.id = $1 AND v.video_category = 4';
    const values = [userId];

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

module.exports = router;
