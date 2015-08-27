var fs = require('fs');

var trempers = [
    {
        "name" : "Moshe Cohen",
        "gender" : "Male",
        "phone" : "0525556669",
        "from" : "Tel Aviv",
        "to" : "IDC",
        "details" : "Got 2 seats available",
        "type" : 'tremper',
        date: '2015-09-15T09:00:45.414Z',
        time: '2015-09-15T09:00:00.000Z'
    },
    {
        "name" : "Shira Choen",
        "gender" : "Female",
        "phone" : "0528556669",
        "from" : "IDC",
        "to" : "Yaffo",
        "details" : "Through Tel-Aviv",
        "type" : 'tremper',
        date: '2015-09-14T19:33:45.414Z',
        time: '2015-09-14T18:00:00.000Z'
    },
    {
        "name" : "Israel Israeli",
        "gender" : "Male",
        "phone" : "0528556669",
        "from" : "Herzliya",
        "to" : "Netanya",
        "details" : "",
        "type" : 'tremper',
        date: '2015-09-13T19:33:45.414Z',
        time: '2015-09-13T12:00:00.000Z'
    }
];

var trempists = [
    {
        "name" : "Rachel Levy",
        "gender" : "Female",
        "phone" : "0596664445",
        "from" : "Tel Aviv",
        "to" : "IDC",
        "details" : "Thank you!!",
        "type" : 'trempist',
        date: '2015-09-15T09:00:45.414Z',
        time: '2015-09-15T08:00:00.000Z'
    },
    {
        "name" : "Noa M.",
        "gender" : "Female",
        "phone" : "055669969",
        "from" : "Holon",
        "to" : "IDC",
        "details" : "",
        "type" : 'trempist',
        date: '2015-09-12T19:33:45.414Z',
        time: '2015-09-12T10:00:00.000Z'
    },
    {
        "name" : "Israel K.",
        "gender" : "Male",
        "phone" : "0528999669",
        "from" : "Ramat Gan",
        "to" : "Netanya",
        "details" : "",
        "type" : 'trempist',
        date: '2015-09-13T19:33:45.414Z',
        time: '2015-09-13T15:00:00.000Z'
    }
];

module.exports = {
    getTrempers:function(){
        return trempers;
    },
    getTrempists:function(){
        return trempists;
    },

    addTremper:function(object){
        trempers.push(object);
        return trempers;
    },
    addTrempist: function(object){
        trempists.push(object);
        return trempists;
    },
    //backup: function(num) {
    //    fs.open('backup/trempers'+num+'.txt', 'w', function(err, fd) {
    //        if (err) {
    //            return err;
    //        }
    //        fs.write(fd, JSON.stringify(trempers));
    //    });
    //    fs.open('backup/trempists' + num +'.txt', 'w', function(err, fd) {
    //        if (err) {
    //            return err;
    //        }
    //        fs.write(fd, JSON.stringify(trempists));
    //    });
    //},

    deleteTremper:function(obj) {
        for (var i in trempers) {
            if (trempers[i].time == obj.time && trempers[i].name == obj.name) {
                trempers.splice(i, 1);
                return;
            }
        }
    },
    deleteTrempist:function(obj) {
        for (var i in trempists) {
            if (trempists[i].time == obj.time && trempists[i].name == obj.name) {
                trempists.splice(i, 1);
                return;
            }
        }
    }
};

// Garbage collector
var clean = function() {

    // Set system time
    var date = new Date();

    for (var i in trempers) {
        if ((new Date(trempers[i].time)) < date) {
            trempers.splice(i, 1);
        }
    }
    for (var i in trempists) {
        if ((new Date(trempists[i].time)) < date) {
            trempists.splice(i, 1);
        }
    }

    // 900000 MS = 15 minutes
    setTimeout(clean, 900000);
}
setTimeout(clean, 900000);