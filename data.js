// Init database
var Datastore = require('nedb');
db = {};
db.trempists = new Datastore({filename: './data/trempists.db', autoload: true });
db.trempers = new Datastore({filename: './data/trempers.db', autoload: true });

// Module functions to call from server
module.exports = {
    getTrempers: function (callback) {
        db.trempers.find({}, function (err, docs) {
            callback(err, docs);
        });
    },
    getTrempists: function (callback) {
        db.trempists.find({}, function (err, docs) {
            callback(err, docs);
        });
    },
    addTremper: function (data, callback) {
        db.trempers.insert(data, function (err) {
            callback(err);
        });
    },
    addTrempist: function (data, callback) {
        db.trempists.insert(data, function (err) {
            callback(err);
        });
    },
    deleteTremper: function (data, callback) {
        db.trempers.remove({_id: data._id}, {}, function (err, numRemoved) {
            callback(err);
        });
    },
    deleteTrempist: function (data, callback) {
        db.trempists.remove({_id: data._id}, {}, function (err, numRemoved) {
            callback(err);
        });
    }
};

// Garbage collector
var clean = function() {

    // Set system time
    var date = new Date();

    db.trempers.find({}, function (err, docs) {
        if (err) return;
        var trempers = docs;
        for (var i in trempers) {
            if ((new Date(trempers[i].time)) < date) {
                db.trempers.remove({ _id: trempers[i]._id }, {});
            }
        }
    });

    db.trempists.find({}, function (err, docs) {
        if (err) return;
        var trempists = docs;
        for (var i in trempists) {
            if ((new Date(trempists[i].time)) < date) {
                db.trempists.remove({ _id: trempists[i]._id }, {});
            }
        }
    });

    // 1800000 MS = 30 minutes
    setTimeout(clean, 1800000);
}
setTimeout(clean, 1800000);