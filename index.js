const express = require('express');
require('express-async-errors');
const cors = require('cors');
const cookieSession = require('cookie-session');
const createTables = require('./queries/create-tables');
const keys = require('./keys');
const cleanup = require('./queries/cleanup');

const app = express();

app.set('trust proxy', '127.0.0.1');
app.use(
  cors({
    origin:
      process.env.NODE_ENV === 'production'
        ? 'https://pg-sql.vercel.app'
        : 'http://localhost:3000',
    credentials: true,
  })
);
app.use(express.json());
app.use(
  cookieSession({
    secure: process.env.NODE_ENV === 'production',
    keys: [keys.cookieKey],
  })
);

app.post('/provision', require('./provision'));
app.post('/query', require('./query'));

app.use((err, req, res, next) => {
  if (err) {
    res.status(500);
    res.json({ error: err.message });
  }

  next(err);
});

(async () => {
  await createTables();

  setInterval(cleanup, 1000 * 60 * 60);

  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log('Listening');
  });
})();
