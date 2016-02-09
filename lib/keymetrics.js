'use strict';

var pmx = require('pmx');
var fs = require('fs');

/**
 * @param {DubAPI} bot
 * */
function keymetrics(bot) {
    var probe = pmx.probe();
    pmx.action('send:Chat', function (param, reply) {
        if(!param || param.length === 0) return;
        bot.sendChat(param);
        reply({success: true});
    });
    pmx.action('read:ChatLogs', function(reply) {
        fs.readFile('chatlogs.txt', 'utf8', function(err, contents) {
            if(err) reply(err);
            else reply(contents)
        });
    });
    probe.metric({
        name: 'Realtime users',
        value: function () {
            return bot.getUsers().length;
        }
    });
    var chatMin = probe.meter({
        name: 'chat/min',
        samples: 100,
        timeframe: 60
    });
    bot.on(bot.events.chatMessage, function(data) {
        chatMin.mark();
    });
}

exports.keymetrics = keymetrics;
