const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
const session = require('express-session');
const passport = require("passport");

const app = express();

/* Middleware */
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(
    session({
        secret: "secretcode",
        resave: true,
        saveUninitialized: true,
    })
);
app.use(cookieParser("secretcode"));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, '../client/build')));

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
