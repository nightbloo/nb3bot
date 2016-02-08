'use strict';

var clientId = process.env.TWITCH_CLIENT_ID;
var clientSecret = process.env.TWITCH_CLIENT_SECRET;
var redirectUri = process.env.TWITCH_REDIRECT_URL;
var scopes = ['user_subscriptions', 'user_read'];

var TwitchApi = require('twitch-api');
var twitch = new TwitchApi({
    clientId: clientId,
    clientSecret: clientSecret,
    redirectUri: redirectUri,
    scopes: scopes
});

function getStream(callback) {
    twitch._executeRequest({
            method: 'GET',
            path: '/streams/' + 'Nightblue3'
        },
        callback
    );
}

module.exports = twitch;
module.exports.getStream = getStream;
