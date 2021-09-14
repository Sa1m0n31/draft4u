const express = require("express");
const router = express.Router();
const passport = require("passport");
require('../passport')(passport);

router.all('/', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

router.get("/auth", (request, response) => {
    if(request.user) response.send({result: 1});
    else response.send({result: 0});
});

router.post("/login",
    passport.authenticate('local', { session: true }),
    (request, response) => {
        response.send({
            result: 1
        });
    }
);

// router.get("/facebook",
//     passport.authenticate('facebook')
//     );

router.get("/facebook", (request, response) => {
   console.log("hi!");
    console.log(request.user);
    console.log(request.cookies);
   console.log(request.session);
});

router.get("/google", passport.authenticate('google'));

module.exports = router;
