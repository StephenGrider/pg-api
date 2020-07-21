const pool = require('./pool');
const roleExists = require('./queries/role-exists');
const createRole = require('./queries/create-role');
const createDb = require('./queries/create-db');
const { createId, validateId } = require('./queries/id');
const seedDb = require('./queries/seed-db');

module.exports = async (req, res) => {
  let id = req.session.id;

  if (!id) {
    id = createId(8);
    req.session.id = id;
  }

  validateId(id);

  try {
    await createRole(id);
    await createDb(id);
    await seedDb(id);

    res.send({ status: 'ok' });
  } catch (err) {
    console.error(err);
    throw new Error('Failed to provision db');
  }
};
