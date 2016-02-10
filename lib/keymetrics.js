'use strict';

var pmx = require('pmx');
var fs = require('fs');

/**
 * @param {DubAPI} bot
 * */
function keymetrics(bot) {
    var probe = pmx.probe();
    pmx.action('send:Chat', function (param, reply) {
        if (!param || param.length === 0) {
            return reply({success: false});
        }
        bot.sendChat(param);
        reply({success: true});
    });
    pmx.action('read:ChatLogs', function (reply) {
        fs.readFile('chatlogs.txt', 'utf8', function (err, contents) {
            if (err) {
                reply(err);
            }
            else {
                reply(contents)
            }
        });
    });
    probe.metric({
        name: 'Realtime users',
        value: function () {
            return bot.getUsers().length;
        }
    });
    var chatMin = probe.counter({
        name: 'chat/min'
    });
    bot.on(bot.events.chatMessage, function (data) {
        chatMin.inc();
        setTimeout(function () {
            chatMin.dec();
        }, 60000);
    });
}

exports.keymetrics = keymetrics;
