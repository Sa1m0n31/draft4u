const express = require("express");
const router = express.Router();
const db = require("../database/db");
const sendResponse = require("../helpers/sendResponse");

const addSquad = (players, name, clubId, response) => {
    console.log("addSquad");
    const query = `INSERT INTO squads VALUES (nextval('squads_id_sequence'), $1, $2, NOW()) RETURNING id`;
    const values = [name, clubId];

    /* Add squad */
    db.query(query, values, (err, res) => {
        if(res) {
            /* Add players to squad */
            const squadId = res.rows[0].id;
            let query, values;
            if(players.length) {
                players.forEach((item, index, array) => {
                    query = 'INSERT INTO selected_players VALUES ($1, $2)';
                    values = [squadId, item.id];
                    db.query(query, values);
                    if(index === array.length-1) {
                        sendResponse(response, 1);
                    }
                });
            }
            else {
                sendResponse(response, 1);
            }
        }
        else {
            sendResponse(response, 0);
        }
    });
}

const updateSquad = (id, name, players, response) => {
    console.log("updateSquad");
    console.log(id);
    const query = 'UPDATE squads SET name = $1 WHERE id = $2';
    const values = [name, id];

    /* Update squad */
    db.query(query, values, (err, res) => {
        if(res) {
            /* 1 - Delete old players in squad */
            const query = 'DELETE FROM selected_players WHERE squad_id = $1';
            const values = [id];

            db.query(query, values, (err, res) => {
                console.log(err);
                if(res) {
                    /* 2 - Add new players to squad */
                    if(players) {
                        console.log(players);
                        let query, values;
                        players.forEach((item, index, array) => {
                            if(item) {
                                query = 'INSERT INTO selected_players VALUES ($1, $2)';
                                values = [id, item.id];
                                db.query(query, values);
                            }
                            if(index === array.length-1) {
                                sendResponse(response, 2);
                            }
                        });
                    }
                    else {
                        sendResponse(response, 2);
                    }
                }
                else {
                    sendResponse(response, 0);
                }
            });
        }
        else {
            sendResponse(response, 0);
        }
    });
}

router.post("/add", (request, response) => {
   const { name, players } = request.body;
   const clubId = request.user;

   /* If squad exists => update */
   const checkQuery = 'SELECT id FROM squads WHERE name = $1 AND club = $2';
   const checkValues = [name, clubId];

   db.query(checkQuery, checkValues, (err, res) => {
      if(res) {
          if(res.rows) {
              if(res.rows.length) {
                  updateSquad(res.rows[0].id, name, players, response);
              }
              else {
                  addSquad(players, name, clubId, response);
              }
          }
          else {
              addSquad(players, name, clubId, response);
          }
      }
      else {
          addSquad(players, name, clubId, response);
      }
   });
});

router.delete("/delete", (request, response) => {
   const id = request.query.id;

   console.log(id);

   if(id) {
       const query = 'DELETE FROM selected_players WHERE squad_id = $1';
       const values = [id];
       db.query(query, values, (err, res) => {
           console.log(err);
           if(res) {
               const query = 'DELETE FROM squads WHERE id = $1';
               const values = [id];
               db.query(query, values, (err, res) => {
                   console.log(err);
                   if(res) sendResponse(response, 1);
                   else sendResponse(response, 0);
               })
           }
           else sendResponse(response, 0);
       });
   }
   else {
       sendResponse(response, 0);
   }
});

router.get("/get", (request, response) => {
    const id = request.query.id;

    const query = 'SELECT u.attack_range, u.birthday, u.block_range, u.club, u.email, i.file_path, u.height, u.id, u.last_name, u.first_name, u.licence_number, u.phone_number, u.position, u.salary_from, u.salary_to, u.sex, u.weight, u.vertical_range, s.name FROM squads s JOIN selected_players sp ON s.id = sp.squad_id JOIN users u ON u.id = sp.user_id LEFT OUTER JOIN images i ON i.id = u.profile_picture WHERE s.id = $1';
    const values = [id];

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

router.get("/get-club-squads", (request, response) => {
   const clubId = request.user;

   if(clubId) {
       const query = 'SELECT sp.squad_id, sp.user_id, s.name, s.created_at, p.name as position, u.first_name, u.last_name, u.salary_from, u.salary_to, i.file_path FROM squads s JOIN selected_players sp ON s.id = sp.squad_id JOIN users u ON sp.user_id = u.id LEFT OUTER JOIN positions p ON u.position = p.id LEFT OUTER JOIN images i ON i.id = u.profile_picture WHERE s.club = $1 ORDER BY s.created_at DESC';
       const values = [clubId];
       db.query(query, values, (err, res) => {
          if(res) sendResponse(response, res.rows);
          else sendResponse(response, 0);
       });
   }
   else {
       sendResponse(response, 0);
   }
});

module.exports = router;
