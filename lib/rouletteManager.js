'use strict';

/**
 * @param {RedisManager} redisManager
 * @param {object} settingsManager
 * @param {DubAPI} BOT
 * @constructor
 */
var RouletteManager = function (redisManager, settingsManager, BOT) {
    this.started = false;
    this.listedUsers = [];
    this.redisManager = redisManager;
    this.settingsManager = settingsManager;
    this.BOT = BOT;
};

RouletteManager.prototype.addUser = function (userId) {
    if (this.started && !this.listedUsers.contains(userId)) {
        this.redisManager.decPropsBy(userId, parseInt(this.settingsManager.getRoulettePrice()));
        this.listedUsers.push(userId);
        return true;
    }
    return false;
};

function end(whatIsThis) {
    whatIsThis.started = false;
    whatIsThis.listedUsers.length = 0;
    whatIsThis.redisManager.setLastRouletteTimestamp();
}
RouletteManager.prototype.start = function (duration, onEnd) {
    duration = duration || this.settingsManager.getRouletteDuration();
    if (this.started) {
        return false;
    }
    this.started = setTimeout(function () {
        end(this);
        onEnd.call(
            undefined,
            this.listedUsers.length <= 1,
            this.listedUsers[Math.dice(this.listedUsers.length)],
            Math.dice(0, this.BOT.getQueue().length)
        );
    }.bind(this), duration * 1000);
    return true;
};

RouletteManager.prototype.forceStop = function () {
    if (!this.started) {
        return false;
    }
    clearTimeout(this.started);
    end(this);
    return true;
};

module.exports = RouletteManager;