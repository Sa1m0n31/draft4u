const express = require("express");
const router = express.Router();
const db = require("../database/db");
const crypto = require("crypto");
const { v4: uuidv4 } = require('uuid');

const multer  = require('multer')
const upload = multer({ dest: 'media/clubs' })

router.get("/get-all", (request, response) => {
    const query = 'SELECT c.id, c.name, c.login, c.x, c.y, c.league, c.nip, c.krs, c.city, l.sex, i.file_path FROM clubs c LEFT OUTER JOIN images i ON c.logo = i.id JOIN leagues l ON c.league = l.id';
    db.query(query, (err, res) => {
       if(res) {
            response.send({
                result: res.rows
            })
       }
       else {
           response.send({
               result: 0
           });
       }
    });
});

router.get("/get-locations", (request, response) => {
    const query = `SELECT x, y, STRING_AGG(i.file_path, ';') as logos, STRING_AGG(c.league::text, ';') as leagues FROM clubs c LEFT OUTER JOIN images i ON c.logo = i.id GROUP BY x, y`;

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

router.get("/get-club-data", (request, response) => {
   const clubId = request.user;

   const query = 'SELECT c.id, c.name, c.x, c.y, c.nip, c.krs, c.city, c.email, i.file_path FROM clubs c LEFT OUTER JOIN images i ON c.logo = i.id WHERE c.id = $1';
   const values = [clubId];

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

router.get("/get-club-by-id", (request, response) => {
   const id = request.query.id;

    const query = 'SELECT c.id, c.name, c.login, c.x, c.y, c.league, c.nip, c.krs, c.city, c.email, i.file_path FROM clubs c LEFT OUTER JOIN images i ON c.logo = i.id WHERE c.id = $1';
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

router.get("/get-all-players", (request, response) => {
   const query = `SELECT u.id as user_id, u.first_name, u.salary_from, u.salary_to, u.sex, u.position, u.last_name, i.file_path, u.birthday, u.weight, u.height, u.block_range, u.attack_range, u.vertical_range 
   FROM users u 
   JOIN identities id ON id.user_id = u.id
   LEFT OUTER JOIN images i ON u.profile_picture = i.id
   WHERE id.active = true AND id.subscription >= NOW()`;

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

router.get("/get-three-newest", (request, response) => {
   const club = request.user;

   const query = `SELECT u.id, u.first_name, u.last_name, i.file_path, u.birthday, u.weight, u.height, u.block_range, u.attack_range, u.vertical_range 
            FROM users u 
            JOIN identities id ON u.id = id.user_id
            LEFT OUTER JOIN images i ON u.profile_picture = i.id 
            WHERE u.id NOT IN (
            SELECT user_id as id FROM favorites WHERE club_id = $1
            ) AND id.active = true AND id.subscription >= NOW() AND u.weight IS NOT NULL AND u.height IS NOT NULL AND u.block_range IS NOT NULL
             AND u.attack_range IS NOT NULL AND u.vertical_range IS NOT NULL LIMIT 3`;
   const values = [club];

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

router.get("/get-favorites", (request, response) => {
    const club = request.user;

    const query = `SELECT * FROM favorites f JOIN users u ON f.user_id = u.id WHERE f.club_id = $1 ORDER BY f.created_at`;
    const values = [club];

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

router.get("/get-player-highlight", (request, response) => {
    const userId = request.query.player;

    const query = 'SELECT v.file_path, v.video_category FROM videos v JOIN users u ON v.user_id = u.id WHERE u.id = $1 ORDER BY array_position(array[4, 1, 2, 3, 5, 6, 7], v.video_category)';
    const values = [userId];

    db.query(query, values, (err, res) => {
        console.log(err);
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

router.post("/update", upload.single("image"), (request, response) => {
    const { clubId, name, login, league, x, y, nip, krs, city, email, imgUpdate } = request.body;

    let filename = null;
    if(request.file) {
        filename = request.file.filename;
    }

    if(filename) {
        const query = `INSERT INTO images VALUES (nextval('images_id_sequence'), $1) RETURNING id`;
        const values = [filename];

        db.query(query, values, (err, res) => {
            if(res) {
                if(res.rows) {
                    const imageId = res.rows[0].id;
                    const query = 'UPDATE clubs SET name = $1, league = $2, login = $3, x = $4, y = $5, logo = $6, nip = $7, krs = $8, city = $9, email = $10 WHERE id = $11';
                    const values = [name, league, login, x, y, imageId, nip, krs, city, email, clubId];

                    db.query(query, values, (err, res) => {
                        if(res) {
                            response.send({
                                result: 2
                            });
                        }
                        else if(err.code == 23505) {
                            response.send({
                                result: -2
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
                    response.send({result: 0});
                }
            }
            else {
                response.send({result: 0});
            }
        });
    }
    else {
        let query;
        const values = [name, league, login, x, y, nip, krs, city, email, clubId];

        if(imgUpdate === 'delete') {
            query = 'UPDATE clubs SET name = $1, league = $2, login = $3, x = $4, y = $5, logo = NULL, nip = $6, krs = $7, city = $8, email = $9 WHERE id = $10';
        }
        else {
            query = 'UPDATE clubs SET name = $1, league = $2, login = $3, x = $4, y = $5, nip = $6, krs = $7, city = $8, email = $9 WHERE id = $10';
        }

        db.query(query, values, (err, res) => {
            if(res) {
                response.send({
                    result: 2
                });
            }
            else if(err.code == 23505) {
                response.send({
                    result: -2
                });
            }
            else {
                response.send({
                    result: 0
                });
            }
        });
    }
});

router.post("/add", upload.single("image"), (request, response) => {
    const {  name, login, password, league, x, y, nip, krs, city, email } = request.body;

    let filename = null;
    if(request.file) {
        filename = request.file.filename;
    }

    const hash = crypto.createHash('sha256').update(password).digest('hex');
    const id = uuidv4();

    if(filename) {
        const query = `INSERT INTO images VALUES (nextval('images_id_sequence'), $1) RETURNING id`;
        const values = [filename];

        db.query(query, values, (err, res) => {
            if(res) {
                if(res.rows) {
                    const imageId = res.rows[0].id;
                    const query = 'INSERT INTO clubs VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)';
                    const values = [id, name, league, login, hash, imageId, x, y, nip, krs, city, email];

                    db.query(query, values, (err, res) => {
                        if(res) {
                            const query = 'INSERT INTO identities VALUES ($1, NULL, NULL, $2, true, NULL)';
                            const values = [id, hash];

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
                        else if(err.code == 23505) {
                            response.send({result: -2});
                        }
                        else {
                            response.send({result: 0});
                        }
                    })
                }
                else {
                    response.send({result: 0});
                }
            }
            else {
                response.send({result: 0});
            }
        });
    }
    else {
        const query = 'INSERT INTO clubs VALUES ($1, $2, $3, $4, $5, NULL, $6, $7, $8, $9, $10, $11)';
        const values = [id, name, league, login, hash, x, y, nip, krs, city, email];

        db.query(query, values, (err, res) => {
            if(res) {
                const query = 'INSERT INTO identities VALUES ($1, NULL, NULL, $2, true, NULL)';
                const values = [id, hash];

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
            else if(err.code == 23505) {
                response.send({result: -2});
            }
            else {
                response.send({result: 0});
            }
        });
    }
});

router.post("/change-password", (request, response) => {
    const { oldPassword, newPassword } = request.body;
    const clubId = request.user;

    const oldPasswordHash = crypto.createHash('sha256').update(oldPassword).digest('hex');
    const newPasswordHash = crypto.createHash('sha256').update(newPassword).digest('hex');

    const query = 'UPDATE clubs SET password = $1 WHERE password = $2 AND id = $3';
    const values = [newPasswordHash, oldPasswordHash, clubId];

    db.query(query, values, (err, res) => {
        if(res) {
            if(res.rowCount) {
                const query = 'UPDATE identities SET hash = $1 WHERE hash = $2 AND id = $3';
                db.query(query, values, (err, res) => {
                    if(res) {
                        response.send({result: 1});
                    }
                    else {
                        response.send({result: 0});
                    }
                });
            }
            else {
                response.send({result: -2});
            }
        }
        else {
            response.send({
                result: 0
            });
        }
    })
});

router.post("/change-club-password-from-admin-panel", (request, response) => {
    const { clubId, oldPassword, newPassword } = request.body;

    const hash = crypto.createHash('sha256').update(oldPassword).digest('hex');
    const newHash = crypto.createHash('sha256').update(newPassword).digest('hex');

    const query = 'UPDATE clubs SET password = $1 WHERE password = $2 AND id = $3';
    const values = [newHash, hash, clubId];

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
           });
       }
    });
});

module.exports = router;
