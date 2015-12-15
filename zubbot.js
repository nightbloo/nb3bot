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
                        
                                            Nb3Bot is a bot created for the
                                            NightBlue3 room on www.dubtrack.fm
                                            
                                            
                        **************************************************************************


                        **************************************************************************
                                                      DEVELOPERS
                        **************************************************************************
                        
                                                    @ZubOhm
                                                    @Netux
                                                    @Matt
                            
                        **************************************************************************

                        **************************************************************************
                                                     COMMAND LIST
                        **************************************************************************
                        !hello - Bot Responds saying hello back.
                        !8ball [question] - self explanitory
                        !ban - fake ban by bot
                        !del [file] - Bot responds saying *file* deleted
                        !gaben - pulls a random gaben picture from /r/gentlemangabers
                        !urban [word(s)] - pulls a definition from urban dict.
                        !quote [user] - pulls a quote from the quotes folder for *user*
                        !meme [text] - generates a meme from memecaptain
                        !song - pulls song data from dubtrack
                        !stream - pulls nb3 stream data from twitch
                        !nyancat - MEOW
                        !lastplayed - Shows when the song was last played
                        !props - gives props to the current DJ
                        !love [user] - gives someone love <3
                        !eta - Tells user to download dubx
                        !myprops - let's the user view their props
                        !mylove - let's the user view their hearts
                        ~ !mykappas - let's the user view their kappas (?
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
                        
                        
                        Keys
                        ~ = reccomendation
                        [] = arg
                        **************************************************************************
                        **************************************************************************




*/
Array.prototype.contains = function(element){
    return (this.indexOf(element) > -1);
};
Array.prototype.remove = function(element){
    if(this.contains(element)){
        this.splice(this.indexOf(element), 1);
        return true;
    }
    else{
        return false;
    }
}
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
var account = fs.readFileSync("secrets/user.json");

var client = new TwitchClient(account);

