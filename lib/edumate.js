'use strict';

var db2 = require('ibm_db');
var camelCase = require('camel-case');

var edumate = {};

// Connect to the database using the params in config
edumate.open = function (config) {
  return new Promise(function (resolve, reject) {
    db2.open('DRIVER={DB2};DATABASE=' + config.suffix + ';HOSTNAME=' + config.host + ';UID=' + config.username + ';PWD=' + config.password + ';PORT=' + config.port + ';PROTOCOL=TCPIP', function (err, conn) {
      if (err) {
        reject(new Error(err));
      } else {
        resolve(conn);
      }
    });
  });
};

// camelCase each key name and return the 'cleaned' array
function _clean (data) {
  var output = [];
  data.forEach(function (object) {
    var records = {};
    var keys = Object.keys(object);
    for (var i = 0; i < keys.length; i++) {
      records[camelCase(keys[i])] = object[keys[i]];
    }
    output.push(records);
  });
  return output;
}

// If `clean` is false/not present, resolve the results as is. Otherwise, pass to _clean and resolve with _clean's output.
function _resultsHandler (err, data, conn, options) {
  return new Promise(function (resolve, reject) {
    if (err) {
      reject(new Error(err));
    } else {
      if (typeof options === 'undefined' || typeof options.clean === 'undefined' || options.clean === false) {
        resolve(data);
      } else {
        resolve(_clean(data));
      }
    }
  });
}

// Perform the query on the database and pass the results to _resultsHandler
edumate.query = function (config, sql, options) {
  return new Promise(function (resolve, reject) {
    if (typeof config === 'undefined') {
      reject(new Error('Missing config. Please supply a `config` object.'));
    }
    edumate.open(config).then(function (conn) {
      conn.query(sql, function (err, data) {
        if (err) {
          reject(new Error(err));
        } else {
          resolve(_resultsHandler(err, data, conn, options));
        }
        conn.close(function (err) {
          if (err) {
            reject(new Error(err));
          }
        });
      });
    }, function (error) {
      reject(new Error(error));
    });
  });
};

module.exports = edumate;
