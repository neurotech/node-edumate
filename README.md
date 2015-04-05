# node-edumate

Query your Edumate database with node.js

---

## Installation

`npm install node-edumate --save`

## Configuration

`edumate.init` expects a configuration object that matches this structure:

```javascript
  {
    libpath: 'PATH/TO/DB2 Driver JAR',
    drivername: 'com.ibm.db2.jcc.DB2Driver',
    url: 'jdbc:' + 'db2://' + 'HOSTNAME' + ':' + 'PORT' + '/PATH' + ':user=' + 'USERNAME' + ';password=' + 'SECRET' + ';'
  }
```

### DB2 Driver
`node-edumate` makes use of the `node-jdbc` module: [https://github.com/CraZySacX/node-jdbc](https://github.com/CraZySacX/node-jdbc). This means that you will need to supply the DB2 driver JAR file to successfully initialize, connect to, and query Edumate's DB2 database.

For more information: [http://www-01.ibm.com/support/docview.wss?uid=swg21363866](http://www-01.ibm.com/support/docview.wss?uid=swg21363866)

## Example

This example resides in _examples/query.js_

```javascript
/*
  database
  --------
  Basic database connection, credentials
*/
var database = {
  host: 'HOST',
  port: 'PORT',
  suffix: '/PATH',
  username: 'USERNAME',
  password: 'SECRET'
};

/*
  config
  ------
  This is the object that edumate.init requires to begin the init operation
*/
var config = {
  libpath: path.join(__dirname, '../drivers/db2jcc.jar'),
  drivername: 'com.ibm.db2.jcc.DB2Driver',
  url: 'jdbc:' + 'db2://' + database.host + ':' + database.port + database.suffix + ':user=' + database.username + ';password=' + database.password + ';'
};

/*
  sql
  ---
  Simple SELECT query
*/
var sql = 'SELECT * FROM table_name';

/*
  edumate.init()
  --------------
  Begin the 'query' promise chain
*/
edumate.init(config)
  .then(function(response) {
    console.log('Init: ' + response);
    edumate.open()
      .then(function(response) {
        console.log('Connect: ' + response);
        edumate.query(sql)
          .then(function(response) {
            console.log('Query results: \n' + JSON.stringify(response));
            edumate.close()
              .then(function(response) {
                console.log('Disconnect: ' + response);
              }, function(error) {
                console.log('Disconnect error: ' + error);
              });
          }, function(error) {
            console.log('Query error: ' + error);
          });
      }, function(error) {
        console.log('Connect error: ' + error);
      });
  }, function(error) {
    console.log('Init error: ' + error);
  });
```