# :mag: node-edumate

Query your Edumate database with node.js

## Installation

### Using [npm](https://www.npmjs.com/):

`npm install node-edumate --save`

### Using [Yarn](https://yarnpkg.com/):

`yarn add node-edumate`

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

`require` the module in your node.js application and invoke methods accordingly.

```javascript
const edumate = require('node-edumate');
```

### edumate.open(config, callback)

> Connects to your Edumate database using the supplied `config` object. Returns a `conn` object.

### edumate.close(conn, callback)

> Disconnects from the database connection supplied via `conn`.

### edumate.query(config, sql, [options], callback)

> Connects to Edumate's database, executes the statement supplied via `sql`, and then disconnects from the database. Returns an array containing the results of the statement.

`options` must be an object. It can contain any of the following:

| key   | value   | result |
|-------|---------|--------|
| `clean` | `boolean` | If true, the keys within the objects in the returned array will be converted to camelCase. |

### edumate.queries(conn, sql, [options], callback)

> Executes the statement supplied via `sql` against the database connection supplied via `conn`.

`options` must be an object. It can contain any of the following:

| key   | value   | result |
|-------|---------|--------|
| `clean` | `boolean` | If true, the keys within the objects in the returned array will be converted to camelCase. |

---

## Examples

Examples reside in _/examples/_.

## Tests

Tests can be run with `npm test` or `yarn test` in the module's directory.

If you haven't set your environment variables yet, you can run the tests by supplying them via the command line, i.e.:

`EDUMATE_HOST=value EDUMATE_PORT=value EDUMATE_PATH=value EDUMATE_USERNAME=value EDUMATE_PASSWORD=value npm test`
