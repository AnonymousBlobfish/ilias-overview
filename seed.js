const mongoose = require('mongoose');
const db = require('./db/db.js');
const allRestaurantData = require('./finData.json');
const faker = require('faker');

faker.seed(123);
const fs = require('fs');
const schema = require('./db/db.js');
// const fakeData = require('./10MilEntries.json')
const jsonfile = require('jsonfile');

const dbAddress = process.env.DB_ADDRESS || 'localhost';

// mongoose.connect(`mongodb://${dbAddress}/weGotData`);

// const seedDb = (data) => {
//   db.count().then((counts) => {
//     if (counts === 0) {
//       const overviewInfo = data.map(({ result }) => (
//         {
//           id: result.place_id,
//           name: result.name,
//           tagline: result.tagline,
//           type: 'Restaurant',
//           vicinity: result.vicinity,
//           priceLevel: result.price_level,
//           zagatFood: Number(result.zagat_food),
//           zagatDecor: Number(result.zagat_decor),
//           zagatService: Number(result.zagat_service),
//           longDescription: result.long_description,
//         }
//       ));
//       db.insertMany(overviewInfo, () => {
//         console.log('done seeding!');
//         mongoose.disconnect();
//       });
//     } else {
//       console.log('already seeded!');
//       mongoose.disconnect();
//     }
//   });
// };

const createFakeEntry = (id) => {
  const fakerEntry = {};
  fakerEntry._id = id;
  fakerEntry.name = faker.company.companyName();
  fakerEntry.tagline = faker.lorem.words();
  fakerEntry.type = faker.name.jobArea();
  fakerEntry.vicinity = faker.address.streetAddress();
  fakerEntry.priceLevel = Math.floor(Math.random() * Math.floor(3));
  fakerEntry.zagatFood = Math.floor(Math.random() * Math.floor(5));
  fakerEntry.zagatDecor = Math.floor(Math.random() * Math.floor(5));
  fakerEntry.zagatService = Math.floor(Math.random() * Math.floor(5));
  fakerEntry.longDescription = faker.lorem.paragraphs();
  return fakerEntry;
};

// let seedDBwithFaker = function() {
//   //mongoose.disconnect();
//   for (let i = 1; i <= 1000000; i++) {
//     console.log(i);
//     if(i===1) {
//       fs.appendFileSync('10MilEntries.json', '[');
//       jsonfile.writeFileSync('10MilEntries.json', createFakeEntry(i), {flag: 'a'});
//       fs.appendFileSync('10MilEntries.json', ',');
//     } else if(i===1000000) {
//       console.log(Date.now() - start);
//       fs.appendFileSync('10MilEntries.json', ']');
//     } else {
//       jsonfile.writeFileSync('10MilEntries.json', createFakeEntry(i), {flag: 'a'});
//       fs.appendFileSync('10MilEntries.json', ',');
//     }
//   }
//   //console.log(array[9999999]);
//   //return array;
// };

// function pause(milliseconds) {
//   let dt = new Date();
//   while ((new Date()) - dt <= milliseconds) { /* Do nothing */ }
// }

// let seedDBwithFaker = function() {
//   let filenames = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eigth', 'ninth', 'tenth'];
//   let time = 0;
//   let flag = false;
//   let start = Date.now();
//   for(let files = 1; files<=10;files++){
//     let file = fs.createWriteStream(`./${filenames[files-1]}MilEntries.json`);
//     file.write('[');
//     for(let i = (((files-1)*1000000)+1); i <= (files*1000000); i++) {
//       console.log(i);
//       if(i===(files*1000000)) {
//         file.write(JSON.stringify(createFakeEntry(i)) + ']');
//       } else {
//         file.write(JSON.stringify(createFakeEntry(i)) + ',');
//       }
//     }
//     time+=(Date.now() - start);
//     // file.end(() => {
//     //   pause(90000);
//     // });
//   }
//   return time;
// }
// first: 71seconds

// seed database with;
// mongoimport --db WeGotData --collection restaurants --type json --file ./JsonFiles/firstMilEntries.json --jsonArray
// in console

// creating 10 jsonFiles with 1 Mio Entries each
const seedDBwithFaker = (files) => {
  if (files <= 10) {
    const filenames = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth', 'ninth', 'tenth'];
    const file = fs.createWriteStream(`./${filenames[files - 1]}MilEntries.json`);
    file.write('[');
    for (let i = (((files - 1) * 1000000) + 1); i <= (files * 1000000); i += 1) {
      // console.log(i);
      if (i === (files * 1000000)) {
        file.write(JSON.stringify(createFakeEntry(i)) + ']', 'utf8', setTimeout(seedDBwithFaker.bind(this, files + 1), 30000));
        file.end();
      } else {
        file.write(JSON.stringify(createFakeEntry(i)) + ',');
      }
    }
  }
};
// creating one big 10 Mio file
const bigFile = fs.createWriteStream('./10MilEntriesBIG.json');
const create10MilFile = (n = 1) => {
  let flag = true;
  while (n <= 10000000 && flag) {
    if (n === 10000000) {
      flag = bigFile.write(JSON.stringify(createFakeEntry(n)));
      n += 1;
    } else {
      flag = bigFile.write(JSON.stringify(createFakeEntry(n)) + '\n');
      n += 1;
    }
  }
  bigFile.once('drain', () => {
    console.log(n);
    create10MilFile(n);
  });
};

create10MilFile();
// seedDBwithFaker(1);
// seedDb(allRestaurantData);