var reddit = require('redwrap');
var AgarioClient = require('agario-client');
var agclient = new AgarioClient("nb3bot");
var runTime = 0;
setInterval(function() {
    runTime += 1;
}, 1000);
var Scraper = require('google-images-scraper');
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
    var userCooldown = new Array();
    var cooldown = (process.env.COOLDOWN == undefined ? 30 : process.env.COOLDOWN); // Cooldown in seconds
    var imgTime = (process.env.IMGTIME == undefined ? 15 : process.env.IMGTIME); // Cooldown in seconds
    var lastMediaFKID = "";

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

    console.log('Checking if all directories exists...');
    var dataDirectories = ['history', 'quotes', 'scores', 'users'];
    dataDirectories.forEach(function(dirStr) {
        if(fs.existsSync(dirStr)) return;
        console.log('Directory ' + dirStr + ' doesn\'t exists, creating it...');
        fs.mkdir(dirStr);
    });

    function connect() {
        bot.connect(process.env.DT_ROOM);
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
            if(data.media == undefined){
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
            }
            bot.updub();
            var historyFile = "history/" + lastMediaFKID + ".txt";
            // Check for history file
            if(lastMediaFKID.length > 0) {
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
            }
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
        if (/\@nb3bot (rock|paper|scissors)/gi.test(data.message)) {
            var rps = ['rock', 'paper', 'scissors'],
                pick = Math.floor(Math.random() * rps.length);
            bot.sendChat('@' + data.user.username + ' ' + ['rock', 'paper', 'scissors'][pick]);
        }

        // @netux: use regexp instead? /(http|https)(\:\/\/www\.dubtrack\.fm\/join\/)([^ ]+)/gi, then check if third match equals nightblue3
        if (data.message.indexOf("https://www.dubtrack.fm/join/") > -1 || data.message.indexOf("dubtrack.fm/join/") > -1) {
            if (data.message.indexOf("nightblue3") > -1) {

            } else {

                bot.moderateDeleteChat(data.id);
                bot.moderateBanUser(data.user.id);
                bot.sendChat("User banned. Reason: Advertising Other DubTrack Rooms.")
                return 1;

            }
        }
        var re = new RegExp(/\.(jpg|png|gif)/g);
        if (re.test(data.message.toLowerCase())) 
        {
            setTimeout(function(){bot.moderateDeleteChat(data.id);}, imgTime * 1000);
        }

        var thisUser = data.user.username;

        var userFile;
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
        });

        if(userCooldown.contains(thisUser)){
            return 1;
        } else if(data.user.role == null && data.message.indexOf('!') != -1) {
            userCooldown.push(thisUser);
            setTimeout(function(){userCooldown.remove(thisUser);}, cooldown * 1000);
        }
        // Non Commands -- Bot Responses to tagging him.
        if (data.message.indexOf("nb3bot") != -1) {

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

        if (data.message.indexOf("isn't that right") != -1 && data.message.indexOf("nb3bot") != -1 && data.user.username == "zubohm") {
            bot.sendChat("That's right, creator! :)")
        } else if (data.message.indexOf("@nb3bot o/") != -1) {
            bot.sendChat("@" + thisUser + " o/");
        } else if (data.message.indexOf("@nb3bot who's your daddy?") != -1) {
            bot.sendChat("@" + thisUser + " @zubohm is my daddy");
        }


        if (data.message == "!hello") {
            bot.sendChat("Hi There, @" + data.user.username);
        } else if (data.message == "!agar") {
            AgarioClient.servers.createParty("US-Atlanta", function(data) {
                bot.sendChat("@" + thisUser + " has created an agario party. Join them at www.agar.io/#" + data.key);




            });

        } else if(data.message.split(" ")[0] == "!setcd"){
            if(data.user.hasPermission('ban')){
                if(data.message.split(" ")[1] == undefined) return 1;
                var input = isNaN(data.message.split(" ")[1]);
                if (!input) 
                {
                    cooldown = data.message.split(" ")[1];
                    bot.sendChat("@" + thisUser + " set cooldown to " + data.message.split(" ")[1] + " seconds.");
                }
            }
        } else if(data.message.split(" ")[0] == "!setimgtime"){
            if(data.user.hasPermission('ban')){
                if(data.message.split(" ")[1] == undefined) return 1;
                var input = isNaN(data.message.split(" ")[1]);
                if (!input) 
                {
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
        } else if (data.message.split(" ")[0] == "!urban") {
            var def = urban(data.message.replace("!urban ", ""));
            def.first(function(json) {
                if (typeof(json) === "undefined") {

                    bot.sendChat("@" + thisUser + " there is no definition for " + data.message.replace("!urban ", ""));

                } else {
                    var deflong = json.definition;
                    var permalink = json.permalink;
                    var example = json.example;
                    var word = json.word;
                    if (deflong.length > 100) {
                        deflong = deflong.substring(0, 100) + "...";
                        bot.sendChat("@" + thisUser + " the definition of " + word + " is: ");
                        bot.sendChat(deflong + " " + permalink);
                    } else {
                        bot.sendChat("@" + thisUser + " the definition of " + word + " is: ");
                        bot.sendChat(deflong + "..." + permalink);
                    }
                }

            });



        }
        /*else if(data.message.split(" ")[0] == "!math")
        {
        	var answer = math.eval(data.message.replace("!math "));
        	bot.sendChat("@"+thisUser+" the answer is " + answer);

        }*/
         else if (data.message.split(" ")[0] == "!quote") {
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
        } else if (data.message.split(" ")[0] == "!meme") {
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
            if (currentType == "youtube") {
                bot.sendChat("@" + thisUser + " The current song is " + currentName + ", the link is http://youtube.com/watch?v=" + currentID);

            } else if (currentType == "soundcloud") {
                bot.sendChat("@" + thisUser + " The current song is " + currentName + ", the link is " + streamURL);
            }

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
                    bot.sendChat("NightBlue3 is not currently streaming!");
                }
            });
        } else if (data.message == "!nyancat" && neonCat == true) {
            bot.sendChat(":nyancat: ~ Meow!");

            neonCat = false;
            setTimeout(function() {
                neonCat = true;
            }, 60000);
        } else if (data.message == "!lastplayed") {
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
        } else if (data.message == "!props") {

            var userFile;
            userFile = "users/" + currentDJName + ".json";
            // console.log(userFile);
            fs.stat(userFile, function(err, stat) {
                var username = data.message.split(" ")[1];
                var userFile = "users/" + currentDJName + ".json";
                // console.log(userFile);
                var username = data.message.split(" ")[1];
                var userData = {};


                if (err == null) {
                    var userData = jsonfile.readFileSync(userFile);
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



        } else if (data.message == "!eta") {
            bot.sendChat("In order to get the ETA Timer, please download the DubX Extension from https://dubx.net/");
            bot.sendChat("http://i.imgur.com/ldj2jqf.png");
        } else if (data.message == "!myprops") {

            var userFile;
            var thisUser = data.user.username;
            userFile = "users/" + thisUser + ".json";
            console.log(userFile);
            fs.stat(userFile, function(err, stat) {
                var thisUser = data.user.username;
                var userFile = "users/" + thisUser + ".json";
                console.log(userFile);
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
        } else if (data.message == "!mylove") {

            var userFile;
            var thisUser = data.user.username;
            userFile = "users/" + thisUser + ".json";
            console.log(userFile);
            fs.stat(userFile, function(err, stat) {
                var thisUser = data.user.username;
                var userFile = "users/" + thisUser + ".json";
                console.log(userFile);
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
        } else if (data.message == "!rules") {
            var target = data.message.split(" ")[1];
            var targetName = (target == undefined ? "" : (target.indexOf('@') == 0 ? target : '@'+target));
            bot.sendChat(targetName + " Rules: http://git.io/vWJnY");
        } else if (data.message.split(" ")[0] == "!kappa") {
            var target = data.message.split(" ")[1];
            var targetName = (target == undefined ? "" : (target.indexOf('@') == 0 ? target : '@'+target));
            bot.sendChat(targetName + " " + thisUser + " has sent a Kappa your way! :kappa:");

        } else if (data.message.split(" ")[0] == "!dubx") {
            var target = data.message.split(" ")[1];
            var targetName = (target == undefined ? "" : (target.indexOf('@') == 0 ? target : '@'+target));
            bot.sendChat(targetName + " you can download DubX at http://www.dubx.net");
        }
        /*
        else if(data.message == "!botwars")
        {
            if(botWarsEnabled == true)
            {
                var actions = ["Rock", "Paper", "Scissors"];
                botWars = actions[Math.floor((Math.random() * actions.length - 1) + 1)];
                bot.sendChat(botWars);
                botWarsEnabled = false;
                setTimeout(function() {botWarsEnabled = true;}, 300000);
            }

        }
        */
        else if (data.message.split(" ")[0] == "!hate") {
            //http://26.media.tumblr.com/tumblr_m1dh1b4xmF1qkip5yo2_400.gif


            if (data.message.split(" ").length > 1) {
                var username = data.message.split(" ")[1].replace("@", "");
                var userFile;
                userFile = "users/" + username + ".json";
                console.log(userFile);
                if (username == "nb3bot") {
                    bot.sendChat("You can't hate me, you can only love me, @" + thisUser + "!");

                } else {
                    fs.stat(userFile, function(err, stat) {
                        var username = data.message.split(" ")[1].replace("@", "");
                        var userFile = "users/" + username + ".json";
                        console.log(userFile);

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




            //console.log(userData);
            //bot.sendChat("@"+username+" "+thisUser+" has sent some love your way! <3 You now have "+userData.love+" love points. http://24.media.tumblr.com/tumblr_lyfkhjbHRL1r8la7go1_500.gif");

        } else if (data.message.split(" ")[0] == "!plops") {
            bot.sendChat("@" + thisUser + " :poop:");
        } else if(data.message.split(' ')[0] === '!burps') {
            bot.sendChat('@' + thisUser + ' http://i.imgur.com/HL2yM7f.png');
        } else if (data.message.split(" ")[0] == "!ping") {
            bot.sendChat("@" + thisUser + " pong!");
        } else if (data.message.split(" ")[0] == "!pong") {
            bot.sendChat("@" + thisUser + " ping!");
        } else if (data.message.split(" ")[0] == "!girlalert") {
            bot.sendChat("GIRL ALERT http://i.imgur.com/5hlNg9X.gif GIRL ALERT");
        } else if(data.message.split(" ")[0] == "!selfpromotion"){
            bot.sendChat('Please refrain from any self promotion in this room. As told in the rules: http://i.imgur.com/2zE0SPf.png');
        }
        else if (data.message.split(" ")[0] == "!english") {
            var target = data.message.split(" ")[1];
            var targetName = (target == undefined ? "" : (target.indexOf('@') == 0 ? target : '@'+target));
            bot.sendChat(targetName + ' Please stick to English in this room, doing otherwise will result in a mute.');
        } else if (data.message.split(" ")[0] == "!sush") {
            var target = data.message.split(" ")[1];
            var targetName = (target == undefined ? "" : (target.indexOf('@') == 0 ? target : '@'+target));
            bot.sendChat(targetName + ' (click for better quality) http://i.imgur.com/uFE8PfA.png');
            bot.sendChat('(snippet from Community Rules, http://git.io/vWJnY#miscellaneous)');
        } else if (/!(gema|fuckgema|gemasucks|gemaisshit)/i.test(data.message.split(" ")[0])) {
            var target = data.message.split(" ")[1];
            var targetName = (target == undefined ? "" : (target.indexOf('@') == 0 ? target : '@'+target));
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
                //console.log("@"+thisUser+" your request has been acknowledged!");
            }

        } else if (data.message == "!" + thisUser) {
            bot.sendChat("@" + thisUser + " is an awesome dude! <3 :)");
        } else if (data.message.split(" ")[0] == "!love") {
            //http://26.media.tumblr.com/tumblr_m1dh1b4xmF1qkip5yo2_400.gif
            if (data.message.split(" ").length > 1) {
                var username = data.message.split(" ")[1].replace("@", "");
                if (username == thisUser) {
                    bot.sendChat("@" + thisUser + " just use your hand....");
                    return 1;
                }
                var userFile;
                userFile = "users/" + username + ".json";
                console.log(userFile);
                if (username.toLowerCase() == "nb3bot") {
                    bot.sendChat("I love you too, @" + thisUser + "!");
                    return 1;

                } else {
                    fs.stat(userFile, function(err, stat) {
                        var username = data.message.split(" ")[1].replace("@", "");
                        var userFile = "users/" + username + ".json";
                        console.log(userFile);

                        var userData = {};

                        var loveArray = ["http://24.media.tumblr.com/7bd034e65b8db205dd4e94e60259e169/tumblr_n0ym2dtaUG1sqhy0go1_250.gif"];
                        if (err == null) {
                            var userData = jsonfile.readFileSync(userFile);
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




            //console.log(userData);
            //bot.sendChat("@"+username+" "+thisUser+" has sent some love your way! <3 You now have "+userData.love+" love points. http://24.media.tumblr.com/tumblr_lyfkhjbHRL1r8la7go1_500.gif");

        } else if (/!(love\%|lovepercent|lovepercentage)/.test(data.message.split(" ")[0])) {
            if (data.message.split(" ").length > 1) {
                var username = data.message.split(" ")[1].replace("@", "");
                if (username == thisUser) {
                    bot.sendChat("@" + thisUser + " can't tell that so I'm asking you: how much do you love yourself?");
                    return;
                } else if(username === 'nb3bot') {
                    bot.sendChat('@' + thisUser + " of course I love you 100%, silly <3");
                    return;
                }
                var username2 = thisUser;
                if(data.message.split(' ').length > 2) username2 === data.message.split(' ')[2].replace('@', '');
                bot.sendChat('@' + thisUser + ' there is ' + (Math.floor(Math.random() * 100)) + '% of :nb3h: between ' + username2 + ' and ' + username);
            }
        }

        if (data.user.username == "netuxbot") {
            var netuxchoice = data.message.toLowerCase();
            botWars = botWars.toLowerCase();
            if (netuxchoice == "rock" || netuxchoice == "paper" || netuxchoice == "scissors") {
                if (botWars == "rock" && netuxchoice == "scissors") {
                    var nb3Score = parseInt(fs.readFileSync("scores/nb3bot.txt"));
                    var netuxScore = parseInt(fs.readFileSync("scores/netuxbot.txt"));
                    nb3Score += 1;
                    fs.writeFileSync("scores/nb3bot.txt", nb3Score);
                    bot.sendChat("@nb3bot wins! Score: " + nb3Score + " - " + netuxScore + " (NB3-Netux)");

                } else if (botWars == "paper" && netuxchoice == "rock") {
                    var nb3Score = parseInt(fs.readFileSync("scores/nb3bot.txt"));
                    var netuxScore = parseInt(fs.readFileSync("scores/netuxbot.txt"));
                    nb3Score += 1;
                    fs.writeFileSync("scores/nb3bot.txt", nb3Score);
                    bot.sendChat("@nb3bot wins! Score: " + nb3Score + " - " + netuxScore + " (NB3-Netux)");
                } else if (botWars == "scissors" && netuxchoice == "paper") {
                    var nb3Score = parseInt(fs.readFileSync("scores/nb3bot.txt"));
                    var netuxScore = parseInt(fs.readFileSync("scores/netuxbot.txt"));
                    nb3Score += 1;
                    fs.writeFileSync("scores/nb3bot.txt", nb3Score);
                    bot.sendChat("@nb3bot wins! Score: " + nb3Score + " - " + netuxScore + " (NB3-Netux)");
                } else if (botWars == netuxchoice) {
                    bot.sendChat("It's a tie!");
                } else {
                    var nb3Score = parseInt(fs.readFileSync("scores/nb3bot.txt"));
                    var netuxScore = parseInt(fs.readFileSync("scores/netuxbot.txt"));
                    netuxScore += 1;
                    fs.writeFileSync("scores/netuxbot.txt", netuxScore);
                    bot.sendChat("@netuxbot wins! Score: " + nb3Score + " - " + netuxScore + " (NB3-Netux)");
                }
            }
        }
        } catch(x) {
            bot.sendChat('uh oh, something went wrong :S');
            console.log('uh oh, something went wrong | timestamp: ' + new Date().toDateString());
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