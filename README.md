# Getting started
Couple of steps to get started and getting it working:

First of get the repo in a folder that you know how to get back to later on. Then open a nodejs terminal there.
When you've opened the nodejs terminal run ```npm install```.

After doing this you have to make a .env file in the main folder (no filename, just .env).
Once you've made the file fill it with the login info/connection info of your bot's account on dubtrack. Which should look like this:
```
DT_LOGIN=foo # The emailadress used to login to the bot's account (if you don't have one, then make one)
DT_PASS=bar # The password used to login to the bot's account
DT_ROOM=roomid # The room which you want to connect to it's name/id (e.g. www.dubtrack.fm/join/{everything here})
```

After doing all this you can just run ```node zubbot.js``` in your friendly neighborhood node terminal and all should be fine and dandy.
