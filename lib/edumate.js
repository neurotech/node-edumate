'use strict';

var jdbc = new (require('jdbc'));
var camelCase = require('camel-case');

var edumate = {};

// Initialize and connect to the database using the params in config
edumate.open = function (config) {
  return new Promise(function (resolve, reject) {
    jdbc.initialize(config, function (err, res) {
      if (err) {
        reject(err);
      } else {
        jdbc.open(function (err, conn) {
          if (conn) {
            resolve(conn);
          } else {
            reject(err);
          }
        });
      }
    });
  });
};

// Perform the query on the database and pass the results to _resultsHandler
edumate.query = function (config, sql, options) {
  return new Promise(function (resolve, reject) {
    edumate.open(config).then(function (conn) {
      jdbc._conn = conn;
      jdbc.executeQuery(sql, function (err, results) {
        resolve(_resultsHandler(err, results, conn, options));
      });
    }, function (error) {
      reject(error);
    });
  });
};

// Resolve the Promise with 'cleaned' (if asked) keys and close the connection
function _resultsHandler (err, results, conn, options) {
  return new Promise(function (resolve, reject) {
    if (err) {
      reject(err);
    } else {
      if (typeof options === 'undefined' || typeof options.clean === 'undefined' || options.clean === false) {
        resolve(results);
      } else {
        resolve(_clean(results));
      }
    }
    close(conn);
  });
}

function _clean (results) {
  var output = [];
  results.forEach(function (object) {
    var records = {};
    var keys = Object.keys(object);
    for (var i = 0; i < keys.length; i++) {
      records[camelCase(keys[i])] = object[keys[i]];
    }
    output.push(records);
  });
  return output;
}

function close (conn) {
  jdbc._conn = conn;
  jdbc.close(function (err) {
    if (err) {
      console.error(err);
    }
  });
}

module.exports = edumate;
