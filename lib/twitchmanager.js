'use strict';

var clientId = process.env.TWITCH_CLIENT_ID;
var clientSecret = process.env.TWITCH_CLIENT_SECRET;
var redirectUri = process.env.TWITCH_REDIRECT_URL;
var scopes = ['user_subscriptions'];

var TwitchApi = require('twitch-api');
var twitch = new TwitchApi({
    clientId: clientId,
    clientSecret: clientSecret,
    redirectUri: redirectUri,
    scopes: scopes
});

function getAuthorizationUrl() {
    return twitch.getAuthorizationUrl();
}

function getUserSubscriptionToChannel(user, accessToken, callback) {
    return twitch.getUserSubscriptionToChannel(user, 'Nightblue3', accessToken, callback);
}

function getStream(callback) {
    twitch._executeRequest({
        method: 'GET',
        path: '/streams/' + 'Nightblue3'
    },
        callback
    );
}

exports.getAuthorizationUrl = getAuthorizationUrl;
exports.getUserSubscriptionToChannel = getUserSubscriptionToChannel;
exports.getStream = getStream;
