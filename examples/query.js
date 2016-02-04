'use strict';

var edumate = require('../lib/edumate');

var config = {
  host: process.env.EDUMATE_HOST,
  port: process.env.EDUMATE_PORT,
  suffix: process.env.EDUMATE_PATH,
  username: process.env.EDUMATE_USERNAME,
  password: process.env.EDUMATE_PASSWORD
};

var sql = 'SELECT \'Example query results here.\' AS "CAMEL_CASE_COLUMN" FROM SYSIBM.sysdummy1';

/*
  edumate.query(confg, sql, [options])
  --------------
  Query your Edumate database with the given configuration object and SQL, then log the results to console.
*/
edumate.query(config, sql, {clean: true})
  .then(function (results) {
    console.log(results);
  }, function (error) {
    console.error(error);
  });
