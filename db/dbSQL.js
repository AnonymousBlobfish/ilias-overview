const mysql = require('mysql');

const dbConnection = mysql.createConnection({
  host: '18.144.75.121',
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

exports.findOneById = findOneById;
