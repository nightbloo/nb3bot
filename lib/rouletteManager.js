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
        var error = false,
            winnerId = this.listedUsers[Math.dice(this.listedUsers.length)],
            oldSpot = this.BOT.getQueuePosition(winnerId),
            newSpot;

        if(this.listedUsers.length > 0) {
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

            var logVariables = function() {
                console.error(
                    'newSpot=' + newSpot,
                    'oldSpot=' + oldSpot,
                    'change=' + change,
                    'lower=' + lower,
                    'tries=' + tries,
                    'queueLength=' + queueLength,
                    'winnerId=' + winnerId,
                    'error=' + error
                );
            };

            if(newSpot < 0) {
                console.error('Uh oh, roulette returned number below 0 (' + newSpot + ')');
                logVariables();
                error = 'spot-lower-than-zero';
            }
            if(newSpot >= queueLength) {
                console.error('Uh oh, roulette returned number above queueLength (' + newSpot + ')');
                logVariables();
                error = 'spot-higher-than-queue-length';
            }
        } else {
            error = 'not-enough-users';
        }

        end(this);
        onEnd.call(
            undefined,
            error,
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