const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
  res.send('Here will be a list of all studio monitors');
})





module.exports = router;
