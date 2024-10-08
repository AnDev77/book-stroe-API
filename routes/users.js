const express = require('express');
const router = express.Router();
const dotenv = require('dotenv')
const {StatusCodes} = require('http-status-codes')
const { join, 
        login, 
        passwordReset, 
        passwordResetRequest } = require('../controller/userController')
dotenv.config()

router.use(express.json());

router.post('/join', join)

router.post('/login', login) // 로그인


router.post('/reset', passwordResetRequest) // 초기화 요청


router.put('/reset', passwordReset) // 초기화

module.exports = router