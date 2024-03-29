const db = require("./database/db");
const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');
const LocalStrategy = require("passport-local").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const FACEBOOK_APP_ID = process.env.FACEBOOK_APP_ID;
const FACEBOOK_SECRET = process.env.FACEBOOK_SECRET;

const GOOGLE_APP_ID = process.env.GOOGLE_APP_ID;
const GOOGLE_SECRET = process.env.GOOGLE_SECRET;

function isNumeric(str) {
    if (typeof str != "string") return false // we only process strings!
    return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
        !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}

const sendInfoAboutLogin = (id) => {
    const query = 'INSERT INTO login_info VALUES ($1, NOW()) ON CONFLICT(id) DO UPDATE SET login_time = NOW()';
    const values = [id];

    db.query(query, values);
}

const init = (passport) => {
    const userAuth = (username, password, done) => {
        const hash = crypto.createHash('sha256').update(password).digest('hex');
        const query = 'SELECT i.id, i.user_id, i.active FROM identities i LEFT OUTER JOIN users u ON i.user_id = u.id LEFT OUTER JOIN clubs c ON c.id = i.id WHERE ((LOWER(u.email) = LOWER($1) AND i.hash = $2) OR (LOWER(c.login) = LOWER($1) AND i.hash = $2))';
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
                else if(user.active === false && user.user_id) {
                    return done(null, false, { message: 'Zweryfikuj swój adres email aby się zalogować' });
                }
                else {
                    sendInfoAboutLogin(user.id);
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
        const query = 'SELECT id FROM admins WHERE LOWER(login) = LOWER($1) AND password = $2';
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

    const userSwitchAccountTypeAuth = (username, password, done) => {
        sendInfoAboutLogin(password);
        return done(null, {
            id: password
        });
    }

    passport.use('admin-local', new LocalStrategy(adminAuth));

    passport.use('user-local', new LocalStrategy(userAuth, (ver) => {
        // console.log(ver);
    }));

    passport.use('user-switch', new LocalStrategy(userSwitchAccountTypeAuth, (ver) => {
        // console.log('2132');
    }));

    passport.use('facebook', new FacebookStrategy({
        clientID: FACEBOOK_APP_ID,
        clientSecret: FACEBOOK_SECRET,
        callbackURL: process.env.API_URL + '/auth/facebook/callback',
        profileFields: ['id', 'emails', 'name']
    }, function(accessToken, refreshToken, profile, done) {
        return done(null, profile);
    }));

    passport.use(new GoogleStrategy({
        clientID: GOOGLE_APP_ID,
        clientSecret: GOOGLE_SECRET,
        callbackURL: process.env.API_URL  + '/auth/google/callback'
    }, googleAuth));

    passport.serializeUser((user, done) => {
        if(user) {
            if(user.name || user.provider) done(null, user); /* Facebook or Google */
            else done(null, user.id); /* Local */
        }
        else done(null, null);
    });

    passport.deserializeUser((id, done) => {
        let query, values, hash;

        if(id) {
            if(id.provider === 'google') {
                /* Google */
                hash = crypto.createHash('sha256').update(id.id).digest('hex');
                query = `INSERT INTO users(id, email, first_name, last_name, sex, birthday, phone_number, attack_range, vertical_range, block_range, height, weight, position, profile_picture, salary_from, salary_to, licence_number, club, experience)
                            SELECT nextval('users_id_sequence'), $1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL
                            WHERE NOT EXISTS (
                                SELECT 1 FROM users WHERE email = $1
                            ) RETURNING id`;
                if(id.emails) {
                    if(id.emails.length) {
                        values = [id.emails[0].value];
                    }
                    else {
                        values = [id.id + '@facebookauth'];
                    }
                }
                else {
                    values = [id.id + '@facebookauth'];
                }
                db.query(query, values, (err, res) => {
                    if(res) {
                        if(res.rows) {
                            /* Add new identity */
                            if(res.rows.length) {
                                const uuid = uuidv4();
                                const userId = res.rows[0].id;
                                query = `INSERT INTO identities VALUES ($1, $2, $3, $4, false, NOW() + INTERVAL '14 DAY', false) RETURNING user_id`;
                                values = [uuid, userId, 3, hash];

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
                                const query = `SELECT i.id FROM identities i JOIN users u ON i.user_id = u.id WHERE i.hash =  $1 AND i.adapter = 3`;
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
                        }
                        else {
                            const query = `SELECT i.id FROM identities i JOIN users u ON i.user_id = u.id WHERE i.hash =  $1 AND i.adapter = 3`;
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
                    }
                    else {
                        if(err) {
                            if(parseInt(err.code) === 23505) {
                                const query = `SELECT i.id FROM identities i JOIN users u ON i.user_id = u.id WHERE i.hash =  $1 AND i.adapter = 3`;
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
                        else {
                            done(null, null);
                        }
                    }
                });
            }
            else if(id.provider === 'facebook') {
                /* Facebook */
                const uuid = uuidv4();
                hash = crypto.createHash('sha256').update(id.id).digest('hex');
                query = `INSERT INTO users(id, email, first_name, last_name, sex, birthday, phone_number, attack_range, vertical_range, block_range, height, weight, position, profile_picture, salary_from, salary_to, licence_number, club, experience)
                            SELECT nextval('users_id_sequence'), $1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL
                            WHERE NOT EXISTS (
                                SELECT 1 FROM users WHERE email = $1
                            ) RETURNING id`;
                if(id.emails) {
                    if(id.emails.length) {
                        values = [id.emails[0].value, id.name.givenName, id.name.familyName];
                    }
                    else {
                        values = [id.id + '@facebookauth', id.name.givenName, id.name.familyName];
                    }
                }
                else {
                    values = [id.id + '@facebookauth', id.name.givenName, id.name.familyName];
                }
                db.query(query, values, (err, res) => {
                    if(res) {
                        if(res.rows) {
                            /* Add new identity */
                            if(res.rows.length) {
                                const userId = res.rows[0].id;
                                if(userId) {
                                    query = `INSERT INTO identities VALUES ($1, $2, $3, $4, false, NOW() + INTERVAL '14 DAY', false) RETURNING user_id`;
                                    values = [uuid, userId, 2, hash];

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
                                    const query = `SELECT i.id FROM identities i JOIN users u ON i.user_id = u.id WHERE i.hash = $1 AND i.adapter = 2`;
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
                            }
                            else {
                                const query = `SELECT i.id FROM identities i JOIN users u ON i.user_id = u.id WHERE i.hash = $1 AND i.adapter = 2`;
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
                        }
                        else {
                            const query = `SELECT i.id FROM identities i JOIN users u ON i.user_id = u.id WHERE i.hash = $1 AND i.adapter = 2`;
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
                    }
                    else {
                        /* Error - user with the same email already exists */
                        const query = `SELECT i.id FROM identities i JOIN users u ON i.user_id = u.id WHERE i.hash = $1 AND i.adapter = 2`;
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
                /* User or club - local */
                query = 'SELECT i.id FROM identities i LEFT OUTER JOIN users u ON i.user_id = u.id LEFT OUTER JOIN clubs c ON i.id = c.id WHERE i.id = $1';
                values = [id];

                db.query(query, values, (err, res) => {
                    if(res) {
                        if(res.rows.length) done(null, res.rows[0].id);
                    }
                });
            }
        }
        else {
            done(null, null);
        }
    });
}

module.exports = init;
