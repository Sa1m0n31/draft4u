const db = require("./database/db");
const express = require("express");
const crypto = require('crypto');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const LocalStrategy = require("passport-local").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
// const GoogleStrategy = require('passport-google-oauth20').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

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
        const query = 'SELECT i.id, i.user_id, i.active FROM identities i LEFT OUTER JOIN users u ON i.user_id = u.id LEFT OUTER JOIN clubs c ON c.id = i.id WHERE ((u.email = $1 AND i.hash = $2) OR (c.login = $1 AND i.hash = $2))';
        const values = [username, hash];

        db.query(query, values, (err, res) => {
            if(res) {
                const user = res.rows[0];
                if(!user) {
                    return done(null, false, { message: 'Niepoprawna nazwa użytkownika lub hasło' });
                }
                else if(user.active === null && user.user_id === null) {
                    return done(null, false, { message: 'Twoje konto straciło ważność. Skontaktuj się z nami w sprawie odnowienia.' });
                }
                else if(user.active === null) {
                    return done(null, false, { message: 'Konto zawodnika zostało zablokowane' });
                }
                else if(user.active === false) {
                    return done(null, false, { message: 'Zweryfikuj swój adres email aby się zalogować' });
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

        db.query(query, values, (err, res) => {
           if(res) {
               const admin = res.rows[0];
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

    const googleAuth = (accessToken, refreshToken, profile, done) => {
        return done(null, profile);
    }

    passport.use('admin-local', new LocalStrategy(adminAuth));

    passport.use('user-local', new LocalStrategy(userAuth, (ver) => {
        console.log(ver);
    }));

    passport.use('facebook', new FacebookStrategy({
        clientID: FACEBOOK_APP_ID,
        clientSecret: FACEBOOK_SECRET,
        callbackURL: "http://localhost:5000/auth/facebook/callback",
        profileFields: ['id', 'emails', 'name']
    }, function(accessToken, refreshToken, profile, done) {
        return done(null, profile);
    }));

    passport.use(new GoogleStrategy({
        clientID: GOOGLE_APP_ID,
        clientSecret: GOOGLE_SECRET,
        callbackURL: "http://localhost:5000/auth/google/callback"
    }, googleAuth));

    passport.serializeUser((user, done) => {
        if(user.name) done(null, user); /* Facebook or Google */
        else done(null, user.id); /* Local */
    });

    passport.deserializeUser((id, done) => {
        let query, values, hash;

        if(id.name) {
            /* Facebook or Google */
            const uuid = uuidv4();
            hash = crypto.createHash('sha256').update(id.id).digest('hex');
            query = `INSERT INTO users VALUES (nextval('users_id_sequence'), $1 || '@facebookauth.com', $2, $3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL) RETURNING id`;
            values = [hash, id.name.givenName, id.name.familyName];
            db.query(query, values, (err, res) => {
                if(res) {
                    /* Add new identity */
                    if(res.rows) {
                        const userId = res.rows[0].id;
                        query = `INSERT INTO identities VALUES ($1, $2, $3, $4, false, NOW() + INTERVAL '14 DAY') RETURNING user_id`;
                        values = [uuid, userId, id.provider === 'facebook' ? 2 : 3, hash];

                        db.query(query, values, (err, res) => {
                            if(res) {
                                done(null, uuid);
                            }
                            else {
                                done(null, null);
                            }
                        });
                    }
                    else {
                        done(null, null);
                    }
                }
                else {
                    /* Error - user from Facebook already exists */
                    if(parseInt(err.code) === 23505) {
                        const query = `SELECT i.id FROM identities i JOIN users u ON i.user_id = u.id WHERE i.hash =  $1`;
                        const values = [hash];

                        db.query(query, values, (err, res) => {
                           if(res) {
                               done(null, res.rows[0].id);
                           }
                           else {
                               done(null, null);
                           }
                        });
                    }
                    else {
                        done(null, null);
                    }
                }
            });
        }
        else if(isNumeric(id.toString())) {
            /* Admin */
            query = 'SELECT id FROM admins WHERE id = $1';
            values = [id];

            db.query(query, values, (err, res) => {
                if(res) {
                    if(res.rows.length) done(null, res.rows[0].id);
                }
            });
        }
        else {
            /* User or club */
            query = 'SELECT i.id FROM identities i LEFT OUTER JOIN users u ON i.user_id = u.id LEFT OUTER JOIN clubs c ON i.id = c.id WHERE i.id = $1';
            values = [id];

            db.query(query, values, (err, res) => {
                if(res) {
                    if(res.rows.length) done(null, res.rows[0].id);
                }
            });
        }
    });
}

module.exports = init;
