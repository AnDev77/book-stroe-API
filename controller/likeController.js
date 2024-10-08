const conn = require('../db');
const {StatusCodes} = require('http-status-codes')

const addLike = (req, res) => {
    const {id} = req.params;
    const {user_id} = req.body;
    let query = `INSERT INTO likes (user_id, liked_book_id) VALUES(?, ?)`;
    let values = [user_id, id];

    conn.query(query, values, (err, rows) => {
        if(err){
            console.log(err);
            return res.status(StatusCodes.BAD_REQUEST);
        }
        return res.status(StatusCodes.OK).json(rows);

    })
}

const deleteLike = (req, res) => {
    const {id} = req.params;
    const {user_id} = req.body;
    let query = `DELETE FROM likes WHERE user_id = ? AND liked_book_id = ?`;
    let values = [user_id, id];

    conn.query(query, values, (err, rows) => {
        if(err){
            console.log(err);
            return res.status(StatusCodes.BAD_REQUEST);
        }
        return res.status(StatusCodes.OK).json(rows);

    })
}

module.exports = {
    addLike,
    deleteLike
}