const passport = require('passport');

const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');

// MIDDLEWARES
//create an object that is between incoming request and route handler
// use 'jwt' strategy and do not create a cookie
const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

// ROUTES
module.exports = function(app) {
  // for any route you want to require authentication for, first send
  // them through requireAuth, and if they get that, then send them on
  app.get('/secret', requireAuth, function(req, res) {
    res.send({ message: 'secret code is XYZ' });
  });

  // verify user goes to protected route, check their username and password
  // create requireSignin that will intercept the request
  app.post('/signin', requireSignin, Authentication.signin);
  app.post('/signup', Authentication.signup);
};
