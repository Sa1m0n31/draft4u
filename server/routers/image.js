const express = require("express");
const router = express.Router();
const path = require("path");
const db = require("../database/db");

const multer  = require('multer')
const upload = multer({ dest: 'media/blog' })

const apiAuth = require("../apiAuth");
const basicAuth = new apiAuth().basicAuth;

router.get("/", (request, response) => {
    const { url } = request.query;
    response.set({'Content-Type': 'image/png'});
    response.sendFile(path.join(__dirname, '../', url));
});

router.post("/add", basicAuth, upload.single("image"), (request, response) => {
    let filename;
    if(request.file) {
        filename = request.file.filename;
        const query = `INSERT INTO images VALUES (nextval('images_id_sequence'), $1) RETURNING id`;
        const values = [filename];

        db.query(query, values, (err, res) => {
            if(res) {
                response.send({
                    result: filename
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
        response.send({result: 0});
    }
});

module.exports = router;
