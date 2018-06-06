// Main.js
// Start file for PanzerBot
// Role: Start child processes and make sure services are running and packages are installed

var ps = require("ps-node");
child_process = require("child_process");
colors = require('colors');

var BotProcess = new child_process.ChildProcess(); // Variable which will hold the return from child_process.fork for the DiscordBot
var WebProcess = new child_process.ChildProcess(); // Variable which will hold the return from child_process.fork for the WebProcess

function startPanzerBot() {
  WebProcess = child_process.fork(__dirname + '/website/web.js');
}

console.log("Thank you for using PanzerBot!\nIf you find any bugs or have any ideas please visit our GitHub\nhttps://github.com/meshv/PanzerBot/\nStarting PanzerBot...\n");

ps.lookup({
  command: 'mongod'
}, function lookupMongo(err, result) {
  if (err) throw new Error(err);
  if (!result[0]) {
    console.log("[error 01]".red + ": MongoDB Server is not running! Please start MongoDB.\nIf you are not sure of how to start MongoDB visit the Github Wiki");
    return;
  } else {
    startPanzerBot();
  }
});

WebProcess.on("message", function handleWebsiteIPC(msg) {
  // msg: Data sent from WebProcess IPC
  switch (msg.event) {
    case "startBot":
      BotProcess = child_process.fork(__dirname + '/discord/bot.js'); // Fork bot.js as BotProcess
      break;
    case "endBot":
      BotProcess.send({
        "event": "closeSelf"
      }); // Let the bot handle it's own closing to ensure that all ties are wrapped up
      break;
  }
});

BotProcess.on("message", function handleDiscordBotIPC(msg) {
  // msg: Data sent from WebProcess IPC
  switch (msg.event) {

  }
});