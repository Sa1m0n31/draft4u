const express = require("express");
const router = express.Router();
const db = require("../database/db");

const multer  = require('multer')
const upload = multer({ dest: 'media/blog' })

router.post("/add", upload.single("image"), (request, response) => {
    const { title, excerpt, content } = request.body;

    let filename;
    if(request.file) {
        filename = request.file.filename;
        const query = `INSERT INTO images VALUES (nextval('images_id_sequence'), $1) RETURNING id`;
        const values = [filename];

        db.query(query, values, (err, res) => {
            if(res) {
               if(res.rows) {
                   const imageId = res.rows[0].id;
                   const query = `INSERT INTO articles VALUES (nextval('articles_id'), $1, $2, NOW(), $3, $4)`;
                   const values = [title, content, imageId, excerpt];

                   db.query(query, values, (err, res) => {
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
        const query = `INSERT INTO articles VALUES (nextval('articles_id'), $1, $2, NOW(), NULL, $3)`;
        const values = [title, content, excerpt];

        db.query(query, values, (err, res) => {
            if(res) response.send({result: 1});
            else response.send({result: 0});
        });
    }
});

router.post("/update", upload.single("image"), (request, response) => {
    const { id, imgUpdate, title, excerpt, content } = request.body;

    let filename;
    if(request.file) {
        filename = request.file.filename;
        const query = `INSERT INTO images VALUES (nextval('images_id_sequence'), $1) RETURNING id`;
        const values = [filename];

        db.query(query, values, (err, res) => {
            if(res) {
                if(res.rows) {
                    const imageId = res.rows[0].id;
                    const query = `UPDATE articles SET title = $1, content = $2, image = $3, excerpt = $4 WHERE id = $5`;
                    const values = [title, content, imageId, excerpt, id];

                    db.query(query, values, (err, res) => {
                        if(res) response.send({result: 2});
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
       if(imgUpdate === 'delete') {
           const query = `UPDATE articles SET title = $1, content = $2, excerpt = $3, image = NULL WHERE id = $4`;
           const values = [title, content, excerpt, id];

           db.query(query, values, (err, res) => {
               if(res) response.send({result: 2});
               else response.send({result: 0});
           });
       }
       else {
           const query = `UPDATE articles SET title = $1, content = $2, excerpt = $3 WHERE id = $4`;
           const values = [title, content, excerpt, id];

           db.query(query, values, (err, res) => {
               if(res) response.send({result: 2});
               else response.send({result: 0});
           });
       }
    }
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
    const query = 'SELECT a.id, a.title, a.created_at, a.excerpt, i.file_path FROM articles a LEFT OUTER JOIN images i ON a.image = i.id';

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

    const query = 'SELECT a.id, a.title, a.content, a.created_at, a.excerpt, i.file_path FROM articles a LEFT OUTER JOIN images i ON a.image = i.id WHERE a.id = $1';
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

router.get("/get-last-article", (request, response) => {
   const query = 'SELECT a.id, a.title, a.created_at, a.excerpt, i.file_path FROM articles a LEFT OUTER JOIN images i ON a.image = i.id ORDER BY a.created_at DESC LIMIT 1';

   db.query(query, [], (err, res) => {
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

const removePolishChars = (str) => {
    return str
        .toLowerCase()
        .replace(/ą/g, "a")
        .replace(/ć/g, "c")
        .replace(/ę/g, "e")
        .replace(/ł/g, "l")
        .replace(/ń/g, "n")
        .replace(/ó/g, "o")
        .replace(/ś/g, "s")
        .replace(/ź/g, "z")
        .replace(/ż/g, "z");
}

const convertStringToURL = (str) => {
    return removePolishChars(str.replace(/ /g, '-'));
}

router.get("/get-article-by-slug", (request, response) => {
    const slug = request.query.slug;
    const query = 'SELECT a.id, a.title, a.created_at, a.excerpt, a.content, i.file_path FROM articles a LEFT OUTER JOIN images i ON a.image = i.id';

   db.query(query, [], (err, res) => {
       if(res) {
           if(res.rows) {
               res.rows.forEach((item, index, array) => {
                   if(convertStringToURL(item.title) === slug) {
                       response.send({
                           result: res.rows[index]
                       });
                   }
                   else if(index === array.length-1) {
                       response.send({result: 0});
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
});

module.exports = router;
