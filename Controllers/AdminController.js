'use strict';

var Service = require('../Services');
var UniversalFunctions = require('../Utils/UniversalFunctions');
var async = require('async');
var Config = require('../Config');
var _ = require('lodash');
let NotificationManager = require('./../Lib/NotificationManager')


let addContact = function (payloadData, callback) {


    async.auto({
        'checkContact': function (cb) {

            let criteria = {
                countryCode: payloadData.contacts.countryCode,
                phoneNumber: payloadData.contacts.phoneNumber
            };
            let projection = {
                _id: 1
            };
            let options = {
                lean: true
            }

            Service.UserService.getUser(criteria, projection, options, (err, result) => {

                if (err) {
                    callback(err)
                }
                else {
                    if (result.length) {

                        callback(UniversalFunctions.CONFIG.APP_CONSTANTS.STATUS_MSG.ERROR.CONTACT_EXISTS)

                    }
                    else {
                        cb(null);
                    }

                }

            })

        },
        'addContact': ['checkContact', function (cb) {

            Service.UserService.createUser(payloadData.contacts, (err, result) => {

                if (err) {
                    callback(err)
                }
                else {
                    cb(null)
                }

            })

        }]
    }, (error, result) => {

        if (error) {
            callback(err)
        }
        else {
            callback(null, { "message": "Contact added" })
        }

    })

}


let listContacts = function (payloadData, callback) {

    Service.UserService.getUser({}, { _id: 1, firstName: 1, lastName: 1, countryCode: 1, phoneNumber: 1 }, { lean: true }, (err, result) => {

        if (err) {
            callback(err)
        }
        else {
            callback(null, result)
        }

    })

}


let sendMessage = function (payloadData, callback) {

    let userData;

    async.auto({
        'checkContact': function (cb) {

            let criteria = {
                _id: payloadData.contactId
            };
            let projection = {
                countryCode: 1,
                phoneNumber: 1
            };
            let options = {
                lean: true
            }

            Service.UserService.getUser(criteria, projection, options, (err, result) => {

                if (err) {
                    callback(err)
                }
                else {
                    if (result.length) {

                        userData = result[0];
                        cb(null);

                    }
                    else {
                        callback(UniversalFunctions.CONFIG.APP_CONSTANTS.STATUS_MSG.ERROR.CONTACT_DOESNT_EXISTS)
                    }

                }

            })

        },
        'sendMessage': ['checkContact', function (cb) {

            NotificationManager.sendSMSToUser(payloadData.message, userData.countryCode, userData.phoneNumber, (err, result) => {

                if (err) {
                    callback(err);
                }
                else {
                    cb(null);
                }

            })

        }],
        'saveMessage': ['sendMessage', function (cb) {

            let savedObject = {
                userId: payloadData.contactId,
                text: payloadData.message,
                insertedAt: new Date()
            }
            Service.MessagesService.createMessage(savedObject, (err, result) => {

                if (err) {
                    callback(err);
                }
                else {
                    cb(null);
                }
            })

        }]
    }, (error, result) => {

        if (error) {
            callback(err)
        }
        else {
            callback(null, { "message": "Message sent" })
        }

    })

}


let listMessages = function (payloadData, callback) {

    let criteria = {

    }
    let projection = {
        _id: 0
    }
    let options = {
        lean: true,
        sort: {
            insertedAt: -1
        }
    }
    let populate = [
        {
            path: 'userId',
            match: {},
            select: "firstName lastName",
            options: {}
        }
    ]

    Service.MessagesService.getMessagesPopulate(criteria, projection, options, populate, (err, result) => {

        if(err){

            callback(err)
        }
        else{

            callback(null,result)

        }

    })


}

module.exports = {
    addContact: addContact,
    listContacts: listContacts,
    sendMessage: sendMessage,
    listMessages: listMessages
};