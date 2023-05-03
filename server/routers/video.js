const express = require("express");
const router = express.Router();
const path = require("path");
const db = require("../database/db");

const multer  = require('multer')
const apiAuth = require("../apiAuth");
const upload = multer({ dest: 'videos/' });

const basicAuth = new apiAuth().basicAuth;

router.get("/get", (request, response) => {
    const { url } = request.query;
    response.set({'Content-Type': 'video/mp4'});
    response.sendFile(path.join(__dirname, '../', url));
});

router.post("/upload", basicAuth, upload.single('file'), (request, response) => {
    const { userId, play } = request.body;

    let progress = 0;
    let fileSize = request.headers['content-length'] ? parseInt(request.headers['content-length']) : 0;
    request.on('data', (chunk) => {
        progress += chunk.length;
        response.write((`${Math.floor((progress * 100) / fileSize)} `));
        if(progress === fileSize) {
            console.log('Finished', progress, fileSize)
        }
    });

    /* Get video category id */
    const query = `SELECT id FROM video_categories WHERE name = $1`;
    const values = [play];

    db.query(query, values, (err, res) => {
        if(res.rows[0].id) {
            /* Check if video already exists */
            const playId = res.rows[0].id;
            const query = 'SELECT id FROM videos WHERE user_id = $1 AND video_category = $2';
            const values = [userId, playId];

            db.query(query, values, (err, res) => {
                if(res) {
                    if(res.rows.length) {
                        /* Update old video */
                        const query = `UPDATE videos SET file_path = $1, date = NOW() WHERE user_id = $2 AND video_category = $3`;
                        const values = [request.file.filename, userId, playId];

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
                        /* Add new video */
                        const query = `INSERT INTO videos VALUES (nextval('videos_id_sequence'), $1, $2, $3, NOW())`;
                        const values = [request.file.filename, userId, playId];

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

router.delete("/delete", basicAuth, (request, response) => {
   const { userId, play } = request.body;

    /* Get video category id */
    const query = 'SELECT id FROM video_categories WHERE name = $1';
    const values = [play?.toLowerCase()];

    db.query(query, values, (err, res) => {
       if(res) {
           const query = 'DELETE FROM videos WHERE user_id = $1 AND video_category = $2';
           const values = [userId, res.rows[0].id];

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

router.get("/get-user-videos", (request, response) => {
   const userId = request.query.id;

   const query = `SELECT v.file_path, c.name, v.date + interval '1' day as date FROM videos v JOIN video_categories c ON v.video_category = c.id WHERE v.user_id = $1`;
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
