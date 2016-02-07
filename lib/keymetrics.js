'use strict';

var pmx = require('pmx');

/**
 * @param {DubAPI} bot
 * */
function keymetrics(bot) {
    var probe = pmx.probe();

    pmx.action('send:Chat', function (param ,reply) {
        bot.sendChat(param);
        reply({success: true});
    });

    var meter = probe.meter({
        name      : 'users/minute',
        samples   : 1,
        timeframe : 6000
    });
    bot.on(bot.events.userJoin, function (data) {
        meter.mark(bot.getUsers().length);
    });
    bot.on(bot.events.userLeave, function (data) {
        meter.mark(bot.getUsers().length);
    });
}

exports.keymetrics = keymetrics;
