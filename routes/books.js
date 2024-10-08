const express = require('express');
const router = express.Router();
const {allBooks, bookDetail, bookCategory} = require('../controller/bookController')
router.use(express.json());

//전체 조회
router .get('/' , allBooks)

//개별 조회
router.get('/:id' , bookDetail)

//카테고리별 조회
router.get('/' , bookCategory)

module.exports = router;