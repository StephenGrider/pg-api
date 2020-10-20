const pool = require('../pool');
const { validateId } = require('./id');
const dbExists = require('./db-exists');

module.exports = async (id) => {
  validateId(id);

  if (await dbExists(id)) {
    return;
  }

  return pool.query(`
    CREATE DATABASE ${id} OWNER ${id};
    ALTER DATABASE ${id} SET statement_timeout = '1s';
  `);
};
