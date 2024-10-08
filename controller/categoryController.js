const connection = require('../db');
const {StatusCodes} = require('http-status-codes')
const dotenv = require('dotenv')
dotenv.config()

const allCategory = (req, res)=>{
    
    const query = `SELECT * FROM category`
    connection.query(query, (err, rows) => {
        if (err)
            return res.status(StatusCodes.BAD_REQUEST).end();
       
        res.status(StatusCodes.OK).json(rows);

    
    })  
}

module.exports = {allCategory};