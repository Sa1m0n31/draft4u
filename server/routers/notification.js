const express = require("express");
const router = express.Router();
const db = require("../database/db");

const multer  = require('multer')
const upload = multer({ dest: 'media/notifications' })

router.post("/add", upload.single("image"), (request, response) => {
    const { title, content, link, receivers } = request.body;

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
    })
});

router.get("/get-all", (request, response) => {
    const query = 'SELECT * FROM notifications';

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

router.get("/get-club-notifications", (request, response) => {
    const id = request.query.id;

    console.log(id);
    const query = 'SELECT n.title, n.link, n.content, i.file_path, r.read FROM notifications n JOIN notifications_receivers r ON n.id = r.notification_id LEFT OUTER JOIN images i ON n.image = i.id WHERE r.receiver_id = $1';
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
   const id = request.query.id;

   const query = 'SELECT n.title, n.link, n.content, i.file_path, r.read FROM notifications n JOIN notifications_receivers r ON n.id = r.notification_id LEFT OUTER JOIN images i ON n.image = i.id JOIN identities id ON id.id = r.receiver_id WHERE id.user_id = $1';
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
})

module.exports = router;
