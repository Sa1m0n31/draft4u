const express = require("express");
const router = express.Router();
const passport = require("passport");
const crypto = require("crypto");
const cors = require("cors");
const db = require("../database/db");
const { v4: uuidv4 } = require('uuid');
require('../passport')(passport);
const nodemailer = require("nodemailer");
const smtpTransport = require('nodemailer-smtp-transport');

const GOOGLE_APP_ID = '888809203937-ju07csqet2hl5tj2kmmimpph7frsqn5r.apps.googleusercontent.com';
const GOOGLE_SECRET = '_onZWhS3GID4ujR-3KaX0U2N';

const isLoggedIn = (req, res, next) => {
    console.log("Am i Logged ing?");
    console.log(req.user);
    console.log(req.isAuthenticated());
    if(req.user) next();
    else res.redirect("/");
}

const sendVerificationEmail = (email, token, response) => {
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
        subject: 'Zweryfikuj swoje konto w serwisie Draft4U',
        html: '<h2>Cieszymy się, że jesteś z nami!</h2> ' +
            '<p>W celu weryfikacji Twojego konta, kliknij w poniższy link: </p> ' +
            `<a href="https://drafcik.skylo-test1.pl/weryfikacja?token=${token}">http://drafcik.skylo-test1.pl/weryfikacja?token=${token}</a>` +
            `<p>Pozdrawiamy</p>` +
            `<p>Zespół Draft4U</p>`
    }

    transporter.sendMail(mailOptions, function(error, info) {
        response.send({
            result: 1
        });
    });
}

const setUserVerified = (id, response) => {
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
}

router.get('/verification', (request, response) => {
   const token = request.query.token;

   if(token) {
       const query = 'SELECT identity FROM verification WHERE token = $1';
       const values = [token];
       db.query(query, values, (err, res) => {
          if(res.rowCount) {
              setUserVerified(res.rows[0].identity, response);
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

// router.all('/', function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Methods", "*");
//     res.header("Access-Control-Allow-Headers", "X-Requested-With");
//     next();
// });

router.get("/auth", isLoggedIn, (request, response) => {
    if(request.user) response.send({result: 1});
    else response.send({result: 0});
});

router.get("/logout", (request, response) => {
    console.log(request.user);
    request.logOut();
    request.session.destroy((err) => {
        response.send({
            result: 1
        });
    });
});

router.post("/login",
    passport.authenticate('local', { session: true }),
    (request, response) => {
        response.send({
            result: 1
        });
    }
);

router.post("/facebook", cors(), passport.authenticate('facebook', {
    failureRedirect: '/#!/info',
    scope:['email']
}), (request, response) => {
    request.headers["access-control-allow-origin"] = "https://drafcik.skylo-test1.pl";
    response.headers["access-control-allow-origin"] = "https://drafcik.skylo-test1.pl";
});

router.get("/google", cors(), (request, response) => {
    response.redirect(`https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?response_type=code&redirect_uri=https%3A%2F%2Fdrafcik.skylo-test1.pl&scope=openid%20profile%20email&client_id=${GOOGLE_APP_ID}&flowName=GeneralOAuthFlow`);
});

const add14DaysSubscription = (userId) => {
    const query = `INSERT INTO subscriptions VALUES ($1, NOW() + INTERVAL '14 DAY', 0)`;
    const values = [userId];

    db.query(query, values);
}

router.post("/register-local", (request, response) => {
   const { email, password, firstName, lastName, sex, birthday, phoneNumber } = request.body;

   /* Password hash */
   const hash = crypto.createHash('sha256').update(password).digest('hex');
   const gender = sex === 1;

   const query = `INSERT INTO users VALUES (nextval('users_id_sequence'), $1, $2, $3, $4, $5, $6, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL) RETURNING id`;
   const values = [email, firstName, lastName, gender, birthday, phoneNumber];

   db.query(query, values, (err, res) => {
       if(res) {
           const insertedUserId = res.rows[0].id;
           const id = uuidv4();
           const query = 'INSERT INTO identities VALUES ($1, $2, 1, $3, false)';
           const values = [id, insertedUserId, hash];
           db.query(query, values, (err, res) => {
               if(res) {
                   add14DaysSubscription(insertedUserId);

                   const token = uuidv4();
                   const query = 'INSERT INTO verification VALUES ($1, $2, NOW())';
                   const values = [id, token];
                   db.query(query, values, (err, res) => {
                      if(res) {
                          sendVerificationEmail(email, token, response);
                      }
                      else {
                          response.send({
                              result: 0
                          })
                      }
                   });
               }
               else {
                   response.send({
                       result: 0
                   });
               }
           })
       }
       else {
           response.send({
               result: 0
           });
       }
   });
});

router.get("/get-user-subscription", (request, response) => {
   const userId = request.query.user;
   const query = 'SELECT expire, type FROM subscriptions WHERE user_id = $1';
   const values = [userId];

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

module.exports = router;
