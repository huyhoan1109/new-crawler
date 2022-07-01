const express = require('express');
const cheerio = require('cheerio');
const axios = require('axios');
const app = express();
const routes = require('./routes/index');

const port = process.env.PORT || 8000;

/* CROS middleware */
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use('/', routes);

app.get('/', (req, res) => {
  const t = {};
  t['/list'] = 'List truyện';
  t['/search'] = 'Tìm truyện';
  t['/filter'] = 'Lọc truyện';
  t['/category'] = 'Thể loại';
  res.send(JSON.stringify(t, null, 2));
});

app.listen(port, console.log(`App listening at http://localhost:${port}`));