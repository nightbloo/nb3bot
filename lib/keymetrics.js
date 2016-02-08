'use strict';

var pmx = require('pmx');
var fs = require('fs');

/**
 * @param {DubAPI} bot
 * */
function keymetrics(bot) {
    var probe = pmx.probe();
    pmx.action('send:Chat', function (param, reply) {
        bot.sendChat(param);
        reply({success: true});
    });
    pmx.action('read:ChatLogs', function(reply) {
        fs.readFile('../chatlogs.txt', 'utf8', function(err, contents) {
            if(err) reply(err);
            else reply(contents)
        });
    });
    var meter = probe.metric({
        name: 'Realtime user',
        value: function () {
            return bot.getUsers().length;
        }
    });
}

exports.keymetrics = keymetrics;
