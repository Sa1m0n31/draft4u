const express = require("express");
const router = express.Router();
const crypto = require('crypto');
const db = require("../database/db");

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
   const query = 'SELECT c.name, c.login, id.active, id.id, i.file_path FROM clubs c JOIN identities id USING(id) LEFT OUTER JOIN images i ON i.id = c.logo';

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
    const query = `SELECT i.id, i.user_id, i.adapter, i.active, i.subscription + INTERVAL '1 DAY' as subscription, i.newsletter, u.first_name, u.last_name, u.email FROM users u JOIN identities i ON u.id = i.user_id ORDER BY i.user_id DESC`;

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

module.exports = router;
