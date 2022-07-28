const express = require("express");
const router = express.Router();
const db = require("../database/db");

const multer  = require('multer')
const upload = multer({ dest: 'media/chat' })

const nodemailer = require("nodemailer");
const smtpTransport = require('nodemailer-smtp-transport');

router.get("/get-user-messages", (request, response) => {
    if(request.user) {
        const query = `SELECT m.chat_id, m.content, m.created_at, c.name, img.file_path, rm.read_at, m.type, c.id, rm.type as read_by_club FROM
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
    }
    else {
        response.send({
            result: 0
        });
    }
});

router.get("/get-club-messages", (request, response) => {
    const { user } = request;

    const query = `SELECT m.chat_id, m.content, m.created_at, u.first_name, u.last_name, u.id, img.file_path, rm.read_at, m.type, rm.type as read_by_club FROM
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

router.get("/is-chat-read", (request, response) => {
    const id = request.query.id;
    const club = request.query.club;

    let query;
    if(club === 'true') {
        query = `SELECT m.content, m.created_at - INTERVAL '1 HOUR' as created_at, m.type as mes_type, rm.type, rm.read_at - INTERVAL '1 HOUR' as read_at 
    FROM read_messages rm LEFT OUTER JOIN messages m ON m.chat_id = rm.chat_id 
    WHERE rm.chat_id = $1 AND m.type = true AND rm.type = false
    ORDER BY m.created_at DESC LIMIT 1;`;
    }
    else {
        query = `SELECT m.content, m.created_at - INTERVAL '1 HOUR' as created_at, m.type as mes_type, rm.type, rm.read_at - INTERVAL '1 HOUR' as read_at 
    FROM read_messages rm LEFT OUTER JOIN messages m ON m.chat_id = rm.chat_id 
    WHERE rm.chat_id = $1 AND m.type = false AND rm.type = true
    ORDER BY m.created_at DESC LIMIT 1;`;
    }

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

const sendMailAboutNewMessage = (email, response) => {
    let transporter = nodemailer.createTransport(smtpTransport ({
        auth: {
            user: process.env.EMAIL_ADDRESS,
            pass: process.env.EMAIL_PASSWORD
        },
        host: process.env.EMAIL_HOST,
        secureConnection: true,
        port: 465,
        tls: {
            rejectUnauthorized: false
        },
    }));

    console.log(email);

    let mailOptions = {
        from: process.env.EMAIL_ADDRESS,
        to: email,
        subject: 'Masz nową wiadomość w Draft4U!',
        html: '<h2>Ktoś napisał do Ciebie w Draft4U!</h2> ' +
            '<p>Zaloguj się na swoje konto, aby sprawdzić </p> ' +
            `<a href="https://draft4u.com.pl">Przejdź do Draft4U</a>` +
            `<p>Pozdrawiamy</p>` +
            `<p>Zespół Draft4U</p>`
    }

    transporter.sendMail(mailOptions, function(error, info) {
        response.send({
            result: 1
        });
    });
}

router.post("/add-message", (request, response) => {
   const { chatId, content, isClub } = request.body;
   let club = false;

   if(isClub === 'true') club = true;

   const query = `INSERT INTO messages VALUES (nextval('message_id_sequence'), $1, $2, NOW() + INTERVAL '2 HOUR', $3)`;
   const values = [chatId, content, club];

   db.query(query, values, (err, res) => {
       if(res) {
           let query, values;

          if(club) {
              query = `SELECT u.email FROM identities i
                    JOIN users u ON i.user_id = u.id
                    WHERE i.id = $1`;
              values = [chatId.split(';')[1]];
          }
          else {
              query = `SELECT c.email FROM identities i
                    JOIN clubs c ON c.id = i.id
                    WHERE i.id = $1`;
              values = [chatId.split(';')[0]];
          }

          db.query(query, values, (err, res) => {
             if(res) {
                 if(res.rows) {
                     if(res.rows.length) {
                         const email = res.rows[0].email;
                         sendMailAboutNewMessage(email, response);
                     }
                     else {
                         response.send({
                             result: 1
                         });
                     }
                 }
                 else {
                     response.send({
                         result: 1
                     });
                 }
             }
             else {
                 response.send({
                     result: 1
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
});

router.post("/add-image-to-message", upload.single('image'), (request, response) => {
    const { chatId, isClub } = request.body;
    const image = request.file.filename;
    let club = false;

    if(isClub === 'true') club = true;

    const query = `INSERT INTO images VALUES (nextval('images_id_sequence'), $1)`;
    const values = [image];

    db.query(query, values, (err, res) => {
        if(res) {
            const content = `[image path='${image}']`;
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

    /* Update read_at timestamp if last message from your interlocutor is newer than your current read_at */
    const query = `INSERT INTO read_messages AS rm VALUES ($1, NOW() + INTERVAL '2 HOUR', $2)
ON CONFLICT (chat_id, type)
DO UPDATE SET read_at = NOW() + INTERVAL '2 HOUR' WHERE
(SELECT COUNT(*) FROM read_messages WHERE chat_id = $1 AND read_at < (SELECT m.created_at FROM read_messages rm JOIN messages m USING(chat_id)
WHERE chat_id = $1 AND m.type != $2 ORDER BY m.created_at DESC LIMIT 1)) > 1`;
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
