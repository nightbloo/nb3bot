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
// crypto
var crypto = require('crypto');
// Twitch and redis mans
var twitchManager = require('./lib/twitchManager.js');
var redisManager = require('./lib/redisManager.js');

app.get('/auth/twitch/', function (req, res) {
    if (req.query.code && req.query.scope) {
        var accessToken = req.query.code;
        twitchManager.getThisUser(accessToken, function (err, body) {
            if (err) {
                console.error(err);
                res.send("An error happened!");
                return;
            }
            if (body) {
                // ok we know that they have token and a name
                var user = body.display_name;
                var key = crypto.createHash('md5').update(user).digest('hex');
                redisManager.getTwitchAuthKey(key, function (err, result) {
                    if (err) {
                        console.error(err);
                        res.send("An error happened!");
                        return;
                    }
                    // see if we need to save this key.
                    if (!result) {
                        redisManager.setTwitchAuthKey(key, user);
                    }
                    res.send('Use "!twitchlink ' + key + '" in the dubtrack chat to get link your dubtrack to your twitch.');
                    // See if they are a sub
                    twitchManager.getChannelSubscriptionOfUser(user, accessToken, function (err, body2) {
                        if (err && err.status == 404) {
                            res.send("You are not a twitch sub!");
                        }
                        else if (err) {
                            console.error(err);
                        }
                        if (body2) {
                            res.send("Your a Twitch sub! When you use the !twitchlink command it will make any needed change.");
                            res.send('Just note if you have a staff role as it is it will not change your role');
                            redisManager.setTwitchSub(user, true);
                        }
                        res.end();
                    });
                });
            }
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
