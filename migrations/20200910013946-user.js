var Sequelize = require('sequelize');

exports.up = function(db,callback) {
  db.createTable('user',{
    user_id:{
      type:'int',
      primaryKey:true,
      autoIncrement:true
      
    },
    username:{
      type:'string',
      length:40
    },
    email:{
      type:'string',
      lenght:50
    },
    password:{
      type:'string',
      lenght:5000
    }
  },function(err) {
      if(err) return callback(err);
      return callback();
    });
  
};

exports.down = function(db,callback) {
  db.dropTable('user',callback);
};

exports._meta = {
  "version": 1
};
