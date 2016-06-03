'use strict';

var fs = require('fs');
var jsonfile = require('jsonfile');

class ChatManager {
}

/**
 * @param {MessageUtils} utils
 * @param {CommandManager} commandManager
 */
ChatManager.prototype.processChat = function (utils, commandManager) {
    // clean that chat!
    cleanChat(utils);
    if (utils.reply.stopping()) {
        // if we are done because of the cleaning stop!
        return;
    }
    // Commands
    // Things that start with ! are commands!
    if (/^!/.test(utils.getMessage())) {
        if (new RegExp('!' + utils.getUserUsername().toLowerCase()).test(utils.getMessage().toLowerCase())) {
            utils.bot.sendChat('@' + utils.getUserUsername() + ' is awesome!');
            return;
        }
        // !processCommands
        commandManager.processCommand(utils);
        if (utils.reply.stopping()) {
            return;
        }
    }
    if (new RegExp(utils.bot.getSelf().username, 'g').test(utils.getMessage())) {
        commandManager.getUserCooldown(utils, function (onCooldown) {
            if (!onCooldown) {
                try {
                    botActions(utils);
                }
                catch (err) {
                    console.error(err);
                }
                if (utils.reply.stopping()) {
                    commandManager.setUserOnCooldown(utils);
                    return;
                }
            }
        });
    }
    // Actions
};

var imageRemovalQueue = [];
ChatManager.prototype.removeFromImageRemovalQueue = function (id) {
    var index = imageRemovalQueue.indexOf(id);
    if (index === -1) {
        return;
    }
    imageRemovalQueue.splice(index, 1);
};

/**
 * @param {MessageUtils} utils
 */
// This is temp will be replaced with a manager if I find the time
function botActions(utils) {
    if (utils.getMessage().toLowerCase().indexOf("are you real") != -1) {
        utils.bot.sendChat("@" + utils.getUserUsername() + " yes I am real.");
        utils.reply.stop();
        return;
    }
    // yes
    if (utils.getMessage().toLowerCase().indexOf("are you human") != -1) {
        utils.bot.sendChat("@" + utils.getUserUsername() + " no, I'm a robot with AI functionality.");
        utils.reply.stop();
        return;
    }
    // yes
    if (utils.getMessage().toLowerCase().indexOf("are you a fan of nightblue3") != -1) {
        utils.bot.sendChat("@" + utils.getUserUsername() + " I love NB3 <3!");
        utils.reply.stop();
        return;
    }
    // yes
    if (utils.getMessage().toLowerCase().indexOf("how old are you") != -1) {
        utils.bot.sendChat("Well, @" + utils.getUserUsername() + ", I've currently been running for " + utils.getRuntimeMessage().replace(" ago", "") + ".");
        utils.reply.stop();
        return;
    }
    // yes
    if (utils.getMessage().toLowerCase().indexOf("gender") != -1) {
        utils.bot.sendChat("@" + utils.getUserUsername() + " I am a female");
        utils.reply.stop();
        return;
    }
    if (utils.getMessage().toLowerCase().indexOf("cat me please") != -1) {
        if (!utils.bot.hasPermission(utils.getUser(), 'set-dj')) {
            return;
        }
        utils.bot.sendChat("@" + utils.getUserUsername() + " :nb3three: http://i.imgur.com/FmbuPNe.jpg");
        utils.reply.stop();
        return;
    }
    if (utils.getMessage().toLowerCase().indexOf("doge me please") != -1) {
        if (!utils.bot.hasPermission(utils.getUser(), 'set-dj')) {
            return;
        }
        utils.bot.sendChat("@" + utils.getUserUsername() + " :frankerz: http://themetapicture.com/pic/images/2015/01/12/cute-dog-wrapped-bed-sleeping.jpg");
        utils.reply.stop();
        return;
    }
    if (utils.getMessage().toLowerCase().indexOf("o/") != -1) {
        utils.bot.sendChat("@" + utils.getUserUsername() + " o/");
        utils.reply.stop();
        return;
    }
    if (/(rock|paper|scissors)/gi.test(utils.getMessage().toLowerCase())) {
        var rps = ['rock', 'paper', 'scissors'];
        utils.bot.sendChat('@' + utils.getUserUsername() + ' ' + rps[Math.dice(rps.length)]);
        utils.reply.stop();
        return;
    }
    // no... wait, yes!
    if (/good (girl|bot)/gi.test(utils.getMessage())) {
        if (!utils.bot.hasPermission(utils.getUser(), 'set-dj')) {
            return;
        }
        utils.bot.sendChat("@" + utils.getUserUsername() + " http://i.imgur.com/zfzNR0d.png");
        utils.reply.stop();
        return;
    }
}

