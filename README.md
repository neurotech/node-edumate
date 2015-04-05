# node-edumate

Query your Edumate database with node.js

*_Note:_ This is definitely an early work-in-progress!*

---

## Installation

`npm install node-edumate --save`

## Configuration

`edumate.init` expects a configuration object that matches this structure:

```javascript
  {
    libpath: 'PATH/TO/DB2 Driver JAR',
    drivername: 'com.ibm.db2.jcc.DB2Driver',
    url: 'jdbc:' + 'db2://' + 'HOSTNAME' + ':' + 'PORT' + '/PATH' + ':user=' + 'USERNAME' + ';password=' + 'SECRET' + ';',
  }
```
