const mysql = require('mysql');
const faker = require('faker');


const dbConnection = mysql.createConnection({
  host: '54.193.77.51',
  user: 'ischulz',
  password: '',
  database: 'WeGotDataTEST',
});

dbConnection.connect((err) => {
  if (err) {
    throw err;
  }
});

const createFakeEntry = (id) => {
  const fakerEntry = [];
  fakerEntry.push(id);
  fakerEntry.push(faker.company.companyName());
  fakerEntry.push(faker.lorem.words());
  fakerEntry.push(faker.name.jobArea());
  fakerEntry.push(faker.address.streetAddress());
  fakerEntry.push(Math.floor(Math.random() * Math.floor(3)));
  fakerEntry.push(Math.floor(Math.random() * Math.floor(5)));
  fakerEntry.push(Math.floor(Math.random() * Math.floor(5)));
  fakerEntry.push(Math.floor(Math.random() * Math.floor(5)));
  fakerEntry.push(faker.lorem.paragraphs());
  return fakerEntry;
};

// create 10million entries by generating random entries.
// insert 10.000 entries at a time with INSERT
const postCategory = (j) => {
  if (j < 1001) {
    const entries = [];
    for (let i = ((j - 1) * 10000) + 1; i <= 10000 * j; i += 1) {
      entries.push(createFakeEntry(i));
    }
    console.log(j);
    const q = "INSERT INTO restaurants (id, name, tagline, type, vicinity, priceLevel, zagatFood, zagatDecor, zagatService, longDescription) VALUES ?";
    dbConnection.query(q, [entries], (error, results) => {
      if (error) throw error;
      // console.log(results, 'this is results from transaction');
      postCategory(j + 1);
    });
  }
  if (j === 1000) {
    console.log('DONE!DONE!DONE!');
  }
};


postCategory(1);

module.exports = dbConnection;
