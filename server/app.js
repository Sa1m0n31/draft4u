const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const session = require('express-session');

const app = express();

/* Redirect http to https */
// app.enable('trust proxy');
// app.use (function (req, res, next) {
//     if (req.secure) {
//         // request was via https, so do no special handling
//         next();
//     } else {
//         // request was via http, so redirect to https
//         res.redirect('https://' + req.headers.host + req.url);
//     }
// });


/* Middleware */
app.use(cors({
    credentials: true,
    origin: ['https://drafcik.skylo-test1.pl', 'http://drafcik.skylo-test1.pl', 'http://localhost:3000']
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(
    session({
        secret: "secretcode",
        resave: true,
        saveUninitialized: false,
        cookie: { secure: false, expires: 1000 * 60 * 30 } /* Session expire in 30 minutes */
    })
);
const passport = require("passport");
app.use(passport.initialize());
app.use(passport.session());

/* Check if user is logged in middleware */
const isLoggedIn = (req, res, next) => {
    if(req.user) next();
    else res.redirect("/");
}

app.use(express.static(path.join(__dirname, '../client/build')));

app.get("/moje-konto", (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});
app.get("/rozpocznij", (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});
app.get("/logowanie", (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});
app.get("/weryfikacja", (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});
app.get("/zaloz-konto", (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});
app.get("/odzyskiwanie-hasla", (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});
app.get("/resetowanie-hasla", (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

/* Routers */
const authRouter = require("./routers/auth");
const imageRouter = require("./routers/image");
const videoRouter = require("./routers/video");
const customFieldRouter = require("./routers/customField");
const notificationRouter = require("./routers/notification");
const squadRouter = require("./routers/squad");
const visitedRouter = require("./routers/visited");
const favoriteRouter = require("./routers/favorite");
const couponRouter = require("./routers/coupon");
const clubRouter = require("./routers/club");
const userRouter = require("./routers/user");
const blogRouter = require("./routers/blog");
const priceRouter = require("./routers/price");
const leagueRouter = require("./routers/league");
const adminRouter = require("./routers/admin");

app.use("/auth", authRouter);
app.use("/image", imageRouter);
app.use("/video", videoRouter);
app.use("/custom-field", customFieldRouter);
app.use("/notification", notificationRouter);
app.use("/squad", squadRouter);
app.use("/visited", visitedRouter);
app.use("/favorite", favoriteRouter);
app.use("/coupon", couponRouter);
app.use("/club", clubRouter);
app.use("/user", userRouter);
app.use("/blog", blogRouter);
app.use("/price", priceRouter);
app.use("/league", leagueRouter);
app.use("/admin", adminRouter);

app.listen(5000);
