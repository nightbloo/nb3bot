'use strict';

var BotUtils = function (bot) {
    this.bot = bot;
    return this;
};

function timePunish(user, time, message, type, bot) {
    var residentDJRoleId = bot.roles['resident-dj'].id;
    var wasResidentDJ = false;

    function doPunish() {
        function giveResidentDJBack() {
            if (wasResidentDJ) {
                bot.moderateSetRole(user.id, residentDJRoleId);
                console.log('setting resident-dj back to user ' + user.username + ' (' + user.id + ') to ' + type);
            }
        }

        switch (type) {
            default:
                return;
            case 'ban':
                bot.moderateBanUser(user.id, time, giveResidentDJBack);
                break;
            case 'mute':
                bot.moderateMuteUser(user.id, giveResidentDJBack);
                setTimeout(function () {
                    bot.moderateUnmuteUser(user.id);
                }, time * 60000); // minutes to milliseconds
                break;
        }
        if (typeof (message) === 'string') {
            bot.sendChat(message);
        }
    }

    if (bot.isResidentDJ(user)) {
        wasResidentDJ = true;
        // In case a crash happens, know if we need to give resident-dj back to user by looking at the logs
        console.log('un-setting resident-dj to user ' + user.username + ' (' + user.id + ') to ' + type);
        bot.moderateUnsetRole(user.id, residentDJRoleId, doPunish);
    } else {
        doPunish();
    }
}

BotUtils.prototype.timeMute = function (user, time, message) {
    timePunish(user, time, message, 'mute', this.bot);
};

BotUtils.prototype.timeBan = function (user, time, message) {
    timePunish(user, time, message, 'ban', this.bot);
};

BotUtils.prototype.clearUserChat = function (user) {
    var chatHistory = this.bot.getChatHistory();
    var arrayLength = chatHistory.length;
    for (var i = 0; i < arrayLength; i++) {
        if (user.id == chatHistory[i].user.id) {
            this.bot.moderateDeleteChat(chatHistory[i].id);
        }
    }
};

BotUtils.prototype.timeoutUser = function (user, time, message) {
    this.clearUserChat(user);
    this.timeMute(user, time, message)
};

module.exports = BotUtils;
