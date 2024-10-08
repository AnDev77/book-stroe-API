const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT;

app.listen(port, ()=>{
    console.log(`app is listening on ${port}`)
});

const userRouter = require('./routes/users');
const bookRouter = require('./routes/books');
const categoryRouter = require('./routes/category');
const cartRouter =  require('./routes/carts');
const orderRouter = require('./routes/orders');
const likeRouter = require('./routes/likes');

app.use('/', userRouter);
app.use('/books', bookRouter);
app.use('/category', categoryRouter)
app.use('/orders', orderRouter);
app.use('/likes', likeRouter);
app.use('/carts', cartRouter);

