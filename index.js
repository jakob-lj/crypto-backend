const express = require('express');

const app = express();
const mongoose = require('mongoose');

require('./app');
const User = mongoose.model('User');

const passport = require('passport');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.post("/login", passport.authenticate('local', {failureRedirect: '/fail',
  session: false}), function(req, res) {
    response = {
      'token':req.user.getToken(),
    }
    res.status(202).send(JSON.stringify(response));
});

app.get("/fail", (req, res) => {
  res.send("fail");
});

app.get("/", (req, res) => {
  res.send("welcome");
})


app.post("/insert", (req, res) => {
  // for testing with mongo
  var u = new User();
  u.buildUser({username:req.body.username, password:req.body.password});
  u.save();
  res.send("Inserted as " + u.name);
});

// method for testing
app.get("/jsontoken", passport.authenticate('jwt', { session: false }), (req, res) => {
  res.status(202).send("Hey " + req.user.username);
});

app.post("/user", passport.authenticate('jwt', { session: false }), (req, res) => {
  var response;
  User.findOne({username:req.user.username}, function(err, user) {
    if (err == null) {
      return user;
    }
    return null;
  }).then((user) => {
    resultUser = {};
    resultUser.username = user.username;
    console.log(resultUser);

    res.send(JSON.stringify(resultUser));
  }).catch(() => {
    res.sendStatus(403);
  });
});

app.listen(8080, () => {
  console.log("Listening on 8080");
});
