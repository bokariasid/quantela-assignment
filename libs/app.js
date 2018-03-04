const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('passport');
const bytes = require('bytes');
const methodOverride = require('method-override');

const libs = process.cwd() + '/libs/';
require(libs + 'auth/auth');

const config = require('./config');
const log = require('./log')(module);
var oauth2 = require('./auth/oauth2');

var api = require('./routes/api');
var users = require('./routes/users');
var os_details = require('./routes/os_details');

var app = express();
app.use(express.static(__dirname+'/client'))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(methodOverride());
app.use(passport.initialize());

// app.use('/', );
app.get('/', function (req,res){
    res.sendFile(__dirname + "/client/index.html");
});
// app.use('/', api);
app.use('/api/oauth/token', oauth2.token);
app.use('/api', passport.authenticate('bearer', { session: false }), api);
app.use('/api/users', passport.authenticate('bearer', { session: false }), users);
app.use('/api/os_details', passport.authenticate('bearer', { session: false }), os_details);

// catch 404 and forward to error handler
app.use(function(req, res, next){
    res.status(404);
    log.debug('%s %d %s', req.method, res.statusCode, req.url);
    res.json({
    	error: 'Not found'
    });
    return;
});

// error handlers
app.use(function(err, req, res, next){
    res.status(err.status || 500);
    log.error('%s %d %s', req.method, res.statusCode, err.message);
    res.json({
    	error: err.message
    });
    return;
});

module.exports = app;