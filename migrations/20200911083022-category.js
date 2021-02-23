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
  db.createTable('category',{
    category_id:{
      type:'int',
      primaryKey:true,
      autoIncrement:true
      
    },
    name:{
      type:'string',
      length:40
    }
  },function(err) {
      if(err) return callback(err);
      return callback();
    });
};

exports.down = function(db,callback) {
  db.dropTable('category',callback);
};

exports._meta = {
  "version": 1
};
