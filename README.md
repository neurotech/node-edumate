# node-edumate

Query your Edumate database with node.js

---

## Installation

`npm install node-edumate --save`

## Configuration

`edumate.query` expects a configuration object that matches this structure:

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

## Examples

Examples reside in _/examples/_.