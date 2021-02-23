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


  router.get('/',(req,res)=>{
    let showQuery = "SELECT * FROM `category`";
    con.query(showQuery,(err,results)=>{
        console.log(results);
      if(err) throw err;
      res.render('category/show',{
        categories:results
      });
      
    })
    
  });
  router.get('/create',(req,res)=>{
    res.render('category/create');
});
  router.post('/create',(req,res)=>{
    let name = req.body.name;

    let insertQuery = "INSERT INTO `category` (name) VALUES ('"+ name + "')";
    
    con.query(insertQuery,(err,result)=>{
      if(err) throw err;
      res.redirect('/categories');
      
    })

  });
  router.delete('/delete/:id',(req,res)=>{
    let categoryId = req.params.id;
    let deleteQuery = "DELETE FROM `category` WHERE category_id = "+ categoryId +"";
    con.query(deleteQuery,(err,results)=>{
      if(err) throw err;
      res.redirect('/categories');
    })
  });
  router.get('/edit/:id',(req,res)=>{
    let categoryId = req.params.id;
    let selectQuery = "select * from category where category_id = "+categoryId+" LIMIT 1";
    con.query(selectQuery,(err,result)=>{
      console.log(result);
      if(err) throw err;
      res.render('category/edit',{categories:result});
    });
  });
  router.put('/update',(req,res)=>{
    let categoryId = req.body.categoryId;
    let name = req.body.name;
    
    
    console.log(req.body);
    let editQuery = `update category set name="${name}" where category_id =${categoryId}`;
    con.query(editQuery,(err,results)=>{
      if(err) throw err;
      console.log(results);
      res.redirect('/categories');
     
    })
  });

  module.exports = router;