/*

                         ▄▄        ▄  ▄▄▄▄▄▄▄▄▄▄  ▄▄▄▄▄▄▄▄▄▄▄  ▄▄▄▄▄▄▄▄▄▄   ▄▄▄▄▄▄▄▄▄▄▄  ▄▄▄▄▄▄▄▄▄▄▄ 
                        ▐░░▌      ▐░▌▐░░░░░░░░░░▌▐░░░░░░░░░░░▌▐░░░░░░░░░░▌ ▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌
                        ▐░▌░▌     ▐░▌▐░█▀▀▀▀▀▀▀█░▌▀▀▀▀▀▀▀▀▀█░▌▐░█▀▀▀▀▀▀▀█░▌▐░█▀▀▀▀▀▀▀█░▌ ▀▀▀▀█░█▀▀▀▀ 
                        ▐░▌▐░▌    ▐░▌▐░▌       ▐░▌         ▐░▌▐░▌       ▐░▌▐░▌       ▐░▌     ▐░▌     
                        ▐░▌ ▐░▌   ▐░▌▐░█▄▄▄▄▄▄▄█░▌▄▄▄▄▄▄▄▄▄█░▌▐░█▄▄▄▄▄▄▄█░▌▐░▌       ▐░▌     ▐░▌     
                        ▐░▌  ▐░▌  ▐░▌▐░░░░░░░░░░▌▐░░░░░░░░░░░▌▐░░░░░░░░░░▌ ▐░▌       ▐░▌     ▐░▌     
                        ▐░▌   ▐░▌ ▐░▌▐░█▀▀▀▀▀▀▀█░▌▀▀▀▀▀▀▀▀▀█░▌▐░█▀▀▀▀▀▀▀█░▌▐░▌       ▐░▌     ▐░▌     
                        ▐░▌    ▐░▌▐░▌▐░▌       ▐░▌         ▐░▌▐░▌       ▐░▌▐░▌       ▐░▌     ▐░▌     
                        ▐░▌     ▐░▐░▌▐░█▄▄▄▄▄▄▄█░▌▄▄▄▄▄▄▄▄▄█░▌▐░█▄▄▄▄▄▄▄█░▌▐░█▄▄▄▄▄▄▄█░▌     ▐░▌     
                        ▐░▌      ▐░░▌▐░░░░░░░░░░▌▐░░░░░░░░░░░▌▐░░░░░░░░░░▌ ▐░░░░░░░░░░░▌     ▐░▌     
                         ▀        ▀▀  ▀▀▀▀▀▀▀▀▀▀  ▀▀▀▀▀▀▀▀▀▀▀  ▀▀▀▀▀▀▀▀▀▀   ▀▀▀▀▀▀▀▀▀▀▀       ▀      




                        **************************************************************************
                                                        ABOUT
                        **************************************************************************
                        
                                            NightBlueBot is a bot created for the
                                            NightBlue3 room on www.dubtrack.fm
                                            
                                            
                        **************************************************************************


                        **************************************************************************
                                                      DEVELOPERS
                        **************************************************************************
                        
                                                    @ZubOhm
                                                    @Netux
                                                    @Matt
                                                    @DemoZ
                            
                        **************************************************************************

                        **************************************************************************
                                                     COMMAND LIST
                        **************************************************************************
                        !hello - Bot Responds saying hello back.
                        !request [request] - request a feature to the BOT
                        !del [file] - Bot responds saying *file* deleted
                        !gaben - pulls a random gaben picture from /r/gentlemangabers
                        !quote [user] - pulls a quote from the quotes folder for *user*
                        !meme [text] - generates a meme from memecaptain
                        !song - pulls song data from dubtrack
                        !stream - pulls nb3 stream data from twitch
                        !lastplayed - Shows when the song was last played -- Slightly bugged atm
                        !props - gives props to the current DJ
                        !love [user] - gives someone love <3
                        !lovepercent [user] - calculates love percentage between you and user
                        !eta - Tells user to download dubx
                        !dubx - Direct link to DubX homepage
                        !myprops - let's the user view their props
                        !mylove - let's the user view their hearts
                        !rules - OBEY OR BE DESTROYED
                        !kappa [user] - sends a kappa to somebody
                        !hate [user] - Breaks someone's heart </3
                        !plops - Echoe's a poop.
                        ![user] - says the user is an awesome person.
                        !agar - host an Agar.io party.
                        !pong - ping!
                        !ping - pong!
                        !english - show community language rules
                        !sush - show community skip rules
                        !selfpromotion - show self promotion rules
                        !videocheck - direct link to video availability
                        !gema - direct link to Anti-Gema extension
                        !css - shows imgur css album
                        !bg - shows bg albums
                        !queue - says how to queue a song
                        
                        
                        Keys
                        ~ = recommendation
                        [] = arg
                        **************************************************************************
                        **************************************************************************




*/
Array.prototype.contains = function(element) {
    return (this.indexOf(element) > -1);
};
Array.prototype.remove = function(element) {
    if (this.contains(element)) {
        this.splice(this.indexOf(element), 1);
        return true;
    } else {
        return false;
    }
};
require('dotenv').load();
var DubAPI = require('dubapi');
var jsonfile = require('jsonfile')
var fs = require('fs')
var fse = require('fs-extra')
var util = require('util')
var path = require('path');
var os = require("os");
var TwitchClient = require("node-twitchtv");
var urban = require('urban');
var giphy = require('giphy-api')();
// { client_id: "generatedClientId", scope: "user_read, channel_read_"}
var captainApi = require('node-memecaptain-api');

var account = fs.readFileSync("secrets/user.json"),
    accountObj = JSON.parse(account);
var client = new TwitchClient(account);
var httpReq = require('http').request;

