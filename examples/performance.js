const edumate = require('../lib/edumate');
const common = require('./common');

let performance = {
  atomic: (callback) => {
    console.time('multiple-atomic-queries');
    let looper = (item) => {
      if (item) {
        edumate.query(common.config, item, common.options, (err, results) => {
          if (err) { console.error(err); }
          return looper(common.many.shift());
        });
      } else {
        console.timeEnd('multiple-atomic-queries');
        callback('atomic ok');
      }
    };
    looper(common.many.shift());
  },
  chunky: (callback) => {
    console.time('single-connection-many-queries');
    edumate.open(common.config, (err, conn) => {
      if (err) { console.error(err); }
      let looper = (item) => {
        if (item) {
          edumate.queries(conn, item, common.options, (err, results) => {
            if (err) { console.error(err); }
            return looper(common.many.shift());
          });
        } else {
          edumate.close(conn, (err) => {
            if (err) { console.error(err); }
            console.timeEnd('single-connection-many-queries');
            callback('chunky ok');
          });
        }
      };
      looper(common.many.shift());
    });
  }
};

performance.atomic((done) => {
  console.log(done);
  performance.chunky((done) => {
    console.log(done);
  });
});
