// Database.js
// Database functions for the web server
// Role: Provide database functions to call from here to keep other files clean

var MongoClient = require('mongodb').MongoClient;

exports.addLogItem = function(status, action, executer, callback){
    // Adds an item to the panel's log
    // Args: Status (Failed, Success, Unknown, etc), Action (Added Server, Added User, etc), Executer (User that executed the action)

};

exports.createPanelUser = function(username, password, level, callback){
    MongoClient.connect("mongodb://localhost:27017", function handleConnection(err, db){
        if(err) {
            callback(err, null); 
            return; // Return after sending error
        }
        var Panzer = db.db('PanzerBot');
        Panzer.collection('PanelUsers').insert({"username":username, "password":password, "level":level}, function handleInsert(err, res){
            if(err) {
                callback(err, null); 
                return; // Return after sending error
            }        
            callback(null, res); // Return the user to the callback
        });
    });
};
