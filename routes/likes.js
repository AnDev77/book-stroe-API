const express = require('express');
const router = express.Router();
const {addLike, deleteLike} = require('../controller/likeController');
router.use(express.json());


router .post('/:id' ,addLike);

router.delete('/:id' , deleteLike);

module.exports = router;