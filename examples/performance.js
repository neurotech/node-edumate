const edumate = require('../lib/edumate');

let config = {
  host: process.env.EDUMATE_HOST,
  port: process.env.EDUMATE_PORT,
  suffix: process.env.EDUMATE_PATH,
  username: process.env.EDUMATE_USERNAME,
  password: process.env.EDUMATE_PASSWORD
};

let options = { clean: true };
let many = [
  'SELECT \'Example query results 1.\' AS "CAMEL_CASE_COLUMN" FROM SYSIBM.sysdummy1',
  'SELECT \'Example query results 2.\' AS "CAMEL_CASE_COLUMN" FROM SYSIBM.sysdummy1',
  'SELECT \'Example query results 3.\' AS "CAMEL_CASE_COLUMN" FROM SYSIBM.sysdummy1',
  'SELECT \'Example query results 4.\' AS "CAMEL_CASE_COLUMN" FROM SYSIBM.sysdummy1',
  'SELECT \'Example query results 5.\' AS "CAMEL_CASE_COLUMN" FROM SYSIBM.sysdummy1',
  'SELECT \'Example query results 6.\' AS "CAMEL_CASE_COLUMN" FROM SYSIBM.sysdummy1',
  'SELECT \'Example query results 7.\' AS "CAMEL_CASE_COLUMN" FROM SYSIBM.sysdummy1',
  'SELECT \'Example query results 8.\' AS "CAMEL_CASE_COLUMN" FROM SYSIBM.sysdummy1',
  'SELECT \'Example query results 9.\' AS "CAMEL_CASE_COLUMN" FROM SYSIBM.sysdummy1',
  'SELECT \'Example query results 10.\' AS "CAMEL_CASE_COLUMN" FROM SYSIBM.sysdummy1'
];

let performance = {
  atomic: (callback) => {
    console.time('multiple-atomic-queries');
    let looper = (item) => {
      if (item) {
        edumate.query(config, options, item, (err, results) => {
          if (err) { console.error(err); }
          return looper(many.shift());
        });
      } else {
        console.timeEnd('multiple-atomic-queries');
        callback('atomic ok');
      }
    };
    looper(many.shift());
  },
  chunky: (callback) => {
    console.time('single-connection-many-queries');
    edumate.open(config, (err, conn) => {
      if (err) { console.error(err); }
      let looper = (item) => {
        if (item) {
          edumate.queries(options, conn, item, (err, results) => {
            if (err) { console.error(err); }
            return looper(many.shift());
          });
        } else {
          edumate.close(conn, (err) => {
            if (err) { console.error(err); }
            console.timeEnd('single-connection-many-queries');
            callback('chunky ok');
          });
        }
      };
      looper(many.shift());
    });
  }
};

performance.atomic((done) => {
  console.log(done);
  performance.chunky((done) => {
    console.log(done);
  });
});

// performance.chunky((done) => {
//   console.log(done);
// });
