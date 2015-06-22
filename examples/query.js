'use strict';

var path = require('path');
var edumate = require('../lib/edumate');

/*
  database
  --------
  Basic database connection, credentials
*/
var database = {
  host: 'HOST',
  port: 'PORT',
  suffix: '/PATH',
  username: 'USERNAME',
  password: 'SECRET'
};

/*
  config
  ------
  This is the object that edumate.init requires to begin the init operation
*/
var config = {
  libpath: path.join(__dirname, '../drivers/db2jcc.jar'),
  drivername: 'com.ibm.db2.jcc.DB2Driver',
  url: 'jdbc:' + 'db2://' + database.host + ':' + database.port + database.suffix + ':user=' + database.username + ';password=' + database.password + ';'
};

/*
  sql
  ---
  Simple SELECT query
*/
var sql = 'SELECT * FROM table_name';

/*
  edumate.query()
  --------------
  Query your Edumate database with the given SQL and configuration object, then log the results to console.
*/
edumate.query(sql, config, {clean: true}).then(function(results) {
  console.log(results);
}, function(error) {
  console.error(error);
});