var reddit = require('redwrap');
var AgarioClient = require('agario-client');
var agclient = new AgarioClient("NightBlueBot");
var runTime = 0;
setInterval(function() {
    runTime += 1;
}, 1000);
new DubAPI({
    username: process.env.DT_LOGIN,
    password: process.env.DT_PASS
}, function(err, bot) {
    var currentVideoThumb = "";
    var currentName = "";
    var currentID = "";
    var currentType = "";
    var currentDJName = "";
    var streamURL = "";
    var currentStream = "";
    var botWars = "";
    var botWarsEnabled = true;
    var neonCat = true;
    var lastChat = {
        userID: 0,
        id: 0
    };
    var userCooldown = new Array();
    var cooldown = (process.env.COOLDOWN == undefined ? 30 : process.env.COOLDOWN); // Cooldown in seconds
    var imgTime = (process.env.IMGTIME == undefined ? 15 : process.env.IMGTIME); // Cooldown in seconds
    var imgRemovalDubs_Amount = (process.env.IMAGEREMOVALDUBS_AMOUNT == undefined ? 10 : process.env.IMAGEREMOVALDUBS_AMOUNT),
        imgRemovalDubs_Time = (process.env.IMAGEREMOVALDUBS_TIME == undefined ? 5 : process.env.IMAGEREMOVALDUBS_TIME);
    var imageLogMax = (process.env.IMAGELOGMAX == undefined ? 11 : process.env.IMAGELOGMAX);
    var lastMediaFKID = "",
        currentMediaPermaLink = undefined;

    if (err) return console.error(err);
    console.log("-----------------------------------------------------------------------------------");
    console.log(" ▄▄        ▄  ▄▄▄▄▄▄▄▄▄▄  ▄▄▄▄▄▄▄▄▄▄▄  ▄▄▄▄▄▄▄▄▄▄   ▄▄▄▄▄▄▄▄▄▄▄  ▄▄▄▄▄▄▄▄▄▄▄ ");
    console.log("▐░░▌      ▐░▌▐░░░░░░░░░░▌▐░░░░░░░░░░░▌▐░░░░░░░░░░▌ ▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌ ");
    console.log("▐░▌░▌     ▐░▌▐░█▀▀▀▀▀▀▀█░▌▀▀▀▀▀▀▀▀▀█░▌▐░█▀▀▀▀▀▀▀█░▌▐░█▀▀▀▀▀▀▀█░▌ ▀▀▀▀█░█▀▀▀▀  ");
    console.log("▐░▌▐░▌    ▐░▌▐░▌       ▐░▌         ▐░▌▐░▌       ▐░▌▐░▌       ▐░▌     ▐░▌      ");
    console.log("▐░▌ ▐░▌   ▐░▌▐░█▄▄▄▄▄▄▄█░▌▄▄▄▄▄▄▄▄▄█░▌▐░█▄▄▄▄▄▄▄█░▌▐░▌       ▐░▌     ▐░▌      ");
    console.log("▐░▌  ▐░▌  ▐░▌▐░░░░░░░░░░▌▐░░░░░░░░░░░▌▐░░░░░░░░░░▌ ▐░▌       ▐░▌     ▐░▌      ");
    console.log("▐░▌   ▐░▌ ▐░▌▐░█▀▀▀▀▀▀▀█░▌▀▀▀▀▀▀▀▀▀█░▌▐░█▀▀▀▀▀▀▀█░▌▐░▌       ▐░▌     ▐░▌      ");
    console.log("▐░▌    ▐░▌▐░▌▐░▌       ▐░▌         ▐░▌▐░▌       ▐░▌▐░▌       ▐░▌     ▐░▌      ");
    console.log("▐░▌     ▐░▐░▌▐░█▄▄▄▄▄▄▄█░▌▄▄▄▄▄▄▄▄▄█░▌▐░█▄▄▄▄▄▄▄█░▌▐░█▄▄▄▄▄▄▄█░▌     ▐░▌      ");
    console.log("▐░▌      ▐░░▌▐░░░░░░░░░░▌▐░░░░░░░░░░░▌▐░░░░░░░░░░▌ ▐░░░░░░░░░░░▌     ▐░▌      ");
    console.log(" ▀        ▀▀  ▀▀▀▀▀▀▀▀▀▀  ▀▀▀▀▀▀▀▀▀▀▀  ▀▀▀▀▀▀▀▀▀▀   ▀▀▀▀▀▀▀▀▀▀▀       ▀       ");
    console.log("------------------------ CREATED BY ZUBOHM ----------------------------------------");
    console.log("--------------------------Version 0.15----------------------------------------------");

    /*
    console.log('Checking if all directories exists...');
    var dataDirectories = ['history', 'quotes', 'scores', 'users', 'python'];
    dataDirectories.forEach(function(dirStr) {
        if (fs.existsSync(dirStr)) return;
        console.log('Directory ' + dirStr + ' doesn\'t exists, creating it...');
        fs.mkdir(dirStr);
    });
    */

    function connect() {
        bot.connect(process.env.DT_ROOM);
    }

    function timeMute(user, time, message) {
        time *= 60000;
        bot.moderateMuteUser(user.id);
        bot.sendChat(message);
        setTimeout(function() {
            bot.moderateUnmuteUser(user.id);
        }, time);
    }

    function clearUserChat(user) {
        for (var message in bot.getChatHistory()) {
            if (user.id == message.user.id) {
                bot.moderateDeleteChat(message.id)
            }
        }
    }

    function timeout(user, time, message) {
        clearUserChat(user);
        timeMute(user, time, message)
    }

    bot.on('connected', function(name) {


        console.log('Connected to ' + name);
    });

    bot.on('disconnected', function(name) {
        console.log('Disconnected from ' + name);

        setTimeout(connect, 15000);
    });

    bot.on('error', function(err) {
        console.error(err);
    });
    bot.on(bot.events.roomPlaylistUpdate, function(data) {
        //console.log(data);
        if (typeof data !== undefined) {
            // currentVideoThumb = data.media.images.thumbnail;
            if (data.media == undefined) {
                console.log("DubTrack died, fuck you too DubTrack");
                return 1;
            }

            lastMediaFKID = currentID;
            currentName = data.media.name;
            currentID = data.media.fkid;
            currentType = data.media.type;

            currentDJName = (data.user == undefined ? "404usernamenotfound" : (data.user.username == undefined ? "404usernamenotfound" : data.user.username));
            if (currentType == "soundcloud") {
                currentStream = data.media.streamURL;
                currentMediaPermaLink = "not found (?!) or something went wrong";
                if (accountObj.sc_client_id) {
                    httpReq({
                        hostname: 'api.soundcloud.com',
                        path: '/tracks/' + currentID + '?client_id=' + accountObj.sc_client_id,
                        method: 'GET'
                    }, function(res) {
                        var data = '';
                        res.setEncoding('utf8');
                        res.on('data', function(chunk) {
                            data += chunk;
                        });
                        res.on('error', function(x) {
                            console.error(x);
                        });
                        res.on('end', function() {
                            currentMediaPermaLink = JSON.parse(data).permalink_url;
                        });
                    }).end();
                }
            } else currentMediaPermaLink = 'https://youtube.com/watch?v=' + currentID;
            /*var historyFile = "history/" + lastMediaFKID + ".txt";
            // Check for history file
            if (lastMediaFKID.length > 0) {
                fs.stat(historyFile, function(err, stat) {

                    var unix = Math.round(+new Date() / 1000);

                    if (err == null) {

                        // it exists. read it and print the new timestamp if its older than 5 hours.
                        fs.readFile(historyFile, function(err, data) {
                            if (err) throw err;
                            var unix = Math.round(+new Date() / 1000);
                            var oldUnix = data.toString();
                            if (unix - oldUnix > 18000) {
                                fs.writeFile(historyFile, unix, function(err) {
                                    if (err != null) {
                                        console.log(err);
                                    }
                                });
                            }
                        });
                        fs.writeFile(historyFile, unix, function(err) {
                            if (err != null) {
                                console.log(err);
                            }
                        });

                    } else if (err.code == 'ENOENT') {
                        // Doesn't exist, place a new unix timestamp in the file.
                        fs.writeFile(historyFile, unix, function(err) {
                            if (err != null) {
                                console.log(err);
                            }
                        });
                    } else {
                        console.log('Some other error: ', err.code);
                    }
                });
            }*/
        }
    });
    bot.on(bot.events.chatMessage, function(data) {
        // Make sure the damn bot doesn't damn crash damnit.
        if (typeof data === "undefined" || typeof data.user === "undefined") {
            console.log("Data is undefined");
            // It won't crash now.
            bot.reconnect();
            return 1;
        }

        try {
            if (data.user.id == lastChat.userID) {
                data.id = lastChat.id;
            } else {
                lastChat.id = data.id;
                lastChat.userID = data.user.id;
            }

            if (/\@NightBlueBot (rock|paper|scissors)/gi.test(data.message)) {
                var rps = ['rock', 'paper', 'scissors'],
                    pick = Math.floor(Math.random() * rps.length);
                bot.sendChat('@' + data.user.username + ' ' + ['rock', 'paper', 'scissors'][pick]);
            }

            var advertiseMatch = data.message.match(/dubtrack.fm\/join\/(.[^ ]+)/i);
            if (advertiseMatch) {
                if (advertiseMatch[1] !== 'nightblue3') {
                    bot.moderateDeleteChat(data.id);
                    bot.moderateBanUser(data.user.id);
                    bot.sendChat("User banned. Reason: Advertising Other DubTrack Rooms.");
                    return 1;
                }
            }
            var banData = "banphrases.json";
            fs.stat(banData, function(err, stat) {
                var banJSON = jsonfile.readFileSync(banData);
                var phrases = banJSON.banPhrases;
                for (var key in phrases) {
                    if (typeof phrases[key] != 'function' && data.user.role == null) {
                        if (data.message.toLowerCase().indexOf(phrases[key].phrase.toLowerCase()) != -1) {
                            bot.moderateDeleteChat(data.id);
                            if (phrases[key].banTime == "p" || phrases[key].banTime == "P") {
                                bot.moderateBanUser(data.user.id);
                            } else {
                                bot.moderateBanUser(data.user.id, phrases[key].banTime);
                            }
                            bot.sendChat("User banned. Reason: " + phrases[key].reason);
                            return 1;
                        }
                    }
                }
            });

            var re = /http(|s):\/\/.+\.(gif|png|jpg|jpeg)/i;
            if (re.test(data.message.toLowerCase()) && data.user.id !== bot.getSelf().id) {
                var toSave = {
                    timestamp: [Date.now(), new Date().toString()],
                    user: [data.user.username, data.user.id],
                    message: data.message,
                    punishType: undefined
                };

                if (imgRemovalDubs_Amount >= 0 && data.user.dubs < imgRemovalDubs_Amount) {
                    bot.moderateDeleteChat(data.id);
                    timeMute(
                        data.user,
                        imgRemovalDubs_Time * 60000,
                        'User muted for ' + imgRemovalDubs_Time + ' minutes. Reason: Sending Images having less than ' + imgRemovalDubs_Amount + ' dubs.'
                    );
                    toSave.punishType = 'mute';
                } else {
                    setTimeout(function() {
                        bot.moderateDeleteChat(data.id);
                    }, imgTime * 1000);
                    toSave.punishType = 'removal';
                }

                fs.exists('python/imagelogs.json', function(itDoes) {
                    var lastLogs = itDoes ? JSON.parse(fs.readFileSync('python/imagelogs.json', 'utf8')) : {
                        info: 'File containing user chat logs where the link of an image was found. Useful to detect what type of image an user has posted.',
                        logs: []
                    };
                    if (lastLogs.logs.push(toSave) >= imageLogMax) {
                        lastLogs.logs.shift();
                    }
                    fs.writeFile('python/imagelogs.json', JSON.stringify(lastLogs, null, 4), 'utf8', function(error) {
                        if (error) console.log('Error updating imagelogs.json →', error);
                    });
                });
            }

            var thisUser = data.user.username;

            /*var userFile;
            userFile = "quotes/" + thisUser + ".txt";
            fs.stat(userFile, function(err, stat) {
                var thisUser = data.user.username;

                var userFile = "quotes/" + thisUser + ".txt";

                if (err == null) {
                    fs.appendFileSync(userFile, data.message + os.EOL)

                } else if (err.code == 'ENOENT') {
                    fs.writeFile(userFile, data.message + os.EOL, function(err) {
                        if (err != null) {
                            console.log(err);
                        }
                    });
                } else {
                    console.log('Some other error: ', err.code);
                }
            });*/

            if (userCooldown.contains(thisUser)) {
                return 1;
            } else if (data.user.role == null && data.message.indexOf('!') != -1) {
                userCooldown.push(thisUser);
                setTimeout(function() {
                    userCooldown.remove(thisUser);
                }, cooldown * 1000);
            } else if (data.user.role == null) {} else if (bot.roles[data.user.role].type == "resident-dj" && data.message.indexOf('!') != -1) {
                userCooldown.push(thisUser);
                setTimeout(function() {
                    userCooldown.remove(thisUser);
                }, cooldown * 1000 * 0.5);
            }
            // Non Commands -- Bot Responses to tagging him.
            if (data.message.indexOf("NightBlueBot") != -1) {

                // Responses
                if (data.message.indexOf("make me some food") != -1 || data.message.indexOf("make me some noodles") != -1) {
                    bot.sendChat("@" + thisUser + " make your own damn food!");
                }
                /*else if(data.message.indexOf("you suck") != -1)
                {
                    bot.sendChat("@"+thisUser+" I think your comment was ment for @Netuxbot");
                }*/
                else if (data.message.indexOf("who made you") != -1) {
                    bot.sendChat("@zubohm of course!");
                } else if (data.message.indexOf("are you real") != -1) {
                    bot.sendChat("@" + thisUser + " yes I am real.");
                } else if (data.message.indexOf("are you human") != -1) {
                    bot.sendChat("@" + thisUser + " no, I'm a robot with AI functionality.");
                } else if (data.message.indexOf("what can you do") != -1) {
                    bot.sendChat("@" + thisUser + " Lots of things, including your mom :kappa:");
                } else if (data.message.indexOf("are you a fan of nightblue3") != -1) {
                    bot.sendChat("@" + thisUser + " I love NB3 <3!");
                } else if (data.message.indexOf("how old are you") != -1) {
                    bot.sendChat("Well, @" + thisUser + ", I've currently been running for " + runTime + " seconds");
                } else if (data.message.indexOf("you are sexy") != -1) {
                    bot.sendChat("How do you know that, @" + thisUser + "??");
                } else if (data.message.indexOf("call 911") != -1) {
                    bot.sendChat("*Beep Boop* 9-1-1 how may I help you? *Beep Boop*");
                } else if (data.message.indexOf("what's your opinion on matt") != -1) {
                    bot.sendChat("@" + thisUser + " me and Matt are in a domestic partnership, I love him with all of my circuits.");
                } else if (data.message.indexOf("gender") != -1) {
                    bot.sendChat("@" + thisUser + " I am female!");
                } else if (data.message.indexOf("reservations") != -1) {
                    bot.sendChat("*Beep Boop* I've made you reservations for Friday at Noon.");
                } else if (data.message.indexOf("what do you think about the death of your fellow friend?") != -1) {
                    bot.sendChat("I really don't care, never liked him anyways (plus he was winning me in botwars)");
                } else if (data.message.indexOf("how late") != -1) {
                    var d = new Date();
                    var formatted_time = time_format(d);
                    bot.sendChat("At this moment it is: " + formatted_time);
                } else if (data.message.indexOf("answer me") != -1) {
                    bot.sendChat('@' + thisUser + ' I am.');
                }

            }

            if (data.message.indexOf("isn't that right") != -1 && data.message.indexOf("NightBlueBot") != -1 && data.user.username == "zubohm") {
                bot.sendChat("That's right, creator! :)")
            } else if (data.message.indexOf("@NightBlueBot o/") != -1) {
                bot.sendChat("@" + thisUser + " o/");
            } else if (data.message.indexOf("@NightBlueBot who's your daddy?") != -1) {
                bot.sendChat("@" + thisUser + " @zubohm is my daddy");
            }

            if (/.*this.*new.*plug.*/i.test(data.message))
                bot.sendChat('@' + thisUser + ' http://imgur.com/uG1wSj3');


            if (data.message == "!hello") {
                bot.sendChat("Hi There, @" + data.user.username);
            } else if (data.message == "!agar") {
                AgarioClient.servers.createParty("US-Atlanta", function(data) {
                    bot.sendChat("@" + thisUser + " has created an agario party. Join them at www.agar.io/#" + data.key);




                });

            } else if (data.message.split(" ")[0] == "!setcd") {
                if (bot.roles[data.user.role].rights.contains("ban")) {
                    if (data.message.split(" ")[1] == undefined) return 1;
                    var input = isNaN(data.message.split(" ")[1]);
                    if (!input) {
                        cooldown = data.message.split(" ")[1];
                        bot.sendChat("@" + thisUser + " set cooldown to " + data.message.split(" ")[1] + " seconds.");
                    }
                }
            } else if (data.message.split(" ")[0] == "!setimgtime") {
                if (bot.roles[data.user.role].rights.contains("ban")) {
                    if (data.message.split(" ")[1] == undefined) return 1;
                    var input = isNaN(data.message.split(" ")[1]);
                    if (!input) {
                        imgTime = data.message.split(" ")[1];
                        bot.sendChat("@" + thisUser + " set image removal time to " + data.message.split(" ")[1] + " seconds.");
                    }
                }
            } else if (data.message.split(" ")[0] == "!del") {
                var del = data.message.split(" ")[1];
                bot.sendChat("@" + thisUser + " " + del + " has been deleted. *Beep Boop*");
            } else if (data.message == "!gaben") {
                reddit.r('gentlemangabers', function(err, data, res) {
                    if (err != null) {
                        console.log(err);
                    }
                    var children = data.data.children;
                    var random = Math.floor((Math.random() * children.length - 1) + 1);
                    if (children[random].data.url.indexOf("imgur") > -1) {
                        bot.sendChat(children[random].data.url);
                    }
                });
            }
            /*else if (data.message.split(" ")[0] == "!quote") {
                var username = data.message.split(" ")[1];
                var userFile;
                userFile = "quotes/" + username + ".txt";
                fs.stat(userFile, function(err, stat) {
                    var username = data.message.split(" ")[1];

                    var userFile = "quotes/" + username + ".txt";

                    if (err == null) {
                        fs.readFile(userFile, function(err, data) {
                            if (err) throw err;

                            // console.log(data);
                            var quoteArray = [];
                            quoteArray = data.toString().split(os.EOL);
                            var random = Math.floor((Math.random() * quoteArray.length) + 1);
                            bot.sendChat("@" + thisUser + " @" + username + " says: " + quoteArray[random]);
                        });


                    } else if (err.code == 'ENOENT') {
                        bot.sendChat("@" + thisUser + " that user doesn't have any quotes.");
                    } else {
                        console.log('Some other error: ', err.code);
                    }
                });
            }*/
            else if (data.message.split(" ")[0] == "!meme") {
                var meme = data.message.replace("!meme ", "");

                if (meme.indexOf("why not") != -1) {
                    bot.sendChat("@" + thisUser + " generating meme..");
                    var bottom = meme.replace("why not", "");
                    captainApi.createMeme('kzsGfQ', 'WHY NOT', bottom)
                        .then(function(memeUrl) {
                            // use generated meme

                            bot.sendChat(memeUrl + ".jpg");
                        }, function(err) {
                            // handle error
                            console.log(err);
                        });

                } else if (meme.indexOf("one does not simply") != -1) {
                    bot.sendChat("@" + thisUser + " generating meme..");
                    var bottom = meme.replace("one does not simply", "");
                    captainApi.createMeme('da2i4A', 'ONE DOES NOT SIMPLY', bottom)
                        .then(function(memeUrl) {
                            // use generated meme

                            bot.sendChat(memeUrl + ".jpg");
                        }, function(err) {
                            // handle error
                            console.log(err);
                        });

                } else if (meme.indexOf("too damn high") != -1) {
                    bot.sendChat("@" + thisUser + " generating meme..");
                    var top = meme.replace("too damn high", "");
                    captainApi.createMeme('RCkv6Q', top, "too damn high")
                        .then(function(memeUrl) {
                            // use generated meme

                            bot.sendChat(memeUrl + ".jpg");
                        }, function(err) {
                            // handle error
                            console.log(err);
                        });

                } else if (meme.indexOf("I DONT KNOW") != -1) {
                    bot.sendChat("@" + thisUser + " generating meme..");
                    var bottom = meme.replace("I DONT KNOW", "");
                    captainApi.createMeme('sO-Hng', 'I DONT KNOW', bottom)
                        .then(function(memeUrl) {
                            // use generated meme

                            bot.sendChat(memeUrl + ".jpg");
                        }, function(err) {
                            // handle error
                            console.log(err);
                        });

                } else if (meme.indexOf("not sure if") != -1) {
                    bot.sendChat("@" + thisUser + " generating meme..");
                    var bottom = meme.replace("not sure if", "");
                    captainApi.createMeme('CsNF8w', 'not sure if', bottom)
                        .then(function(memeUrl) {
                            // use generated meme

                            bot.sendChat(memeUrl + ".jpg");
                        }, function(err) {
                            // handle error
                            console.log(err);
                        });

                } else if (meme.indexOf("confesion bear") != -1) {
                    bot.sendChat("@" + thisUser + " generating meme..");
                    var bottom = meme.replace("confesion bear", "");
                    captainApi.createMeme('hJpgDA', '', bottom)
                        .then(function(memeUrl) {
                            // use generated meme

                            bot.sendChat(memeUrl + ".jpg");
                        }, function(err) {
                            // handle error
                            console.log(err);
                        });

                } else if (meme.indexOf("that'd be great") != -1) {
                    bot.sendChat("@" + thisUser + " generating meme..");
                    var bottom = meme.replace("that'd be great", "");
                    captainApi.createMeme('q1cQXg', bottom, 'that\'d be great')
                        .then(function(memeUrl) {
                            // use generated meme

                            bot.sendChat(memeUrl + ".jpg");
                        }, function(err) {
                            // handle error
                            console.log(err);
                        });

                } else if (meme.indexOf("and at this point i'm too afraid to ask") != -1) {
                    bot.sendChat("@" + thisUser + " generating meme..");
                    var bottom = meme.replace("and at this point i'm too afraid to ask", "");
                    captainApi.createMeme('bIbwgQ', bottom, 'and at this point i\'m too afraid to ask')
                        .then(function(memeUrl) {
                            // use generated meme

                            bot.sendChat(memeUrl + ".jpg");
                        }, function(err) {
                            // handle error
                            console.log(err);
                        });

                }
            } else if (data.message == "!song") {
                bot.sendChat("@" + thisUser + " The current song is " + currentName + ", the link is " + currentMediaPermaLink);
            } else if (data.message == "!stream") {
                client.streams({
                    channel: "nightblue3"
                }, function(err, response) {
                    if (err != null) {
                        console.log(err);
                    }
                    if (response.stream != null) {
                        bot.sendChat("NightBlue3 is streaming " + response.stream.game + "! You can watch him at http://www.twitch.tv/nightblue3!");
                    } else {
                        bot.sendChat("NightBlue3 is not currently streaming! He streams at http://www.twitch.tv/nightblue3");
                    }
                });
            } else if (data.message == "!nyancat" && neonCat == true) {
                bot.sendChat(":nyancat: ~ Meow!");

                neonCat = false;
                setTimeout(function() {
                    neonCat = true;
                }, 60000);
            }
            /*else if (data.message == "!lastplayed") {
                var historyFile = "history/" + currentID + ".txt";
                fs.stat(historyFile, function(err, stat) {

                    var historyFile = "history/" + currentID + ".txt";
                    var thisUser = data.user.username;
                    if (err == null) {

                        var unix = Math.round(+new Date() / 1000);
                        if (unix < 300) {
                            bot.sendChat("@" + thisUser + " no logged history for this song.");
                            return 1;
                        }
                        fs.readFile(historyFile, function(err, data) {
                            if (err) throw err;
                            var timeDifference = unix - data.toString();
                            var differenceDate = new Date(timeDifference * 1000);
                            var diffHours = differenceDate.getUTCHours();
                            var diffMinutes = differenceDate.getUTCMinutes();
                            var diffSeconds = differenceDate.getUTCSeconds();
                            bot.sendChat("@" + thisUser + " this song was last played " + diffHours + ' hours, ' + diffMinutes + ' minutes, and ' + diffSeconds + " seconds ago");
                        });



                    } else if (err.code == 'ENOENT') {
                        bot.sendChat("@" + thisUser + " this song hasn't played within the last 5 hours.");
                    } else {
                        console.log('Some other error: ', err.code);
                    }
                });
            }*/
            else if (data.message == "!props") {
                if (thisUser === currentDJName) {
                    bot.sendChat('@' + thisUser + ' we know you love your song, but let others also prop you!');
                    return;
                }
                var userFile;
                userFile = "users/" + currentDJName + ".json";
                fs.stat(userFile, function(err, stat) {
                    var username = data.message.split(" ")[1];
                    var userFile = "users/" + currentDJName + ".json";
                    var username = data.message.split(" ")[1];
                    var userData = {};

                    if (err == null) {
                        try {
                            userData = jsonfile.readFileSync(userFile);
                        } catch (err) {
                            userData = {
                                love: 0,
                                props: 0
                            };
                            jsonfile.writeFile(userFile, userData, function(err) {
                                if (err != null) {
                                    console.log(err);
                                }
                            });
                        }
                        userData.props += 1;
                        userData.love = 0;
                        jsonfile.writeFile(userFile, userData, function(err) {
                            if (err != null) {
                                console.log(err);
                            }
                        });
                        bot.sendChat("@" + currentDJName + " " + thisUser + " likes your song! Keep it up! :)");

                    } else if (err.code == 'ENOENT') {

                        userData.props = 1;

                        fs.writeFile(userFile, JSON.stringify(userData), function(err) {
                            if (err != null) {
                                console.log(err);
                            }
                        });
                        bot.sendChat("@" + currentDJName + " " + thisUser + " likes your song! Keep it up! :)");


                    } else {
                        console.log('Some other error: ', err.code);
                    }
                });



            }
            else if (data.message == "!eta") {
                bot.sendChat("In order to get the ETA Timer, please download the DubX Extension from https://dubx.net/");
                bot.sendChat("http://i.imgur.com/ldj2jqf.png");
            }
            else if (data.message == "!myprops") {

                var userFile;
                var thisUser = data.user.username;
                userFile = "users/" + thisUser + ".json";
                fs.stat(userFile, function(err, stat) {
                    var thisUser = data.user.username;
                    var userFile = "users/" + thisUser + ".json";
                    var username = data.message.split(" ")[1];
                    var userData = {};


                    if (err == null) {
                        var userData = jsonfile.readFileSync(userFile);
                        if (userData.props == null) {
                            bot.sendChat("@" + thisUser + " you don't have any props! Play a song to get props! :)");
                            return 1;
                        }

                        bot.sendChat("@" + thisUser + " you have " + userData.props + " props! :)");


                    } else if (err.code == 'ENOENT') {


                        bot.sendChat("@" + thisUser + " you don't have any props! Play a song to get props! :)");


                    } else {
                        console.log('Some other error: ', err.code);
                    }
                });
            }
            else if (data.message == "!mylove") {

                var userFile;
                var thisUser = data.user.username;
                userFile = "users/" + thisUser + ".json";
                fs.stat(userFile, function(err, stat) {
                    var thisUser = data.user.username;
                    var userFile = "users/" + thisUser + ".json";
                    var username = data.message.split(" ")[1];
                    var userData = {};


                    if (err == null) {
                        var userData = jsonfile.readFileSync(userFile);
                        if (userData.love == null || userData.love == 0) {
                            bot.sendChat("@" + thisUser + " you don't have any love! :(");
                            return 1;
                        }

                        bot.sendChat("@" + thisUser + " you have " + userData.love + " hearts! :)");


                    } else if (err.code == 'ENOENT') {


                        bot.sendChat("@" + thisUser + " you don't have any love! :(");


                    } else {
                        console.log('Some other error: ', err.code);
                    }
                });
            }
            else if (data.message == "!rules") {
                var target = data.message.split(" ")[1];
                var targetName = (target == undefined ? "" : (target.indexOf('@') == 0 ? target : '@' + target));
                bot.sendChat(targetName + " Rules: http://git.io/vWJnY");

            } else if (data.message.split(" ")[0] == "!kappa") {
                var target = data.message.split(" ")[1];
                var targetName = (target == undefined ? "" : (target.indexOf('@') == 0 ? target : '@' + target));
                bot.sendChat(targetName + " " + thisUser + " has sent a Kappa your way! :kappa:");

            } else if (data.message.split(" ")[0] == "!dubx") {
                var target = data.message.split(" ")[1];
                var targetName = (target == undefined ? "" : (target.indexOf('@') == 0 ? target : '@' + target));
                bot.sendChat(targetName + " you can download DubX at http://www.dubx.net");

            } else if (data.message.split(" ")[0] == "!css") {
                var target = data.message.split(" ")[1];
                var targetName = (target == undefined ? "" : (target.indexOf('@') == 0 ? target : '@' + target));
                bot.sendChat(targetName + " Fancy css files: http://imgur.com/a/WeXhS");
                bot.sendChat("Custom css chooser: https://goo.gl/Gs6gih");

            } else if (data.message.split(" ")[0] == "!bg") {
                var args = data.message.split(' ').slice(1);
                var target = args[args.length - 1];
                var targetName = (target == undefined ? "" : (target.indexOf('@') == 0 ? target : '@' + target));
                var bgLinks = {
                    'Snaky': 'https://imgur.com/a/ZO2Nz',
                    'Maskinen': 'https://imgur.com/a/Up7b2',
                    'Netux': 'https://imgur.com/a/j6QbM',
                    'Frosolf': 'https://imgur.com/a/NZvz1 | https://imgur.com/a/Xi4Cx (anime)'
                };

                function checkIfSpecify() {
                    var r = null;
                    Object.keys(bgLinks).forEach(function(name) {
                        if (name.toLowerCase() === args[0].toLowerCase())
                            r = name;
                    });
                    return r;
                }
                var bgUrl;
                if (args.length > 0 && (bgUrl = checkIfSpecify()) !== null) {
                    bot.sendChat(targetName + ' ' + bgUrl + "'s BGs: " + bgLinks[bgUrl]);
                } else {
                    Object.keys(bgLinks).forEach(function(name, i) {
                        bot.sendChat((i === 0 ? targetName : '') + ' ' + name + "'s BGs: " + bgLinks[name]);
                    });
                }
            } else if (data.message.split(" ")[0] == "!queue") {
                var target = data.message.split(" ")[1];
                var targetName = (target == undefined ? "" : (target.indexOf('@') == 0 ? target : '@' + target));
                /*
            bot.sendChat(targetName + " 1. Click Queue a song (under the video)");	
			bot.sendChat( " 2. Search the song you would like to play in the search bar at the top.")
			bot.sendChat( " 3. Press the play button next to the song of your choice. Your song will have been queued")
			*/
                bot.sendChat(targetName + ' How to Queue a Song: https://imgur.com/a/FghLg');
            }
            else if (data.message.split(" ")[0] == "!hate") {
                if (data.message.split(" ").length > 1) {
                    var username = data.message.split(" ")[1].replace("@", "");
                    var userFile;
                    userFile = "users/" + username + ".json";
                    if (username == "NightBlueBot") {
                        bot.sendChat("You can't hate me, you can only love me, @" + thisUser + "!");

                    } else if (username == "everyone") {
                        bot.sendChat("Nice try! :4head:");
                        bot.moderateBanUser(data.user.id, 60);
                    } else {
                        fs.stat(userFile, function(err, stat) {
                            var username = data.message.split(" ")[1].replace("@", "");
                            var userFile = "users/" + username + ".json";

                            var userData = {};

                            var loveArray = ["http://24.media.tumblr.com/7bd034e65b8db205dd4e94e60259e169/tumblr_n0ym2dtaUG1sqhy0go1_250.gif"];
                            if (err == null) {
                                var userData = jsonfile.readFileSync(userFile);
                                userData.love -= 1;
                                jsonfile.writeFile(userFile, userData, function(err) {
                                    if (err != null) {
                                        console.log(err);
                                    }
                                });

                                bot.sendChat("@" + username + " " + thisUser + " has broken one of your hearts </3. You now have " + userData.love + " hearts.");



                            } else if (err.code == 'ENOENT') {
                                userData.love = -1;

                                fs.writeFile(userFile, JSON.stringify(userData), function(err) {
                                    if (err != null) {
                                        console.log(err);
                                    }
                                });

                                bot.sendChat("@" + username + " " + thisUser + " has broken one of your hearts </3. You now have " + userData.love + " hearts.");


                            } else {
                                console.log('Some other error: ', err.code);
                            }
                        });
                    }
                }

            }
            else if (data.message.split(" ")[0] == "!plops") {
                bot.sendChat("@" + thisUser + " :poop:");
            } else if (data.message.split(" ")[0] == "!ping") {
                bot.sendChat("@" + thisUser + " pong!");
            } else if (data.message.split(" ")[0] == "!pong") {
                bot.sendChat("@" + thisUser + " ping!");
            } else if (data.message.split(" ")[0] == "!selfpromotion") {
                bot.sendChat('Please refrain from any self promotion in this room. As told in the rules: http://i.imgur.com/2zE0SPf.png');
            } else if (data.message.split(" ")[0] == "!english") {
                var target = data.message.split(" ")[1];
                var targetName = (target == undefined ? "" : (target.indexOf('@') == 0 ? target : '@' + target));
                bot.sendChat(targetName + ' Please stick to English in this room, doing otherwise will result in a mute.');
            } else if (data.message.split(" ")[0] == "!shush") {
                var target = data.message.split(" ")[1];
                var targetName = (target == undefined ? "" : (target.indexOf('@') == 0 ? target : '@' + target));
                bot.sendChat(targetName + ' (click for better quality) http://i.imgur.com/uFE8PfA.png');
                bot.sendChat('(snippet from Community Rules, http://git.io/vWJnY#miscellaneous)');
            } else if (/!(gema|fuckgema|gemasucks|gemaisshit)/i.test(data.message.split(" ")[0])) {
                var target = data.message.split(" ")[1];
                var targetName = (target == undefined ? "" : (target.indexOf('@') == 0 ? target : '@' + target));
                bot.sendChat(targetName + ' to bypass GEMA blocked videos you can use this extension http://www.unblocker.yt/en/');
            } else if (data.message.split(" ")[0] === 'videocheck') {
                var target = data.message.split(" ")[1];
                var targetName = (target == undefined ? "" : (target.indexOf('@') == 0 ? target : '@' + target));
                bot.sendChat(targetName + ' check if current video is available on any country at https://nb3x.nl/videocheck.php');
            } else if (data.message.split(" ")[0] == "!request") {
                if (data.message.split(" ").length > 1) {
                    var request = data.message.replace("!request ", "");
                    fs.appendFileSync("requests.txt", thisUser + " : " + request + os.EOL);
                    bot.sendChat("@" + thisUser + " your request has been acknowledged!");
                }

            } else if (data.message == "!" + thisUser) {
                bot.sendChat("@" + thisUser + " is an awesome dude! <3 :)");
            }
            else if (data.message.split(" ")[0] == "!love") {
                if (data.message.split(" ").length > 1) {
                    var username = data.message.split(" ")[1].replace("@", "");
                    if (username == thisUser) {
                        bot.sendChat("@" + thisUser + " just use your hand....");
                        return 1;
                    } else if (username == "everyone" || username == "all") {
                        bot.sendChat("Nice try! :4head:");
                        bot.moderateBanUser(data.user.id, 60);
                        return 1;
                    }
                    var userFile;
                    userFile = "users/" + username + ".json";
                    if (username.toLowerCase() == "NightBlueBot") {
                        bot.sendChat("I love you too, @" + thisUser + "!");
                        return 1;

                    } else {
                        fs.stat(userFile, function(err, stat) {
                            var username = data.message.split(" ")[1].replace("@", "");
                            var userFile = "users/" + username + ".json";

                            var userData = {};

                            var loveArray = ["http://24.media.tumblr.com/7bd034e65b8db205dd4e94e60259e169/tumblr_n0ym2dtaUG1sqhy0go1_250.gif"];
                            if (err == null) {
                                try {
                                    userData = jsonfile.readFileSync(userFile);
                                } catch (err) {
                                    userData = {
                                        love: 0,
                                        props: 0
                                    };
                                    jsonfile.writeFile(userFile, userData, function(err) {
                                        if (err != null) {
                                            console.log(err);
                                        }
                                    });
                                }
                                userData.love += 1;
                                jsonfile.writeFile(userFile, userData, function(err) {
                                    if (err != null) {
                                        console.log(err);
                                    }
                                });

                                bot.sendChat("@" + username + " " + thisUser + " has sent some love your way! <3 You now have " + userData.love + " hearts.");



                            } else if (err.code == 'ENOENT') {
                                userData.love = 1;

                                fs.writeFile(userFile, JSON.stringify(userData), function(err) {
                                    if (err != null) {
                                        console.log(err);
                                    }
                                });
                                if (thisUser == "netuxbot" && username == "zubbot") {
                                    bot.sendChat("I love you too, @netuxbot!");

                                } else {
                                    bot.sendChat("@" + username + " " + thisUser + " has sent some love your way! <3 You now have " + userData.love + " hearts.");

                                }
                            } else {
                                console.log('Some other error: ', err.code);
                            }
                        });
                    }

                }
            }
            else if (/!(love\%|lovepercent|lovepercentage)/.test(data.message.split(" ")[0])) {
                if (data.message.split(" ").length > 1) {
                    var username = data.message.split(" ")[1].replace("@", "");
                    if (username == thisUser) {
                        bot.sendChat("@" + thisUser + " can't tell that so I'm asking you: how much do you love yourself?");
                        return;
                    } else if (username === 'NightBlueBot') {
                        bot.sendChat('@' + thisUser + " of course I love you 100%, silly <3");
                        return;
                    }
                    var username2 = thisUser;
                    if (data.message.split(' ').length > 2) username2 === data.message.split(' ')[2].replace('@', '');
                    bot.sendChat('@' + thisUser + ' there is ' + (Math.floor(Math.random() * 100)) + '% of :nb3h: between ' + username2 + ' and ' + username);
                }
            } else if(/!(community|room|roominfo|info)/.test(data.message.split(' ')[0])) {
                var target = data.message.split(" ")[1];
                var targetName = (target == undefined ? "" : (target.indexOf('@') == 0 ? target : '@' + target));
                bot.sendChat(targetName + 'This community plays EDM | Trap | and Chill. Songs over 6:30 will be skipped so please follow the guidelines! Rules: http://git.io/vWJnY')
            }
            // !mute
            else if (bot.hasPermission(data.user, 'mute') && data.message.split(" ")[0] == "!mute") {
                var username = data.message.split(" ")[1].replace("@", "");
                var muteuser = bot.getUserByName(username, true);
                if (muteuser) {
                    var muteTime = parseInt(data.message.split(" ")[2]);
                    timeMute(muteuser, 0, "@" + username + " Muted for " + muteTime + " minutes!");
                }
                else {
                    bot.sendChat("No user found by the name " + username + ".")
                }

            }
            // !timeout
            else  if (bot.hasPermission(data.user, 'mute') && bot.hasPermission(data.user, 'kick') && data.message.split(" ")[0] == "!timeout") {
                var username = data.message.split(" ")[1].replace("@", "");
                var muteuser = bot.getUserByName(username, true);
                if (muteuser) {
                    var muteTime = parseInt(data.message.split(" ")[2]);
                    timeout(muteuser, 0, "@" + username + " timed out for " + muteTime + " minutes!");
                }
                else {
                    bot.sendChat("No user found by the name " + username + ".")
                }
            }
            // !seppuku
            else if (data.message.split(" ")[0] == "!seppuku") {
                clearUserChat(data.user);
                bot.sendChat("Cleared all chat by " + data.user.name);
            }

            if (data.user.username == "netuxbot") {
                var netuxchoice = data.message.toLowerCase();
                botWars = botWars.toLowerCase();
                if (netuxchoice == "rock" || netuxchoice == "paper" || netuxchoice == "scissors") {
                    if (botWars == "rock" && netuxchoice == "scissors") {
                        var nb3Score = parseInt(fs.readFileSync("scores/NightBlueBot.txt"));
                        var netuxScore = parseInt(fs.readFileSync("scores/netuxbot.txt"));
                        nb3Score += 1;
                        fs.writeFileSync("scores/NightBlueBot.txt", nb3Score);
                        bot.sendChat("@NightBlueBot wins! Score: " + nb3Score + " - " + netuxScore + " (NB3-Netux)");

                    } else if (botWars == "paper" && netuxchoice == "rock") {
                        var nb3Score = parseInt(fs.readFileSync("scores/NightBlueBot.txt"));
                        var netuxScore = parseInt(fs.readFileSync("scores/netuxbot.txt"));
                        nb3Score += 1;
                        fs.writeFileSync("scores/NightBlueBot.txt", nb3Score);
                        bot.sendChat("@NightBlueBot wins! Score: " + nb3Score + " - " + netuxScore + " (NB3-Netux)");
                    } else if (botWars == "scissors" && netuxchoice == "paper") {
                        var nb3Score = parseInt(fs.readFileSync("scores/NightBlueBot.txt"));
                        var netuxScore = parseInt(fs.readFileSync("scores/netuxbot.txt"));
                        nb3Score += 1;
                        fs.writeFileSync("scores/NightBlueBot.txt", nb3Score);
                        bot.sendChat("@NightBlueBot wins! Score: " + nb3Score + " - " + netuxScore + " (NB3-Netux)");
                    } else if (botWars == netuxchoice) {
                        bot.sendChat("It's a tie!");
                    } else {
                        var nb3Score = parseInt(fs.readFileSync("scores/NightBlueBot.txt"));
                        var netuxScore = parseInt(fs.readFileSync("scores/netuxbot.txt"));
                        netuxScore += 1;
                        fs.writeFileSync("scores/netuxbot.txt", netuxScore);
                        bot.sendChat("@netuxbot wins! Score: " + nb3Score + " - " + netuxScore + " (NB3-Netux)");
                    }
                }
            }
        } catch (x) {
            //bot.sendChat('uh oh, something went wrong :S');
            console.log('uh oh, something went wrong | timestamp: ' + new Date().toString());
            console.error(x);
            console.log('---------------------------')
        }
    });

    connect();

    function command(user, args) {

    }



});

