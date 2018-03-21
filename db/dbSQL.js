const mysql = require('mysql');

const dbConnection = mysql.createConnection({
  host: '18.144.30.227',
  user: 'ischulz',
  password: '',
  database: 'WeGotDataTEST',
});

dbConnection.connect((err) => {
  if (err) {
    throw err;
  }
});

const findOneById = (id, callback) => {
  const q = `SELECT * FROM restaurantstest WHERE id=${id};`;
  dbConnection.query(q, (callback));
};
// const pool = mysql.createPool({
//   connectionLimit: 15,
//   host: '13.57.200.128',
//   user: 'ischulz',
//   password: '',
//   database: 'WeGotDataTEST',
// });

// pool.getConnection((err) => {
//   if (err) {
//     throw err;
//   }
// });

// const findOneById = (id, callback) => {
//   const q = `SELECT * FROM restaurantstest WHERE id=${id};`;
//   pool.query(q, (callback));
// };

exports.findOneById = findOneById;
