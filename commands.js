/*
 **************************************************************************
 * ABOUT
 **************************************************************************
 *
 * Nb3Bot is a bot created for the
 * NightBlue3 room on www.dubtrack.fm
 *
 **************************************************************************
 *
 **************************************************************************
 * DEVELOPERS
 **************************************************************************
 *
 * @ZubOhm
 * @Netux
 * @Matt
 * @DemoZ
 * @Larry1123
 *
 **************************************************************************
 */

var reddit = require('redwrap');
// Random seeds
var seedrandom = require('seed-random');
// Time formatting
var moment = require('moment');
// Request
var httpsReq = require('https').request;
// Cookie command
var cookieDisplay = require('./cookies.json');

function regCommands(commandManager) {
    var Command = commandManager.Command;
    /**
     * @param {CommandManager} commandManager
     */
    [
        new Command('hello', ['hello'], 1, [], [],
            /**
             * @param {MessageUtils} utils
             */
            function (utils) {
                if (Math.dice(50) === 0) {
                    utils.bot.sendChat('@' + utils.getUserUsername() + ' hello...');
                    setTimeout(function () {
                        utils.bot.sendChat('... it\'s me...');
                    }, 4500);
                }
                else {
                    utils.bot.sendChat('Hi There, @' + utils.getUserUsername());
                }
            }
        )
        ,
        new Command('del', ['del'], 1, [], [],
            /**
             * @param {MessageUtils} utils
             */
            function (utils) {
                if (utils.getTargetName()) {
                    utils.bot.sendChat('@' + utils.getUserUsername() + ' ' + utils.getTargetName() + ' has been deleted. *Beep Boop*');
                }
            }
        )
        ,
        new Command('gaben', ['gaben'], 1, [], [],
            /**
             * @param {MessageUtils} utils
             */
            function (utils) {
                reddit.r('gentlemangabers', function (err, data) {
                    if (err != null) {
                        console.log(err);
                    }
                    var children = data.data.children;
                    var random = Math.dice(1, children.length);
                    if (children[random].data.url.indexOf("imgur") > -1) {
                        utils.bot.sendChat(children[random].data.url);
                    }
                });
            }
        )
        ,
        new Command('song', ['song'], 1, [], [],
            /**
             * @param {MessageUtils} utils
             */
            function (utils) {
                utils.bot.sendChat('@' + utils.getUserUsername() + ' The current song is ' + utils.getMediaName() + ', the link is ' + utils.currentMediaPermaLink);
            }
        )
        ,
        new Command('stream', ['stream'], 1, [], [],
            /**
             * @param {MessageUtils} utils
             */
            function (utils) {
                utils.twitchManager.getStream('Nightblue3', function (err, body) {
                    if (err) {
                        console.log(err);
                    }
                    var stream = body.stream;
                    if (stream) {
                        utils.bot.sendChat(stream.channel.display_name + ' is streaming ' + stream.channel.game + '! You can watch him at ' + stream.channel.url + '!');
                        utils.bot.sendChat(stream.preview.small + ' Viewers:' + stream.viewers);
                    }
                    else {
                        utils.bot.sendChat('NightBlue3 is not currently streaming! He streams at https://www.twitch.tv/nightblue3');
                    }
                });
            }
        )
        ,
        new Command('nyancat', ['nyancat'], 1, [], [],
            /**
             * @param {MessageUtils} utils
             */
            function (utils) {
                utils.bot.sendChat(":nyancat: ~ Meow!");
            }
        )
        ,
        // No cooldown because no messages no need to cool this down
        new Command('props', ['props'], 0, [], [],
            /**
             * @param {MessageUtils} utils
             */
            doProps
        )
        ,
        new Command('probs', ['probs'], 0, [], [],
            /**
             * @param {MessageUtils} utils
             */
            function (utils) {
                if (Math.dice(2) !== 1) {
                    utils.bot.sendChat('@' + utils.getUserUsername() + ' probably, but *no*. :shrug:');
                    return;
                }
                doProps(utils);
            }
        )
        ,
        new Command('eta', ['eta'], 1, [], [],
            /**
             * @param {MessageUtils} utils
             */
            function (utils) {
                utils.bot.sendChat(utils.getTargetName() + ' In order to get the ETA Timer, please download the DubX Extension from https://dubx.net/');
                utils.bot.sendChat('https://i.imgur.com/ldj2jqf.png');
            }
        )
        ,
        new Command('myprops', ['myprops'], 1, [], [],
            /**
             * @param {MessageUtils} utils
             */
            function (utils) {
                utils.redisManager.getProps(utils.getUserId(), function (result) {
                    if (result) {
                        var propss = 'prop';
                        if (result > 1) {
                            propss += 's';
                        }
                        utils.bot.sendChat('@' + utils.getUserUsername() + ' you have ' + result + ' ' + propss + '! :)');
                    }
                    else {
                        utils.bot.sendChat('@' + utils.getUserUsername() + ' you don\'t have any props! Play a song to get props! :)');
                    }
                });
            }
        )
        ,
        new Command('mylove', ['mylove'], 1, [], [],
            /**
             * @param {MessageUtils} utils
             */
            function (utils) {
                utils.redisManager.getLove(utils.getUserId(), function (result) {
                    if (result) {
                        utils.bot.sendChat('@' + utils.getUserUsername() + ' you have ' + result + ' hearts! :' + (result <= 0 ? '(' : ')'));
                    }
                    else {
                        utils.bot.sendChat('@' + utils.getUserUsername() + ' you don\'t have any hearts! :(');
                    }
                });
            }
        )
        ,
        new Command('subsunday', ['subsunday'], 1, ['resident-dj'], [],
            /**
             * @param {MessageUtils} utils
             */
            function (utils) {
                utils.bot.sendChat(utils.getTargetName() + ' On Sunday we lock the queue and let only NightBlue3 twitch subs play for the duration of the stream that day.');
                utils.bot.sendChat('You can sub to Nightblue3 https://www.twitch.tv/nightblue3/subscribe');
            }
        )
        ,
        new Command('residentdj', ['sub', 'subs', 'subscribe', 'residentdj', 'rdj', 'resdj'], 1, [], [],
            /**
             * @param {MessageUtils} utils
             */
            function (utils) {
                utils.bot.sendChat(utils.getTargetName() + ' To become a Resident DJ, or find out more information read https://git.io/voXqA');
            }
        )
        ,
        new Command('rules', ['rules'], 0.5, [], [],
            /**
             * @param {MessageUtils} utils
             */
            function (utils) {
                utils.bot.sendChat(utils.getTargetName() + ' Rules: https://git.io/vWJnY');
            }
        )
        ,
        new Command('getrule', ['getrule'], 1, [], [],
            /**
             * @param {MessageUtils} utils
             */
            function (utils) {
                var args;
                var argsLength = utils.getCommandArguments().length;
                var rule = [];
                if (argsLength > 0) {
                    for (var way = argsLength > 1 ? 1 : 0; way >= 0; way--) {
                        args = utils.getCommandArguments().slice(0, argsLength - way).join(' ').toLowerCase();
                        switch (args) { // TODO: Make this into a JSON (?)
                            default:
                                if (way == 0) {
                                    utils.bot.sendChat('@' + utils.getUserUsername() + ' no said rule found. Sending link to rules instead.');
                                }
                                break;
                            case 'aboutstaff':
                            case 'about staff':
                                rule.push("If you respect the staff, ignore warnings or request from staff, or are trying to disrupt the actions of the mods you will be banned from the community permanently.");
                                rule.push("Please PM the staff member you have a disagreement and try to resolve the problem.");
                                break;
                        }
                        if (rule) {
                            break;
                        }
                    }
                }
                if (rule.length <= 0) {
                    rule.push("Rules: https://git.io/vWJnY");
                }
                rule.forEach(function (ru, index) {
                    var target = way == 1 && index === 0 ? utils.getTargetName(utils.getCommandArguments().length) : '';
                    utils.bot.sendChat(target + ' ' + ru);
                });
            }
        )
        ,
        new Command('kappa', ['kappa'], 1, [], [],
            /**
             * @param {MessageUtils} utils
             */
            function (utils) {
                var kappaList = [':Kappa:', ':KappaPride:', ':KappaRoss:', ':Keepo:', ':froKappaK:', ':hoyNyanKappa:', ':kingKappa:', ':lordKappa:', ':ragKappa:', ':kappaI:', ':kappaRoll:', ':blacKappa:', ':kappaEnvy:', ':kappaBlues:', ':kappaPrince:', ':kappaWarmth:', ':kappaYella:', ':sunKappa:', ':yummiKappa:', ':zirkelKappa:', ':buttsKappa:', ':azumiPikappa:', ':Skappa:', 'OfficerKappa'];
                var random = kappaList[Math.dice(kappaList.length)];
                if (utils.getTargetName()) {
                    utils.bot.sendChat(utils.getTargetName() + ' ' + utils.getUserUsername() + ' has sent a Kappa your way! ' + random);
                }
                else {
                    utils.bot.sendChat('@' + utils.getUserUsername() + ' ' + random);
                }
            }
        )
        ,
        new Command('dubx', ['dubx'], 1, [], [],
            /**
             * @param {MessageUtils} utils
             */
            function (utils) {
                utils.bot.sendChat(utils.getTargetName() + ' you can download DubX at https://www.dubx.net');
                utils.bot.sendChat('Follow this guide to help you install DubX! https://git.io/vzCVn');
            }
        )
        ,
        new Command('css', ['css'], 1, [], [],
            /**
             * @param {MessageUtils} utils
             */
            function (utils) {
                utils.bot.sendChat(utils.getTargetName() + ' Fancy css files: https://imgur.com/a/WeXhS');
                utils.bot.sendChat('Custom css chooser: https://goo.gl/Gs6gih');
            }
        )
        ,
        new Command('background', ['bg', 'background', 'backgrounds'], 1, [], [],
            /**
             * @param {MessageUtils} utils
             */
            function (utils) {
                var bgLinks = {
                    'Snaky': 'https://imgur.com/a/iQ8rh'
                    ,
                    'Maskinen': 'https://imgur.com/a/P2Y8e'
                    ,
                    'Netux': 'https://imgur.com/a/j6QbM'
                    ,
                    'Frosolf': 'https://imgur.com/a/NZvz1 | https://goo.gl/sqfesS (anime)'
                    ,
                    'SiilerBloo': 'https://imgur.com/a/oZKQ3'
                    ,
                    'Pikachu': 'https://imgur.com/a/75R64'
                    ,
                    'Jagex': 'https://imgur.com/a/swXWN'
                    ,
                    'NeverPause': 'https://imgur.com/a/a6AuE'
                    ,
                    'Yato': 'https://imgur.com/a/CuEvR'
                    ,
                    'DingoTheMagic': 'https://imgur.com/a/DAaYw'
                    ,
                    'TickingTime': 'https://imgur.com/a/mZWAV'
                    ,
                    'ItsClutch': 'https://imgur.com/a/EixZ2'
                };

                if (!utils.getCommandArguments()[0]) {
                    utils.bot.sendChat('@' + utils.getUserUsername() + ' I have background lists from ' + Object.keys(bgLinks).join(', '));
                    utils.bot.sendChat('Do !background <from>' + ' to get the link.');
                    return;
                }

                function checkIfSpecify() {
                    var r = null;
                    Object.keys(bgLinks).forEach(function (name) {
                        if (name.toLowerCase() === utils.getCommandArguments()[0].toLowerCase()) {
                            r = name;
                        }
                    });
                    return r;
                }

                var bgUrl;
                if (utils.getCommandArguments()[0].toLowerCase() === 'room') {
                    utils.bot.sendChat(utils.getTargetName(2) + ' Room Background: ' + 'https://api.dubtrack.fm/room/' + utils.bot.getRoomMeta().id + '/image');
                    return;
                }
                else if (bgUrl = checkIfSpecify()) {
                    utils.bot.sendChat(utils.getTargetName(2) + ' ' + bgUrl + "'s BGs: " + bgLinks[bgUrl]);
                    return;
                }
            }
        )
        ,
        new Command('queue', ['queue'], 1, [], [],
            /**
             * @param {MessageUtils} utils
             */
            function (utils) {
                utils.bot.sendChat(utils.getTargetName() + ' How to Queue a Song: https://imgur.com/a/FghLg');
            }
        )
        ,
        new Command('hate', ['hate'], 1, [], [],
            /**
             * @param {MessageUtils} utils
             */
            function (utils) {
                var username = utils.getTargetName().replace("@", "");
                // Stop here if they are trying to do what they don't
                // Get that user object
                var thatUser = utils.bot.getUserByName(username);
                if (thatUser) {
                    // I love them all I watch over them and protect them
                    if (thatUser.id == utils.bot.getSelf().id) {
                        utils.bot.sendChat("You can't hate me, you can only love me, @" + utils.getUserUsername() + '!');
                        return 1;
                    }
                    else if (thatUser.id == utils.getUserId()) {
                        utils.bot.sendChat("No! Don't hate yourself please! Know that we all love you :nb3h:");
                        return 1;
                    }
                    // Ok everything should be good from here
                    utils.redisManager.decLove(thatUser.id);
                    utils.redisManager.getLove(thatUser.id, function (love) {
                        utils.bot.sendChat("@" + thatUser.username + " " + utils.getUserUsername() + " has broken one of your hearts </3. You now have " + love + " hearts.");
                    });
                }
                else if (username != '') {
                    utils.bot.sendChat('@' + utils.getUserUsername() + ' I would tell them that you hate them but they seem to not be here.');
                }
            }
        )
        ,
        new Command('love', ['love'], 1, [], [],
            /**
             * @param {MessageUtils} utils
             */
            function (utils) {
                var username = utils.getTargetName().replace("@", "");
                // Get that user object
                var thatUser = utils.bot.getUserByName(username);
                if (thatUser) {
                    // I love them all I watch over them and protect them
                    if (thatUser.id == utils.bot.getSelf().id) {
                        utils.bot.sendChat('I love you too, @' + utils.getUserUsername() + '!');
                    }
                    // Lets see if they should be told that they have a hand...
                    if (thatUser.id == utils.getUserId()) {
                        utils.bot.sendChat("@" + utils.getUserUsername() + " just use your hand....");
                        return;
                    }
                    // Ok everything should be good from here
                    var heartList = [':heart:', ':blue_heart:', ':purple_heart:', ':green_heart:', ':yellow_heart:', ':nb3h:', ':PBNHeart:', ':tastysheart:'];
                    utils.redisManager.incLove(thatUser.id);
                    utils.redisManager.getLove(thatUser.id, function (love) {
                        if (thatUser.id == utils.bot.getSelf().id) {
                            utils.bot.sendChat('Nice people like you have given me ' + love + ' hearts. ' + heartList[Math.dice(heartList.length)] + ' Thank you!');
                        }
                        else if (utils.getUserId() == '56083b920cd1cc03003fe8e2') {
                            utils.bot.sendChat("@" + thatUser.username + " " + utils.getUserUsername() + " has broken one of your hearts </3. You now have " + love + " hearts.");
                        }
                        else {
                            utils.bot.sendChat("@" + thatUser.username + " " + utils.getUserUsername() + " gave you a heart " + heartList[Math.dice(heartList.length)] + ". You now have " + love + " hearts.");
                        }
                    });
                }
                else if (username != '') {
                    utils.bot.sendChat('@' + utils.getUserUsername() + ' I would tell them that you love them but they seem to not be here.');
                }
            }
        )
        ,
        new Command('plops', ['plops'], 1, [], [],
            /**
             * @param {MessageUtils} utils
             */
            function (utils) {
                utils.bot.sendChat(utils.getTargetName() + ' :poop:');
            }
        )
        ,
        new Command('ping', ['ping'], 0.5, [], [],
            /**
             * @param {MessageUtils} utils
             */
            function (utils) {
                utils.bot.sendChat('@' + utils.getUserUsername() + ' pong!');
            }
        )
        ,
        new Command('pong', ['pong'], 0.5, [], [],
            /**
             * @param {MessageUtils} utils
             */
            function (utils) {
                utils.bot.sendChat('@' + utils.getUserUsername() + ' ping!');
            }
        )
        ,
        new Command('english', ['english', 'eng'], 1, [], [],
            /**
             * @param {MessageUtils} utils
             */
            function (utils) {
                utils.bot.sendChat(utils.getTargetName() + ' Please stick to English in this room, doing otherwise will result in a mute.');
            }
        )
        ,
        new Command('shush', ['shush', 'sush', 'noskip', 'noskiperino'], 1, [], [],
            /**
             * @param {MessageUtils} utils
             */
            function(utils) {
                utils.bot.sendChat(utils.getTargetName() + ' ' + getShushMessage());
            }
        )
        ,
        new Command('gema', ['gema', 'fuckgema', 'gemasucks', 'gemaisshit', 'umg', 'fuckumg', 'umgsucks', 'umgisshit'], 1, [], [],
            /**
             * @param {MessageUtils} utils
             */
            function (utils) {
                utils.bot.sendChat(utils.getTargetName() + ' To bypass GEMA/UMG blocked videos you can use an extension as a temporal proxy:');
                utils.bot.sendChat('YouTube Unblocker: https://www.unblocker.yt/');
                utils.bot.sendChat('ProxyTube: https://proxtube.com/');
            }
        )
        ,
        new Command('videocheck', ['videocheck'], 1, [], [],
            /**
             * @param {MessageUtils} utils
             */
            function (utils) {
                var message = 'Check if a video is available on any country at https://polsy.org.uk/stuff/ytrestrict.cgi';
                if(utils.bot.getMedia() && utils.getMediaType() === 'youtube' && utils.getMediaFkid()) {
                    message = 'Check if current video is available on any country at https://polsy.org.uk/stuff/ytrestrict.cgi?ytid=' + utils.getMediaFkid();
                }
                utils.bot.sendChat(utils.getTargetName() + ' ' + message);
            }
        )
        ,
        new Command('lovepercentage', ['lovepercent', 'love%', 'lovepercentage'], 1, [], [],
            /**
             * @param {MessageUtils} utils
             */
            function (utils) {
                if (utils.getCommandArguments().length > 0) {
                    var username = utils.getTargetName().replace('@', '');
                    var username2 = utils.getUserUsername();
                    if (utils.getCommandArguments().length > 1) {
                        username2 = utils.getTargetName(2).replace('@', '');
                        /**
                         * @return {boolean}
                         */
                        function XOR(foo, bar) {
                            return foo ? !bar : bar;
                        }

                        if (XOR(username.toLowerCase() == utils.getUserUsername().toLowerCase(), username2.toLowerCase() == utils.getUserUsername().toLowerCase())) {
                            if (XOR(username.toLowerCase() == utils.bot.getSelf().username.toLowerCase(), username2.toLowerCase() == utils.bot.getSelf().username.toLowerCase())) {
                                username = utils.bot.getSelf().username;
                            }
                        }
                        else if (username2.toLowerCase() == utils.bot.getSelf().username.toLowerCase()) {
                            utils.bot.sendChat("@" + utils.getUserUsername() + " I love " + username + " 100%.");
                            return;
                        }
                        else if (username.toLowerCase() == utils.bot.getSelf().username.toLowerCase()) {
                            utils.bot.sendChat("@" + utils.getUserUsername() + " I love " + username2 + " 100%.");
                            return;
                        }
                    }
                    if (username.toLowerCase() == utils.getUserUsername().toLowerCase() && username2.toLowerCase() == utils.getUserUsername().toLowerCase()) {
                        utils.bot.sendChat("@" + utils.getUserUsername() + " well I don't know.... how much do you love yourself?");
                        return;
                    }
                    else if (username.toLowerCase() == utils.bot.getSelf().username.toLowerCase()) {
                        utils.bot.sendChat('@' + utils.getUserUsername() + " of course I love you 100%, silly <3");
                        return;
                    }

                    seedrandom(username.hashCode() + username2.hashCode(), {global: true});
                    utils.bot.sendChat('@' + utils.getUserUsername() + ' there is ' + Math.dice(100) + '% of :nb3h: between ' + username2 + ' and ' + username);
                    seedrandom.resetGlobal();
                }
            }
        )
        ,
        new Command('roominfo', ['roominfo', 'community', 'room', 'info', 'roomtheme', 'communitytheme', 'theme'], 1, [], [],
            /**
             * @param {MessageUtils} utils
             */
            function (utils) {
                utils.bot.sendChat(utils.getTargetName() + 'This community plays ' + utils.bot.getRoomMeta().name + ' (as said on the title). Songs over 6:30 will be skipped so please follow the guidelines! Rules: https://git.io/vWJnY');
            }
        )
        ,
        // Mod command only no cooldown needed : require mute
        new Command('mute', ['mute'], 0, [], ['mute'],
            /**
             * @param {MessageUtils} utils
             */
            function (utils) {
                processAndDoPunish(utils, 'mute');
            }
        )
        ,
        // Mod command only no cooldown needed : require mute
        new Command('timeout', ['timeout'], 0, [], ['mute'],
            /**
             * @param {MessageUtils} utils
             */
            function (utils) {
                processAndDoPunish(utils, 'timeout');
            }
        )
        ,
        // Mod command only no cooldown needed : require mute
        new Command('ban', ['ban'], 0, [], ['ban'],
            /**
             * @param {MessageUtils} utils
             */
            function (utils) {
                processAndDoPunish(utils, 'ban');
            }
        )
        ,
        new Command('lastplayed', ['lastplayed', 'history'], 1, [], [],
            /**
             * @param {MessageUtils} utils
             */
            function (utils) {
                var arg0 = utils.getCommandArguments()[0];

                if (!arg0 && !utils.bot.getMedia()) {
                    utils.bot.sendChat('@' + utils.getUserUsername() + ' no song is playing right now.');
                    return;
                }

                utils.redisManager.getLastSongTime(arg0 || utils.getMediaFkid(), function (result) {
                    if (result) {
                        utils.bot.sendChat((arg0 ? 'That' : 'This') + ' video/song was last played ' + timeDifference(Date.now(), parseInt(result)) + '.');
                    }
                    else {
                        utils.bot.sendChat((arg0 ? 'That' : 'This') + ' video/song has not played in the last 5 weeks. Maybe the song is a remix, or a reupload.');
                    }
                });
            }
        )
        ,
        new Command('twitchlink', ['twitchlink'], 0.5, [], [],
            /**
             * @param {MessageUtils} utils
             */
            function (utils) {
                var key = utils.getCommandArguments()[0];
                utils.redisManager.getTwitchDubAuthKey(key, function (result) {
                    if (result) {
                        if (utils.getUserId == result) {
                            utils.redisManager.getTwitchSub(result, function (result) {
                                if (result) {
                                    if (utils.bot.hasPermission(utils.bot.getSelf(), 'set-roles')) {
                                        if (!utils.getUserRole()) {
                                            utils.bot.moderateSetRole(utils.getUserId(), 'resident-dj');
                                        }
                                    }
                                    else {
                                        utils.bot.sendChat('@' + utils.getUserUsername() + ' you have a role in this room as it is I will not change it.');
                                    }
                                }
                            });
                        }
                        else {
                            utils.bot.sendChat('This key has been used on another dubtrack account!');
                        }
                    }
                    else {
                        utils.redisManager.getTwitchAuthKey(key, function (result) {
                            if (result) {
                                utils.redisManager.setTwitch(utils.getUserId(), result);
                                utils.bot.sendChat('@' + utils.getUserUsername() + ' your account has been linked with the twitch account ' + result);
                                utils.redisManager.getTwitchSub(result, function (result) {
                                    if (result) {
                                        if (utils.bot.hasPermission(utils.bot.getSelf(), 'set-roles')) {
                                            if (!utils.getUserRole()) {
                                                utils.bot.moderateSetRole(utils.getUserId(), 'resident-dj');
                                            }
                                        }
                                    }
                                });
                                utils.redisManager.setTwitchDubAuthKey(key, utils.getUserId());
                            }
                            else {
                                /// Well this is not a key it seems just let it go
                            }
                        });
                    }
                });
            }
        )
        ,
        new Command('commands', ['commands'], 1, ['resident-dj'], [],
            /**
             * @param {MessageUtils} utils
             */
            function (utils) {
                var message = '';
                commandManager.getCommandList().forEach(function (commandListElement) {
                    message += (message == '' ? '' : ', ') + commandListElement.commandId;
                });
                message = utils.getTargetName() + ' Hi, the commands I have are: ' + message;
                utils.bot.sendChat(message);
            }
        )
        ,
        new Command('setcd', ['setcd', 'setcooldown', 'cooldown'], 0, ['mod'], [],
            /**
             * @param {MessageUtils} utils
             */
            function (utils) {
                if (utils.getCommandArguments()[0] == undefined) {
                    var output = utils.settingsManager.getCooldown();
                    utils.bot.sendChat('@' + utils.getUserUsername() + ' current command cooldown is of ' + output + ' second' + (output === 1 ? '' : 's') + '.');
                    return 1;
                }
                var input = parseInt(utils.getCommandArguments()[0]);
                if (!isNaN(input)) {
                    utils.settingsManager.setCooldown(input);
                    utils.bot.sendChat('@' + utils.getUserUsername() + ' set cooldown to ' + input + ' second' + (input === 1 ? '' : 's') + '.');
                }
            }
        )
        ,
        new Command('setimgtime', ['setimgtime', 'setimagetime', 'imagetime'], 0, ['mod'], [],
            /**
             * @param {MessageUtils} utils
             */
            function (utils) {
                if (utils.getCommandArguments()[0] == undefined) {
                    var output = utils.settingsManager.getImgTime();
                    utils.bot.sendChat('@' + utils.getUserUsername() + ' current image removal time is of ' + output + ' minute' + (output === 1 ? '' : 's') + '.');
                    return 1;
                }
                var input = parseInt(utils.getCommandArguments()[0]);
                if (!isNaN(input)) {
                    utils.settingsManager.setImgTime(input);
                    utils.bot.sendChat('@' + utils.getUserUsername() + ' set image removal time to ' + input + ' minute' + (input === 1 ? '' : 's') + '.');
                }
            }
        )
        ,
        new Command('imgdubsamount', ['setimgdubsamount', 'imgdubsamount', 'imagedubsamount'], 0, ['mod'], [],
            /**
             * @param {MessageUtils} utils
             */
            function (utils) {
                if (utils.getCommandArguments()[0] == undefined) {
                    var output = utils.settingsManager.getImgDubsAmount();
                    utils.bot.sendChat('@' + utils.getUserUsername() + ' current amount of dubs for images is of ' + output + ' dub' + (output === 1 ? '' : 's') + '.');
                    return 1;
                }
                var input = parseInt(utils.getCommandArguments()[0]);
                if (!isNaN(input)) {
                    utils.settingsManager.setImgDubsAmount(input);
                    utils.bot.sendChat('@' + utils.getUserUsername() + ' set the amount of dubs for images to ' + input);
                }
            }
        )
        ,
        new Command('imgremovemutetime', ['setimageremovemutetime', 'imgremovemutetime', 'imageremovemutetime'], 0, ['mod'], [],
            /**
             * @param {MessageUtils} utils
             */
            function (utils) {
                if (utils.getCommandArguments()[0] == undefined) {
                    var output = utils.settingsManager.getImgRemoveMuteTime();
                    utils.bot.sendChat('@' + utils.getUserUsername() + ' users are getting muted if they don\`t meet the required amount of dubs for ' + output + ' minute' + (output === 1 ? '' : 's') + '.');
                    return 1;
                }
                var input = parseInt(utils.getCommandArguments()[0]);
                if (!isNaN(input)) {
                    utils.settingsManager.setImgRemoveMuteTime(input);
                    utils.bot.sendChat('@' + utils.getUserUsername() + ' users will now get muted for ' + input + ' minute' + (input === 1 ? '' : 's') + ' for not meeting the required amount of dubs.');
                }
            }
        )
        ,
        new Command('skip', ['skip'], 0, [], [],
            /**
             * @param {MessageUtils} utils
             */
            function (utils) {
                utils.bot.moderateDeleteChat(utils.getId());
                utils.timeMuteUser(5, '@' + utils.getUserUsername() + ' ' + getShushMessage());
            }
        )
        ,
        new Command('forproducers', ['producers', 'forproducers'], 1, [], [],
            /**
             * @param {MessageUtils} utils
             */
            function (utils) {
                utils.bot.sendChat(utils.getTargetName() + ' We no longer allow producers to play their own songs or advertise their music in any way.');
            }
        )
        ,
        new Command('forpromoters', ['promoters', 'forpromoters'], 1, [], [],
            /**
             * @param {MessageUtils} utils
             */
            function (utils) {
                utils.bot.sendChat(utils.getTargetName() + ' (Click for better quality) https://i.imgur.com/0H4toVQ.png');
            }
        )
        ,
        new Command('clear', ['clear', 'laggy'], 1, [], [],
            /**
             * @param {MessageUtils} utils
             */
            function (utils) {
                utils.bot.sendChat(utils.getTargetName() + ' You can clear you chat if it gets too laggy. https://i.imgur.com/D1T64mP.gif');
            }
        )
        ,
        new Command('androidapp', ['android', 'androidapp', 'androidapk'], 1, [], [],
            /**
             * @param {MessageUtils} utils
             */
            function (utils) {
                utils.bot.sendChat(utils.getTargetName() + ' Unofficial Android app (sorry iOS users) for Dubtrack: https://www.mar974.co/dubtrack/. Thank mar974 :D');
            }
        )
        ,
        new Command('catfact', ['catfact', 'catfacts'], 1, ['resident-dj'], [],
            /**
             * @param {MessageUtils} utils
             * @param {Function} dontSetCooldown
             */
            function (utils, dontSetCooldown) {
                requestCatFact(
                    dontSetCooldown,
                    function () {
                        utils.bot.sendChat(utils.getTargetName() + ' no cat facts found :(');
                    },
                    function (fact) {
                        var waysOfSayingIt = [
                            '%u Cat fact: %f.',
                            '%u Did you know: %f?',
                            '%u Have you heard? %f.'
                        ];
                        waysOfSayingIt = waysOfSayingIt[Math.dice(waysOfSayingIt.length)];
                        utils.bot.sendChat(waysOfSayingIt.replace('%u', utils.getTargetName()).replace('%f', fact));
                    }
                );
            }
        )
        ,
        new Command('nb3fact', ['nb3fact', 'nb3facts'], 1, ['resident-dj'], [],
            /**
             * @param {MessageUtils} utils
             * @param {Function} dontSetCooldown
             */
            function (utils, dontSetCooldown) {
                requestCatFact(
                    dontSetCooldown,
                    function () {
                        utils.bot.sendChat(utils.getTargetName() + ' no nb3 facts found :(');
                    },
                    function (fact) {
                        fact = fact
                            .replace(/cat|feline/gi, 'Nightblue')
                            .replace(/lion/gi, 'Big Nightblue');
                        var waysOfSayingIt = [
                            '%u NB3 fact: %f.',
                            '%u Did you know: %f?',
                            '%u Have you heard? %f.'
                        ];
                        waysOfSayingIt = waysOfSayingIt[Math.dice(waysOfSayingIt.length)];
                        utils.bot.sendChat(waysOfSayingIt.replace('%u', utils.getTargetName()).replace('%f', fact));
                    }
                );
            }
        )
        ,
        new Command('animelist', ['anime', 'animes', 'animelist'], 1, [], [],
            /**
             * @param {MessageUtils} utils
             */
            function (utils) {
                utils.bot.sendChat(utils.getTargetName() + ' Anime List: https://goo.gl/d4lvua');
                utils.bot.sendChat('Never_Pause also recommends his animelist: https://goo.gl/h6OoW3');
            }
        )
        ,
        new Command('streamover', ['streamover', 'streamisover', 'gameover', 'streamend', 'streamended'], 1, ['vip'], [],
            /**
             * @param {MessageUtils} utils
             */
            function (utils) {
                utils.bot.sendChat('@djs all right, stream is over! Dequeue your troll songs unless you want them to be skipped or removed.');
            }
        )
        ,
        new Command('cookie', ['cookie', 'givecookie'], 1, [], [],
            /**
             * @param {MessageUtils} utils
             */
            function (utils) {
                if (utils.getCommandArguments().length < 2) {
                    utils.bot.sendChat('@' + utils.getUserUsername() + ' cookies on display: ' + Object.keys(cookieDisplay).join(', '));
                    return;
                }
                var cookie = cookieDisplay[utils.getCommandArguments()[0].toLowerCase()];
                if (!cookie) {
                    utils.bot.sendChat('@' + utils.getUserUsername() + ' I don\'t have that cookie on display.');
                    return;
                }
                var target = utils.bot.getUserByName(utils.getTargetName(2, true));
                if (!target) {
                    utils.bot.sendChat('@' + utils.getUserUsername() + ' I would give them the cookie but they seem to not be here.');
                    return;
                }
                if (target.id === utils.getUserId()) {
                    utils.bot.sendChat('@' + utils.getUserUsername() + ' don\'t you already have the cookie? Just eat it!');
                    return;
                }
                if (target.id === utils.bot.getSelf().id) {
                    utils.bot.sendChat('@' + utils.getUserUsername() + ' for me :nb3Happy:? Thank you! I\'ll eat this ' + cookie.name + ' now if you don\'t mind :rawrrCookie:');
                    return;
                }
                utils.bot.sendChat('@' + target.username + ' ' + utils.getUserUsername() + ' gave you a/an ' + cookie.name + ' ' + cookie.emote);
            }
        )
    ].forEach(function (command) {
            var ret = commandManager.addCommand(command);
            if (!ret) {
                console.error('Command failed to be added, Command:' + command.id);
            }
        }
    )
}

