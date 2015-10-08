# node-edumate

Query your Edumate database with node.js

---

## Installation

`npm install node-edumate --save`

## DB2 Driver
`node-edumate` makes use of the `node-jdbc` module: [https://github.com/CraZySacX/node-jdbc](https://github.com/CraZySacX/node-jdbc). This means that you will need to supply the DB2 driver JAR file to successfully initialize, connect to, and query Edumate's DB2 database. There is one provided in `./drivers` but you may wish to supply your own.

For more information: [http://www-01.ibm.com/support/docview.wss?uid=swg21363866](http://www-01.ibm.com/support/docview.wss?uid=swg21363866)

## Configuration

`node-edumate` expects a configuration object that matches this structure:

```javascript
  {
    libpath: 'PATH/TO/DB2 Driver JAR',
    drivername: 'com.ibm.db2.jcc.DB2Driver',
    url: 'jdbc:' + 'db2://' + 'HOSTNAME' + ':' + 'PORT' + '/PATH' + ':user=' + 'USERNAME' + ';password=' + 'SECRET' + ';'
  }
```

## Usage

### edumate.query(config, sql, [options])

Execute the statement supplied via `sql`. Returns an object containing the results of the statement.

`options` must be an object. It can contain any of the following:

| key   | value   | result |
|-------|---------|--------|
| `clean` | `boolean` | If true, the keys in the returned object will be converted to camelCase. |

## Examples

Examples reside in _/examples/_.

## Tests

Tests can be run with `npm test` in the module's directory.

If you haven't set your environment variables yet, you can run the tests by supplying them via the command line:

`EDUMATE_HOST=value EDUMATE_PORT=value EDUMATE_PATH=value EDUMATE_USERNAME=value EDUMATE_PASSWORD=value npm test`