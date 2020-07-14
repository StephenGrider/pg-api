const pool = require('../pool');

module.exports = async (id) => {
  const {
    rowCount,
  } = await pool.query('SELECT 1 FROM pg_roles WHERE rolname=$1', [id]);

  return !!rowCount;
};
