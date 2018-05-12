var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect( "mongodb://amit:amit@ds119060.mlab.com:19060/parking_amit", { useMongoClient: true });

module.exports = {mongoose};
