const express = require('express');
const path = require('path');
// const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');

const app = express();


//Declare & Use Routes
const monitors = require('./routes/monitors')
app.use('/monitors', monitors)


//Get Root
app.get('/', (req, res) => {
  res.send('This is a root page');
})






//Listen Port
const port = 3000;
app.listen(port, () => {
  console.log(`listening on port ${port}`)
})