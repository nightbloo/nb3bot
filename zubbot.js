/*
 **************************************************************************
 * ABOUT
 **************************************************************************
 *
 * NightBlueBot is a bot created for the
 * NightBlue3 room on www.dubtrack.fm
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
 * COMMAND LIST
 **************************************************************************
 * !hello - Bot Responds saying hello back.
 * !request [request] - request a feature to the BOT
 * !del [file] - Bot responds saying *file* deleted
 * !gaben - pulls a random gaben picture from /r/gentlemangabers
 * !quote [user] - pulls a quote from the quotes folder for *user*
 * !meme [text] - generates a meme from memecaptain
 * !song - pulls song data from dubtrack
 * !stream - pulls nb3 stream data from twitch
 * !lastplayed - Shows when the song was last played -- Slightly bugged atm
 * !props - gives props to the current DJ
 * !love [user] - gives someone love <3
 * !lovepercent [user] - calculates love percentage between you and user
 * !eta - Tells user to download dubx
 * !dubx - Direct link to DubX homepage
 * !myprops - let's the user view their props
 * !mylove - let's the user view their hearts
 * !rules - OBEY OR BE DESTROYED
 * !kappa [user] - sends a kappa to somebody
 * !hate [user] - Breaks someone's heart </3
 * !plops - Echoe's a poop.
 * ![user] - says the user is an awesome person.
 * !agar - host an Agar.io party.
 * !pong - ping!
 * !ping - pong!
 * !english - show community language rules
 * !sush - show community skip rules
 * !selfpromotion - show self promotion rules
 * !videocheck - direct link to video availability
 * !gema - direct link to Anti-Gema extension
 * !css - shows imgur css album
 * !bg - shows bg albums
 * !queue - says how to queue a song
 * !mute - mute the user for x amount of time
 * !timeout - remove all messages from user and mute them for x amount of time
 * !seppuku - remove all messages from self
 * !sub|subs|subscribe|residentdj|rdj - will give info about being a sub and how to get RDJ
 * !androidapp - direct link to Dubtrack's Unofficial android app
 * !catfact - responds with a random cat fact from http://catfacts-api.appspot.com/
 *
 * Keys
 * ~ = recommendation
 * [] = arg
 **************************************************************************
 */

'use strict';

require('./lib/utilsLoader');
var DubAPI = require('dubapi');
var jsonfile = require('jsonfile');
var fs = require('fs');
var os = require("os");
var httpReq = require('http').request;
// Twitch Stuff
var twitchManager = require('./lib/twitchManager.js');
// Time formatting
var moment = require('moment');
// Redis Manager - handles all of the redis interaction
var redisManager = require('./lib/redisManager.js');
// props Manager
var PropsManager = new require('./lib/propsManager.js');
var propsManager = new PropsManager(redisManager);
// Chat and User Utils
var chatUtils = require('./lib/chatUtils.js');
var userUtils = require('./lib/userUtils.js');
var mediaUtils = require('./lib/mediaUtils.js');
var MessageUtils = require('./lib/messageUtils.js');
// Chat and Command Mangers
var settingsManager = require('./lib/settingsManager.js');
var ChatManager = require('./lib/chatManager.js');
var chatManager = new ChatManager();
var CommandManager = require('./lib/commandManager.js');
var commandManager = new CommandManager();

var startTime = Date.now();

var sendgrid = null;
var zip = null;
try {
    sendgrid = require('sendgrid')(process.env.CHATLOGS_SENDGRID_KEY);
    zip = require('node-zip')();
}
catch (x) {
    console.log('No SendGrid Key detected, chatlogs wont be recorded.');
}

console.log('> Starting DubAPI...');

