const edumate = require('../lib/edumate');
const common = require('./common');

/*
  edumate.queries(confg, sql, [options])
  --------------
  Query your Edumate database multiple times with the given configuration object and SQL, then log the results to console.
*/

edumate.open(common.config, (err, conn) => {
  if (err) { console.error(err); }
  let looper = (item) => {
    if (item) {
      setTimeout(() => {
        edumate.queries(conn, item, common.options, (err, results) => {
          if (err) { console.error(err); }
          console.log(JSON.stringify(results, null, '  '));
          return looper(common.many.shift());
        });
      }, 500);
    } else {
      edumate.close(conn, (err) => {
        if (err) { console.error(err); }
      });
    }
  };
  looper(common.many.shift());
});
