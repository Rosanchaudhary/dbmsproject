var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "blogdb"
  });
  con.connect((err) => {
    if(err) throw err;
    console.log('Connected to MySQL Server!');
  });

/* GET home page. */
router.get('/',(req,res)=>{
  let showQuery = "SELECT post.image,post.title,post.post_id FROM post";
  con.query(showQuery,(err,results)=>{
    if(err) throw err;
  
    res.render('index',{
      posts:results
    });
  })
  
});




module.exports = router;
