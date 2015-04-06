'use strict';

var jdbc = new (require('jdbc'));
var edumate = {};

// Initialise and connect to the DB2 database.
function open(config) {
  return new Promise(function(resolve, reject) {
    jdbc.initialize(config, function(err, res) {
      if (err) {
        reject(new Error(err));
      } else {
        jdbc.open(function(err, conn) {
          if (conn) {
            resolve(console.log('Connected to DB2.'));
          } else {
            reject(new Error(err));
          }
        });
      }
    });
  });
};

// Disconnect from the DB2 database.
function close() {
  return new Promise(function(resolve, reject) {
    jdbc.close(function(err) {
      if (err) {
        reject(new Error(err));
      } else {
        resolve(console.log('Disconnected from DB2.'));
      }
    });
  });
};

// Perform the query on the database.
edumate.query = function(sql, config) {
  return new Promise(function(resolve, reject) {
    open(config)
      .then(function(response) {
        console.log('Executing query: \n' + '`' + sql + '`')
        jdbc.executeQuery(sql, function(err, results) {
          if (err) {
            reject(new Error(err));
          } else {
            resolve(results);
          }
          close();
        });
      }, function(error) {
        reject(new Error(error));
      });
  });
};

module.exports = edumate;