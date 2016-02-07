'use strict';

var pmx = require('pmx');

/**
 * @param {DubAPI} bot
 * */
function keymetrics(bot) {
    var probe = pmx.probe();
    pmx.action('send:Chat', function (param, reply) {
        bot.sendChat(param);
        reply({success: true});
    });
    var meter = probe.metric({
        name: 'Realtime user',
        value: function () {
            return bot.getUsers().length;
        }
    });
}

exports.keymetrics = keymetrics;
