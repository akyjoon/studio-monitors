const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose')
const bCrypt = require('bcrypt-nodejs');
const passport = require('passport');
//Load User model
require('../models/User');
const User = mongoose.model('users')

const isValidPassword = function(user, password) {
  return bCrypt.compareSync(password, user.password);
}

passport.use('login', new LocalStrategy({
    passReqToCallback: true
  },
  function (req, username, password, done) {
    User.findOne({
        'username': username
      },
      function (err, user) {
        if (err) {
          return done(err);
        }
        if (!user) {
          console.log(`${username} not found`);
          return done(null, false, req.flash('message', 'User not found'));
        }
        if (!isValidPassword(user, password)) {
          console.log('Invalid Password');
          return done(null, false, req.flash('message', 'Invalid Password'));
        }
        console.log('login success')
        return done(null, user);
      }
    )
  }
));