function roughSizeOfObject(object) {

    var objectList = [];

    var recurse = function(value) {
        var bytes = 0;

        if (typeof value === 'boolean') {
            bytes = 4;
        } else if (typeof value === 'string') {
            bytes = value.length * 2;
        } else if (typeof value === 'number') {
            bytes = 8;
        } else if (
            typeof value === 'object' && objectList.indexOf(value) === -1
        ) {
            objectList[objectList.length] = value;
            for (var i in value) {
                bytes += 8; // an assumed existence overhead
                bytes += recurse(value[i])
            }
        }

        return bytes;
    }

    return recurse(object);
}

function timeDifference(current, previous) {

    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;

    var elapsed = current - previous;

    if (elapsed < msPerMinute) {
        return Math.round(elapsed / 1000) + ' seconds ago';
    } else if (elapsed < msPerHour) {
        return Math.round(elapsed / msPerMinute) + ' minutes ago';
    } else if (elapsed < msPerDay) {
        return Math.round(elapsed / msPerHour) + ' hours ago';
    } else if (elapsed < msPerMonth) {
        return 'approximately ' + Math.round(elapsed / msPerDay) + ' days ago';
    } else if (elapsed < msPerYear) {
        return 'approximately ' + Math.round(elapsed / msPerMonth) + ' months ago';
    } else {
        return 'approximately ' + Math.round(elapsed / msPerYear) + ' years ago';
    }
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