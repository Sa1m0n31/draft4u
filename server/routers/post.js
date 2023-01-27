const express = require("express");
const router = express.Router();
const db = require("../database/db");

const multer  = require('multer')
const upload = multer({ dest: 'media/posts' })

const apiAuth = require("../apiAuth");
const basicAuth = new apiAuth().basicAuth;

router.get('/get', (request, response) => {
    const postsPerPage = parseInt(process.env.POSTS_PER_PAGE);
    const { page } = request.query;
    const query = `SELECT p.id, p.club_id, p.user_id, p.content, p.date, p.image, i.file_path, 
        c.name as club_name, u.first_name, u.last_name, 
        i_club.file_path as club_logo, i_user.file_path as user_profile_image 
        FROM posts p 
        LEFT OUTER JOIN images i ON p.image = i.id 
        LEFT OUTER JOIN clubs c ON p.club_id = c.id
        LEFT OUTER JOIN images i_club ON c.logo = i_club.id
        LEFT OUTER JOIN users u ON p.user_id = u.id
        LEFT OUTER JOIN images i_user ON u.profile_picture = i_user.id
        ORDER BY p.date DESC
        LIMIT $1 OFFSET $2`;
    const values = [postsPerPage, page * postsPerPage];

    db.query(query, values, (err, res) => {
        if(res) {
            if(res.rows) {
                const posts = res.rows;
                const postsIds = posts.map((item) => (item.id));

                const query = `SELECT c.id, c.user_id, c.club_id, c.date, c.content, c.post_id,
                cl.name as club_name, u.first_name, u.last_name,
                i_club.file_path as club_logo, i_user.file_path as user_profile_image
                FROM comments c
                LEFT OUTER JOIN clubs cl ON c.club_id = cl.id
                LEFT OUTER JOIN images i_club ON cl.logo = i_club.id
                LEFT OUTER JOIN users u ON c.user_id = u.id
                LEFT OUTER JOIN images i_user ON u.profile_picture = i_user.id
                WHERE post_id = ANY($1::INT[])`;
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
            response.send({
                result: []
            });
        }
    });
});

router.get('/get-comments', (request, response) => {
    const id = request.query.id;

    const query = `SELECT c.id, c.user_id, c.club_id, c.date, c.content, c.post_id,
                cl.name as club_name, u.first_name, u.last_name,
                i_club.file_path as club_logo, i_user.file_path as user_profile_image
                FROM comments c
                LEFT OUTER JOIN clubs cl ON c.club_id = cl.id
                LEFT OUTER JOIN images i_club ON cl.logo = i_club.id
                LEFT OUTER JOIN users u ON c.user_id = u.id
                LEFT OUTER JOIN images i_user ON u.profile_picture = i_user.id
                WHERE post_id = $1`;
    const values = [id];

    db.query(query, values, (err, res) => {
        if(res) {
            response.send({
                result: res.rows
            })
        }
        else {
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

   console.log('add comment');

   const query = `INSERT INTO comments VALUES (nextval('comments_id_sequence'), $1, $2, NOW(), $3, $4)`;
   const values = [userId, clubId, content, postId];

   db.query(query, values, (err, res) => {
      if(res) {
          response.send({
              result: 1
          });
      }
      else {
          console.log(err);
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
