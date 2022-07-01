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
  const list = [
    {
      title: 'List truyện',
      path: '/list',
    },
    {
      title: 'Tìm truyện',
      path: '/search',
    },
    {
      title: 'Lọc truyện',
      path: '/filter',
    },
    {
      title: 'Thể loại',
      path: '/category',
    },
  ];
  res.send(JSON.stringify(list));
});

app.listen(port, console.log(`App listening at http://localhost:${port}`));