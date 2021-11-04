const db = require("./database/db");
const express = require("express");
const crypto = require('crypto');
const cors = require('cors');
const LocalStrategy = require("passport-local").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;

// const FACEBOOK_APP_ID = '398060821923746';
const FACEBOOK_APP_ID = '915512152656525';
// const FACEBOOK_SECRET = 'c2a1d5e0a92e010b5547a739a010f0ce';
const FACEBOOK_SECRET = '12d3f21bfc7fcdd96de536fb40779f15';

const GOOGLE_APP_ID = '888809203937-ju07csqet2hl5tj2kmmimpph7frsqn5r.apps.googleusercontent.com';
const GOOGLE_SECRET = '_onZWhS3GID4ujR-3KaX0U2N';

function isNumeric(str) {
    if (typeof str != "string") return false // we only process strings!
    return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
        !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}

const init = (passport) => {
    const userAuth = (username, password, done) => {
        const hash = crypto.createHash('sha256').update(password).digest('hex');
        const query = 'SELECT i.id FROM identities i LEFT OUTER JOIN users u ON i.user_id = u.id LEFT OUTER JOIN clubs c ON c.id = i.id WHERE u.email = $1 OR (c.login = $1 AND i.hash = $2)';
        const values = [username, hash];

        db.query(query, values, (err, res) => {
            if(res) {
                const user = res.rows[0];
                if(!user) {
                    return done(null, false, { message: 'Niepoprawna nazwa użytkownika lub hasło' });
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

    const adminAuth = (username, password, done) => {
        const hash = crypto.createHash('sha256').update(password).digest('hex');
        const query = 'SELECT id FROM admins WHERE login = $1 AND password = $2';
        const values = [username, hash];

        console.log("adminAuth");
        console.log(username + " " + hash);

        db.query(query, values, (err, res) => {
           if(res) {
               const admin = res.rows[0];
               console.log(admin);
               if(!admin) {
                   return done(null, false, { message: 'Niepoprawna nazwa użytkownika lub hasło' });
               }
               else {
                   return done(null, admin);
               }
           }
           else {
               return done(err, false, { message: "Coś poszło nie tak..." });
           }
        });
    }

    const googleAuth = () => {

    }

    const facebookAuth = (accessToken, refreshToken, profile, done) => {
        return done(null, profile);
    }

    passport.use('admin-local', new LocalStrategy(adminAuth));

    passport.use('user-local', new LocalStrategy(userAuth));
    passport.use(new FacebookStrategy({
        clientID: FACEBOOK_APP_ID,
        clientSecret: FACEBOOK_SECRET,
        callbackURL: "https://drafcik.skylo-test1.pl"
    }, facebookAuth));
    passport.use(new GoogleStrategy({
        clientID: GOOGLE_APP_ID,
        clientSecret: GOOGLE_SECRET,
        callbackURL: "https://drafcik.skylo-test1.pl"
    }, googleAuth));

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        let query;

        if(isNumeric(id.toString())) {
            /* Admin */
            query = 'SELECT id FROM admins WHERE id = $1';
        }
        else {
            /* User */
            query = 'SELECT i.id FROM identities i LEFT OUTER JOIN users u ON i.user_id = u.id LEFT OUTER JOIN clubs c ON i.id = c.id WHERE i.id = $1';
        }

        const values = [id];

        db.query(query, values, (err, res) => {
            if(res) {
                if(res.rows.length) done(null, res.rows[0].id);
            }
        });
    });
}

module.exports = init;
