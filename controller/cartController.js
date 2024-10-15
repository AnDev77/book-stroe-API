const conn = require('../db');
const {StatusCodes} = require('http-status-codes')

const addToCart = (req, res)=>{
    const {id} = req.params;
    const {user_id,quantity, book_id} = req.body;
    let query = `INSERT INTO cartItems (book_id, quantity, user_id) VALUES (?, ?, ?);
`;
    let values = [book_id, quantity, user_id];

    conn.query(query, values, (err, rows) => {
        if(err){
            console.log(err);
            return res.status(StatusCodes.BAD_REQUEST);
        }
        return res.status(StatusCodes.OK).json(rows);

    })
}

const getCartItems = (req, res) => {
    const {user_id, selected} = req.body
    const query = `SELECT cartItems.id, book_id, title, summary, quantity, price 
                FROM cartItems LEFT JOIN books 
                ON cartItems.book_id = books.id AND user_id = ? AND cartItems.id IN (?)`
    conn.query(query, user_id, selected, (err, rows) => {
        if (err)
            return res.status(StatusCodes.BAD_REQUEST).end();
        if (rows[0])
            return res.status(StatusCodes.OK).json(rows);
        else
            return res.status(StatusCodes.NOT_FOUND).json(rows);
    })
}

const removeCartItem = (req, res) => {
    const {id} = req.params;
    let query = `DELETE FROM cartItems WHERE id = ?`;

    conn.query(query, id, (err, rows) => {
        if(err){
            console.log(err);
            return res.status(StatusCodes.BAD_REQUEST);
        }
        return res.status(StatusCodes.OK).json(rows);

    })
}

module.exports = {
    addToCart,
    getCartItems,
    removeCartItem
}