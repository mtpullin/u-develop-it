const mysql = require('mysql2')

const db = mysql.createConnection(
    {
        host: 'localhost',
        //your MySQL username,
        user: 'root',
        //mysql password
        password: '1darkness',
        database: 'election'
    },
    console.log( 'Connected to the election database.')
)
module.exports = db;