const mysql = require('mysql2/promise')

const connection = async ()=>{
    
    const conn = await mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'root',
    port : 3307,
    database : 'Bookstore',
    dateStrings : true
    
    })
    return conn;
}
module.exports = connection;