const { Client } = require('pg');
const password = require('./password');

module.exports = async (id) => {
  const hashed = await password(id);

  const client = new Client({
    user: id,
    host: process.env.PG_HOST,
    database: id,
    password: hashed,
    port: process.env.PG_PORT,
  });

  await client.connect();

  return client;
};
