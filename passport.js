const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('User');

var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
var opts = {}
//opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
//opts.jwtFromRequest = function() { return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjM2Y1Njg5MWZkMzA4OThiMGU1ODFjMiIsInVzZXJuYW1lIjoiTWFydGhlIiwiaWF0IjoxNTQ3NjY0MjA5fQ.MkTCxF-VnB4t-xqrEd2zfPUsaJo2ZQ2b8dGSfbRvDOw" };
opts.jwtFromRequest = function(req) {
  var auth = req.headers.authorization;
  if (auth == null) return "";
  var token = auth.split(" ")[1];
  return token;
}
opts.secretOrKey = 'secret'; // change secret
// opts.issuer = 'accounts.examplesoft.com';
// opts.audience = 'localhost';
passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
  User.findOne({_id: jwt_payload.id}, function(err, user) {
      if (err) {
          return done(err, false);
      }
      if (user) {
          return done(null, user);
      } else {
          return done(null, false);
          // or you could create a new account
      }
  });
}));

var LocalStrategy = require('passport-local');
passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      //!user.verifyPassword(password)
      if (!user.verifyPassword(password)) { return done(null, false); }
      return done(null, user);
      //console.log("done user");
    });
  }
));
