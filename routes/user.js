const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');



//Load Model
require('../models/Monitors');
const Monitor = mongoose.model('monitors');
require('../models/User');
const User = mongoose.model('users');


//show users profile
router.get('/:userId', (req,res) => {
  Monitor.find({
    user: req.params.userId
  })
    .populate('user')
    .then(monitors => {
      res.render('monitors/user_monitors', {
        monitors: monitors
      })
    })
})

module.exports = router;