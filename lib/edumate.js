const db2 = require('ibm_db');
const camelCase = require('camel-case');
let edumate = {};

// Connect to the database using the params in config
edumate.open = (config, callback) => {
  let options = `DRIVER={DB2};DATABASE=${config.suffix};HOSTNAME=${config.host};UID=${config.username};PWD=${config.password};PORT=${config.port};PROTOCOL=TCPIP;CURRENTSCHEMA=EDUMATE`;
  db2.open(options, function (err, conn) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, conn);
    }
  });
};

// Close the passed connection to the database
edumate.close = (conn, callback) => {
  conn.close(function (err) {
    if (err) { callback(err, null); }
    callback(null, 'disconnected');
  });
};

// Single Query - Connect, Query, Close, Return Results
edumate.query = (config, options, sql, callback) => {
  if (typeof config === 'undefined') {
    callback(new Error('Missing config. Please supply a `config` object.'), null);
  }
  edumate.open(config, (err, conn) => {
    if (err) { callback(err, null); }
    conn.query(sql, (err, data) => {
      if (err) {
        callback(err, null);
      } else {
        conn.close(function (err) {
          if (err) { callback(err, null); }
          _resultsHandler(err, options, data, (err, cleaned) => {
            if (err) { callback(err, null); }
            callback(null, cleaned);
          });
        });
      }
    });
  });
};

// Multiple Queries - Query, Return Results
edumate.queries = (options, conn, sql, callback) => {
  conn.query(sql, (err, data) => {
    if (err) {
      callback(err, null);
    } else {
      _resultsHandler(err, options, data, (err, cleaned) => {
        if (err) { callback(err, null); }
        callback(null, cleaned);
      });
    }
  });
};

// If `clean` is false/not present, resolve the results as is. Otherwise, pass to _clean and call back with _clean's output.
const _resultsHandler = (err, options, data, callback) => {
  if (err) {
    callback(err, null);
  } else {
    if (typeof options === 'undefined' || typeof options.clean === 'undefined' || options.clean === false) {
      callback(null, data);
    } else {
      let cleaned = _clean(data);
      callback(null, cleaned);
    }
  }
};

// camelCase each key name and return the 'cleaned' array
const _clean = (data) => {
  let output = [];
  data.forEach((object) => {
    let records = {};
    let keys = Object.keys(object);
    for (var i = 0; i < keys.length; i++) {
      records[camelCase(keys[i])] = object[keys[i]];
    }
    output.push(records);
  });
  return output;
};

module.exports = edumate;
