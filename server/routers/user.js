const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const db = require("../database/db");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const smtpTransport = require('nodemailer-smtp-transport');
const got = require("got");

const multer  = require('multer')
const upload = multer({ dest: 'media/users' })

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

function isNumeric(str) {
    if (typeof str != "string") return false // we only process strings!
    return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
        !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}

const getUserData = (request, response, userId) => {
    if(userId) {
        let query = '';
        if(!isNumeric(userId)) {
            query = `SELECT u.id, u.email, u.first_name, u.last_name, u.sex, u.birthday, u.phone_number, u.attack_range, u.vertical_range, u.block_range, u.height, u.weight, u.salary_from, u.salary_to, u.licence_number, u.club, u.position, p.name, i.file_path FROM users u LEFT OUTER JOIN positions p ON u.position = p.id LEFT OUTER JOIN images i ON u.profile_picture = i.id JOIN identities ON identities.user_id = u.id WHERE identities.id = $1`;
        }
        else {
            query = `SELECT u.id, u.email, u.first_name, u.last_name, u.sex, u.birthday, u.phone_number, u.attack_range, u.vertical_range, u.block_range, u.height, u.weight, u.salary_from, u.salary_to, u.licence_number, u.club, u.position, p.name, i.file_path FROM users u LEFT OUTER JOIN positions p ON u.position = p.id LEFT OUTER JOIN images i ON u.profile_picture = i.id JOIN identities ON identities.user_id = u.id WHERE identities.user_id = $1`;
        }

        const values = [userId];

        db.query(query, values, (err, res) => {
            if(res) {
                if(res.rows.length) {
                    response.send({
                        result: res.rows[0]
                    });
                }
                else {
                    got.get(`https://drafcik.skylo-test1.pl/club/get-club-data?id=${userId}`)
                        .then((res) => {
                            const result = res.body.result;
                            response.send({
                                result: result
                            });
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
}

router.get("/get-user-data", (request, response) => {
   const userId = request.user;

   getUserData(request, response, userId);
});

router.get("/get-user-by-id", (request, response) => {
    const userId = request.query.id;

    getUserData(request, response, userId);
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

   const query = `UPDATE users u SET birthday = $1 FROM identities i WHERE u.id = i.user_id AND i.id = $2`;
   const values = [birthday, userId];

   db.query(query, values, (err, res) => {
      const query = `UPDATE users SET birthday = birthday + INTERVAL '1 DAY' WHERE id = $1`;
      const values = [userId];
      updateQuery(query, values, response);
   });
});

router.put("/update-user-license-number", (request, response) => {
   const { licenceNumber } = request.body;
   const userId = request.user;

   const query = 'UPDATE users u SET licence_number = $1 FROM identities i WHERE u.id = i.user_id AND i.id = $2';
   const values = [licenceNumber, userId];

   updateQuery(query, values, response);
});

router.put("/update-user-club", (request, response) => {
    const { club } = request.body;
    const userId = request.user;

    const query = 'UPDATE users u SET club = $1 FROM identities i WHERE u.id = i.user_id AND i.id = $2';
    const values = [club, userId];

    updateQuery(query, values, response);
});

router.put("/update-user-phone-number", (request, response) => {
    const { phoneNumber } = request.body;
    const userId = request.user;

    const query = 'UPDATE users u SET phone_number = $1 FROM identities i WHERE u.id = i.user_id AND i.id = $2';
    const values = [phoneNumber, userId];

    updateQuery(query, values, response);
});

router.put("/update-user-salary", (request, response) => {
    const { salaryFrom, salaryTo } = request.body;
    const userId = request.user;

    const query = 'UPDATE users u SET salary_from = $1, salary_to = $2 FROM identities i WHERE u.id = i.user_id AND i.id = $3';
    const values = [salaryFrom, salaryTo, userId];

    updateQuery(query, values, response);
});

router.put("/update-user-attack-range", (request, response) => {
    const { attackRange } = request.body;
    const userId = request.user;

    const query = 'UPDATE users u SET attack_range = $1 FROM identities i WHERE u.id = i.user_id AND i.id = $2';
    const values = [attackRange, userId];

    console.log(attackRange);

    updateQuery(query, values, response);
});

router.put("/update-user-vertical-range", (request, response) => {
    const { verticalRange } = request.body;
    const userId = request.user;

    const query = 'UPDATE users u SET vertical_range = $1 FROM identities i WHERE u.id = i.user_id AND i.id = $2';
    const values = [verticalRange, userId];

    updateQuery(query, values, response);
});

router.put("/update-user-block-range", (request, response) => {
    const { blockRange } = request.body;
    const userId = request.user;

    const query = 'UPDATE users u SET block_range = $1 FROM identities i WHERE u.id = i.user_id AND i.id = $2';
    const values = [blockRange, userId];

    updateQuery(query, values, response);
});

router.put("/update-user-weight", (request, response) => {
    const { weight } = request.body;
    const userId = request.user;

    const query = 'UPDATE users u SET weight = $1 FROM identities i WHERE u.id = i.user_id AND i.id = $2';
    const values = [weight, userId];

    updateQuery(query, values, response);
});

router.put("/update-user-height", (request, response) => {
    const { height } = request.body;
    const userId = request.user;

    const query = 'UPDATE users u SET height = $1 FROM identities i WHERE u.id = i.user_id AND i.id = $2';
    const values = [height, userId];

    updateQuery(query, values, response);
});

router.put("/update-user-position", (request, response) => {
    const { position } = request.body;
    const userId = request.user;

    console.log(position);

    const query = 'UPDATE users u SET position = (SELECT id FROM positions WHERE name = $1) FROM identities i WHERE u.id = i.user_id AND i.id = $2';
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
});

router.post("/edit-profile-image", upload.single("image"), (request, response) => {
   const { userId } = request.body;

   const query = `INSERT INTO images VALUES (nextval('images_id_sequence'), $1) RETURNING id`;
   const values = [request.file.filename];

   db.query(query, values, (err, res) => {
       if(res) {
           const query = 'UPDATE users u SET profile_picture = $1 FROM identities i WHERE u.id = i.user_id AND i.id = $2';
           const values = [res.rows[0].id, userId];

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
       }
       else {
           response.send({
               result: 0
           });
       }
   });
});

router.get("/get-user-profile-image", (request, response) => {
   const { userId } = request.query;

   const query = 'SELECT i.file_path FROM images i JOIN users u ON u.profile_picture = i.id JOIN identities ON identities.user_id = u.id WHERE identities.id = $1';
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

router.get("/get-user-highlight-video", (request, response) => {
   const { userId } = request.query;

   const query = '';
   const values = [userId];

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

router.get("/get-identity-by-id", (request, response) => {
   const { id } = request.query;

   const query = 'SELECT id FROM identities WHERE user_id = $1';
   const values = [id];

   db.query(query, values, (err, res) => {
      if(res) {
          if(res.rows) {
              response.send({
                  result: res.rows[0]
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
