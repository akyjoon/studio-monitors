// if(process.env.NODE_ENV == 'production') {
//   module.exports = {mongoURI: 'mongodb://akyjoon:Qangelo1232@ds151451.mlab.com:51451/monitors'}
// } else {
//   module.exports = {mongoURI: 'mongodb://localhost/studio-monitors'}
// }




if(process.env.NODE_ENV == 'production') {
  module.exports = {mongoURI: 'mongodb://akyjoon:Qangelo1232@ds151451.mlab.com:51451/monitors'}
} else {
  module.exports = {mongoURI: 'mongodb://akyjoon:Qangelo1232@ds151451.mlab.com:51451/monitors'}
}