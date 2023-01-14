const express = require("express");
const router = express.Router();
const db = require("../database/db");

const apiAuth = require("../apiAuth");
const basicAuth = new apiAuth().basicAuth;

router.get('/get', (request, response) => {
    const postsPerPage = parseInt(process.env.POSTS_PER_PAGE);
    const { page } = request.query;
    const query = `SELECT * FROM events LIMIT $1 OFFSET $2`;
    const values = [postsPerPage, page * postsPerPage];

    db.query(query, values, (err, res) => {
        if(res) {
            if(res.rows) {
                response.send({
                    result: res.rows
                });
            }
            else {
                response.send({
                    result: []
                });
            }
        }
        else {
            console.log(err);
            response.send({
                result: []
            });
        }
    });
});

router.get('/get-events-by-club', (request, response) => {
   const clubId = request.query.id;

   const query = `SELECT * FROM events e 
       LEFT OUTER JOIN events_entries ee ON ee.event_id = e.id 
       WHERE e.club_id = $1`;
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

router.post("/add", basicAuth, (request, response) => {
    const { clubId, title, expireDate, eventDate, description } = request.body;

    const query = `INSERT INTO events VALUES (nextval('posts_id_sequence'), $1, $2, $3, $4, $5)`;
    const values = [clubId, title, expireDate, eventDate, description];
    db.query(query, values,(err, res) => {
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

router.delete('/delete', basicAuth, (request, response) => {
    const id = request.query.id;

    const query = `DELETE FROM events WHERE id = $1`;
    const values = [id];

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

router.post('/add-entry', (request, response) => {
    const { eventId, userId } = request.body;

    const query = `INSERT INTO events_entries VALUES ($1, $2, FALSE)`;
    const values = [eventId, userId];

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

router.put('/accept-entry', (request, response) => {
   const { eventId, userId } = request.body;

   const query = `UPDATE events_entries SET accepted = TRUE WHERE event_id = $1 AND user_id = $2`;
   const values = [eventId, userId];

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

router.delete('/delete-entry', basicAuth, (request, response) => {
    const { event, user } = request.id;

    const query = `DELETE FROM event_entries WHERE event_id = $1 AND user_id = $2`;
    const values = [event, user];

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
