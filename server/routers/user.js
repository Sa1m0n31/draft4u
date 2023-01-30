const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const db = require("../database/db");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const smtpTransport = require('nodemailer-smtp-transport');

const apiAuth = require("../apiAuth");
const basicAuth = new apiAuth().basicAuth;

const multer  = require('multer');
const upload = multer({ dest: 'media/users' });

router.get("/is-email-available", (request, response) => {
   const email = request.query.email;
   const type = parseInt(request.query.type); // 0 - player, 1 - staff

   if(email) {
       let query = '';
       if(type === 0) {
           query = `SELECT u.id FROM users u JOIN identities i ON u.id = i.user_id WHERE LOWER(u.email) = LOWER($1) AND i.id NOT LIKE '%-stuff'`;
       }
       else {
            query = `SELECT u.id FROM users u JOIN identities i ON u.id = i.user_id WHERE LOWER(u.email) = LOWER($1) AND i.id LIKE '%-stuff'`
       }
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
        subject: 'Odzyskaj hasło do swojego konta',
        html: '<h2>Odzyskaj hasło do swojego konta</h2> ' +
            '<p>W celu odzyskania hasła do swojego konta w serwisie Draf4U, kliknij w poniższy link:</p> ' +
            `<a href="` + process.env.API_URL + `/resetowanie-hasla?email=${email}&token=${token}">` + process.env.API_URL + `/resetowanie-hasla?token=${token}</a>` +
            `<p>Pozdrawiamy</p>` +
            `<p>Zespół Draft4U</p>`
    }

    transporter.sendMail(mailOptions, function(error, info) {
        response.send({
            result: 1
        });
    });
}

router.post("/password-remind", basicAuth, (request, response) => {
    const { email } = request.body;

    const query = `SELECT i.id FROM identities i 
                    LEFT OUTER JOIN users u ON i.user_id = u.id 
                    LEFT OUTER JOIN clubs c ON i.id = c.id 
                    WHERE LOWER(u.email) = LOWER($1) OR LOWER(c.email) = LOWER($1)`;
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
                       response.send({
                           result: 0
                       });
                   }
               })
           }
           else {
               response.send({
                   result: -1
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

router.post("/reset-password", basicAuth, (request, response) => {
    const { email, password } = request.body;

    const newPasswordHash = crypto.createHash('sha256').update(password).digest('hex');

    const query1 = 'UPDATE identities i SET hash = $1 FROM users u WHERE i.user_id = u.id AND LOWER(u.email) = LOWER($2)';
    const query2 = 'UPDATE identities i SET hash = $1 FROM clubs c WHERE c.id = i.id AND LOWER(c.email) = LOWER($2)';
    const values = [newPasswordHash, email];

    db.query(query1, values, (err, res) => {
        db.query(query2, values, (err, res) => {
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
});

router.post("/change-password", basicAuth, (request, response) => {
    const { oldPassword, newPassword } = request.body;
    const id = request.user;

    const oldPasswordHash = crypto.createHash('sha256').update(oldPassword).digest('hex');
    const newPasswordHash = crypto.createHash('sha256').update(newPassword).digest('hex');

    const query = 'UPDATE identities SET hash = $1 WHERE hash = $2 AND id = $3';
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

function isNumeric(str) {
    if (typeof str != "string") return false // we only process strings!
    return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
        !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}

const getUserData = (request, response, userId) => {
    let facebook = false, google = false, hash = '', values;
    if(userId) {
        let query = '';
        if(facebook) {
            hash = crypto.createHash('sha256').update(userId.toString()).digest('hex');
            query = `SELECT identities.id as identity, identities.adapter, identities.active, u.id, u.country, u.email, u.first_name, u.last_name, u.sex, u.birthday, u.phone_number, u.attack_range, u.vertical_range, u.block_range, u.height, u.weight, u.salary_from, u.salary_to, u.licence_number, u.club, u.experience, u.position, p.name, sp.name as stuff_position, i.file_path FROM users u LEFT OUTER JOIN positions p ON u.position = p.id LEFT OUTER JOIN stuff_positions sp ON sp.id + 10 = u.position LEFT OUTER JOIN images i ON u.profile_picture = i.id JOIN identities ON identities.user_id = u.id WHERE identities.hash = $1`;
            values = [hash];
        }
        else if(!isNumeric(userId)) {
            query = `SELECT identities.id as identity, identities.adapter, identities.active, u.id, u.country, u.email, u.first_name, u.last_name, u.sex, u.birthday, u.phone_number, u.attack_range, u.vertical_range, u.block_range, u.height, u.weight, u.salary_from, u.salary_to, u.licence_number, u.club, u.experience, u.position, p.name, sp.name as stuff_position, i.file_path FROM users u LEFT OUTER JOIN positions p ON u.position = p.id LEFT OUTER JOIN stuff_positions sp ON sp.id + 10 = u.position LEFT OUTER JOIN images i ON u.profile_picture = i.id JOIN identities ON identities.user_id = u.id WHERE identities.id = $1 OR identities.hash = $1`;
            values = [userId];
        }
        else {
            query = `SELECT identities.id as identity, identities.adapter, identities.active, u.id, u.country, u.email, u.first_name, u.last_name, u.sex, u.birthday, u.phone_number, u.attack_range, u.vertical_range, u.block_range, u.height, u.weight, u.salary_from, u.salary_to, u.licence_number, u.club, u.experience, u.position, p.name, sp.name as stuff_position, i.file_path FROM users u LEFT OUTER JOIN positions p ON u.position = p.id LEFT OUTER JOIN stuff_positions sp ON sp.id + 10 = u.position LEFT OUTER JOIN images i ON u.profile_picture = i.id JOIN identities ON identities.user_id = u.id WHERE identities.user_id = $1`;
            values = [userId];
        }

        db.query(query, values, (err, res) => {
            if(res) {
                if(res.rows.length) {
                    response.send({
                        result: res.rows[0]
                    });
                }
                else {
                    response.send({
                        result: 0
                    })
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

router.put("/update-user-email", basicAuth, (request, response) => {
    const { email } = request.body;
    const userId = request.user;

    const query = 'UPDATE users u SET email = $1 FROM identities i WHERE u.id = i.user_id AND i.id = $2';
    const values = [email, userId];

    updateQuery(query, values, response);
});

router.put("/update-user-experience", basicAuth, (request, response) => {
    const { experience } = request.body;
    const userId = request.user;

    console.log(experience);

    const query = 'UPDATE users u SET experience = $1 FROM identities i WHERE u.id = i.user_id AND i.id = $2';
    const values = [experience, userId];

    updateQuery(query, values, response);
});

router.put("/update-user-birthday", basicAuth, (request, response) => {
   const { birthday } = request.body;
   const userId = request.user;

   const query = `UPDATE users u SET birthday = TO_DATE($1, 'YYYY-MM-DD') + INTERVAL '1 DAY' FROM identities i WHERE u.id = i.user_id AND i.id = $2`;
   const values = [birthday, userId];

   updateQuery(query, values, response);
});

router.put("/update-user-license-number", basicAuth, (request, response) => {
   const { licenceNumber } = request.body;
   const userId = request.user;

   const query = 'UPDATE users u SET licence_number = $1 FROM identities i WHERE u.id = i.user_id AND i.id = $2';
   const values = [licenceNumber, userId];

   updateQuery(query, values, response);
});

router.put("/update-user-club", basicAuth, (request, response) => {
    const { club } = request.body;
    const userId = request.user;

    const query = 'UPDATE users u SET club = $1 FROM identities i WHERE u.id = i.user_id AND i.id = $2';
    const values = [club, userId];

    updateQuery(query, values, response);
});

router.put("/update-user-phone-number", basicAuth, (request, response) => {
    const { phoneNumber } = request.body;
    const userId = request.user;

    const query = 'UPDATE users u SET phone_number = $1 FROM identities i WHERE u.id = i.user_id AND i.id = $2';
    const values = [phoneNumber, userId];

    updateQuery(query, values, response);
});

router.put("/update-user-salary", basicAuth, (request, response) => {
    const { salaryFrom, salaryTo } = request.body;
    const userId = request.user;

    const query = 'UPDATE users u SET salary_from = $1, salary_to = $2 FROM identities i WHERE u.id = i.user_id AND i.id = $3';
    const values = [salaryFrom, salaryTo, userId];

    updateQuery(query, values, response);
});

router.put("/update-user-attack-range", basicAuth, (request, response) => {
    const { attackRange } = request.body;
    const userId = request.user;

    const query = 'UPDATE users u SET attack_range = $1 FROM identities i WHERE u.id = i.user_id AND i.id = $2';
    const values = [attackRange, userId];

    updateQuery(query, values, response);
});

router.put("/update-user-vertical-range", basicAuth, (request, response) => {
    const { verticalRange } = request.body;
    const userId = request.user;

    const query = 'UPDATE users u SET vertical_range = $1 FROM identities i WHERE u.id = i.user_id AND i.id = $2';
    const values = [verticalRange, userId];

    updateQuery(query, values, response);
});

router.put("/update-user-block-range", basicAuth, (request, response) => {
    const { blockRange } = request.body;
    const userId = request.user;

    const query = 'UPDATE users u SET block_range = $1 FROM identities i WHERE u.id = i.user_id AND i.id = $2';
    const values = [blockRange, userId];

    updateQuery(query, values, response);
});

router.put("/update-user-weight", basicAuth, (request, response) => {
    const { weight } = request.body;
    const userId = request.user;

    const query = 'UPDATE users u SET weight = $1 FROM identities i WHERE u.id = i.user_id AND i.id = $2';
    const values = [weight, userId];

    updateQuery(query, values, response);
});

router.put("/update-user-height", basicAuth, (request, response) => {
    const { height } = request.body;
    const userId = request.user;

    const query = 'UPDATE users u SET height = $1 FROM identities i WHERE u.id = i.user_id AND i.id = $2';
    const values = [height, userId];

    updateQuery(query, values, response);
});

router.put("/update-user-position", basicAuth, (request, response) => {
    const { position } = request.body;
    const userId = request.user;

    const query = 'UPDATE users u SET position = $1 FROM identities i WHERE u.id = i.user_id AND i.id = $2';
    const values = [position, userId];

    updateQuery(query, values, response);
});

router.put("/update-user-country", basicAuth, (request, response) => {
    const { country } = request.body;
    const userId = request.user;

    const query = 'UPDATE users u SET country = $1 FROM identities i WHERE u.id = i.user_id AND i.id = $2';
    const values = [country, userId];

    updateQuery(query, values, response);
});

router.put("/update-user-stuff-position", basicAuth, (request, response) => {
    const { position } = request.body;
    const userId = request.user;

    const query = 'UPDATE users u SET position = $1 FROM identities i WHERE u.id = i.user_id AND i.id = $2';
    const values = [position+10, userId]; // position id > 10 for stuff

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

router.get("/get-all-stuff-positions", (request, response) => {
    const query = 'SELECT * FROM stuff_positions';

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

router.post("/edit-profile-image", basicAuth, upload.single("image"), (request, response) => {
   const id = request.user;

   const query = `INSERT INTO images VALUES (nextval('images_id_sequence'), $1) RETURNING id`;
   const values = [request.file.filename];

   db.query(query, values, (err, res) => {
       if(res) {
           const query = 'UPDATE users u SET profile_picture = $1 FROM identities i WHERE u.id = i.user_id AND i.id = $2';
           const values = [res.rows[0].id, id];

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

router.post('/add-cv', (request, response) => {
   const { type, title, from, to, description } = request.body;
   const userId = request.user;

   const id = uuidv4();
   const query = 'INSERT INTO cvs VALUES ($1, $2, $3, $4, $5, $6, NOW(), $7)';
   const values = [id, type, title, from, to, description, userId];

   db.query(query, values, (err, res) => {
       console.log(err);
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

router.post('/update-cv', (request, response) => {
    const { id, title, from, to, description } = request.body;

    const query = 'UPDATE cvs SET title = $1, from_date = $2, to_date = $3, description = $4 WHERE id = $5';
    const values = [title, from, to, description, id];

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

router.delete('/delete-cv', (request, response) => {
    const id = request.query.id;

    const query = 'DELETE FROM cvs WHERE id = $1';
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

router.get('/get-player-cvs', (request, response) => {
    const id = request.query.id;
    const userId = request.user;

    const query = 'SELECT * FROM cvs WHERE user_id = $1 OR user_id = $2';
    const values = [id, userId];

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

router.get('/is-user-with-two-accounts', (request, response) => {
    const id = request.user;

    const query = `SELECT id FROM users WHERE email = (
                        SELECT email FROM users u JOIN identities i ON u.id = i.user_id WHERE i.id = $1
                    )`;
    const values = [id];

    db.query(query, values, (err, res) => {
        if(res.rowCount > 1) {
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

router.get('/second-account-data', (request, response) => {
    const id = request.user;

    const query = `SELECT i.id, i.user_id FROM identities i 
                    JOIN users u ON i.user_id = u.id 
                    WHERE i.id != $1 AND u.email = (
                        SELECT email FROM users u JOIN identities i ON i.user_id = u.id WHERE i.id = $1
                    )`;
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

router.get('/get-user-to-clubs-notifications', (request, response) => {
    const id = request.query.id;

    const query = `SELECT * FROM users_to_clubs_notifications WHERE user_id = $1`;
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
})

router.post('/send-user-to-club-notification', (request, response) => {
   const { userId, clubId } = request.body;

   const query = `SELECT * FROM users WHERE id = $1`;
   const values = [userId];

   db.query(query, values, (err, res) => {
      if(res) {
          const userFullName = `${res.rows[0].first_name} ${res.rows[0].last_name}`;

          const query = `INSERT INTO users_to_clubs_notifications VALUES ($1, $2, NOW())`;
          const values = [userId, clubId];

          db.query(query, values, (err, res) => {
              if(res) {
                  // Send notificaiton to club
                  const query = `INSERT INTO notifications VALUES (nextval('notifications_id_sequence'), NULL, $1, $2, $3, NOW()) RETURNING id`;
                  const values = [`${userFullName} jest zainteresowany grą w Twoim klubie! Kliknij, by przejść na jego profil`,
                      `/zawodnik?id=${userId}`,
                      'Nowy zawodnik wysłał do Ciebie swoje CV'];

                  db.query(query, values, (err, res) => {
                      if(res) {
                          const notificationId = res.rows[0].id;

                          const query = `INSERT INTO notifications_receivers VALUES ($1, $2, false)`;
                          const values = [notificationId, clubId];

                          db.query(query, values, (err, res) => {
                              response.send({
                                  result: 1
                              });
                          });
                      }
                  });
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
              result: 1
          });
      }
   });
});

module.exports = router;
