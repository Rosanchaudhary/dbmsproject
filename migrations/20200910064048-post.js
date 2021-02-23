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
  db.createTable('post',{
    post_id:{
      type:'int',
      primaryKey:true,
      autoIncrement:true
      
    },
    title:{
      type:'string',
      length:40
    },
    image:{
      type:'string',
      lenght:50
    },
    description:{
      type:'text',
      lenght:90000
    },
    category_id:{
      type:'int',
      allowNull:false,
      references:{
        model:'category',
        key:'category_id'
      }
    }
  },function(err) {
      if(err) return callback(err);
      return callback();
    });
};

exports.down = function(db,callback) {
  db.dropTable('post',callback);
};

exports._meta = {
  "version": 1
};
