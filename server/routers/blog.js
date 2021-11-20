const express = require("express");
const router = express.Router();
const db = require("../database/db");

const multer  = require('multer')
const upload = multer({ dest: 'media/blog' })

router.post("/add", upload.single("image"), (request, response) => {
    const { title, content } = request.body;

    let filename;
    if(request.file) {
        filename = request.file.filename;
        const query = `INSERT INTO images VALUES (nextval('images_id_sequence'), $1) RETURNING id`;
        const values = [filename];

        db.query(query, values, (err, res) => {
            console.log(err);
           if(res) {
               if(res.rows) {
                   const imageId = res.rows[0].id;
                   const query = `INSERT INTO articles VALUES (nextval('articles_id'), $1, $2, NOW(), $3)`;
                   const values = [title, content, imageId];

                   db.query(query, values, (err, res) => {
                      console.log(err);
                       if(res) response.send({result: 1});
                      else response.send({result: 0});
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
        const query = `INSERT INTO articles VALUES (nextval('articles_id'), $1, $2, NOW(), NULL)`;
        const values = [title, content];

        db.query(query, values, (err, res) => {
            console.log(err);
            if(res) response.send({result: 1});
            else response.send({result: 0});
        });
    }
});

router.post("/update", upload.single("image"), (request, response) => {

});

router.delete("/delete", (request, response) => {
   const id = request.query.id;

   const query = 'DELETE FROM articles WHERE id = $1';
   const values = [id];

   db.query(query, values, (err, res) => {
       if(res) response.send({result: 1});
       else response.send({result: 0});
   });
});

router.get("/get-all", (request, response) => {
    const query = 'SELECT a.id, a.title, a.created_at, i.file_path FROM articles a LEFT OUTER JOIN images i ON a.image = i.id';

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

router.get("/get", (request, response) => {
    const id = request.query.id;

    const query = 'SELECT a.id, a.title, a.content, a.created_at, i.file_path FROM articles a LEFT OUTER JOIN images i ON a.image = i.id WHERE a.id = $1';
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
    })
});

module.exports = router;
