const password = require('./password');
const pool = require('../pool');

const roleExists = require('./role-exists');

module.exports = async (id) => {
  const exists = await roleExists(id);

  if (exists) {
    return;
  }

  const pw = await password(id);

  return pool.query(
    `CREATE ROLE ${id} WITH LOGIN PASSWORD ${pw} CONNECTION LIMIT 2;`
  );
};
