const { Pool } = require('pg');

const config =
  process.env.NODE_ENV === 'production'
    ? {
        user: process.env.PG_USER,
        host: process.env.PG_HOST,
        database: process.env.PG_DB,
        password: process.env.PG_PASSWORD,
        port: process.env.PG_PORT,
      }
    : {
        user: 'sg',
        host: 'localhost',
        database: 'sg',
        password: '',
        port: 5432,
      };

module.exports = new Pool(config);
