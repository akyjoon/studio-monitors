const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');



//Load Model
require('../models/Monitors');
const Monitor = mongoose.model('monitors');
require('../models/User');
const User = mongoose.model('users');

//Monitor Index Page
router.get('/', (req, res) => {
  Monitor.find({})
    .populate('user')
    .then(monitors => {
      res.render('./monitors/monitors', {
        monitors: monitors
      });
    })
})

//Monitor Add Form Page
router.get('/add', (req, res) => {
  res.render('monitors/add')
})

//Process Monitor Add Form Page
router.post('/', (req, res) => {
  const newMonitor = {
    model: req.body.model,
    company: req.body.company,
    description: req.body.description,
    imgurl: req.body.imgurl,
    user: req.user.id
  }
  new Monitor(newMonitor)
    .save()
    .then(monitor => {
      res.redirect('/monitors')
    })
})

//Monitor Edit Form Page
router.get('/edit/:id', (req, res) => {
  Monitor.findOne({_id: req.params.id})
    .then(monitor => {
      res.render('monitors/edit', {
        monitor: monitor
      })
    })
})
//EDIT MONITOR
router.put('/:id', (req, res) => {
  Monitor.findOne({
    _id: req.params.id
  })
    .then(monitor => {
      monitor.model = req.body.model;
      monitor.company = req.body.company;
      monitor.imgurl = req.body.imgurl;
      monitor.description = req.body.description;

      monitor.save()
        .then(monitor => {
          res.redirect('/monitors')
        })
      
    });
});

//DELETE MONITOR
router.delete('/:id', (req, res) => {
  Monitor.remove({_id: req.params.id})
    .then(() => {
      res.redirect('/monitors')
    })
})

//SHOW INDIVIDUAL MONITOR
router.get('/show/:id', (req, res) => {
  Monitor.findOne({_id: req.params.id})
    .populate('user')
    .populate('reviews.reviewUser')
    .then(monitor => {
      res.render('monitors/show', {
        monitor: monitor
      })
    })
})


//Add review
router.post('/review/:id', (req, res) => {
  Monitor.findOne({
    _id: req.params.id
  })
    .then(monitor => {
      const newReview = {
        reviewBody: req.body.reviewBody,
        reviewUser: req.user.id
      }

      //Add to review array
      monitor.reviews.unshift(newReview);

      monitor.save()
        .then(monitor => {
          res.redirect(`/monitors/show/${monitor.id}`);
        });
    });
});

module.exports = router;
