var express = require('express');
var router = express.Router();
var mysql = require('mysql');
const auth = require('../middleware/auth');

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
router.post('/',auth,(req,res)=> {
    let userId = req.user._id;
    let name = req.body.comment;
    let postId = req.body.postId;
    let insertQuery = "INSERT INTO `comment` (name, post_id, user_id) VALUES ('"+ name + "', '" + postId + "', '" + userId + "')";
    
    con.query(insertQuery,(err,result)=>{
      if(err) throw err;
      res.redirect('back');
      
    })
  });
  




module.exports = router;