function timeDifference(newTime, oldTime) {
    return moment(oldTime).from(newTime);
}

function requestCatFact(dontSetCooldown, noFacts, cb) {
    var requestsCount = 0;

    function doSo(_cb) {
        if (requestsCount > 5) {
            dontSetCooldown();
            return;
        }
        else {
            requestsCount++;
        }

        httpsReq({
            hostname: 'catfacts-api.appspot.com',
            path: '/api/facts',
            method: 'GET'
        }, function (res) {
            var data = '';
            res.setEncoding('utf8');
            res.on('data', function (chunk) {
                data += chunk;
            });
            res.on('error', function (x) {
                noFacts();
                console.error(x);
            });
            res.on('end', function () {
                try {
                    data = JSON.parse(data);
                }
                catch (x) {
                    noFacts();
                }

                // Fact too long. To avoid spam request a new one and call _cb.
                if (data.facts[0].length > 125) {
                    doSo(_cb);
                    _cb(false);
                    return;
                }

                // Replace last period and call _cb.
                _cb(data.facts[0].replace(/\.$/g, ''));
            });
        }).end();
    }

    doSo(function (result) {
        if (result !== false) {
            cb(result);
        }
    });
}

function doProps(utils) {
    if (!utils.currentDJ) {
        utils.bot.sendChat('@' + utils.getUserUsername() + ' there is no song to prop!');
        commandManager.setUserOnCooldown(utils, this, utils.settingsManager.getCooldown());
        return;
    }
    if (utils.getUserId() === utils.currentDJ.id) {
        utils.bot.sendChat('@' + utils.getUserUsername() + ' we know you love your song, but let others also prop you!');
        commandManager.setUserOnCooldown(utils, this, utils.settingsManager.getCooldown());
        return;
    }
    utils.propsManager.addProp(utils.getUserId());
}

function processAndDoPunish(utils, type) {
    var username = utils.getTargetName().replace("@", "");
    var punished = utils.bot.getUserByName(username, true);
    if (punished) {
        var time = parseFloat(utils.getCommandArguments()[1]);
        if (isNaN(time)) {
            time = 5;
        }
        switch (type) {
            default:
                utils.bot.sendChat("Something happened! D:");
                return;
            case 'ban':
                utils.botUtils.timeBan(punished, time, null);
                break;
            case 'mute':
                utils.botUtils.timeMute(punished, time, "@" + username + " muted for " + time + " minute" + (time !== 1 ? 's' : '') + '!');
                break;
            case 'timeout':
                utils.botUtils.timeoutUser(punished, time, "@" + username + " timed out for " + time + " minute" + (time !== 1 ? 's' : '') + '!');
                break;
        }
    }
    else {
        utils.bot.sendChat("No user found by the name " + username + ".")
    }
}

function getShushMessage() {
    return ':NoSkip: (Click for better quality) https://i.imgur.com/05NVq0h.png';
}

module.exports = regCommands;
