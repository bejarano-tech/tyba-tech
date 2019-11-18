const Authentication = require('./controllers/authentication');
const Geocoding = require('./controllers/geocoding');
const Transactions = require('./controllers/transactions');
const passport = require('passport');
require('./services/passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignIn = passport.authenticate('local', { session: false });

module.exports = function (app) {

  app.get('/', function (req, res) {
    res.send('Express Server con Autenticación JWT');
  });

  app.get('/transactions', requireAuth, Transactions.get);

  app.post('/geocoding', requireAuth, Geocoding.search);

  app.post('/signin', requireSignIn, Authentication.signin);

  app.post('/signup', Authentication.signup);

};