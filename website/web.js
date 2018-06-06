// Main.js
// Main file for express-js website
// Role: Start and handle most parts of the website

var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var filesystem = require('fs');
var session = require('express-session');
var bodyParser = require('body-parser');

var Database = require('./database.js');

// Serve our (static) public directory so CSS/IMGs work.
app.use(express.static(__dirname + '/public/'));

// Set some important app things
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// Parse data from requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

// Sessions
app.use(session({
  secret: 'panzerbot',
  resave: true,
  saveUninitialized: false
}));

app.get('/', function (req, res) {
  // Serve our views directory (for index.html/homepage)
  if (!filesystem.existsSync(__dirname + '/../discord/settings.json')) {
    // Settings file doesn't exist send user to install page
    res.render(__dirname + '/views/install.html');
  } else {
    let userSession = req.session;
    if (!userSession.uid || !userSession.name || !userSession.level) {
      res.render(__dirname + '/views/login.html', {
        flash: null
      });
      return;
    }
    Database.isValidUser(userSession.uid, userSession.name, function isValid(err, result) {
      if (err) {
        console.log(`[Web.js -> Database.js]: ${err}`);
        res.render(__dirname + '/views/login.html', {
          flash: "Sorry! Database Error"
        });
        return;
      }
      if (!result) {
        res.render(__dirname + '/views/login.html', {
          flash: "Sorry! That's not a valid user..."
        });
        return;
      } else {
        // Continue to panel page user is valid
        res.render(__dirname + '/views/index.html');
        return;      
      }
    });
  }
});

app.post('/login', function (req, res) {
  let username = req.body.loginName;
  let password = req.body.loginPass;
  Database.attemptLogin(username, password, function canLogin(err, result){
    if (err) {
      console.log(`[Web.js -> Database.js]: ${err}`);
      res.render(__dirname + '/views/login.html', {
        flash: "Sorry! Database Error"
      });
      return;
    }
    if(result){
      // If result user has entered valid details
      req.session.uid = result.id;
      req.session.name = result.username;
      req.session.level = result.level;
      res.redirect('/');
      return;
    }
    else{
      res.render(__dirname + '/views/login.html', {
        flash: "Invalid Username/Password"
      });
      return;    
    }
  });
});

app.all('/logout', function(req, res){
  req.session.uid = null;
  req.session.name = null;
  req.session.level = null;
  res.redirect('/');
  return;
});

app.post('/install', function (req, res) {
  // Create settings.json file if it doesn't exist already
  if (filesystem.existsSync(__dirname + '/../discord/settings.json')) {
    // Settings file doesn't exist send user to install page
    res.redirect('/');
    return;
  }
  var Token = req.body.token;
  var UserInput = req.body.adminUser;
  var PassInput = req.body.adminPass;
  if (!UserInput || !PassInput || !Token) {
    res.redirect('/');
    return;
  }
  Database.createPanelUser(UserInput, PassInput, 7, function createUserCallback(err, data) {
    if (err) {
      console.log(`[Web.js -> Database.js]: ${err}\nInstallation Failed...`);
      res.redirect('/');
      return;
    }
  });

  var settingsJSON = {
    "clientToken": Token
  };
  filesystem.writeFile(__dirname + '/../discord/settings.json', JSON.stringify(settingsJSON), 'utf8', function (err) {
    if (err) {
      console.log(`[Web.js -> Install]: ${err}\nInstallation Failed...`);
    }
    res.redirect('/');
    return;
  });
});

app.get('*', function (req, res) {
  // Serve 404.html if no other pages match
  res.render(__dirname + "/views/404.html");
});

io.on('connection', function (socket) {
  // Handle user connection to Socket.IO server. Will be used to communicate real time data
});

process.on('message', function (m) {
  // Handle IPC Messages from the Parent process.
});

server.listen(80, function listenCallback() {
  console.log("Control Panel Starting on port 80");
});
server.on('error', function httpServerError(e) {
  console.log(`[Web.js, Error]: ${e}`);
});