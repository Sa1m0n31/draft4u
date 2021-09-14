const db = require("./database/db");
const express = require("express");
const crypto = require('crypto');
const LocalStrategy = require("passport-local").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const FACEBOOK_APP_ID = '398060821923746';
const FACEBOOK_SECRET = 'c2a1d5e0a92e010b5547a739a010f0ce';

const GOOGLE_APP_ID = '888809203937-ju07csqet2hl5tj2kmmimpph7frsqn5r.apps.googleusercontent.com';
const GOOGLE_SECRET = '_onZWhS3GID4ujR-3KaX0U2N';

const init = (passport) => {
    const userAuth = (username, password, done) => {
        const hash = crypto.createHash('sha256').update(password).digest('hex');
        const query = 'SELECT * FROM identities i JOIN users u ON i.user_id = u.id WHERE u.email = $1 AND i.hash = $2';
        const values = [username, hash];

        db.query(query, values, (err, res) => {
            if(res) {
                const user = res.rows[0];
                if(!user) {
                    return done(null, false, { message: 'Niepoprawna nazwa użytkownika' });
                }
                else {
                    return done(null, user);
                }
            }
            else {
                return done(err, false, { message: "Coś poszło nie tak..." });
            }
        });
    }

    const googleAuth = () => {

    }

    const facebookAuth = (accessToken, refreshToken, profile, cb) => {
        console.log(profile);
    }

    passport.use(new LocalStrategy(userAuth));
    passport.use(new FacebookStrategy({
        clientID: FACEBOOK_APP_ID,
        clientSecret: FACEBOOK_SECRET,
        callbackURL: "http://localhost:3000/moje-konto"
    }, facebookAuth));
    passport.use(new GoogleStrategy({
        clientID: GOOGLE_APP_ID,
        clientSecret: GOOGLE_SECRET,
        callbackURL: "http://localhost:3000/moje-konto"
    }, googleAuth));

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        const query = 'SELECT * FROM identities i JOIN users u ON i.user_id = u.id WHERE u.id = $1';
        const values = [id];

        db.query(query, values, (err, res) => {
            if(res) {
                if(res.rows.length) done(null, res.rows[0].id);
            }
        });
    });
}

module.exports = init;
