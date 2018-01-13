const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose')
const bCrypt = require('bcrypt-nodejs');
const passport = require('passport');
//Load User model
const User = mongoose.model('users')

passport.use('signup', new LocalStrategy({
    passReqToCallback: true
  },
  function (req, username, password, done) {
    findOrCreateUser = function () {
      User.findOne({
        username: username
      }, function (err, user) {
        if (err) {
          console.log(`Error in Signup ${err}`);
          return done(err);
        }
        if (user) {
          console.log('User already exists');
          return done(null, false, req.flash('message', 'User already exists'));
        } else {
          const newUser = new User();
          newUser.username = username;
          newUser.password = createHash(password);
          newUser.email = req.body.email;

          newUser.save(function (err) {
            if (err) {
              console.log(`Error in saving user: ${err}`);
              throw err;
            }
            console.log('User Registration successful');
            return done(null, newUser);
          });
        }
      });
    };
    process.nextTick(findOrCreateUser);
  }
))

const createHash = function(password) {
  return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}