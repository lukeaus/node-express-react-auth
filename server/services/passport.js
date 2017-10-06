const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

// jwtStrategy needs to get the jwt from the request.
// But it could be anywhere - in cookies, in headers, in body, in url etc.

// setup options for JWT strategy
const jwtOptions = {
  // look for header called 'authorization' for jwt
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret
};

const localOptions = { usernameField: 'email' };

// create local strategy (authenticate a user given an email and password)
const localLogin = new LocalStrategy(localOptions, function(email, password, done) {
  // verify the email and password
  User.findOne({ email: email }, function(err, user) {
    if (err) { return done(err); }
    if (!user) { return done(null, false); }

    // compare passwords - is password === user.password ?
    user.comparePassword(password, function(err, isMatch) {
      if (err) { return done(err); }
      if (!isMatch) { return done(null, false); }

      // call done with user if correct email and password
      // here passport will assigne user to req.user
      return done(null, user);
    });
  });
});

// create JWT strategy for logging in a user given a token
// payload will be what's contained in the jwt.encode() call
// in controllers/authentication.js
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
  // see if the user ID in the payload exists in our database.
  // If it does, call 'done' with that,
  // otherwise, call done without a user object (user not valid)
  User.findById(payload.sub, function(err, user) {
    // search failed to occur
    if (err) { return done(err, false); }

    if (user) {
      // here passport will assigne user to req.user
      done(null, user);
    } else {
      // no user
      done(null, false);
    }
  });
});

// Tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);
