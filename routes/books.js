const express = require('express');
const router = express.Router();

router.use(express.json());

router .get('/' , (req, res) => {
    res.json('개별도서조회');

})

.get('/' , (req, res) => {
    res.json('개별도서조회');

})

.get('/' , (req, res) => {
    res.json('전체도서조회');

})

.get('/' , (req, res) => {
    res.json('카테고리별 도서조회');

})

module.exports = router;