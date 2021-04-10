const config = require('../config/default.json');
const jwt = require('jsonwebtoken');
const express = require("express");
const router = express.Router();

var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "zap",
    database: "blogdb",
    port:"3307",
  });
  con.connect((err) => {
    if(err) throw err;
    console.log('Connected to MySQL Server!');
  });
  

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('user/login');
});

router.post("/",async (req,res)=>{
  let username = req.body.username;
  let email = req.body.email;
  let password = req.body.password;


  let insertQuery = `INSERT INTO user (username,email,password) VALUES ("${username}","${email}","${password}")`;
  con.query(insertQuery,(error,result)=>{
    if(error) throw error;
    const token = jwt.sign({_id:result.insertId},"mySecureKey");
    res.header('x-auth-token',token).cookie('x-auth-token',token,{httpOnly:false}).redirect('/');
  });
  

});
router.get('/register',(req,res)=>{
  res.render('user/register');
});

router.post('/login',(req,res,next)=>{

  let email = req.body.email;
  let password = req.body.password;
  let query = `SELECT * FROM user WHERE email = "${email}" AND password = "${password}"`;
  con.query(query,(error,result)=>{
    if(result){
    const token = jwt.sign({_id:result[0].user_id},"mySecureKey");
    res.header('x-auth-token',token).cookie('x-auth-token',token,{httpOnly:false}).redirect('/');
    }else{
       res.redirect('/users');
    }
  });
});



module.exports = router;
