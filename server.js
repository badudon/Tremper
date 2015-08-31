// Init modules
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
var path = require("path");

// Loads server data module
var data = require('./data.js');

// Refer static requests to web folder
app.use('/web', express.static('web'));

// Basic GET request to root - returns homepage
app.get('/', function(req, res) {
    res.redirect('/web/main.html');
});

// Information pages
app.get('/heroku.html', function(req, res) {
    res.sendFile(path.join(__dirname + '/heroku.html'));
});
app.get('/help.html', function(req, res) {
    res.sendFile(path.join(__dirname + '/help.html'));
});
app.get('/partners.html', function(req, res) {
    res.sendFile(path.join(__dirname + '/partners.html'));
});

// List GET request
app.get('/getTrempers', function (req, res) {
    data.getTrempers(function(err, data) {
        err ? res.status(500).json(err) : res.json(data);
    });
});
app.get('/getTrempists', function (req, res) {
    data.getTrempists(function(err, data) {
        err ? res.status(500).json(err) : res.json(data);
    });
});

// POST requests
app.post('/newTremper',function(req, res) {
    data.addTremper(req.body, function (err) {
        console.log(req.body);
        err ? res.status(500).json(err) : res.sendStatus(200);
    });
});
app.post('/newTrempist',function(req, res){
    data.addTrempist(req.body, function(err) {
        err ? res.status(500).json(err) : res.sendStatus(200);
    });
});

// Delete requests
app.post('/deleteTremper', function (req, res) {
    data.deleteTremper(req.body, function(err) {
        err ? res.status(500).json(err) : res.sendStatus(200);
    });
});
app.post('/deleteTrempist', function (req, res) {
    data.deleteTrempist(req.body, function(err) {
        err ? res.status(500).json(err) : res.sendStatus(200);
    });
});

// 404 handling
app.use(function(req, res) {
    res.status(404).send('<h2>404: Page "' + req.path + '" doesn\'t exist</h2><br><a href="/">Go to Tremper</a>');
});

// Set port and listen
app.set('port', (process.env.PORT || 3000));
app.listen(app.get('port'), function() {
    console.log('Tremper server is running on port:', app.get('port'));
});