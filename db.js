const mysql = require('mysql2')

const connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'root',
    port : 3307,
    database : 'Bookstore',
    dateStrings : true
})

module.exports = connection;