var mongoose = require('mongoose');
var config = require('./config.js');
mongoose.connect(config.mongodb);

const db = mongoose.connection;

module.exports = db;