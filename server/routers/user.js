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
            `<a href="http://localhost:3000/resetowanie-hasla?email=${email}&token=${token}">http://draft4u.skylo-test3.pl/resetowanie-hasla?token=${token}</a>` +
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
            console.log(err);
            response.send({
                result: 0
            })
        }
    });
});

module.exports = router;
