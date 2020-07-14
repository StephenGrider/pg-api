const pool = require('../pool');
const { validateId } = require('./id');

module.exports = async (days) => {
  const { rows } = await pool.query(
    `
    SELECT id FROM rolelogins
    WHERE lastquery < NOW() - INTERVAL '7 days'
  `
  );

  for (let { id } of rows) {
    try {
      validateId(id);
      await pool.query(`DROP DATABASE IF EXISTS ${id}`);
      await pool.query(`DROP ROLE IF EXISTS ${id};`);
    } catch (err) {
      console.error(err);
    }
  }
};
