const express = require("express");
const router = express.Router();
const db = require("../database/db");
const sendResponse = require("../helpers/sendResponse");

router.post("/add", (request, response) => {
   const { clubId, name, players } = request.body;

   const query = `INSERT INTO squads VALUES (nextval('squads_id_sequence'), $1, $2, NOW()) RETURNING id`;
   const values = [name, clubId];

   /* Add squad */
   db.query(query, values, (err, res) => {
      if(res) {
          /* Add players to squad */
          const squadId = res.rows[0];
          let query, values;
          if(players.length) {
              players.forEach((item, index, array) => {
                  query = 'INSERT INTO selected_players VALUES ($1, $2)';
                  values = [squadId, item];
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
});

router.put("/update", (request, response) => {
    const { id, name, players } = request.body;

    const query = 'UPDATE squads SET name = $1 WHERE id = $2';
    const values = [name, id];

    /* Update squad */
    db.query(query, values, (err, res) => {
        if(res) {
            /* 1 - Delete old players in squad */
            const query = 'DELETE FROM selected_players WHERE squad_id = $1';
            const values = [id];

            db.query(query, values, (err, res) => {
               if(res) {
                    /* 2 - Add new players to squad */
                   if(players) {
                       let query, values;
                       players.forEach((item, index, array) => {
                           query = 'INSERT INTO selected_players VALUES ($1, $2)';
                           values = [id, item];
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
        else {
            sendResponse(response, 0);
        }
    });
});

router.delete("/delete", (request, response) => {
   const id = request.query.id;

   if(id) {
       const query = 'DELETE FROM squads WHERE id = $1';
       const values = [id];
       db.query(query, values, (err, res) => {
           if(res) sendResponse(response, 1);
           else sendResponse(response, 0);
       });
   }
   else {
       sendResponse(response, 0);
   }
});

router.get("/get-club-squads", (request, response) => {
   const clubId = request.query.id;

   if(clubId) {
       const query = 'SELECT * FROM squads WHERE club = $1';
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
