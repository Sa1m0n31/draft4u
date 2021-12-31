const express = require("express");
const router = express.Router();
const db = require("../database/db");

const multer  = require('multer')
const upload = multer({ dest: 'media/notifications' })

router.post("/add", upload.single("image"), (request, response) => {
    const { title, content, link, receivers } = request.body;

    if(request.file) {
        const filename = request.file.filename;

        const query = `INSERT INTO images VALUES (nextval('images_id_sequence'), $1) RETURNING id`;
        const values = [filename];

        db.query(query, values, (err, res) => {
            if(res) {
                const imageId = res.rows[0].id;
                const query = `INSERT INTO notifications VALUES (nextval('notifications_id_sequence'), $1, $2, $3, $4, NOW()) RETURNING id`;
                const values = [imageId, content, link, title];

                db.query(query, values, (err, res) => {
                    if(res) {
                        const notificationId = res.rows[0].id;
                        receivers.split(",").forEach((item, index, array) => {
                            const query = `INSERT INTO notifications_receivers VALUES ($1, $2, false)`;
                            const values = [notificationId, item];
                            db.query(query, values);
                            if(index === array.length-1) {
                                response.send({
                                    result: 1
                                });
                            }
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
        const query = `INSERT INTO notifications VALUES (nextval('notifications_id_sequence'), NULL, $1, $2, $3, NOW()) RETURNING id`;
        const values = [content, link, title];

        db.query(query, values, (err, res) => {
            if(res) {
                const notificationId = res.rows[0].id;
                receivers.split(",").forEach((item, index, array) => {
                    const query = `INSERT INTO notifications_receivers VALUES ($1, $2, false)`;
                    const values = [notificationId, item];
                    db.query(query, values);
                    if(index === array.length-1) {
                        response.send({
                            result: 1
                        });
                    }
                });
            }
        });
    }
});

router.post("/update", upload.single("image"), (request, response) => {
    const { id, title, content, link, receivers, imgUpdate } = request.body;

    const query = 'UPDATE notifications SET title = $1, content = $2, link = $3 WHERE id = $4';
    const values = [title, content, link, id];

    db.query(query, values, (err, res) => {
        if(res) {
            const query = "DELETE FROM notifications_receivers WHERE notification_id = $1";
            const values = [id];
            db.query(query, values, (err, res) => {
                if(res) {
                    receivers.split(",").forEach((item, index, array) => {
                        const query = 'INSERT INTO notifications_receivers VALUES ($1, $2, false)';
                        const values = [id, item];

                        db.query(query, values, (err, res) => {
                            if(index === array.length-1) {
                                if(imgUpdate === 'true') {
                                    const query = `INSERT INTO images VALUES (nextval('images_id_sequence'), $1) RETURNING id`;
                                    const values = [request.file.filename];

                                    db.query(query, values, (err, res) => {
                                       if(res) {
                                           const imageId = res.rows[0].id;
                                           const query = 'UPDATE notifications SET image = $1 WHERE id = $2';
                                           const values = [imageId, id];
                                           db.query(query, values, (err, res) => {
                                               if(res) {
                                                   response.send({
                                                       result: 2
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
                                           })
                                       }
                                    });
                                }
                                else if(imgUpdate === 'delete') {
                                    const query = 'UPDATE notifications SET image = NULL WHERE id = $1';
                                    const values = [id];
                                    db.query(query, values, (err, res) => {
                                       if(res) {
                                           response.send({
                                               result: 2
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
                                        result: 2
                                    });
                                }
                            }
                        })
                    })
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

router.get("/get-all", (request, response) => {
    const query = 'SELECT n.id, n.title, i.file_path FROM notifications n LEFT OUTER JOIN images i ON n.image = i.id';

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
    })
});

router.get("/get-single", (request, response) => {
   const id = request.query.id;

   const query = 'SELECT n.id, n.title, n.content, n.link, i.file_path, r.receiver_id FROM notifications n JOIN notifications_receivers r ON n.id = r.notification_id LEFT OUTER JOIN images i ON i.id = n.image WHERE n.id = $1';
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

router.get("/get-club-notifications", (request, response) => {
    const id = request.user;

    const query = 'SELECT n.id, n.title, n.link, n.content, i.file_path, r.read FROM notifications n JOIN notifications_receivers r ON n.id = r.notification_id LEFT OUTER JOIN images i ON n.image = i.id WHERE r.receiver_id = $1';
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

router.get("/get-user-notifications", (request, response) => {
   const id = request.user;

   const query = 'SELECT n.id, n.title, n.link, n.content, i.file_path, r.read FROM notifications n JOIN notifications_receivers r ON n.id = r.notification_id LEFT OUTER JOIN images i ON n.image = i.id JOIN identities id ON id.id = r.receiver_id WHERE id.id = $1 ORDER BY n.created_at DESC';
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

router.post("/read-all", (request, response) => {
    const user = request.user;

    const query = 'UPDATE notifications_receivers SET read = true WHERE receiver_id = $1';
    const values = [user];

    db.query(query, values,(err, res) => {
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

router.post("/read-notification", (request, response) => {
    const user = request.user;
    const notification = request.body.notification;

    const query = 'UPDATE notifications_receivers SET read = true WHERE receiver_id = $1 AND notification_id = $2';
    const values = [user, notification];

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

router.delete("/delete", (request, response) => {
   const id = request.query.id;

   const query = 'DELETE FROM notifications_receivers WHERE notification_id = $1';
   const values = [id];

   db.query(query, values, (err, res) => {
      if(res) {
          const query = 'DELETE FROM notifications WHERE id = $1';
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
   });
});

module.exports = router;
