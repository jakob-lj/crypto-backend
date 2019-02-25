const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/crypto_database');

// all schemas before passport
require('./Models/User');

require("./passport");
