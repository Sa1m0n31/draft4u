const express = require("express");
const router = express.Router();
const db = require("../database/db");

const multer  = require('multer')
const upload = multer({ dest: 'media/clubs' })

const apiAuth = require("../apiAuth");
const basicAuth = new apiAuth().basicAuth;

router.get('/get', (request, response) => {
    const postsPerPage = parseInt(process.env.POSTS_PER_PAGE);
    const { page } = request.query;
    const query = `SELECT * FROM posts LIMIT $1 OFFSET $2`;
    const values = [postsPerPage, page * postsPerPage];

    db.query(query, values, (err, res) => {
        if(res) {
            if(res.rows) {
                const posts = res.rows;
                const postsIds = posts.map((item) => (item.id));

                const query = `SELECT * FROM comments WHERE post_id = ANY($1::INT[])`;
                const values = [postsIds];

                db.query(query, values, (err, res) => {
                    if(res) {
                        let comments = res.rows;
                        let postsWithComments = [];

                        for(const post of posts) {
                            const commentsOfCurrentPost = comments.filter((item) => {
                                return item.post_id === post.id;
                            });

                            postsWithComments.push({
                                ...post,
                                comments: commentsOfCurrentPost
                            });
                        }

                        response.send({
                            result: postsWithComments
                        });
                    }
                    else {
                        console.log(err);
                        response.send({
                            result: 0
                        });
                    }
                });
            }
            else {
                response.send({
                    result: []
                });
            }
        }
        else {
            console.log(err);
            response.send({
                result: []
            });
        }
    });
});

router.post("/add", basicAuth, upload.single("image"), (request, response) => {
    const { userId, clubId, content } = request.body;

    const insertPost = (userId, clubId, content, imageId) => {
        const query = `INSERT INTO posts VALUES (nextval('posts_id_sequence'), $1, $2, NOW(), $3, $4)`;
        const values = [isNaN(userId) ? null : userId, clubId, content, imageId];
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
    }

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
                    console.log('insert image');
                    insertPost(userId, clubId, content, res.rows[0].id);
                }
                else {
                    console.log('error in image');
                    console.log(err);
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
        insertPost(userId, clubId, content, null);
    }
});

router.delete('/delete', basicAuth, (request, response) => {
    const id = request.query.id;

    const query = `DELETE FROM posts WHERE id = $1`;
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

router.post('/add-comment', (request, response) => {
   const { content, userId, clubId, postId } = request.body;

   const query = `INSERT INTO comments VALUES (nextval('comments_id_sequence'), NOW(), $1, $2, $3, $4)`;
   const values = [content, userId, clubId, postId];

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

router.delete('/delete-comment', (request, response) => {
   const id = request.query.id;

   const query = `DELETE FROM comments WHERE id = $1`;
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

module.exports = router;
