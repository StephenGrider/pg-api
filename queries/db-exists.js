const pool = require('../pool');
const { validateId } = require('./id');

module.exports = async (id) => {
  validateId(id);

  const {
    rowCount,
  } = await pool.query('SELECT 1 FROM pg_database WHERE datname = $1', [id]);

  return !!rowCount;
};
