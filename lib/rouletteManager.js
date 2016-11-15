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
        this.redisManager.decPropsBy(userId, this.currentPrice);
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
RouletteManager.prototype.start = function (duration, price, onEnd) {
    duration = duration || this.settingsManager.getRouletteDuration();
    this.currentPrice = price || this.settingsManager.getRoulettePrice();
    if (this.started) {
        return false;
    }
    this.started = setTimeout(function () {
        var failed = this.listedUsers.length <= 0,
            winnerId = this.listedUsers[Math.dice(this.listedUsers.length)],
            oldSpot = this.BOT.getQueuePosition(winnerId),
            newSpot;

        {
            var queueLength = this.BOT.getQueue().length,
                change = 0;

            {
                var lower = Math.dice(2) === 0;
                for (var tries = 0; tries < 10 && change === 0; tries++) {
                    if (lower) {
                        change = -Math.dice(queueLength - oldSpot);
                    } else {
                        change = Math.dice(Math.floor(queueLength * .2), oldSpot + 1);
                    }
                }
            }

            newSpot = oldSpot - change;
        }

        end(this);
        onEnd.call(
            undefined,
            failed,
            winnerId,
            oldSpot,
            newSpot
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