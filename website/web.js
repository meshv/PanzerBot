// Main.js
// Main file for express-js website
// Role: Start and handle most parts of the website

var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var filesystem = require('fs');

// Serve our (static) public directory so CSS/IMGs work.
app.use(express.static(__dirname + '/public/'));

app.get('/', function(req, res){
    // Serve our views directory (for index.html/homepage)
    if(!filesystem.existsSync(__dirname+'/../discord/settings.json')){
        // Settings file doesn't exist send user to install page
        res.sendFile(__dirname + '/views/install.html');
    }else {
        res.sendFile(__dirname + '/views/');
    }
});

io.on('connection', function(socket){

});

process.on('message', function(m){

});

server.listen(80, function listenCallback() {console.log("Control Panel Starting on port 80");});
server.on('error', function httpServerError(e) {
    console.log(`[Web.js, Error]: ${e}`);
});