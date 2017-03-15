const test = require('tape');
const camelCase = require('camel-case');
const edumate = require('../lib/edumate');

let config = {
  host: process.env.EDUMATE_HOST,
  port: process.env.EDUMATE_PORT,
  suffix: process.env.EDUMATE_PATH,
  username: process.env.EDUMATE_USERNAME,
  password: process.env.EDUMATE_PASSWORD
};

let sql = 'SELECT * FROM EDUMATE.academic_year WHERE academic_year = YEAR(current date)';
let many = [
  'SELECT \'Example query results 1.\' AS "CAMEL_CASE_COLUMN" FROM SYSIBM.sysdummy1',
  'SELECT \'Example query results 2.\' AS "CAMEL_CASE_COLUMN" FROM SYSIBM.sysdummy1',
  'SELECT \'Example query results 3.\' AS "CAMEL_CASE_COLUMN" FROM SYSIBM.sysdummy1'
];

test('node-edumate - query - config object + sql statement validity', function (t) {
  t.plan(6);
  t.equal(typeof config.host, 'string', 'DB2 host present');
  t.equal(typeof config.port, 'string', 'DB2 port present');
  t.equal(typeof config.suffix, 'string', 'DB2 path present');
  t.equal(typeof config.username, 'string', 'DB2 username present');
  t.equal(typeof config.password, 'string', 'DB2 password present');
  t.equal(typeof sql, 'string', 'SQL statement present');
});

test('node-edumate - open connection to db', function (t) {
  t.plan(1);
  edumate.open(config, (err, conn) => {
    if (err) {
      t.equal(err, null);
    } else {
      t.equal(conn.connected, true, 'connected to db');
    }
  });
});

test('node-edumate - close connection to db', function (t) {
  t.plan(1);
  edumate.open(config, (err, conn) => {
    if (err) {
      t.equal(err, null);
    } else {
      edumate.close(conn, (err) => {
        if (err) {
          t.equal(err, null);
        } else {
          t.equal(conn.connected, false, 'disconnected from db');
        }
      });
    }
  });
});

test('node-edumate - single query - clean: true', function (t) {
  t.plan(1);
  edumate.query(config, { clean: true }, sql, (err, results) => {
    if (err) {
      t.equal(err, null);
    } else {
      let firstKey = Object.keys(results[0])[0];
      t.equal(firstKey, camelCase(firstKey), 'first key *is* camelCase');
    }
  });
});

test('node-edumate - single query - clean: false', function (t) {
  t.plan(1);
  edumate.query(config, { clean: false }, sql, (err, results) => {
    if (err) {
      t.equal(err, null);
    } else {
      let firstKey = Object.keys(results[0])[0];
      t.notEqual(firstKey, camelCase(firstKey), 'first key is *not* camelCase');
    }
  });
});

test('node-edumate - multiple queries', function (t) {
  t.plan(1);
  edumate.open(config, (err, conn) => {
    if (err) { t.equal(err, null); }
    let goal = many.length;
    let collection = [];
    let looper = (item) => {
      if (item) {
        setTimeout(() => {
          edumate.queries({ clean: true }, conn, item, (err, results) => {
            if (err) { t.equal(err, null); }
            collection.push(results[0]);
            return looper(many.shift());
          });
        }, 500);
      } else {
        edumate.close(conn, (err) => {
          if (err) { t.equal(err, null); }
          t.equal(collection.length, goal, `${goal} queries executed.`);
        });
      }
    };
    looper(many.shift());
  });
});
