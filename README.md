# node-edumate

Query your Edumate database with node.js

---

## Installation

`npm install node-edumate --save`

## `ibm_db` and OS X
`node-edumate` makes use of the `ibm_db` module: [https://github.com/ibmdb/node-ibm_db](https://github.com/ibmdb/node-ibm_db).

If you are using `node-edumate` on OS X, you need to set the `DYLD_LIBRARY_PATH` using the following command:

```bash
export DYLD_LIBRARY_PATH=node_modules/ibm_db/installer/clidriver/lib/icc
```

## Configuration

`node-edumate` expects a configuration object that matches this structure:

```javascript
  {
    host: HOST,
    port: 12345,
    suffix: DATABASE,
    username: USERNAME,
    password: SECRET
  }
```

It is recommended to store these items as environment variables. For example:

```bash
export EDUMATE_HOST=value
export EDUMATE_PORT=value
export EDUMATE_PATH=value
export EDUMATE_USERNAME=value
export EDUMATE_PASSWORD=value
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

---

## < 4.0.0 API

Legacy API docs available [here](https://github.com/neurotech/node-edumate/blob/master/LEGACY.md).
