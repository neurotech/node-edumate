'use strict';

var test = require('tape');
var camelCase = require('camel-case');
var path = require('path');
var edumate = require('../lib/edumate');

var database = {
  host: process.env.EDUMATE_HOST,
  port: process.env.EDUMATE_PORT,
  suffix: process.env.EDUMATE_PATH,
  username: process.env.EDUMATE_USERNAME,
  password: process.env.EDUMATE_PASSWORD
};

var config = {
  libpath: path.join(__dirname, '../drivers/db2jcc.jar'),
  drivername: 'com.ibm.db2.jcc.DB2Driver',
  url: 'jdbc:' + 'db2://' + database.host + ':' + database.port + database.suffix + ':user=' + database.username + ';password=' + database.password + ';'
};

var sql = 'SELECT * FROM EDUMATE.academic_year WHERE academic_year = YEAR(current date)';

test('node-edumate - query - config object + sql statment validity', function (t) {
  t.plan(6);
  t.equal(typeof database.host, 'string', 'db2 host present');
  t.equal(typeof database.port, 'string', 'db2 port present');
  t.equal(typeof database.suffix, 'string', 'db2 path present');
  t.equal(typeof database.username, 'string', 'db2 username present');
  t.equal(typeof database.password, 'string', 'db2 password present');
  t.equal(typeof sql, 'string', 'sql statment present');
});

test('node-edumate - query - no arguments supplied', function (t) {
  t.plan(1);
  edumate.query()
    .then(function (results) {
      t.equal(results, null);
    }, function (error) {
      t.ok(error, 'error because !config');
    });
});

test('node-edumate - query - config and sql supplied', function (t) {
  t.plan(1);
  edumate.query(config, sql)
    .then(function (results) {
      t.equal(results.length, 1, '1 result returned');
    }, function (error) {
      t.equal(error, null);
    });
});

test('node-edumate - query - clean: true', function (t) {
  t.plan(1);
  edumate.query(config, sql, {clean: true})
    .then(function (results) {
      var firstKey = Object.keys(results[0])[0];
      t.equal(firstKey, camelCase(firstKey), 'first key *is* camelCase');
    }, function (error) {
      t.equal(error, null);
    });
});

test('node-edumate - query - clean: false', function (t) {
  t.plan(1);
  edumate.query(config, sql, {clean: false})
    .then(function (results) {
      var firstKey = Object.keys(results[0])[0];
      t.notEqual(firstKey, camelCase(firstKey), 'first key is *not* camelCase');
    }, function (error) {
      t.equal(error, null);
    });
});
