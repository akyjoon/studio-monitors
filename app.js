const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const passport = require('passport');
const expressSession = require('express-session');
const login = require('./passport/login');
const signup = require('./passport/registration');
const flash = require('connect-flash');



const app = express();


app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('uploads'));

app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use(express.static(__dirname + '/node_modules/babel-polyfill/'))
//Load model
require('./models/Monitors');
const Monitor = mongoose.model('monitors')
require('./models/User');
const User = mongoose.model('users')
//---------------------Settings for middlewares-----------
//Set express-handlebars
//--handlebars helpers
const {truncate, edit, formatDate} = require('./helpers/hbs');

app.engine('handlebars', exphbs({
  helpers: {
    truncate: truncate,
    edit: edit,
    formatDate: formatDate
  },
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

//Set bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

//Db config
const db = require('./config/database')
//Set Mongoose
mongoose.Promise = global.Promise;
mongoose.connect(db.mongoURI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err))

//Set Method Override
app.use(methodOverride('_method'));

//Passport & express-session
app.use(expressSession({
  secret: 'mySecretKey',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser((user, done) => {
  done(null, user._id);
});
passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  })
})
app.use(flash())

//---------------------End of Settings for middlewares-----------

//Global variables
app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
})


//Declare & Use Routes
const monitors = require('./routes/monitors');
app.use('/monitors', monitors);
const auth = require('./routes/auth');
app.use('/auth', auth);
const dashboard = require('./routes/dashboard');
app.use('/dashboard', dashboard);
const user = require('./routes/user');
app.use('/user', user);

//Get Root
app.get('/', (req, res) => {
  Monitor.find({})
  .populate('user')
  .sort({date: 'desc'})
  .limit(4)
    .then(monitors => {
      res.render('./home/home', {
        monitors: monitors
      });
    })
})






//Listen Port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on port ${port}`)
})