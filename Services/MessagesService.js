'use strict';

var Models = require('../Models');

//Get Users from DB
var getMessages = function (criteria, projection, options, callback) {
    Models.Messages.find(criteria, projection, options, callback);
};

//Insert User in DB
var createMessage = function (objToSave, callback) {
    new Models.Messages(objToSave).save(callback)
};

//Update User in DB
var updateMessages = function (criteria, dataToSet, options, callback) {
    Models.Messages.findOneAndUpdate(criteria, dataToSet, options, callback);
};

var getMessagesPopulate = function (criteria, project, options,populateModelArr, callback) {
    Models.Messages.find(criteria, project, options).populate(populateModelArr).exec(function (err, docs) {
        console.log("...............err");
        if (err) {
            return callback(err, docs);
        }else{
            callback(null, docs);
        }
    });
};


module.exports = {
    getMessages: getMessages,
    createMessage: createMessage,
    updateMessages: updateMessages,
    getMessagesPopulate:getMessagesPopulate
};

