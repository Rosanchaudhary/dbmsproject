const auth = require('../middleware/auth');
var multer = require('multer');
const storage = multer.diskStorage({
    destination:function(req,file,cb) {
        cb(null,'./public/images');
    },
    filename:function(req,file,cb) {
        cb(null,file.originalname);        
    }
})

var upload = multer({storage:storage});

var express = require('express');

var router = express.Router();
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
  
  router.get('/',auth,(req,res)=>{
    console.log(req.user._id);
    let userId = req.user._id;
    let showQuery = "SELECT post.post_id,post.title,post.image,category.name FROM post INNER JOIN category ON post.category_id = category.category_id WHERE post.user_id ="+ userId +" ";
    con.query(showQuery,(err,results)=>{
      if(err) throw err;
      // res.send(JSON.stringify(results[0].title));
      res.render('post/show',{
        posts:results
      });
    })
    
  });

  router.get('/create',(req,res)=>{
    console.log(req.cookies);
    let showQuery = "SELECT * FROM `category`";
    con.query(showQuery,(err,results)=>{
      if(err) throw err;
      res.render('post/create',{
        categories:results
      });
      
    })
  });
  router.post('/create',auth, upload.single('image'),(req,res)=> {
    let userId = req.user._id;
    let title = req.body.title;
    let image = req.file.filename;
    let description = req.body.description;
    let categoryId = req.body.category; 
    

  
    let insertQuery = "INSERT INTO `post` (title, image, description,category_id,user_id) VALUES ('"+ title + "', '" + image + "', '" + description + "', '" + categoryId + "', '" + userId + "')";
    
    con.query(insertQuery,(err,result)=>{
      if(err) throw err;
      res.redirect('/posts');
      
    })
  });
  router.get('/show/:id',(req,res)=>{
    let postId = req.params.id;
    let showQuery = `SELECT post.post_id,post.title,post.image,post.description,
      post.category_id,post.user_id,comment.name,user.username 
      FROM post LEFT JOIN comment 
      ON post.post_id = comment.post_id 
      LEFT JOIN user
      ON comment.user_id = user.user_id
      WHERE post.post_id = ${postId}`;
    con.query(showQuery,(err,results)=>{
      if(err) throw err;
      console.log(results);
      res.render('detail',{
        posts:results
      });
    })
    
  });
  router.delete('/delete/:id',(req,res)=>{
    let postId = req.params.id;
    let deleteQuery = "DELETE FROM `post` WHERE post_id = "+ postId +"";
    con.query(deleteQuery,(err,results)=>{
      if(err) throw err;
      res.redirect('/posts');
    })
  });
  router.get('/edit/:id',(req,res)=>{
    let postId = req.params.id;
    let selectQuery = "select * from post where post_id = "+postId+" LIMIT 1";
    con.query(selectQuery,(err,result)=>{
      console.log(result);
      if(err) throw err;
      res.render('post/edit',{posts:result});
    });
  });
  router.put('/update',upload.single('image'),(req,res)=>{
    let postId = req.body.postId;
    let title = req.body.title;
    let image = req.file.filename;
    let description = req.body.description; 
    
    console.log(req.body);
    let editQuery = `update post set title="${title}", image="${image}", description = "${description}" where post_id =${postId}`;
    con.query(editQuery,(err,results)=>{
      if(err) throw err;
      console.log(results);
      res.redirect('/posts');
     
    })
  });

  router.post('/search',(req,res)=>{
    let search = req.body.search;
    console.log(search);
    let selectQuery = `SELECT post.image,post.title,post.post_id FROM post WHERE post.title LIKE '${search}%' LIMIT 10`;
    //let selectQuery = `SELECT * FROM post WHERE title LIKE '${search}%' LIMIT 10`;
    con.query(selectQuery,(err,result)=>{
      console.log(result);
      if(err) throw err;
      res.render('search',{
        posts:result
      });
    });
  });



  module.exports = router;