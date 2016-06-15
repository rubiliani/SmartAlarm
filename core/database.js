var mongoose = require('mongoose')
    , fs = require('fs')
    , models_path = process.cwd() + '/models';


fs.readdirSync(models_path).forEach(function (file) {
    if (~file.indexOf('.js'))
        require(models_path + '/' + file)
});


mongoose.connect("mongodb://dbuser:dbpass@ds013664.mlab.com:13664/heroku_km81fpds");
var db = mongoose.connection;

db.on('error', function (err) {
    console.error('MongoDB connection error:', err);
});
db.once('open', function callback() {
    console.info('MongoDB connection is established');
});
db.on('disconnected', function() {
    console.error('MongoDB disconnected!');
    mongoose.connect("mongodb://dbuser:dbpass@ds013664.mlab.com:13664/heroku_km81fpds");
});
db.on('reconnected', function () {
    console.info('MongoDB reconnected!');
});
