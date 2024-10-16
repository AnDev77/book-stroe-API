const connection = require('../db');
const {StatusCodes} = require('http-status-codes')
const dotenv = require('dotenv')
dotenv.config()


//전체도서 조회
const allBooks = (req, res)=>{
    let {category_id, news, limit, currentPage} = req.query;
    limit = parseInt(limit);
    currentPage = parseInt(currentPage);
    let offset = limit * (currentPage-1);

    let query = `SELECT *, (SELECT COUNT(*) FROM likes WHERE liked_book_id = books.id) FROM books `;
    let value = [];

    if (category_id && news){
        category_id = parseInt(category_id);
        query += `WHERE pub_date BETWEEN DATE_SUB(NOW(), INTERVAL 1 MONTH) AND NOW() AND category_id = ? `
        value.push(category_id);
    }
    else if(category_id){
        category_id = parseInt(category_id);
        query += `WHERE category_id = ? `
        value.push(category_id);
    }
    else if (news)
        query += `WHERE pub_date BETWEEN DATE_SUB(NOW(), INTERVAL 1 MONTH) AND NOW() `
    value.push(limit, offset);
    query += `LIMIT ? OFFSET ?;`;

    connection.query(query, value,(err, rows) => {
        if (err)
            return res.status(StatusCodes.BAD_REQUEST).json(err);
            
        res.status(StatusCodes.OK).json(rows);

        })
}


//상세조회
const bookDetail = (req, res) => {
    let {id} = req.params;
    id = parseInt(id);
    let user_id = req.body;

    const query = `SELECT *, (SELECT count(*) FROM likes WHERE books.id = liked_book_id) AS likes, 
                    (SELECT EXISTS (SELECT * FROM likes WHERE user_id = ? AND liked_book_id = ?)) AS liked 
                    FROM books LEFT JOIN category ON category.category_id = books.category_id WHERE books.id = ?;`

    let values = [user_id, id, id];

    connection.query(query, values, (err, rows) => {
        if (err)
            return res.status(StatusCodes.BAD_REQUEST).end();
        if (rows[0])
            return res.status(StatusCodes.OK).json(rows);
    
        else
            return res.status(StatusCodes.NOT_FOUND).end();

    })

}

//카테고리별 조회
const bookCategory = (req, res) => {
    let {id} = req.params;
    id = parseInt(id);

    const query = `SELECT cartItems.id, book_id, title, summary, quantity, price 
                FROM cartItems LEFT JOIN books 
                ON cartItems.book_id = books.id AND user_id = ?`
    connection.query(query, user_id, (err, rows) => {
        if (err)
            return res.status(StatusCodes.BAD_REQUEST).end();
        if (rows[0])
            return res.status(StatusCodes.OK).json(rows);
        else
            return res.status(StatusCodes.NOT_FOUND).json(rows);
    })
}


module.exports = {
    allBooks,
    bookDetail,
    bookCategory
}