var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());

// Loads server data file
var data = require('./data.js');

// Refer static requests to web folder
app.use('/web', express.static('web'));

// Basic GET request - returns homepage
app.get('/', function(req, res) {
    res.redirect('/web/main.html');
});

// Information pages
app.get('/heroku.html', function(req, res) {
    res.redirect('/web/heroku.html');
});
app.get('/help.html', function(req, res) {
    res.redirect('/web/help.html');
});
app.get('/partners.html', function(req, res) {
    res.redirect('/web/partners.html');
});

// Lists GET request
app.get('/getTrempers', function (req, res) {
    console.log("Request for trempersList");
    res.json(data.getTrempers());
});
app.get('/getTrempists', function (req, res) {
    console.log("Request for trempistsList");
    res.json(data.getTrempists());
});

// POST requests
app.post('/newTremper',function(req, res){
    console.log(req.body);
    res.json(data.addTremper(req.body));
});
app.post('/newTrempist',function(req, res){
    console.log(req.body);
    res.json(data.addTrempist(req.body));
});

// Delete requests
app.post('/deleteTremper', function (req, res) {
    console.log("delete request:");
    console.log(req.body);
    data.deleteTremper(req.body);
    res.sendStatus(200);
});
app.post('/deleteTrempist', function (req, res) {
    console.log("delete request:");
    console.log(req.body);
    data.deleteTrempist(req.body);
    res.sendStatus(200);
});

//app.get('/backup/:id/:num', function (req, res) {
//    if (req.params.id == 1234) {
//       data.backup(req.params.num);
//        res.send("OK Admin");
//    } else {
//        res.send("You are not the admin");
//    }
//});

// 404 handling
app.use(function(req, res) {
    res.status(404).send('<h1>Page ' + req.path + ' doesn\'t exist</h1>');
});

// Set port and listen
app.set('port', (process.env.PORT || 80));
app.listen(app.get('port'), function() {
    console.log('Tremper app is running on port', app.get('port'));
});