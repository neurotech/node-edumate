'use strict';

var jdbc = new (require('jdbc'));
var _ = require('lodash');
var camelCase = require('camel-case');
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

// camelCase each key in `results`
function clean(results) {
  var output = [];
  _.each(results, function(object) {
    var records = {};
    var keys = Object.keys(object);
    for (var i = 0; i < keys.length; i++) {
      records[camelCase(keys[i])] = object[keys[i]];
    }
    output.push(records);
  });
  return output;
};

// Perform the query on the database.
edumate.query = function(sql, config, options) {
  return new Promise(function(resolve, reject) {
    open(config)
      .then(function(response) {
        console.log('Executing query: \n' + '`' + sql + '`')
        jdbc.executeQuery(sql, function(err, results) {
          if (err) {
            reject(new Error(err));
          } else {
            if (options.clean === false) {
              resolve(results);
            } else {
              resolve(clean(results));
            }
          }
        });
      }, function(error) {
        reject(new Error(error));
      });
  });
};

// Disconnect from the DB2 database.
edumate.close = function() {
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

module.exports = edumate;