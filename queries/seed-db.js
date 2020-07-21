const { escape } = require('sqlstring');
const createClient = require('./create-client');
const { validateId } = require('./id');
const dbExists = require('./db-exists');
const cities = require('./datasets/cities.json');

module.exports = async (id) => {
  validateId(id);

  if (!(await dbExists(id))) {
    return;
  }

  const client = await createClient(id);

  try {
    await client.query(`CREATE TABLE cities (
      name varchar(100),
      lat float,
      lng float,
      country varchar(100),
      iso3 char(3),
      population float
    );`);

    const values = escape(
      cities.map(({ name, lat, lng, country, iso3, population }) => {
        return [name, lat, lng, country, iso3, population];
      })
    ).replace(/\\/g, "'");

    await client.query(
      'INSERT INTO cities (name, lat, lng, country, iso3, population) VALUES ' +
        values +
        ';'
    );
  } finally {
    await client.end();
  }
};
