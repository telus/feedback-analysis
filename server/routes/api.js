const express = require('express');
const router = express.Router();

/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works');
});

router.post('/feedback', (req, res) => {
  res.send('POST request to the homepage');
});

module.exports = router;