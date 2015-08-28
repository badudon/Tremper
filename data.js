// init database
var Datastore = require('nedb');
db = {};
db.trempists = new Datastore({filename: 'data/trempists.db', autoload: true });
db.trempers = new Datastore({filename: 'data/trempers.db', autoload: true });

// module functions to call from server
module.exports = {
    getTrempers: function (callback) {
        db.trempers.find({}, function (err, docs) {
            callback(err, docs);
        });
    },
    getTrempists: function (callback) {
        db.trempists.find({}, function (err, docs) {
            //console.log("sending data to server")
            callback(err, docs);
        });
    },
    addTremper: function (object, callback) {
        db.trempers.insert(object, function (err) {
            callback(err);
        });
        //trempers.push(object);
        //return trempers;
    },
    addTrempist: function (object, callback) {
        db.trempists.insert(object, function (err) {
            callback(err);
        });
        //trempists.push(object);
        //return trempists;
    },
    deleteTremper: function (obj, callback) {
        db.trempers.remove({_id: obj._id}, {}, function (err, numRemoved) {
            callback(err);
        });
    },
    deleteTrempist: function (obj, callback) {
        db.trempists.remove({_id: obj._id}, {}, function (err, numRemoved) {
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

    // 900000 MS = 15 minutes
    setTimeout(clean, 900000);
}
setTimeout(clean, 900000);