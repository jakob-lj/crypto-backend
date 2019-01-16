const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const user = require('./User').userScheme;
const RegionSchema = new Schema({
  name:String,
  user: [user] 
});

mongoose.model('Region', RegionSchema);
