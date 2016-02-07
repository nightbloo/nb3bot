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

function getAuthorizationUrl() {
    return twitch.getAuthorizationUrl();
}

function getChannelSubscriptionOfUser(user, accessToken, callback) {
    twitch.getChannelSubscriptionOfUser(user, 'Nightblue3', accessToken, callback);
}

function getStream(callback) {
    twitch._executeRequest({
            method: 'GET',
            path: '/streams/' + 'Nightblue3'
        },
        callback
    );
}

function getThisUser(accessToken, callback) {
    twitch.getAuthenticatedUser(accessToken, callback);
}

exports.getAuthorizationUrl = getAuthorizationUrl;
exports.getChannelSubscriptionOfUser = getChannelSubscriptionOfUser;
exports.getStream = getStream;
exports.getThisUser = getThisUser;
