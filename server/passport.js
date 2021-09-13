const db = require("./database/db");
const express = require("express");
const crypto = require('crypto');
const LocalStrategy = require("passport-local").Strategy;

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

    const facebookAuth = () => {

    }

    passport.use(new LocalStrategy(userAuth));

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        const query = 'SELECT * FROM identities i JOIN users u ON i.user_id = u.id WHERE u.id = $1';
        const values = [id];

        db.query(query, values, (err, res) => {
            if(res) {
                if(res.rows.length) done(null, res.rows[0]);
            }
        });
    });
}

module.exports = init;
