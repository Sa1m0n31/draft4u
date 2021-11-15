const express = require("express");
const router = express.Router();
const db = require("../database/db");

router.get("/get-user-messages", (request, response) => {
    const query = `SELECT m.chat_id, m.content, m.created_at, c.name, img.file_path, rm.read_at, m.type FROM
                    (
                        SELECT *, ROW_NUMBER() OVER(PARTITION BY chat_id ORDER BY created_at DESC) AS row
                        FROM messages
                    ) AS m
                    JOIN clubs c ON SPLIT_PART(m.chat_id, ';', 1) = c.id
                    LEFT OUTER JOIN read_messages rm ON m.chat_id = rm.chat_id
                    LEFT OUTER JOIN images img ON c.logo = img.id
                    WHERE SPLIT_PART(m.chat_id, ';', 2) = $1 AND m.row = 1 ORDER BY m.created_at DESC, rm.type DESC`;
    const values = [request.user];

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

router.get("/get-club-messages", (request, response) => {
    const { user } = request;

    const query = `SELECT m.chat_id, m.content, m.created_at, u.first_name, u.last_name, img.file_path, rm.read_at, m.type FROM
                    (
                        SELECT *, ROW_NUMBER() OVER(PARTITION BY chat_id ORDER BY created_at DESC) AS row
                        FROM messages
                    ) AS m
                    JOIN identities i ON SPLIT_PART(m.chat_id, ';', 2) = i.id
                    JOIN users u ON i.user_id = u.id
                    LEFT OUTER JOIN read_messages rm ON m.chat_id = rm.chat_id
                    LEFT OUTER JOIN images img ON u.profile_picture = img.id
                    WHERE SPLIT_PART(m.chat_id, ';', 1) = $1 AND m.row = 1 ORDER BY m.created_at DESC, rm.type ASC`;
    const values = [user];

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

router.get("/get-chat-content", (request, response) => {
   const chatId = request.query.id;

   const query = 'SELECT chat_id, content, created_at, type FROM messages WHERE chat_id = $1';
   const values = [chatId];

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

router.post("/add-message", (request, response) => {
   const { chatId, content, isClub } = request.body;
   let club = false;

   if(isClub === 'true') club = true;

   const query = `INSERT INTO messages VALUES (nextval('message_id_sequence'), $1, $2, NOW() + INTERVAL '2 HOUR', $3)`;
   const values = [chatId, content, club];

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

router.post("/mark-as-read", (request, response) => {
    const { chatId, isClub } = request.body;

    let club = false;
    if(isClub === 'true') club = true;

    const query = `INSERT INTO read_messages VALUES ($1, NOW() + INTERVAL '2 HOUR', $2) ON CONFLICT (chat_id, type) DO UPDATE SET read_at = NOW() + INTERVAL '2 HOUR'`;
    const values = [chatId, club];

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

module.exports = router;
