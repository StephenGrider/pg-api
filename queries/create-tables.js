const pool = require('../pool');

module.exports = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS rolelogins (
      id char(8) PRIMARY KEY,
      lastquery timestamp
    );
  `);
};
