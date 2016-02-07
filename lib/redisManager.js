'use strict';

var Redis = require('ioredis');

var port = process.env.REDIS_PORT;
var host = process.env.REDIS_HOST;
var family = process.env.REDIS_FAMILY;
var password = process.env.REDIS_PASSWORD;
var db = process.env.REDIS_DB;

if (!port) {
    port = 6379;
}
if (!host) {
    host = '127.0.0.1';
}
if (!family) {
    family = 4;
}
if (!password) {
    password = '';
}
if (!db) {
    db = 0;
}

var redis = new Redis({
    port: port,
    host: host,
    family: family,
    password: password,
    db: db
});

/*
 * Action Logger
 */
function logAction(message) {
    // TODO
}

/*
 * Song Data Sets
 */
var songName = 'song';

// History
// Song fkid => latest timestamp
function genLastSongTimeName(fkid) {
    return songName + ':' + fkid + ':lastPlayed';
}
function setLastSongTime(fkid, timestamp) {
    // Expire after 5 weeks
    redis.set(genLastSongTimeName(fkid), timestamp, "EX", 126000);
}
function getLastSongTime(fkid, callback) {
    redis.get(genLastSongTimeName(fkid), function (err, result) {
        if (err) {
            console.error(err);
            return;
        }
        callback(result);
    });
}
exports.setLastSongTime = setLastSongTime;
exports.getLastSongTime = getLastSongTime;

// Last Song key => Song fkid
function genLastSongTime() {
    return songName + ':lastPlayed';
}
function setLastSong(fkid) {
    redis.set(genLastSongTime(), fkid);
}
function getLastSong(callback) {
    redis.get(genLastSongTime(), function (err, result) {
        if (err) {
            console.error(err);
            return;
        }
        callback(result);
    });
}
exports.setLastSong = setLastSong;
exports.getLastSong = getLastSong;

/*
 * User Data Sets
 */
var userName = 'user';

// Love
// Dubtrack Account => Love score
function genUserLoveName(userId) {
    return userName + ':' + userId + ':love';
}
function setLove(userId, love) {
    redis.set(genUserLoveName(userId), love);
}
function getLove(userId, callback) {
    redis.get(genUserLoveName(userId), function (err, result) {
        if (err) {
            console.error(err);
            return;
        }
        callback(result);
    });
}
exports.setLove = setLove;
exports.getLove = getLove;

// Props
// Dubtrack Account => Props score
function genUserPropsName(userId) {
    return userName + ':' + userId + ':props';
}
function setProps(userId, props) {
    redis.set(genUserPropsName(userId), props);
}
function getProps(userId, callback) {
    redis.get(genUserPropsName(userId), function (err, result) {
        if (err) {
            console.error(err);
            return;
        }
        callback(result);
    });
}
exports.setProps = setProps;
exports.getProps = getProps;

// ------ Twitch - Dubtrack ------ START

// Twitch Dub Data Set
// Dubtrack Account => Twitch Account
function genUserTwitchIdName(userId) {
    return userName + ':' + userId + ':twitch:id';
}
function setTwitch(userId, twitchUserId) {
    redis.set(genUserTwitchIdName(userId), twitchUserId);
}
function getTwitch(userId, callback) {
    redis.get(genUserTwitchIdName(userId), function (err, result) {
        if (err) {
            console.error(err);
            return;
        }
        callback(result);
    });
}
exports.setTwitch = setTwitch;
exports.getTwitch = getTwitch;

// Twitch Dub Key Sets
// Auth Key => Twitch account
function genTwitchAuthKeyName(key) {
    return userName + 'twitch:auth:key:' + key + ':id';
}
function setTwitchAuthKey(key, twitchUserId) {
    redis.set(genTwitchAuthKeyName(key), twitchUserId);
}
function getTwitchAuthKey(key, callback) {
    redis.get(genTwitchAuthKeyName(key), function (err, result) {
        if (err) {
            console.error(err);
            return;
        }
        callback(result);
    });
}
exports.setTwitchAuthKey = setTwitchAuthKey;
exports.getTwitchAuthKey = getTwitchAuthKey;

// Twitch Sub Set
// Twitch Account => is Sub
function genTwitchSubName(twitchUserId) {
    return userName + ':twitch:id' + twitchUserId + ':sub';
}
function setTwitchSub(twitchUserId, bool) {
    redis.set(genTwitchSubName(twitchUserId), bool);
}
function getTwitchSub(twitchUserId, callback) {
    redis.get(genTwitchSubName(twitchUserId), function (err, result) {
        if (err) {
            console.error(err);
            return;
        }
        callback(result);
    });
}
exports.setTwitchSub = setTwitchSub;
exports.getTwitchSub = getTwitchSub;

// Twitch Dub Key Sets
// Auth Key => Dubtrack account
function genTwitchDubAuthKeyName(key) {
    return userName + 'twitch:auth:key:' + key + ':dub';
}
function setTwitchDubAuthKey(key, userId) {
    redis.set(genTwitchDubAuthKeyName(key), userId);
}
function getTwitchDubAuthKey(key, callback) {
    redis.get(genTwitchDubAuthKeyName(key), function (err, result) {
        if (err) {
            console.error(err);
            return;
        }
        callback(result);
    });
}
exports.setTwitchDubAuthKey = setTwitchDubAuthKey;
exports.getTwitchDubAuthKey = getTwitchDubAuthKey;

// ------ Twitch - Dubtrack ------ END
