const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const path = require('path')
const async = require('async');
const fs = require('fs');
const multer = require('multer');
const bodyParser = require('body-parser');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
  extended: true
}))

//Load Monitor model
require('../models/Monitors');
const Monitor = mongoose.model('monitors');
require('../models/User');
const User = mongoose.model('users');

//Get Dashboard

// router.get('/', (req,res,next) => {
//   if(req.isAuthenticated()) {
//     return next();
//   }
//   res.redirect('/')
// }, (req, res) => {
//   Monitor.find({
//     user: req.user.id
//   }, (err, userMonitor) => {
//     Monitor.find({
//       'reviews.reviewUser': req.user.id
//     }, (err, userReviews) => {
//       // console.log('user Monitor', userMonitor);
//       console.log('user reviews', userReviews);
//       res.render('./dashboard/dashboard', {
//         userMonitor: userMonitor,
//         userReviews: userReviews
//       })
//     })
//   })
// })

//test2
router.get('/', (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/')
}, (req, res) => {
  Monitor.find({
      user: req.user.id
    })
    .populate('user')
    .then((userMonitor) => {
      Monitor.find({
          'reviews.reviewUser': req.user.id
        })
        .populate('user')
        .then((userReviews) => {
          res.render('./dashboard/dashboard', {
            userMonitor: userMonitor,
            userReviews: userReviews
          })
        })
    })
})


//set multer for profile image storage
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/img')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

var upload = multer({
  storage: storage
})

//add profile image for a user
router.put('/avatar/:id', upload.single('avatar'), (req, res, next) => {

  User.findOne({
      _id: req.params.id
    })
    .then(user => {
      user.avatar = req.file.originalname

      user.save()
        .then(user => {
          res.redirect('/')
        })
    })
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