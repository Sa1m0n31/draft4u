const express = require("express");
const router = express.Router();
const passport = require("passport");
require('../passport')(passport);

router.post("/login",
    passport.authenticate('local', { successRedirect: "/moje-konto",
                                                    failureRedirect: "/"
    }),
);

module.exports = router;
