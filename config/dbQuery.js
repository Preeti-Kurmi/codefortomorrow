
const db=require('./db')

const dbQuery = (sql, params) => {
    return new Promise((resolve, reject) => {
      db.pool.query(sql, params, (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results);
      });
    });
  };
  module.exports = dbQuery;
