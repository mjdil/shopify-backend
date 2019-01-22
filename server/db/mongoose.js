var mongoose = require('mongoose');
// over here we are using the built in promise library for our mongoose ORM
mongoose.Promise = global.Promise;
// over here I am connecting to a running mongo server that was on my local machine
mongoose.connect('mongodb://localhost:27017/Shop');

module.exports = {mongoose};
