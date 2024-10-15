const express = require('express');
const router = express.Router();
const {addToCart, getCartItems, removeCartItem} = require('../controller/cartController');

router.use(express.json());

router .post('/' , addToCart);

router.get('/' , getCartItems);

router.delete('/:id' , removeCartItem);
/*
.get('/books' , (req, res) => {
    res.json('카테고리별 도서조회');

});
*/

module.exports = router;