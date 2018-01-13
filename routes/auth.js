const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

//Load User model
require('../models/User');
const User = mongoose.model('users')

//Login Route
router.get('/login', (req, res) => {
  res.render('auth/login');
});

//Login POST
router.post('/login', passport.authenticate('login', {
    successRedirect: '/',
    failureRedirect: '/auth/login',
    failureFlash: true
  })
)

//Registration Route
router.get('/register', (req, res) => {
  res.render('auth/register')
})

//Registation POST
router.post('/register', passport.authenticate('signup', {
    successRedirect: '/auth/login',
    failureRedirect: '/auth/register'
  })
)

//Logout
router.get('/logout', (req, res) => {
  req.logout();
  console.log('logged out')
  res.redirect('/')
})

module.exports = router;