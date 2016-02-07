# Getting started
Couple of steps to get started and getting it working:

First of get the repo in a folder that you know how to get back to later on. Then open a nodejs terminal there.
When you've opened the nodejs terminal run ```npm install```.

After doing this you have to make a .env file in the main folder (no filename, just .env).
Once you've made the file fill it with the login info/connection info of your bot's account on dubtrack. Which should look like this:
```
DT_LOGIN=foo    # The emailadress used to login to the bot's account (if you don't have one, then make one)
DT_PASS=bar     # The password used to login to the bot's account
DT_ROOM=roomid  # The room which you want to connect to it's name/id (e.g. www.dubtrack.fm/join/{everything here})

HTTPS_KEY=foo   # HTTPS Key
HTTPS_CERT=bar  # HTTPS Certificate
HTTPS_CA=foobar # HTTPS Certificate Authority

REDIS_PORT=number    # [OPTIONAL] Port for Redis database, if not defined then defaults to 6379.
REDIS_HOST=foo       # [OPTIONAL] Host for Redis database, if not defined then defaults to 127.0.0.1.
REDIS_PASSWORD=bar   # [OPTIONAL] Password for Redis database, if not defined then defaults to empty string.
REDIS_FAMILY=number  # [OPTIONAL] Family for Redis database (ip4 or ip6), if not defined then defaults to 4.
REDIS_DB=number      # [OPTIONAL] Redis database to access, if not defined then defaults to 0.

TWITCH_CLIENT_ID=foo       # Twitch Client ID
TWITCH_CLIENT_SECRET=bar   # Twitch Secret ID
TWITCH_REDIRECT_URL=string # Twitch Redirect URL

COOLDOWN=number # [OPTIONAL] Number for per user cooldown (in seconds). Default is 30

IMGTIME=number               # [OPTIONAL] Number for image removal (in seconds). Default is 15
IMGREMOVALDUBS_AMOUNT=number # [OPTIONAL] Number of dubs necessary by the user to bypass instant image removal. Default is 10.
IMGREMOVALDUBS_TIME=number   # [OPTIONAL] Number of time (in minutes) to unmute user after instant image removal. Default is 5.

CHATLOGS_SENDGRID_KEY=sendgridkey # [OPTIONAL] SendGrid key for sending the chatlog email, if none then chatlogs wont be recorded.
CHATLOGS_FROM=email               # [OPTIONAL] Email SendGrid uses to send email, this wont work if CHATLOGS_SENDGRID_KEY is not defined.
CHATLOGS_TO=email                 # [OPTIONAL] Email SendGrid sends the email to, this wont work if CHATLOGS_SENDGRID_KEY is not defined.
```

After doing all this you can just run ```node zubbot.js``` in your friendly neighborhood node terminal and all should be fine and dandy.
