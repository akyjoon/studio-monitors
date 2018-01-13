const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const async = require('async');

//Load Monitor model
require('../models/Monitors');
const Monitor = mongoose.model('monitors');

//Get Dashboard my monitors tab
router.get('/', function(req, res, next) {
  //Check if user is logged in
  if(req.isAuthenticated()) {
    return next();
  }
  res.redirect('/')
}, (req, res) => {
    Monitor.find({
      user:req.user.id
    })
      .populate('user')
      .populate('reviews.reviewUser')
      .then(monitors => {
        res.render('./dashboard/dashboard', {
          monitors: monitors
        });
      });

})

// router.get('/my-reviews', (req,res,next) => {
//   //Check if user is logged in
//   if(req.isAuthenticated()) {
//     return next();
//   }
//   res.redirect('/')
// }, (req, res) => {
//   Monitor.find({
//     'reviews.reviewUser': req.user.id
//   })
//   .populate('user')
//   .populate('reviews.reviewUser')
//   .then(monitors => {
//     res.render('./dashboard/dashboard', {
//       monitors: monitors
//     })
//   })
// })





// router.get('/', function(req, res, next) {
//   //Check if user is logged in

//   if(req.isAuthenticated()) {
//     return next();
//   }
//   res.redirect('/')
// }, (req, res) => {

//   async.parallel({
//     findMasterUser: function(callback) {
//       Monitor.find({user:req.user.id})
//       .populate('user')
//       .populate('reviews.reviewUser')
//       .exec(callback)
//     },
//     findReviewUser: function(callback) {
//       Monitor.find({'reviews.reviewUser': req.user.id})
//       .populate('user')
//       .populate('reviews.reviewUser')
//       .exec(callback);
//     }
//   }, function(err,results) {
//     if(err) {throw err}
//     console.log(results)
//     res.render('./dashboard/dashboard', {
//       monitors: monitors
//     })
//   }
//   )

// })

module.exports = router;