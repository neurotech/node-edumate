'use strict';

var path = require('path');
var edumate = require('../lib/edumate');

/*
  database
  --------
  Basic database connection, credentials
*/
var database = {
  host: process.env.EDUMATE_HOST,
  port: process.env.EDUMATE_PORT,
  suffix: process.env.EDUMATE_PATH,
  username: process.env.EDUMATE_USERNAME,
  password: process.env.EDUMATE_PASSWORD
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

console.log(config.url);
/*
  sql
  ---
  Simple SELECT query
*/
var sql = 'SELECT * FROM table_name';

/*
  edumate.query()
  --------------
  Query your Edumate database with the given configuration object and SQL, then log the results to console.
*/
edumate.query(config, sql, {clean: true})
  .then(function (results) {
    console.log(results);
  }, function (error) {
    console.error(error);
  });
