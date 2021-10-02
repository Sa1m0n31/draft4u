const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const db = require("../database/db");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const smtpTransport = require('nodemailer-smtp-transport');

router.get("/is-email-available", (request, response) => {
   const email = request.query.email;

   if(email) {
       const query = 'SELECT * FROM users WHERE email = $1';
       const values = [email];
       db.query(query, values, (err, res) => {
          if(res) {
              if(res.rowCount > 0) {
                  response.send({
                      result: 0
                  });
              }
              else {
                  response.send({
                      result: 1
                  });
              }
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

const sendPasswordRemindLink = (email, token, response) => {
    let transporter = nodemailer.createTransport(smtpTransport ({
        auth: {
            user: 'powiadomienia@skylo-pl.atthost24.pl',
            pass: 'SwinkaPeppa-31'
        },
        host: 'skylo-pl.atthost24.pl',
        secureConnection: true,
        port: 465,
        tls: {
            rejectUnauthorized: false
        },
    }));

    let mailOptions = {
        from: 'powiadomienia@skylo-pl.atthost24.pl',
        to: email,
        subject: 'Odzyskaj hasło do swojego konta',
        html: '<h2>Odzyskaj hasło do swojego konta</h2> ' +
            '<p>W celu odzyskania hasła do swojego konta w serwisie Draf4U, kliknij w poniższy link:</p> ' +
            `<a href="https://drafcik.skylo-test1.pl/resetowanie-hasla?email=${email}&token=${token}">http://drafcik.skylo-test1.pl/resetowanie-hasla?token=${token}</a>` +
            `<p>Pozdrawiamy</p>` +
            `<p>Zespół Draft4U</p>`
    }

    transporter.sendMail(mailOptions, function(error, info) {
        response.send({
            result: 1
        });
    });
}

router.post("/password-remind", (request, response) => {
    const { email } = request.body;

    const query = 'SELECT i.id FROM identities i JOIN users u ON i.user_id = u.id WHERE u.email = $1';
    const values = [email];

    db.query(query, values, (err, res) => {
       if(res) {
           if(res.rowCount) {
               const identity = res.rows[0].id;
               const token = uuidv4();
               const query = 'INSERT INTO password_remind VALUES ($1, $2, NOW())';
               const values = [identity, token];
               db.query(query, values, (err, res) => {
                   if(res) {
                       sendPasswordRemindLink(email, token, response);
                   }
                   else {
                       console.log(err);
                       response.send({
                           result: 0
                       });
                   }
               })
           }
           else {
               console.log(err);
               response.send({
                   result: -1
               });
           }
       }
       else {
           console.log(err);
           response.send({
               result: 0
           });
       }
    });
});

router.get("/check-remind-password-token", (request, response) => {
   const token = request.query.token;

   if(token) {
       const query = 'SELECT identity FROM password_remind WHERE token = $1';
       const values = [token];
       db.query(query, values, (err, res) => {
          if(res) {
              if(res.rowCount) {
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
       });
   }
   else {
       response.send({
           result: 0
       });
   }
});

router.post("/change-password", (request, response) => {
    const { email, password } = request.body;
    const hash = crypto.createHash('sha256').update(password).digest('hex');

    const query = 'UPDATE identities SET hash = $1 FROM users u WHERE u.id = identities.user_id AND u.email = $2';
    const values = [hash, email];

    db.query(query, values, (err, res) => {
        if(res) {
            response.send({
                result: 1
            });
        }
        else {
            response.send({
                result: 0
            })
        }
    });
});

router.get("/get-user-data", (request, response) => {
   const userId = request.user;

   if(userId) {
       const query = 'SELECT u.id, u.email, u.first_name, u.last_name, u.sex, u.birthday, u.phone_number, u.attack_range, u.vertical_range, u.block_range, u.height, u.weight, u.salary_from, u.salary_to, u.licence_number, u.club, p.name FROM users u LEFT OUTER JOIN positions p ON u.position = p.id WHERE u.id = $1';
       const values = [userId];

       db.query(query, values, (err, res) => {
           console.log(err);
           console.log(res.rows);
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

const updateQuery = (query, values, response) => {
    db.query(query, values, (err, res) => {
        if(res) {
            response.send({
                result: 0
            });
        }
        else {
            response.send({
                result: 1
            });
        }
    });
}

router.put("/update-user-birthday", (request, response) => {
   const { birthday } = request.body;
   const userId = request.user;

   const query = 'UPDATE users SET birthday = $1 WHERE id = $2';
   const values = [birthday, userId];

   updateQuery(query, values, response);
});

router.put("/update-user-license-number", (request, response) => {
   const { licenceNumber } = request.body;
   const userId = request.user;

   const query = 'UPDATE users SET licence_number = $1 WHERE id = $2';
   const values = [licenceNumber, userId];

   updateQuery(query, values, response);
});

router.put("/update-user-club", (request, response) => {
    const { club } = request.body;
    const userId = request.user;

    const query = 'UPDATE users SET club = $1 WHERE id = $2';
    const values = [club, userId];

    updateQuery(query, values, response);
});

router.put("/update-user-phone-number", (request, response) => {
    const { phoneNumber } = request.body;
    const userId = request.user;

    const query = 'UPDATE users SET phone_number = $1 WHERE id = $2';
    const values = [phoneNumber, userId];

    updateQuery(query, values, response);
});

router.put("/update-user-salary", (request, response) => {
    const { salaryFrom, salaryTo } = request.body;
    const userId = request.user;

    const query = 'UPDATE users SET salary_from = $1, salary_to = $2 WHERE id = $3';
    const values = [salaryFrom, salaryTo, userId];

    updateQuery(query, values, response);
});

router.put("/update-user-attack-range", (request, response) => {
    const { attackRange } = request.body;
    const userId = request.user;

    const query = 'UPDATE users SET attack_range = $1 WHERE id = $2';
    const values = [attackRange, userId];

    console.log(attackRange);

    updateQuery(query, values, response);
});

router.put("/update-user-vertical-range", (request, response) => {
    const { verticalRange } = request.body;
    const userId = request.user;

    const query = 'UPDATE users SET vertical_range = $1 WHERE id = $2';
    const values = [verticalRange, userId];

    updateQuery(query, values, response);
});

router.put("/update-user-block-range", (request, response) => {
    const { blockRange } = request.body;
    const userId = request.user;

    const query = 'UPDATE users SET block_range = $1 WHERE id = $2';
    const values = [blockRange, userId];

    updateQuery(query, values, response);
});

router.put("/update-user-weight", (request, response) => {
    const { weight } = request.body;
    const userId = request.user;

    const query = 'UPDATE users SET weight = $1 WHERE id = $2';
    const values = [weight, userId];

    updateQuery(query, values, response);
});

router.put("/update-user-height", (request, response) => {
    const { height } = request.body;
    const userId = request.user;

    const query = 'UPDATE users SET height = $1 WHERE id = $2';
    const values = [height, userId];

    updateQuery(query, values, response);
});

router.put("/update-user-position", (request, response) => {
    const { position } = request.body;
    const userId = request.user;

    console.log(position);

    const query = 'UPDATE users SET position = (SELECT id FROM positions WHERE name = $1) WHERE id = $2';
    const values = [position, userId];

    updateQuery(query, values, response);
});

router.get("/get-all-positions", (request, response) => {
    const query = 'SELECT * FROM positions';

    db.query(query, [], (err, res) => {
        if(res) {
            response.send({
                result: res.rows
            });
        }
        else {
            response.send({
                result: 0
            })
        }
    });
})

module.exports = router;
