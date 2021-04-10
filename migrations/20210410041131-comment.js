'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};
exports.up = function(db,callback) {
  db.createTable('comment',{
    comment_id:{
      type:'int',
      primaryKey:true,
      autoIncrement:true
      
    },
    name:{
      type:'string',
      length:40
    },
    post_id:{
      type:'int',
      allowNull:false,
      references:{
        model:'post',
        key:'post_id'
      }
    },
    user_id:{
      type:'int',
      allowNull:false,
      references:{
        model:'user',
        key:'user_id'
      }
    },
  },function(err) {
      if(err) return callback(err);
      return callback();
    });
};

exports.down = function(db,callback) {
  db.dropTable('comment',callback);
};

exports._meta = {
  "version": 1
};
