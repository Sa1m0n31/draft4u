const { Pool } = require('pg')

const pool = new Pool({
    user: 'server224866_drafcik',
    host: 'pgsql13.server224866.nazwa.pl',
    database: 'server224866_drafcik',
    password: 'SwinkaPeppa-31',
    port: 5432,
    max: 100
});


module.exports = {
    query: (text, params, callback) => {
        return pool.query(text, params, callback)
    },
}
