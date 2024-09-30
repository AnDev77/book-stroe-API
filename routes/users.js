const express = require('express');
const router = express.Router();

router.use(express.json());

router.post('/join', (req, res, next)=>{
    res.json({
        message : "회원가입"
    })
})

    .post('/login',(req, res, next)=>{
        res.json({
            message : "로그인"
        })
    }) // 로그인


    .post('/reset', (req, res, next)=>{
        res.json({
            message : "초기화 요청"
        })
    }) // 초기화 요청


    .put('/reset', (req, res, next)=>{
        res.json({
            message : "초기화"
        })
    }) // 초기화

    module.exports = router