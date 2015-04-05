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
  edumate.init()
  --------------
  Begin the 'query' promise chain
*/
edumate.init(config)
  .then(function(response) {
    console.log('Init: ' + response);
    edumate.open()
      .then(function(response) {
        console.log('Connect: ' + response);
        edumate.query(sql)
          .then(function(response) {
            console.log('Query results: \n' + JSON.stringify(response));
            edumate.close()
              .then(function(response) {
                console.log('Disconnect: ' + response);
              }, function(error) {
                console.log('Disconnect error: ' + error);
              });
          }, function(error) {
            console.log('Query error: ' + error);
          });
      }, function(error) {
        console.log('Connect error: ' + error);
      });
  }, function(error) {
    console.log('Init error: ' + error);
  });