const pool = require('../pool');

module.exports = (id) => {
  return pool.query(
    `
    INSERT INTO rolelogins (id, lastquery)
    VALUES ($1, to_timestamp($2))
    ON CONFLICT (id)
    DO 
      UPDATE SET lastquery = to_timestamp($2);
  `,
    [id, Date.now() / 1000]
  );
};
