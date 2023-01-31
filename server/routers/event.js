const express = require("express");
const router = express.Router();
const db = require("../database/db");

const apiAuth = require("../apiAuth");
const basicAuth = new apiAuth().basicAuth;

router.get('/get', (request, response) => {
    const query = `SELECT e.id, e.title, e.description, e.expire_date, 
    e.event_date, e.event_hour, i.file_path as club_logo, c.name as club_name 
    FROM events e
    JOIN clubs c ON e.club_id = c.id
    LEFT OUTER JOIN images i ON c.logo = i.id
    WHERE event_date > NOW() AND expire_date > NOW()  
    ORDER BY event_date DESC`;

    db.query(query, [], (err, res) => {
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
            response.send({
                result: []
            });
        }
    });
});

router.get('/get-events-by-club', (request, response) => {
   const clubId = request.query.id;

   const query = `SELECT e.id as event_id, e.club_id, e.event_date, e.expire_date, e.title, e.description, e.event_hour, 
       u.id as user_id, u.first_name, u.last_name, i.id as id, ee.accepted 
       FROM events e 
       LEFT OUTER JOIN events_entries ee ON ee.event_id = e.id 
       LEFT OUTER JOIN users u ON ee.user_id = u.id 
       LEFT OUTER JOIN identities i ON u.id = i.user_id 
       WHERE e.club_id = $1 ORDER BY u.last_name`;
   const values = [clubId];

   db.query(query, values, (err, res) => {
       if(res) {
           response.send({
               result: res.rows
           });
       }
       else {
           console.log(err);
           response.send({
               result: 0
           });
       }
   });
});

router.post("/add", basicAuth, (request, response) => {
    const { clubId, title, expireDate, eventDate, eventHour, description } = request.body;

    const query = `INSERT INTO events VALUES (nextval('posts_id_sequence'), $1, $2, $3, $4, $5, $6)`;
    const values = [title, expireDate, eventDate, eventHour, description, clubId];
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

router.post("/update", basicAuth, (request, response) => {
    const { eventId, title, expireDate, eventDate, eventHour, description } = request.body;

    const query = `UPDATE events SET title = $1, expire_date = $2, event_date = $3, event_hour = $4, description = $5 WHERE id = $6`;
    const values = [title, expireDate, eventDate, eventHour, description, eventId];

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

router.get('/get-user-entries', (request, response) => {
   const id = request.query.id;

   const query = `SELECT event_id FROM events_entries WHERE user_id = $1`;
   const values = [id];

   db.query(query, values, (err, res) => {
       if(res) {
           response.send({
               result: res.rows
           });
       }
       else {
           response.send({
               result: []
           });
       }
   });
});

router.post('/add-entry', (request, response) => {
    const { eventId, userId } = request.body;

    const query = `SELECT club_id, title FROM events WHERE id = $1`;
    const values = [eventId];

    db.query(query, values, (err, res) => {
        if(res) {
            const clubId = res.rows[0].club_id;
            const eventTitle = res.rows[0].title;
            const query = `INSERT INTO events_entries VALUES ($1, $2, FALSE)`;
            const values = [eventId, userId];

            db.query(query, values, (err, res) => {
                if(res) {
                    // Send notification to club
                    const query = `INSERT INTO notifications VALUES (nextval('notifications_id_sequence'), NULL, $1, $2, $3, NOW()) RETURNING id`;
                    const values = [`Potwierdź zaproszenie zawodnika na wydarzenie: ${eventTitle}`, `ID:${userId}:${eventId}`, 'Nowy zawodnik zapisał się na Twoje wydarzenie'];

                    db.query(query, values, (err, res) => {
                        if(res) {
                            const notificationId = res.rows[0].id;

                            const query = `INSERT INTO notifications_receivers VALUES ($1, $2, false)`;
                            const values = [notificationId, clubId];

                            db.query(query, values, (err, res) => {
                                if(res) {
                                    response.send({
                                        result: 1
                                    });
                                }
                                else {
                                    console.log(err);
                                    response.send({
                                        result: 0
                                    });
                                }
                            });
                        }
                    });
                }
                else {
                    console.log(err);
                    response.send({
                        result: 0
                    });
                }
            });
        }
        else {
            console.log(err);
            response.send({
                result: 0
            });
        }
    });
});

router.put('/accept-entry', (request, response) => {
   const { eventId, userId, userIdentity } = request.body;

   const query = `SELECT title FROM events WHERE id = $1`;
   const values = [eventId];

   db.query(query, values, (err, res) => {
       const eventTitle = res.rows[0].title;
       const query = `UPDATE events_entries SET accepted = TRUE WHERE event_id = $1 AND user_id = $2`;
       const values = [eventId, userId];

       db.query(query, values, (err, res) => {
           if(res) {
               // Send notification to player
               const query = `INSERT INTO notifications VALUES (nextval('notifications_id_sequence'), NULL, $1, $2, $3, NOW()) RETURNING id`;
               const values = [`Klub potwierdził Twoje zaproszenie na wydarzenie: ${eventTitle}. Do zobaczenia!`, `/`, 'Klub potwierdził Twoje zaproszenie!'];

               db.query(query, values, (err, res) => {
                   if(res) {
                       const notificationId = res.rows[0].id;

                       const query = `INSERT INTO notifications_receivers VALUES ($1, $2, false)`;
                       const values = [notificationId, userIdentity];

                       db.query(query, values, (err, res) => {
                           if(res) {
                               response.send({
                                   result: 1
                               });
                           }
                           else {
                               console.log(err);
                               response.send({
                                   result: 0
                               });
                           }
                       });
                   }
               });
           }
           else {
               console.log(err);
               response.send({
                   result: 0
               });
           }
       });
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
