const express = require('express');
const router = express.Router();

router.use(express.json());

router .post('/' , (req, res) => {
    res.json('장바구니 담기');

})

.get('/' , (req, res) => {
    res.json('장바구니 조회');

})

.delete('/:id' , (req, res) => {
    res.json('장바구니 삭제');

})
/*
.get('/books' , (req, res) => {
    res.json('카테고리별 도서조회');

});
*/

module.exports = router;