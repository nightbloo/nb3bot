'use strict';

// load .env settings
require('dotenv').load();
// setup file reader
var read = require('fs').readFileSync;
// setup web server
var express = require('express'),
    http = require('http'),
    https = require('https');
var app = express();
// Twitch and redis mans
var twitchManager = require('./lib/twitchManager.js');
var redisManager = require('./lib/redisManager.js');


app.get("/auth/twitch/", function(req, res) {
    if (req.query.code && req.query.scope) {
        twitchManager.getUserSubscriptionToChannel('user', 'Nightblue3', req.query.code, function(err, body) {
            console.log(err);
            console.log(body);
        });
    }
    else {
        res.redirect(twitchManager.getAuthorizationUrl());
    }
});

var httpServer = http.createServer(app);
var httpsServer = https.createServer({
    key: read(process.env.HTTPS_KEY),
    cert: read(process.env.HTTPS_CERT),
    ca: [
        read(process.env.HTTPS_CA)
    ]

}, app);
httpServer.listen(80);
httpsServer.listen(443);