new DubAPI({
        username: process.env.DT_LOGIN,
        password: process.env.DT_PASS
    },
    /**
     * @param err
     * @param {DubAPI} bot
     * */
    function (err, bot) {
        // keymetrics
        require('./lib/keymetrics.js').keymetrics(bot);
        var BotUtils = require('./lib/botUtils.js');
        var botUtils = new BotUtils(bot);
        require('./commands.js')(commandManager);

        var currentName = "";
        var currentID = "";
        var currentType = "";
        var currentDJ = null;
        var currentDJName = "";
        var currentStream = "";
        var lastMediaFKID = "",
            currentMediaPermaLink = undefined;

        if (err) {
            return console.error(err);
        }

        console.log("> NightBlueBot");
        console.log("> CREATED   BY ZUBOHM");
        console.log("> DEVELOPED BY ZUBOHM, NETUX, MATT, DEMOZ, LARRY1123");

        if (sendgrid !== null) {
            // setupChatlogs(bot); This is restarting the BOT because of max-memory exceed, temporary commented
        }

        function connect() {
            bot.connect(process.env.DT_ROOM);
        }

        bot.on('connected', function (name) {
            console.log('Connected to ' + name);
        });

        bot.on('disconnected', function (name) {
            console.log('Disconnected from ' + name);
            setTimeout(connect, 15000);
        });

        bot.on('error', function (err) {
            console.error(err);
        });

        bot.on(bot.events.roomPlaylistUpdate, function (data) {
            if (data !== undefined) {
                if (data.media == undefined) {
                    return;
                }
                lastMediaFKID = currentID;
                if (data.media.fkid === lastMediaFKID) {
                    return;
                }
                currentName = data.media.name;
                currentID = data.media.fkid;
                currentType = data.media.type;
                // Save song time
                redisManager.getLastSong(function (result) {
                    if (result) {
                        if (result == currentID) {
                            // Don't let it do anything if the song has not changed
                            return;
                        }
                        redisManager.setLastSongTime(result, Date.now());
                    }
                    redisManager.setLastSong(currentID);
                });
                // Save Props START
                if (currentDJ) {
                    var props = propsManager.onSongChange(currentDJ.id);
                    if (props) {
                        var propss = 'prop';
                        if (props > 1) {
                            propss += 's';
                        }
                        bot.sendChat(currentDJ.username + ' got ' + props + ' ' + propss + ' for the song they just played.');
                    }
                }
                else {
                    propsManager.resetProps();
                }
                // Save Props END
                if (data.user) {
                    currentDJ = data.user;
                }
                else {
                    currentDJ = null;
                }
                currentDJName = (data.user == undefined ? "404usernamenotfound" : (data.user.username == undefined ? "404usernamenotfound" : data.user.username));
                if (currentType == "soundcloud") {
                    currentStream = data.media.streamURL;
                    currentMediaPermaLink = "not found (?!) or something went wrong";
                    var soundcloudAccountId = process.env.SC_CLIENT_ID;
                    if (soundcloudAccountId) {
                        httpReq({
                            hostname: 'api.soundcloud.com',
                            path: '/tracks/' + currentID + '?client_id=' + soundcloudAccountId,
                            method: 'GET'
                        }, function (res) {
                            var data = '';
                            res.setEncoding('utf8');
                            res.on('data', function (chunk) {
                                data += chunk;
                            });
                            res.on('error', function (x) {
                                console.error(x);
                            });
                            res.on('end', function () {
                                currentMediaPermaLink = JSON.parse(data).permalink_url;
                            });
                        }).end();
                    }
                }
                else {
                    currentMediaPermaLink = 'https://youtube.com/watch?v=' + currentID;
                }
            }
        });

        bot.on(bot.events.chatMessage, function (data) {
            if (typeof data === "undefined" || typeof data.user === "undefined") {
                console.error("data is undefined");
                // It won't crash now.
                bot.reconnect();
                return;
            }
            // Setup Utils
            var messageUtils = new MessageUtils(bot, redisManager, twitchManager, propsManager, settingsManager, chatUtils, userUtils, mediaUtils, botUtils, data);
            messageUtils.currentMediaPermaLink = currentMediaPermaLink;
            messageUtils.currentDJ = currentDJ;
            messageUtils.getRuntimeMessage = function () {
                return timeDifference(Date.now(), startTime);
            };
            chatManager.processChat(messageUtils, commandManager);
        });

        // Everything setup time to connect
        connect();
    });

