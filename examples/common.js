module.exports = {
  config: {
    host: process.env.EDUMATE_HOST,
    port: process.env.EDUMATE_PORT,
    suffix: process.env.EDUMATE_PATH,
    username: process.env.EDUMATE_USERNAME,
    password: process.env.EDUMATE_PASSWORD
  },
  options: { clean: true },
  sql: 'SELECT \'Example query results here.\' AS "CAMEL_CASE_COLUMN" FROM SYSIBM.sysdummy1',
  many: [
    'SELECT \'Example query results 1.\' AS "CAMEL_CASE_COLUMN" FROM SYSIBM.sysdummy1',
    'SELECT \'Example query results 2.\' AS "CAMEL_CASE_COLUMN" FROM SYSIBM.sysdummy1',
    'SELECT \'Example query results 3.\' AS "CAMEL_CASE_COLUMN" FROM SYSIBM.sysdummy1'
  ]
};
