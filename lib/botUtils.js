'use strict';

var BotUtils = function (bot) {
    this.bot = bot;
    return this;
};

BotUtils.prototype.timeMute = function (user, time, message) {
    var that = this;
    var newTime = time * 60000;
    this.bot.moderateMuteUser(user.id);
    this.bot.sendChat(message);
    setTimeout(function () {
        that.bot.moderateUnmuteUser(user.id);
    }, newTime);
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
