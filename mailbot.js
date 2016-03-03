'use strict';

require('./lib/utilsLoader');

function sendMail() {
    var sendgrid = require('sendgrid')(process.env.CHATLOGS_SENDGRID_KEY);
    var zip = require('node-zip')();
    var fs = require('fs');

    function getToday() {
        return new Date(new Date().toDateString() + ' 00:00:00')
    }

    var now = new Date();
    var zipFileName = 'chatlogs_' + new Date().toDateString().replace(/ /g, '_') + '.zip',
        zipFile = zip.file('chatlogs.txt', fs.readFileSync('chatlogs.txt'));
    var zipFileData = zipFile.generate({base64: false, compression: 'DEFLATE'});
    fs.writeFileSync(zipFileName, zipFileData, 'binary');

    var email = new sendgrid.Email({
        from: process.env.CHATLOGS_FROM,
        subject: 'NightBlueBot Chat Logs - ' + now,
        text: "NightBlueBot Chat Logs - " + now + ". Attached to this email",
        files: [
            {path: zipFileName}
        ]
    });
    email.setTos(process.env.CHATLOGS_TO.split(','));
    sendgrid.send(email, function (err, json) {
        if (err) {
            console.log('Error sending chatlog message');
            return console.error(err);
        }

        console.log('Email sent, refreshing chatlogs.txt');
        fs.writeFile('chatlogs.txt', 'Chat Logs - ' + getToday().toString() + '\r\n', 'utf8', function (err1) {
            if (err1) {
                console.log('Error refreshing chatlogs.txt');
                return console.error(err1);
            }
            console.log('Done refreshing chatlogs.txt');
        });
    });

    fs.unlink(zipFileName, function (err) {
        if (err) {
            console.log('Error removing temporary zip file.');
            return console.error(err);
        }
    });
}

if (/*process.env.CHATLOGS_SENDGRID_KEY*/false) {
    sendMail();
}
else {
    console.log('No SendGrid Key defined, not sending Email');
}
