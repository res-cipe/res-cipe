const { Pool } = require('pg');

const PG_URI =
  `postgres://yfopfigc:NdRchGgXUa0D2bkRE4haivaL7eXpn86w@ziggy.db.elephantsql.com:5432/yfopfigc`;

const pool = new Pool({
  connectionString: PG_URI,
});

module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  },
};
