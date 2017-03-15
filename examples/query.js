const edumate = require('../lib/edumate');
const common = require('./common');

/*
  edumate.query(confg, sql, [options])
  --------------
  Query your Edumate database with the given configuration object and SQL, then log the results to console.
*/

edumate.query(common.config, common.options, common.sql, (err, results) => {
  if (err) { console.error(err); }
  console.log(results);
});
