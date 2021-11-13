const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const app = express();
const morgan = require('morgan');
const fs = require('fs');
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);


// const { createServer } = require("http");
// const { Server } = require("socket.io");
//
// const httpServer = createServer(app);
// const io = new Server(httpServer, {
//     cors: {
//         origin: "https://drafcik.skylo-test1.pl:3000",
//         methods: ["GET", "POST"]
//     }
// });

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


// create a write stream (in append mode)
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
//
// setup the logger
app.use(morgan('combined', { stream: accessLogStream }));

/* Middleware */
app.use(cors({
    credentials: true,
    //origin: "*"
    origin: ['http://localhost:3000', 'http://localhost:5000', 'https://drafcik.skylo-test1.pl', 'http://skylo-test4.pl']
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(
    session({
        secret: "secretcode",
        resave: false,
        saveUninitialized: true,
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

/* Socket.IO */
io.on("connection", (socket) => {
    const { room, sender, receiver } = socket.handshake.query;
    if(receiver) {
        if(room) {
            socket.join(room + "-receiver");
        }
    }

    socket.on("message", (data) => {
        io.to(room+"-receiver").emit("message", {
            data,
            sender
        });
    });
});

// httpServer.listen(3001);

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
app.get("/edycja-profilu", (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});
app.get("/faq", (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});
app.get("/o-nas", (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});
app.get("/zawodnik", (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});
app.get("/klub", (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

app.get("/dodaj-video", (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});
app.get("/zaplac", (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});
app.get("/subskrypcja-przedluzona", (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

app.get("/konto-klubu", (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});
app.get("/szukaj", (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});
app.get("/profil-zawodnika", (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});
app.get("/ulubieni", (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});
app.get("/porownywarka", (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});
app.get("/sklady", (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});
app.get("/zapisane-druzyny", (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});
app.get("/wiadomosci", (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

app.get("/admin", (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});
app.get("/panel", (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});
app.get("/dodaj-powiadomienie", (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});
app.get("/lista-powiadomien", (req, res) => {
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
const paymentRouter = require("./routers/payment");
const chatRouter = require("./routers/chat");

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
app.use("/payment", paymentRouter);
app.use("/chat", chatRouter);

app.listen(5000);