/**
 * @param {MessageUtils} utils
 */
function cleanChat(utils) {
    var cleanFunctions = [
        cleanChatBanPhrases
        ,
        cleanChatImageTimeout
        ,
        cleanChatAdvertisingBan
    ];
    cleanFunctions.forEach(function (chatCleaner) {
        if (utils.reply.continuing()) {
            try {
                chatCleaner(utils);
            }
            catch (err) {
                console.error(err);
            }
        }
    });
}

/**
 * @param {MessageUtils} utils
 */
function cleanChatBanPhrases(utils) {
    var banData = "banphrases.json";
    fs.stat(banData, function (err, stat) {
        var banJSON = jsonfile.readFileSync(banData);
        var phrases = banJSON.banPhrases;

        function checkIfContains(phrase) {
            return utils.getMessage().toLowerCase().indexOf(phrase.toLowerCase()) != -1;
        }

        for (var key in phrases) {
            if (typeof phrases[key] != 'function' && utils.getUserRole() == null) {
                var phrasesList;
                if (Array.isArray(phrases[key].phrase)) {
                    phrasesList = phrases[key].phrase;
                }
                else {
                    phrasesList = [phrases[key].phrase];
                }
                for (var i = 0; i < phrasesList.length; i++) {
                    var phrase = phrasesList[i];
                    if (checkIfContains(' ' + phrase) || checkIfContains(phrase + ' ') || utils.getMessage().toLowerCase() === phrase) {
                        safeRemoveMessage(utils);
                        if (typeof phrases[key].banTime === 'string' && /p|perm|permanent/.test(phrases[key].banTime)) {
                            utils.bot.moderateBanUser(utils.getUserId());
                        }
                        else {
                            utils.bot.moderateBanUser(utils.getUserId(), phrases[key].banTime);
                        }
                        utils.bot.sendChat("User banned. Reason: " + phrases[key].reason);
                        utils.reply.stop();
                        break;
                    }
                }
            }
        }
    });
}

/**
 * @param {MessageUtils} utils
 */
function cleanChatImageTimeout(utils) {
    var re = /(.*)http(s?):\/\/.+\.(gif|png|jpg|jpeg)(.*)/i;
    if (re.test(utils.getMessage().toLowerCase())) {
        if (utils.settingsManager.getImgDubsAmount() >= 0 && utils.settingsManager.getImgRemoveMuteTime() >= 0 && utils.getUser().dubs < utils.settingsManager.getImgDubsAmount()) {
            safeRemoveMessage(utils);
            utils.timeMuteUser(
                utils.settingsManager.getImgRemoveMuteTime(),
                'User muted for ' + utils.settingsManager.getImgRemoveMuteTime() + ' minutes. Reason: Sending Images having less than ' + utils.settingsManager.getImgDubsAmount() + ' dubs.'
            );
            utils.reply.stop();
        }
        if (utils.settingsManager.getImgTime() >= 0) {
            // imageRemovalQueue
            var multiplier = utils.getUserId() == utils.bot.getSelf().id ? 2 : 1;
            var id = utils.getFirstMessageByUser().getId();
            imageRemovalQueue.push(id);
            setTimeout(function () {
                if (imageRemovalQueue.indexOf(id) === -1) {
                    return;
                }
                safeRemoveMessage(utils);
            }, utils.settingsManager.getImgTime() * multiplier * 1000);
        }
    }
}

/**
 * @param {MessageUtils} utils
 */
function cleanChatAdvertisingBan(utils) {
    var advertiseMatch = utils.getMessage().match(/(dubtrack\.fm\/join|plug\.dj)\/(.[^ ]+)/i);
    if (advertiseMatch) {
        if (advertiseMatch[1] !== 'dubtrack.fm/join' && advertiseMatch[2].toLowerCase() !== 'nightblue3') {
            safeRemoveMessage(utils);
            utils.bot.moderateBanUser(utils.getUserId());
            utils.bot.sendChat("User banned. Reason: Advertising another DubTrack room.");
            utils.reply.stop();
        }
    }
}

/**
 * @param {MessageUtils} utils
 */
function safeRemoveMessage(utils) {
    utils.bot.moderateDeleteChat(utils.getFirstMessageByUser().getId());
    utils.bot.moderateDeleteChat(utils.getId()); // fallback in case someone joined while the messages were "mid said"
}

module.exports = ChatManager;
