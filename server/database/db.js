const { Pool } = require('pg')
// const pool = new Pool({
//     user: 'postgres',
//     host: 'localhost',
//     database: 'postgres',
//     password: 'admin',
//     port: 5432
// });

const pool = new Pool({
    user: 'eomsfxii',
    host: 'hattie.db.elephantsql.com',
    database: 'eomsfxii',
    password: '192HB_ZRNq_htQkR7_XS92awx3VtGr2F',
    port: 5432
});

module.exports = {
    query: (text, params, callback) => {
        return pool.query(text, params, callback)
    },
}
