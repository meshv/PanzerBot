// Database.js
// Database functions for the web server
// Role: Provide database functions to call from here to keep other files clean

var MongoClient = require('mongodb').MongoClient;
var MongoObjectId = require('mongodb').ObjectID;
var bcrypt = require('bcrypt');

exports.addLogItem = addLogItem;
exports.createPanelUser = createPanelUser;
exports.isValidUser = isValidUser;
exports.attemptLogin = attemptLogin;

function attemptLogin(user, pass, callback){
  // Attempt to findOne username then bcrypt.compare password. If all matches return true to callback
  // Args: username (username to check for), password (password to compare to hash)
  MongoClient.connect("mongodb://localhost:27017", function handleConnection(err, db) {
    if (err) {
      callback(err, null);
      db.close();
      return; // Return after sending error
    }
    var Panzer = db.db('PanzerBot');
    Panzer.collection('PanelUsers').findOne({"username":user}, function handleFindOne(err, result){
      if(err){
        callback(err, null);
        return;
      }
      if(result){
        if(bcrypt.compareSync(pass, result.password)){
          callback(null, {"id":result._id, "username":result.username, "level":result.level});
          return;
        }
        else{
          callback(null, false);
          return;
        }
      }
      else{
        callback(null, false);
        return;
      }
    });
  });
}

function isValidUser(uid, name, callback){
  // Check if user with id 'uid' and username 'name' exists
  // Args: uid (user's id to check), name (username to check)
  MongoClient.connect("mongodb://localhost:27017", function handleConnection(err, db) {
    if (err) {
      callback(err, null);
      db.close();
      return; // Return after sending error
    }
    var Panzer = db.db('PanzerBot');
    Panzer.collection('PanelUsers').findOne({"_id":MongoObjectId(uid), "username":name}, function isValidFindOne(err, result){
      if(err){
        callback(err, null);
        return;
      }
      if(result){
        callback(null, true);
        return;
      }    
      else{
        callback(null, false);
        return;
      }
    });
  });
}

function addLogItem(status, action, executer, callback) {
  // Adds an item to the panel's log
  // Args: Status (Failed, Success, Unknown, etc), Action (Added Server, Added User, etc), Executer (User that executed the action)
  console.log("AddLogItem: " + status);
}

function createPanelUser(username, password, level, callback) {
  // Creates a user in the PanelUsers collection
  // Args: username (username to create), password (password to hash and create), level (Admin level for user)
  MongoClient.connect("mongodb://localhost:27017", function handleConnection(err, db) {
    if (err) {
      callback(err, null);
      db.close();
      return; // Return after sending error
    }
    let HashedPassword = bcrypt.hashSync(password, 10);
    var Panzer = db.db('PanzerBot');
    Panzer.collection('PanelUsers').insert({
      "username": username,
      "password": HashedPassword,
      "level": level
    }, function handleInsert(err, res) {
      if (err) {
        callback(err, null);
        return; // Return after sending error
      }
      db.close();
      callback(null, res); // Return the user to the callback
    });
  });
}
