const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/my_database');

// all schemas before passport
require('./Models/User');
require('./Models/Regions')

require("./passport");
