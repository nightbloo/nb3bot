// DEPRECATED: not used right now.
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
*/
var predict = require('eightball');

var AgarioClient = require('agario-client');
var agclient = new AgarioClient("nb3bot"); 

var urban = require('urban');

var fs = require('fs');
var os = require("os");

var captainApi = require('node-memecaptain-api');

var TwitchClient = require("node-twitchtv");
var TwitchAccount = fs.readFileSync("secrets/user.json");
var twitch = new TwitchClient(TwitchAccount);

var jsonfile = require('jsonfile');

exports.init = function(BOT) { // BOT = zubbot.js | API = variable on zubbot.js (?
    var API = BOT.API;
    
    var cmds = [
        { // hello
            name: 'hello',
            description: "Bot Responds saying hello back.",
            usage: 'hello',
            cooldown: 5000,
            role: 'default',
            run: function(cmd, args, sender) { API.sendChat('Hello, @' + sender.username); },
        },
        { // agar
            name: ['agar', 'agario', 'agar.io'],
            description: "Host an Agar.io party.",
            usage: 'agar',
            cooldown: 60000,
            role: 'resident-dj',
            run: function(cmd, args, sender) {
              AgarioClient.servers.createParty("US-Atlanta", function (data) {
                  API.sendChat('@' + sender.name + " has created an agario party. Join them at www.agar.io/#" + data.key);
              });
            }
        },
        { // 8ball
            name: ['8ball', 'magicball'],
            description: "Ask the magicball a question!",
            usage: 'magicball [question]',
            cooldown: 10000,
            role: 'default',
            run: function(cmd, args, sender) {
                if(args.length <= 0) {
                    API.sendChat('@' + sender.name + ' !' + cmd + ' [question]'); // hü3
                    return;
                }
                API.sendChat("@" + sender.username + ' ' + predict());
            }
        },
        { // del [fake]
            name: ['del', 'delete'],
            description: "Bot responds saying *file* deleted.",
            usage: 'del [directory-name]',
            cooldown: 10000,
            role: 'default',
            run: function(cmd, args, sender) {
                if(args.length <= 0) {
                    API.sendChat('@' + sender.name + ' !' + cmd + ' [user]');
                    return;
                }
                API.sendChat('@' + sender.name + ' ' + args[0] + ' has been deleted. *Beep Boop*');
            }
        },
        { // gaben
            name: 'gaben',
            description: "Pulls a random gaben picture from /r/gentlemangabers",
            usage: 'gaben',
            cooldown: 60000,
            role: 'resident-dj',
            run: function(cmd, args, sender) {
              reddit.r('gentlemangabers', function(err, data, res){
              var children = data.data.children;
              var random = randNum(children.length - 1) + 1;
                  if(children[random].data.url.indexOf("imgur") > -1)
                  {
                    API.sendChat(children[random].data.url);
                  }
              }); 
            }
        },
        { // urban
            name: ['urban', 'urbandictionary'],
            description: "Pulls a definition from urban dict.",
            uage: 'urban [term]',
            cooldown: 60000,
            role: 'default',
            run: function(cmd, args, sender) {
                var def = urban(args.join(' '));
                def.first(function(json) {
                    if(typeof(json) === "undefined"){
                        API.sendChat("@"+sender.name + " there is no definition for " + args.join(' '));
                   
                    }
                    else
                    {
                        var deflong = json.definition;
                        var permalink = json.permalink;
                        var example = json.example;
                        var word = json.word;
                        if(deflong.length > 100)
                        {
                            deflong = deflong.substring(0, 100) + "...";
                            API.sendChat("@"+sender.name+" the definition of " + word + " is: ");
                            API.sendChat(deflong + " " + permalink);
                        }
                        else
                        {
                            API.sendChat("@"+sender.name+" the definition of " + word + " is: ");
                            API.sendChat(deflong + "..." + permalink);
                        }
                    }
              
                });
            }
        },
        { // quote
            name: 'quote',
            description: "",
            usage: 'quote [user]',
            cooldown: 30000,
            role: 'default',
            run: function(cmd, args, sender) {
                var username = args[0]; 
                var userFile = "quotes/"+username+".txt";
                fs.stat(userFile, function(err, stat) {
                    var userFile = "quotes/"+username+".txt";
                   
                    if(err == null) {
                        fs.readFile(userFile, function (err, data) {
                          if (err) throw err;
                      
                         console.log(data);
                         var quoteArray = [];
                         quoteArray = data.toString().split(os.EOL);
                         var random = Math.floor((Math.random() * quoteArray.length) + 1);
                         API.sendChat("@"+sender.name+" @"+username+" says: "+quoteArray[random]);
                        });
                        
                        
                    } else if(err.code == 'ENOENT') {
                       API.sendChat("@"+sender.name+" that user doesn't have any quotes.");
                    } else {
                        console.log('Some other error: ', err.code);
                    }
                });
            }
        },
        { // meme
            name: ['meme', 'memegen'],
            description: "Generates a meme from Meme Captain.",
            usage: 'meme [type] [legend]',
            cooldown: 60000*5, // too lazy for math
            role: 'resident-dj',
            run: function(cmd, args, sender) {
                var args = args.join(' ').toLowerCase(), typeCode, type, legend;
                
                for(var i = 0; i < this.cmdval_memes; i++) {
                    var meme = this.cmdval_memes[i];
                    if(args.substring(meme.name.length) == meme.name) {
                        API.sendChat("@"+sender.name+" generating meme..");
                        var bottom = args.replace("why not", "");
                        captainApi.createMeme(meme.code, meme.type, bottom)
                          .then(function(memeUrl) {
                              // use generated meme
                            
                              API.sendChat(memeUrl+".jpg");
                          }, function(err) {
                              // handle error
                              console.log(err);
                          });
                    }
                }
            },
            cmdval_memes: [
                { name: 'why not', type: 'WHY NOT', code: 'kzsGfQ' },
                { name: 'one does not simply', type: 'ONE DOES NOT SIMPLY', code: 'da2i4A' },
                { name: 'too damn high', type: 'too damn high', code: 'RCkv6Q' },
                { name: 'i dont know', type: 'I DONT KNOW', code: 'sO-Hng' },
                { name: 'not sure if', type: 'not sure if', code: 'CsNF8w' },
            ]
        },
        { // song
            name: ['song', 'songlink', 'getlink'],
            description: "Pulls song data from Dubtrack.",
            usage: 'song',
            cooldown: 30000,
            role: 'default',
            run: function(cmd, args, sender) {
                var media = API.getMedia();
                if(media.type == "youtube") {
                    API.sendChat("@"+sender.name+" The current song is " + media.name + ", the link is http://youtube.com/watch?v=" + media.fkid);
                }
                else if(media.type == "soundcloud")
                {
                    //API.sendChat("@"+sender.name+" The current song is " + media.name +", the link is "+streamURL);
                    API.sendChat('@' + sender.name + ' SoonTM'); // use soundtrack API, will add later @netux
                }
            }
        },
        { // stream
            name: ['streamcheck', 'stream'],
            description: "Pulls nb3/channel stream data from twitch",
            usage: 'streamcheck (channel)',
            cooldown: 30000,
            role: 'default',
            run: function(cmd, args, sender) {
                var channel = 'nightblue3';
                if(args.length >= 1) channel = args[0];
                twitch.streams({ channel: channel }, function(err, response) {
                    if(response.stream != null)
                    {
                        API.sendChat(channel + " is streaming "+response.stream.game+"! You can watch him at http://www.twitch.tv/" + channel + "!");
                    }
                    else
                    {
                        API.sendChat(channel + " is not currently streaming or not found!");
                    }
                });
            }
        },
        { // nyancat
            name: 'nyancat',
            description: "Nyan cat!",
            usage: 'nyancat',
            cooldown: 60000,
            role: 'default',
            run: function(cmd, args, sender) {
                if(BOT.enableNyanCat)
                    API.sendChat(":nyancat: ~ Meow!");
            }
        },
        { // lastplayed
            name: 'lastplayed',
            description: "",
            usage: 'lastplayed',
            cooldown: -1,
            role: 'mod',
            run: function(cmd, args, sender) {
                var historyFile = "history/"+BOT.lastSongID+".txt";
                fs.stat(historyFile, function(err, stat) {
                    if(err == null) {
                            var unix = Math.round(+new Date()/1000);
    
                          fs.readFile(historyFile, function (err, data) {
                          if (err) throw err;
                            var timeDifference = unix - data.toString();
                            var differenceDate = new Date(timeDifference * 1000);
                            var diffHours = differenceDate.getUTCHours();
                            var diffMinutes = differenceDate.getUTCMinutes();
                            var diffSeconds = differenceDate.getUTCSeconds();
                            API.sendChat("@"+sender.name+" this song was last played "+diffHours + ' hours, ' + diffMinutes + ' minutes, and ' + diffSeconds + " seconds ago");
                        });
    
    
                        
                    } else if(err.code == 'ENOENT') {
                        API.sendChat("@"+sender.name+" this song hasn't played within the last 2 hours.");
                    } else {
                        console.log('Some other error: ', err.code);
                    }
                });
            }
        },
        { // eta
            name: 'eta',
            description: "",
            usage: 'eta',
            cooldown: 5000,
            role: 'default',
            run: function(cmd, args, sender) {
                API.sendChat("In order to get the ETA Timer, please download the DubX Extension from https://dubx.net/");
                API.sendChat("http://i.imgur.com/ldj2jqf.png");
            }
        },
        { // myprops && mylove
            name: ['myprops', 'mylove'],
            description: "",
            usage: 'myprops or mylove',
            cooldown: 10000,
            role: 'default',
            run: function(cmd, args, sender) {
                var userFile = "users/"+sender.name+".json";
                console.log(userFile);
                fs.stat(userFile, function(err, stat) {
                    var userFile = "users/"+sender.name+".json";
                    var userData = {};
                  
                    if(err == null) {
                            userData = jsonfile.readFileSync(userFile);
                            if(cmd === 'myprops') {
                                if(userData.props == null)
                                {
                                    API.sendChat("@"+sender.name+" you don't have any props! Play a song to get props! :)");
                                    return 1;
                                }
        
                                API.sendChat("@"+sender.name+" you have "+userData.props+" props! :)");
                            } else if(cmd === 'mylove') {
                                if(userData.love == null || userData.love == 0)
                                {
                                    API.sendChat("@"+sender.name+" you don't have any love! :(");
                                    return 1;
                                }
        
                                API.sendChat("@"+sender.name+" you have "+userData.love+" hearts! :)");
                            }
                        
                    } else if(err.code == 'ENOENT') {
                        if(cmd === 'myprops')
                             API.sendChat("@"+sender.name+" you don't have any props! Play a song to get props! :)");
                         else if(cmd === 'mylove')
                            API.sendChat("@"+sender.name+" you don't have any love! :(");
                    } else {
                        console.log('Some other error: ', err.code);
                    }
                });
            }
        },
        { // again I got tired, did lot of progress today. @netux
            
        }
    ]
    return cmds;  
};

function randNum(limit) { return Math.floor(Math.random() * limit); }