function setupChatlogs(API) {
    var lastChatlogContents = null,
        lastSongID = null,
        lastDJUsername = null;

    function getToday() {
        return new Date(new Date().toDateString() + ' 00:00:00')
    }

    function forceSaveLogs() {
        if (lastChatlogContents) {
            console.log('Hold on a second, saving chatlogs');
            fs.writeFileSync('chatlogs.txt', lastChatlogContents, 'utf8');
        }
    }

    /* Setup file (Reading & checking if it exists) */
    fs.readFile('chatlogs.txt', 'utf8', function (err, contents) {
        if (err) {
            if (err.code !== 'ENOENT') {
                console.error(err);
                return;
            }
            console.log("chatlogs.txt doesn't exists, making it");
            fs.writeFile('chatlogs.txt', lastChatlogContents = 'Chat Logs - ' + getToday().toString() + '\r\n', 'utf8', function (err1) {
                if (err1) {
                    console.log('Error creating chatlogs.txt');
                    return console.error(err1);
                }
                console.log('Done creating chatlogs.txt')
            });
        }
        if (!lastChatlogContents) {
            lastChatlogContents = contents;
        }

        function addChatLog(str) {
            var prefix = new Date().toTimeString().split(' ')[0] + ' | ';
            lastChatlogContents += '\r\n' + prefix + str;
            fs.writeFile('chatlogs.txt', lastChatlogContents, 'utf8');
        }

        /* Setup events */
        API.on(API.events.chatMessage, function (data) {
            if (!data || !data.user) {
                return;
            }
            var role;
            try {
                role = API.roles[data.user.role].label;
            }
            catch (x) {
                role = 'Pleb';
            }
            addChatLog('(' + role + ') ' + data.user.username + ': ' + data.message);
        });
        API.on(API.events.roomPlaylistUpdate, function (data) {
            if (!data.media || !data.user) {
                return;
            } // wut?
            if (data.media.id === lastSongID) {
                return;
            }
            lastSongID = data.media.id;
            lastDJUsername = data.user.username;
            addChatLog('[System] Current Song is ' + data.media.name + '. DJ is ' + data.user.username);
        });
        API.on(API.events.chatSkip, function (data) {
            if (!data || !data.user) {
                return;
            }
            addChatLog('[System] Song queued by ' + lastDJUsername + ' was skipped by ' + data.user.username);
        });
        API.on('room_playlist-queue-reorder', function (data) {
            if (!data || !data.user) {
                return;
            }
            addChatLog('[System] ' + data.user.username + ' reordered the Queue.');
        });
        API.on('room_playlist-queue-remove-user-song', function (data) {
            if (!data || !data.user) {
                return;
            }
            addChatLog('[System] ' + data.user.username + ' removed a song queued by ' + data.removedUser.username + ' from the Queue.');
        });
        API.on('room_playlist-queue-remove-user', function (data) {
            if (!data || !data.user) {
                return;
            }
            addChatLog('[System] ' + data.user.username + ' cleared ' + data.removedUser.username + "'s queue.");
        });
        API.on('user-pause-queue-mod', function (data) {
            if (!data || !data.user) {
                return;
            }
            addChatLog('[System] ' + data.mod.username + ' removed ' + data.user.username + ' from the Queue.');
        });
        API.on('room-lock-queue', function (data) {
            if (!data || !data.user) {
                return;
            }
            addChatLog('[System] ' + data.user.username + ' ' + (data.room.lockQueue ? 'locked' : 'unlocked') + " the room's Queue");
        });

        function chatLogSystemEvent(data) {
            if (!data || !data.user) {
                return;
            }
            var user = data.user.username,
                mod = data.mod.username,
                type = '', suffix = '';
            switch (data.type) {
                case 'user-ban':
                    type = 'banned';
                    break;
                case 'user-unban':
                    type = 'unbanned';
                    break;
                case 'user-kick':
                    type = 'kicked out of the room';
                    break;
                case 'user-mute':
                    type = 'muted';
                    break;
                case 'user-unmute':
                    type = 'unmuted';
                    break;
                case 'user-setrole':
                case 'user-unsetrole':
                    var roleLabel;
                    try {
                        roleLabel = API.roles[data.user.role].label;
                    }
                    catch (x) {
                        roleLabel = 'Pleb';
                    }
                    type = 'made';
                    suffix = 'a ' + roleLabel;
                    break;
            }
            addChatLog('[System] ' + mod + ' ' + type + ' ' + user + ' ' + suffix);
        }

        API.on(API.events.userBan, chatLogSystemEvent);
        API.on(API.events.userUnban, chatLogSystemEvent);
        API.on(API.events.userKick, chatLogSystemEvent);
        API.on(API.events.userMute, chatLogSystemEvent);
        API.on(API.events.userUnmute, chatLogSystemEvent);
        API.on(API.events.userSetRole, chatLogSystemEvent);
        API.on(API.events.userUnsetRole, chatLogSystemEvent);

        API.on('error', forceSaveLogs);
        API.on('connected', function (roomName) {
            addChatLog('[BOT] Connected to ' + roomName);
        });
        API.on('disconneted', function (roomName) {
            addChatLog('[BOT] Disconnected from ' + roomName);
        });

        ['SIGHUP', 'SIGINT', 'SIGQUIT', 'SIGILL', 'SIGTRAP', 'SIGABRT', 'SIGBUS', 'SIGFPE', 'SIGUSR1', 'SIGSEGV', 'SIGUSR2', 'SIGTERM']
            .forEach(function (sig) {
                process.on(sig, function () {
                    if (typeof sig === "string") {
                        forceSaveLogs();
                        process.exit(1);
                    }
                });
            });
    });
}

function roughSizeOfObject(object) {
    var objectList = [];
    var recurse = function (value) {
        var bytes = 0;
        if (typeof value === 'boolean') {
            bytes = 4;
        }
        else if (typeof value === 'string') {
            bytes = value.length * 2;
        }
        else if (typeof value === 'number') {
            bytes = 8;
        }
        else if (
            typeof value === 'object' && objectList.indexOf(value) === -1
        ) {
            objectList[objectList.length] = value;
            for (var i in value) {
                bytes += 8; // an assumed existence overhead
                bytes += recurse(value[i])
            }
        }
        return bytes;
    };
    return recurse(object);
}

function timeDifference(newTime, oldTime) {
    return moment(oldTime).from(newTime);
}

function time_format(d) {
    var hours = format_two_digits(d.getHours());
    var minutes = format_two_digits(d.getMinutes());
    var seconds = format_two_digits(d.getSeconds());
    return hours + ":" + minutes + ":" + seconds;
}

function format_two_digits(n) {
    return n < 10 ? '0' + n : n;
}
