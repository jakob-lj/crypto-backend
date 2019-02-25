const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const crypto = require('crypto')
const jwt = require("jsonwebtoken");
const UserSchema = new Schema({
  username: String,
  hash: String,
  salt: String
});

UserSchema.methods.buildUser = function(user) {
  this.username = user.username;
  this.setPass(user.password);
}

UserSchema.methods.setPass = function(pass) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(pass, this.salt, 10000, 512, 'sha512').toString('hex');
}

UserSchema.methods.verifyPassword = function(pass) {
  var hash = crypto.pbkdf2Sync(pass, this.salt, 10000, 512, 'sha512').toString('hex');
  return this.hash === hash;
}

UserSchema.methods.getToken = function() {
  return jwt.sign({id: this._id, username:this.username}, 'secret');
}

mongoose.model('User', UserSchema);
exports.userScheme = UserSchema;
