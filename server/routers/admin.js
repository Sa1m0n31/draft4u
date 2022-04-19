const express = require("express");
const router = express.Router();
const crypto = require('crypto');
const db = require("../database/db");
const nodemailer = require("nodemailer");
const smtpTransport = require('nodemailer-smtp-transport');

router.get("/get-admin-by-id", (request, response) => {
   const id = request.query.id;

   const query = 'SELECT login FROM admins WHERE id = $1';
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

router.get("/get-admin-data", (request, response) => {
    const adminId = request.user;

    if(adminId) {
        const query = 'SELECT login FROM admins WHERE id = $1';
        const values = [adminId];

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
    }
    else {
        response.send({
            result: 0
        });
    }
});

router.get("/get-clubs", (request, response) => {
   const query = 'SELECT c.name, c.login, id.active, id.id, i.file_path, li.login_time FROM clubs c JOIN identities id USING(id) LEFT OUTER JOIN images i ON i.id = c.logo LEFT OUTER JOIN login_info li ON li.id = c.id';

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

router.get("/get-users", (request, response) => {
    const query = `SELECT i.id, i.user_id as user_id, i.adapter, i.active, i.subscription + INTERVAL '1 DAY' as subscription, i.newsletter, u.first_name, u.last_name, u.email, li.login_time + INTERVAL '2 HOUR' as login_time
                    FROM users u JOIN identities i ON u.id = i.user_id 
                    LEFT OUTER JOIN login_info li ON i.id = li.id
                    ORDER BY i.user_id DESC`;

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

router.post("/change-password", (request, response) => {
    const { oldPassword, newPassword } = request.body;
    const id = request.user;

    const oldPasswordHash = crypto.createHash('sha256').update(oldPassword).digest('hex');
    const newPasswordHash = crypto.createHash('sha256').update(newPassword).digest('hex');

    const query = 'UPDATE admins SET password = $1 WHERE password = $2 AND id = $3';
    const values = [newPasswordHash, oldPasswordHash, id];

    db.query(query, values, (err, res) => {
        if(res) {
            if(res.rowCount) {
                response.send({
                    result: 1
                });
            }
            else {
                response.send({
                    result: -2
                });
            }
        }
        else {
            response.send({
                result: 0
            })
        }
    });
});

router.post("/ban-user", (request, response) => {
   const { id } = request.body;

   const query = 'UPDATE identities SET active = NULL WHERE id = $1';
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

router.post("/unlock-user", (request, response) => {
    const { id } = request.body;

    const query = 'UPDATE identities SET active = true WHERE id = $1';
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

router.delete("/delete-user", (request, response) => {
    const { id } = request.query;

    const query1 = 'DELETE FROM users USING identities WHERE users.id = identities.user_id AND identities.id = $1';
    const query2 = 'DELETE FROM verification WHERE identity = $1';
    const query3 = 'DELETE FROM identities WHERE id = $1';
    const values = [id];

    db.query(query1, values, (err, res) => {
        if(res) {
            db.query(query2, values, (err, res) => {
                if(res) {
                    db.query(query3, values, (err, res) => {
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
        }
        else {
            response.send({
                result: 0
            });
        }
    });
});

router.post("/edit-user-name", (request, response) => {
    const { firstName, lastName, id } = request.body;

    const query = 'UPDATE users SET first_name = $1, last_name = $2 WHERE id = $3';
    const values = [firstName, lastName, id];

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

router.get('/get-advanced-users-info', (request, response) => {
   const query = `SELECT * FROM
                    (SELECT u.id, COUNT(v.id) as videos
                    FROM users u
                    LEFT OUTER JOIN videos v ON u.id = v.user_id 
                    GROUP BY(u.id)
                    ) as t1
                    JOIN (SELECT id,
                    CASE WHEN attack_range IS NOT NULL THEN 1 ELSE 0 END +
                    CASE WHEN vertical_range IS NOT NULL THEN 1 ELSE 0 END +
                    CASE WHEN block_range IS NOT NULL THEN 1 ELSE 0 END +
                    CASE WHEN height IS NOT NULL THEN 1 ELSE 0 END +
                    CASE WHEN weight IS NOT NULL THEN 1 ELSE 0 END as parameters
                    FROM users) as t2 ON t1.id = t2.id
                    JOIN (SELECT i.id, i.user_id, i.adapter, i.active, i.subscription + INTERVAL '1 DAY' as subscription, i.newsletter, u.first_name, u.last_name, u.email
                    FROM users u 
                    JOIN identities i ON u.id = i.user_id) as t3
                    ON t2.id = t3.user_id ORDER BY t1.videos + t2.parameters DESC`;

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

router.get('/get-users-videos-number', (request, response) => {
    const query = `SELECT u.id, COUNT(v.id) 
                    FROM users u
                    LEFT OUTER JOIN videos v ON u.id = v.user_id 
                    GROUP BY(u.id)`;

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

router.get('/get-users-parameters-completed', (request, response) => {
   const query = `SELECT id,
                    CASE WHEN attack_range IS NOT NULL THEN 1 ELSE 0 END +
                    CASE WHEN vertical_range IS NOT NULL THEN 1 ELSE 0 END +
                    CASE WHEN block_range IS NOT NULL THEN 1 ELSE 0 END +
                    CASE WHEN height IS NOT NULL THEN 1 ELSE 0 END +
                    CASE WHEN weight IS NOT NULL THEN 1 ELSE 0 END as parameters
                    FROM users`;

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

router.post('/send-info-about-terms-update', (request, response) => {
    const query = 'SELECT CONCAT(u.email, c.email) as email FROM identities i LEFT OUTER JOIN clubs c USING(id) LEFT OUTER JOIN users u ON i.user_id = u.id';

    db.query(query, [], (err, res) => {
        if(res) {
            const result = res.rows;
            if(result) {
                const emails = result.map((item) => {
                    return item.email;
                });

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

                let mailOptions = {
                    from: process.env.EMAIL_ADDRESS,
                    to: [],
                    bcc: emails,
                    subject: 'Zmiana regulaminu na Draft4U',
                    html: `<h2>Zmiana regulaminu</h2>
            <p>Informujemy o zmianie regulaminu Draft4U. Nowy regulamin dostępny jest <a href="https://draft4u.com.pl/regulamin" target="_blank">TUTAJ</a>.</p>
            <p>Pozdrawiamy</p>
            <p>Zespół Draft4U</p>`
                }

                transporter.sendMail(mailOptions, function(error, info) {
                    response.send({
                        result: 1
                    });
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
    });
});

module.exports = router;
