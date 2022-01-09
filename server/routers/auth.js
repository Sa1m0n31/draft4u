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

const apiAuth = require("../apiAuth");
const basicAuth = new apiAuth().basicAuth;

function isNumeric(str) {
    if (typeof str != "string") return false // we only process strings!
    return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
        !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}

const sendVerificationEmail = (email, token, response) => {
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
        to: email,
        subject: 'Zweryfikuj swoje konto w serwisie Draft4U',
        html: '<h2>Cieszymy się, że jesteś z nami!</h2> ' +
            '<p>W celu weryfikacji Twojego konta, kliknij w poniższy link: </p> ' +
            `<a href="` + process.env.API_URL + `/weryfikacja?token=${token}">` + process.env.API_URL + `/weryfikacja?token=${token}</a>` +
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

router.get("/auth", (request, response) => {
    if(request.user) {
        if(isNumeric(request.user.toString())) {
           /* Admin */
            response.send({result: 2});
        }
        else {
            /* User */
            response.send({result: 1});
        }
    }
    else response.send({ result: 0 });
});

router.get("/logout", (request, response) => {
    request.logOut();
    request.session.destroy((err) => {
        response.send({
            result: 1
        });
    });
});

router.post("/login",
    passport.authenticate('user-local', { session: true, failureFlash: true, failureRedirect: '/auth/failure' }),
    (request, response) => {
        response.send({
            result: 1
        });
    }
);

router.get('/failure', (request, response) => {
    const errorMsg = request.flash().error[0];
    response.send({
        result: 0,
        msg: errorMsg
    });
});

router.get('/failure-third-party', (request, response) => {
    response.send({
        result: 0
    });
});

router.post("/admin",
    passport.authenticate('admin-local', { session: true }),
    (request, response) => {
    response.send({
        result: 1
    });
});

router.get("/facebook", cors(), passport.authenticate('facebook', {
    failureRedirect: '/auth/failure-third-party',
    successRedirect: `${process.env.API_URL}/zarejestruj-przez-facebooka`,
    session: true,
    scope:['public_profile', 'email']
}));

router.get("/facebook/callback",  passport.authenticate("facebook", {
    successRedirect: `${process.env.API_URL}/zarejestruj-przez-facebooka`,
    failureRedirect: "/auth/failure-third-party"
}), (request, response) => {
    console.log("FB CALLBACK");
});

router.get('/google', cors(),
    passport.authenticate('google', {
        scope: ['https://www.googleapis.com/auth/userinfo.email'],
        failureRedirect: '/auth/failure',
        successRedirect: `${process.env.API_URL}/zarejestruj-przez-google`,
        session: true
    }));


router.get('/google/callback', passport.authenticate('google', {
        failureRedirect: '/auth/failure-third-party',
        successRedirect: `${process.env.API_URL}/zarejestruj-przez-google`,
        scope: ['https://www.googleapis.com/auth/userinfo.email'],
        session: true
}), function(req, res) {
        // Successful authentication, redirect success.
    });

router.post("/register-local", (request, response) => {
   const { email, password, firstName, lastName, sex, birthday, phoneNumber, checkboxObligatory } = request.body;

   /* Password hash */
   const hash = crypto.createHash('sha256').update(password).digest('hex');
   const gender = sex === 1;

   const query = `INSERT INTO users VALUES (nextval('users_id_sequence'), $1, $2, $3, $4, TO_DATE($5, 'YYYY-MM-DD') + INTERVAL '1 DAY', $6, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL) RETURNING id`;
   const values = [email, firstName, lastName, gender, birthday, phoneNumber];

   db.query(query, values, (err, res) => {
       if(res) {
           const insertedUserId = res.rows[0].id;
           const id = uuidv4();
           const query = `INSERT INTO identities VALUES ($1, $2, 1, $3, false, NOW() + INTERVAL '14 DAY', $4)`;
           const values = [id, insertedUserId, hash, checkboxObligatory];
           db.query(query, values, (err, res) => {
               if(res) {
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

router.get("/get-user-subscription", basicAuth, (request, response) => {
   const userId = request.query.user;
   const query = 'SELECT subscription FROM identities WHERE user_id = $1';
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

router.post("/register-from-third-party", (request, response) => {
   const { firstName, lastName, email, sex, birthday, phoneNumber } = request.body;
   const id = request.user;
   const gender = sex === 1;
   let query, values;

   if(!email) {
       query = `UPDATE users AS u SET first_name = $1, last_name = $2, sex = $3, birthday = TO_DATE($4, 'YYYY-MM-DD') + INTERVAL '1 DAY', phone_number = $5 FROM identities AS i WHERE i.user_id = u.id AND i.id = $6 RETURNING u.id`;
       values = [firstName, lastName, gender, birthday, phoneNumber, id];
   }
   else {
       query = `UPDATE users AS u SET first_name = $1, last_name = $2, email = $3, sex = $4, birthday = TO_DATE($5, 'YYYY-MM-DD') + INTERVAL '1 DAY', phone_number = $6 FROM identities AS i WHERE i.user_id = u.id AND i.id = $7 RETURNING u.id`;
       values = [firstName, lastName, email, gender, birthday, phoneNumber, id];
   }

   db.query(query, values, (err, res) => {
       if(res) {
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
       else {
           response.send({
               result: 0
           });
       }
   });
});

module.exports = router;
