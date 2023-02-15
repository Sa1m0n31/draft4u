const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require('morgan');
const fs = require('fs');
const path = require("path");
const session = require('express-session');
const apiAuth = require('./apiAuth');
const app = express();
const http = require('http');
const flash = require('connect-flash');
require('dotenv').config();

const basicAuth = new apiAuth().basicAuth;

const server = http.createServer(app);
const { Server } = require("socket.io");

const io = new Server(server, {
    cors: {
        origin: [`${process.env.API_URL}:3000`],
        methods: ["GET", "POST"]
    }
});

/* Redirect http to https */
app.enable('trust proxy');

function redirectWwwTraffic(req, res, next) {
    if (req.headers.host.slice(0, 4) === "www.") {
        var newHost = req.headers.host.slice(4);
        return res.redirect(301, req.protocol + "://" + newHost + req.originalUrl);
    }
    next();
}

app.use (function (req, res, next) {
    if (req.secure) {
        // request was via https, so do no special handling
        console.log('secure');
        next();
    } else {
        // request was via http, so redirect to https
        res.redirect('https://' + req.headers.host + req.url);
    }
});
app.use(redirectWwwTraffic);

// create a write stream (in append mode)
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
//
// setup the logger
app.use(morgan('combined', { stream: accessLogStream }));

/* Middleware */
app.use(cors({
    credentials: true,
    // origin: "*"
    origin: [`${process.env.API_URL}:3000`, `${process.env.API_URL}:5000`]
}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser({
    limit: "50mb"
}));
app.use(bodyParser.json({
    limit: "50mb"
}));
app.use(bodyParser.raw({
    limit: "50mb"
}));
app.use(bodyParser.text({
    limit: "50mb"
}));
app.use(
    session({
        secret: "secretcode",
        resave: true,
        rolling: true,
        saveUninitialized: false,
        cookie: { secure: false, expires: 1000 * 60 * 30 } /* Session expire in 30 minutes */
    })
);
app.use(flash());
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

app.use(express.static(path.join(__dirname, '../client/build')));

app.get("/moje-konto", (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});
app.get("/rozpocznij", (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});
app.get("/tablica", (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});
app.get("/posty", (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});
app.get("/logowanie", (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});
app.get("/spolecznosc", (req, res) => {
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
app.get("/informacje-o-zawodniku", (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});
app.get("/zawodnik", (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});
app.get("/klub", (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});
app.get("/mapa", (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

app.get("/dodaj-video", (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});
// app.get("/zaplac", (req, res) => {
//     res.sendFile(path.join(__dirname, '../client/build/index.html'));
// });
app.get("/subskrypcja-przedluzona", (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});
app.get("/zmien-haslo-zawodnika", (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});
app.get("/zmien-haslo-administratora", (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});
app.get("/zmien-haslo-klubu", (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});
app.get("/wpis/*", (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});
app.get("/sztab", (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

app.get("/konto-klubu", (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});
app.get("/szukaj-zawodnika", (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});
app.get("/szukaj-sztabu", (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});
app.get("/profil-zawodnika", (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});
app.get("/ulubieni-zawodnicy", (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});
app.get("/ulubieni-sztab", (req, res) => {
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
app.get("/czat", (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});
app.get("/powiadomienia", (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});
app.get("/notyfikacje", (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

app.get("/zarejestruj-przez-facebooka", (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});
app.get("/zarejestruj-przez-google", (req, res) => {
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
app.get("/lista-klubow", (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});
app.get("/dodaj-klub", (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});
app.get("/lista-artykulow", (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});
app.get("/dodaj-artykul", (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});
app.get("/lista-mailingowa", (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});
app.get("/lista-zawodnikow", (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});
app.get("/dodaj-kod", (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});
app.get("/lista-kodow", (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});
app.get("/edytuj-zawodnika", (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

app.get("/return", (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

app.get("/regulamin", (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});
app.get("/polityka-prywatnosci", (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});
app.get("/polityka-plikow-cookies", (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

app.get("/polski", (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});
app.get("/angielski", (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});
app.get("/grafiki-polski", (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});
app.get("/grafiki-angielski", (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});
app.get("/regulaminy-polski", (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});
app.get("/regulaminy-angielski", (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});
app.get("/wydarzenia", (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});
app.get("/tablica", (req, res) => {
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
const postRouter = require('./routers/post');
const eventRouter = require('./routers/event');

app.use("/auth", authRouter);
app.use("/image", imageRouter); // only / not restricted (display image)
app.use("/video", videoRouter); // only /get not restricted (display video)
app.use("/custom-field", basicAuth, customFieldRouter);
app.use("/notification", basicAuth, notificationRouter);
app.use("/squad", basicAuth, squadRouter);
app.use("/visited", basicAuth, visitedRouter);
app.use("/favorite", basicAuth, favoriteRouter);
app.use("/coupon", basicAuth, couponRouter);
app.use("/club", clubRouter);
app.use("/user", userRouter);
app.use("/blog", basicAuth, blogRouter);
app.use("/price", basicAuth, priceRouter);
app.use("/league", basicAuth, leagueRouter);
app.use("/admin", basicAuth, adminRouter);
app.use("/payment", paymentRouter);
app.use("/chat", basicAuth, chatRouter);
app.use('/post', postRouter);
app.use('/event', eventRouter);

server.listen(5000, () => {
    console.log('start listening on port 5000....');
});
