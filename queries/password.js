const { scrypt: _scrypt } = require('crypto');
const { promisify } = require('util');
const { escape } = require('sqlstring');
const keys = require('../keys');

const scrypt = promisify(_scrypt);

module.exports = async (id) => {
  const hashed = (await scrypt(id, keys.roleKey, 8)).toString('hex');

  // Escape not really needed...
  return escape(hashed);
};
