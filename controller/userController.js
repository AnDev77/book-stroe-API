const connection = require('../db');
const crypto = require('crypto')
const {StatusCodes} = require('http-status-codes')
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv')
dotenv.config()
const join = (req, res, next)=>{
    const {email, password} = req.body;
    const query = `INSERT INTO users (email, password, salt) 
    VALUES(?, ?, ?)`
    
    const salt = crypto.randomBytes(10).toString('base64');
    
    const hashPassword = crypto.pbkdf2Sync(password, salt, 10000, 10, 'sha512').toString('base64');
    
    const values = [email, hashPassword, salt];
    
    connection.query(query, values, (err, rows)=> {
        if(err)
            return res.status(StatusCodes.BAD_REQUEST).json(err);
        res.status(StatusCodes.CREATED).json(rows);
    })
}

const login = (req, res) => {
    const {email, password} = req.body;
    let loginUser  = {}
    const query = `SELECT * FROM users WHERE email  = ?`
    
    connection.query(query, email, (err, rows)=>{
      let loginUser = rows[0]
      const deCodedPassword = crypto.pbkdf2Sync(password, loginUser.salt, 10000, 10, 'sha512').toString('base64');
      if (loginUser && deCodedPassword == loginUser.password){
              const token = jwt.sign({
                email : loginUser.email
              }, process.env.PRIVATE_KEY, {
                expiresIn : '5m', // 만료시간 설정
                issuer : 'an'
              })
              res.cookie('token', token, {
                httpOnly : true
              });    
              console.log(token);
              res.status(StatusCodes.OK).json({
                  message : `${loginUser.email} 님 반갑습니다.`
              })
      } else{
          res.status(StatusCodes.UNAUTHORIZED).json({
              message : " 아이디 혹은 비밀번호가 틀렸습니다."
          })
      }
    })
}

const passwordResetRequest = (req, res) => {
    const {email} = req.body
    const query = `SELECT * FROM users WHERE email = ?`;
    connection.query(query, email, (err, rows)=>{
        if (err){
            return res.status(StatusCodes.BAD_REQUEST).json(err)
        }
        const user = rows[0];
        if (user)
            return res.status(StatusCodes.OK).json({
                email : email
            });
        else
            return res.status(StatusCodes.UNAUTHORIZED).end();
    }) 

}

const passwordReset = (req, res) => {
    const {email, password} = req.body;
    const upQuery = `UPDATE users SET password = ?, salt = ? WHERE email = ?`;
    
    
    let values = [email, password]
    const salt = crypto.randomBytes(10).toString('base64');
    const hashPassword = crypto.pbkdf2Sync(password, salt, 10000, 10, 'sha512').toString('base64');

    values = [hashPassword, salt, email]

    connection.query(upQuery, values, (err, rows)=>{
        if (err){
            return res.status(StatusCodes.BAD_REQUEST).json(err).end();
        }
        if(rows.affectedRows == 0)
            return res.status(StatusCodes.BAD_REQUEST).end();
        res.status(StatusCodes.OK).json(rows).end();
    
    });
    

}

module.exports = {
    join,
    login,
    passwordResetRequest,
    passwordReset
}