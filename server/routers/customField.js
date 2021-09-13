const express = require("express");
const router = express.Router();
const db = require("../database/db");
const sendResposne = require("../helpers/sendResponse");

router.get("/get-all", (request, response) => {
   const query = 'SELECT * FROM custom_fields';
   db.query(query, [], (err, res) => {
      if(res) sendResposne(response, res.rows);
      else sendResposne(response, 0);
   });
});

router.get("/get-single-field", (request, response) => {
    const key = request.query.key;

    if(key) {
        const query = 'SELECT * FROM custom_fields WHERE key = $1';
        const values = [key];
        db.query(query, values, (err, res) => {
           if(res) sendResposne(response, res.rows);
           else sendResposne(response, 0);
        });
    }
    else {
        sendResposne(response, 0);
    }
});

router.get("/get-single-image", (request, response) => {

});

router.post("/add-field", (request, response) => {
    const { key, value } = request.body;

    const query = 'INSERT INTO custom_fields VALES ($1, $2)';
    const values = [key, value];

    db.query(query, values, (err, res) => {
       if(res) sendResposne(response, 1);
       else sendResposne(response, 0);
    });
});

router.post("/add-image", (request, response) => {

});

router.put("/update-field", (request, response) => {
    const { key, value } = request.body;

    const query = 'UPDATE custom_fields SET value = $1 WHERE key = $2';
    const values = [value, key];
    db.query(query, values, (err, res) => {
       if(res) sendResposne(response, res.rows);
       else sendResposne(response, 0);
    });
});

router.put("/update-image", (request, response) => {

});

router.delete("/delete-field", (request, response) => {
    const { key } = request.body;

    const query = 'UPDATE custom_fields SET value = NULL WHERE key = $1';
    const values = [key];
    db.query(query, values, (err, res) => {
       if(res) sendResposne(response, 1);
       else sendResposne(response, 0);
    });
});

router.delete("/delete-image", (request, response) => {
    const { key } = request.body;

    const query = 'UPDATE custom_images SET value = NULL WHERE key = $1';
    const values = [key];
    db.query(query, values, (err, res) => {
        if(res) sendResposne(response, 1);
        else sendResposne(response, 0);
    });
});

module.exports = router;
