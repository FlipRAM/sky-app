const mongoose = require('mongoose');

mongoose.connect('mongodb://mongodb:27017/Sky', { useMongoClient: true });
mongoose.Promise = global.Promise;

module.exports = mongoose;