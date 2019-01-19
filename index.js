const express = require('express');

const app = express();
const mongoose = require('mongoose');

require('./app');
const User = mongoose.model('User');
const Region = mongoose.model('Region');

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

app.get("/usertest", (req, res) => {
  User.find({}, function(err, user) {
    console.log(user);
  });
  console.log();
  console.log();
  res.send("fin");
});

app.post("/insert", (req, res) => {
  //console.log(req.post);
  //res.json(JSON.stringify(req));
  var u = new User();
  //u.name = req.body.name;
  //u.setPass(req.body.password);
  u.buildUser({username:req.body.username, password:req.body.password});
  u.save();
  res.send("Inserted as " + u.name);
});

app.post("/jsontoken", passport.authenticate('jwt', { session: false }), (req, res) => {
  res.sendStatus(202);
});

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


app.get("/region", (req, res) => {
  Region.find({name:"naaame"}, function(err, regions) {
    console.log(regions);
  });
  res.send("hey");
});

app.post("/region", (req, res) => {
  var r = new Region();
  r.name = "naaame";
  r.user = User.findOne({});
  r.save();
  res.send("success");
});


app.get("/get", (req, res) => {
  res.send("heyhey from get");
});

app.listen(8080, () => {
  console.log("Listening on 8080");
});
