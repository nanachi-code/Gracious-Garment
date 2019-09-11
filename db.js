const mongoose = require('mongoose');
const uri = 'mongodb+srv://nanachi:dvuomega12@database-dbbcs.mongodb.net/test?retryWrites=true&w=majority';
let _db;

module.exports = {
    connect: function (callback) {
        mongoose.connect(uri, {
            keepAlive: true,
            keepAliveInitialDelay: 300000,
            useNewUrlParser: true
        });

        var db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', function () {
            // we're connected!
        });
    },
}