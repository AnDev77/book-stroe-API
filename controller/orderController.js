const mariadb  = require('mysql2/promise');
const {StatusCodes} = require('http-status-codes')

const order = async (req, res)=>{
    const conn = await mariadb.createConnection({
        host : 'localhost',
        user : 'root',
        password : 'root',
        port : 3307,
        database : 'Bookstore',
        dateStrings : true
        
        })

    const {items, delivery, totalQuantity, totalPrice, userId, firstBookTitle, } = req.body;
    let delivery_id, order_id;

    let query = `INSERT INTO delivery (address, receiver, contact) VALUES (?, ?, ?);`
    let values = [delivery.address, delivery.receiver, delivery.contact];
    
    let [result] = await conn.execute( query, values);
    delivery_id = result.insertId;
    console.log(delivery_id);

    query = `INSERT INTO orders (book_title, total_quantity, total_price, user_id, delivery_id) 
VALUES (?, ?, ?, ?, ?);` 
    
    values = [firstBookTitle, totalQuantity, totalPrice, userId, delivery_id];
    console.log(values);
    [result] = await conn.execute(query, values);
    order_id = result.insertId;
    

    query = `SELECT book_id, quantity FROM cartItems WHERE id IN (?)`
    let [rows, fields] = await conn.query(query, [items]);
    console.log(rows);
    values = [];
    query = `INSERT INTO orderedBook (order_id, book_id, quantity) VALUES ?;`;

    rows.forEach((item) =>{
        values.push([order_id, item.book_id, item.quantity]);
    })
    console.log(values)
    result = await conn.query(query, [values]);

    result = await deleteCartItems(conn, items);
    console.log(result);

    return res.status(StatusCodes.OK).json(result);

}

const deleteCartItems = async (conn, items)=>{
    let query = `DELETE FROM cartItems WHERE id IN (?)`;
    
    let result = await conn.query(query, [items]);
    return result;
}


const getOrders = async (req, res) => {
    console.log(1111111111111);
    const conn = await mariadb.createConnection({
        host : 'localhost',
        user : 'root',
        password : 'root',
        port : 3307,
        database : 'Bookstore',
        dateStrings : true 
    });

    console.log(1010)
    let query = `SELECT orders.id, book_title, total_quantity, total_price, created_at,
                 address, receiver, contact
                 FROM orders LEFT JOIN delivery
                 ON orders.delivery_id = delivery.id;`
    let [rows, fields] = await conn.query(query);
    console.log(1);
    return res.status(StatusCodes.OK).json(rows);
}

const getOrderDetail = async (req, res) =>{
    const {id} = req.params;
    const conn = await mariadb.createConnection({
        host : 'localhost',
        user : 'root',
        password : 'root',
        port : 3307,
        database : 'Bookstore',
        dateStrings : true 
    });
    let query = `SELECT book_id, title, author, price, quantity
                FROM orderedBook LEFT JOIN books ON orderedBook.book_id = books.id WHERE order_id = ?`
    let [rows, fields] = await conn.query(query, id);
    
    return res.status(StatusCodes.OK).json(rows)

}

module.exports = {
    order,
    getOrders,
    getOrderDetail
}