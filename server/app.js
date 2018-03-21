const express = require('express');
// const morgan = require('morgan');
const cors = require('cors');
const handler = require('./routes/requestHandler.js');

const app = express();

app.use(cors());
// app.use(morgan('dev'));

// for loader.io
// app.get('/loaderio-f5dd4bdeed358aaf3f9a3c2f6aef33f5', (req, res) => res.sendFile(__dirname + '/loaderio-f5dd4bdeed358aaf3f9a3c2f6aef33f5.txt'));

app.get('/', (req, res) => {
  res.redirect('/restaurants/1');
});

app.use('/restaurants/:id', express.static('client/dist'));
app.get('/api/restaurants/:id/overview', handler.requestHandler);

module.exports = app;

