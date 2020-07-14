const { Pool } = require('pg');

const config =
  process.env.NODE_ENV === 'production'
    ? {
        user: 'root',
        host: 'localhost',
        database: 'postgres',
        password: '',
        port: 5432,
      }
    : {
        user: 'sg',
        host: 'localhost',
        database: 'sg',
        password: '',
        port: 5432,
      };

module.exports = new Pool(config);
