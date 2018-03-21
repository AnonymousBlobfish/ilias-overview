const db = require('./../../db/db.js');
// const db = require('./../../db/dbSQL.js');

// const actions = {
//   GET: function respondToGETRequest(req, res) {
//     db.findOneById(req.params.id, (err, result) => {
//       if (err) {
//         res.send(err);
//       } else {
//         // console.log(result);
//         res.send(result);
//       }
//     });
//   },
// };

// const requestHandler = (req, res) => {
//     if (actions[req.method]) {
//       actions[req.method](req, res);
//     } else {
//       res.sendStatus(404);
//     }
// };

const requestHandler = (req, res) => {
  db.findOneById(req.params.id, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
};

module.exports.requestHandler = requestHandler;
