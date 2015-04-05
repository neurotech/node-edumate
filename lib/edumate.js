'use strict';

var jdbc = require('jdbc');

var db2 = new jdbc();
var edumate = {};

// Initialise DB
edumate.init = function(config) {
  return new Promise(function(resolve, reject) {
    db2.initialize(config, function(err, res) {
      if (res) {
        resolve('init db2 database');
      } else {
        reject(new Error(err));
      }
    });
  });
};

// Connect to the DB2 instance and open the database.
edumate.open = function() {
  return new Promise(function(resolve, reject) {
    db2.open(function(err, conn) {
      if (conn) {
        resolve('connected to db2 database');
      } else {
        reject(new Error(err));
      }
    });
  });
};

// Perform the query on the database.
edumate.query = function(sql) {
  return new Promise(function(resolve, reject) {
    db2.executeQuery(sql, function(err, results) {
      if (err) {
        reject(new Error(err));
      } else {
        resolve(results);
      }
    });
  });
};

// Close database and disconnect from the DB2 instance.
edumate.close = function() {
  return new Promise(function(resolve, reject) {
    db2.close(function(err) {
      if (!err) {
        resolve('closed db2 database and disconnected OK');
      } else {
        reject(new Error(err));
      }
    });
  });
};

module.exports = edumate;