const express = require('express');
const app = express();
const decache = require('decache');

app.use('/api', (req, res) => {
  decache('./api');
  const api = require('./api');
  return api(req, res);
});

app.listen(3000, () => console.log('Example app listening on port 3000!'))