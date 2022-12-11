const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/Sky');
mongoose.Promise = global.Promise;

module.exports = mongoose;