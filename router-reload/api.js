const express = require('express');
const message = require('./message');

const router = express.Router();

router.get('/foo', (req, res) => {
  res.send(message);
});

module.exports = router;