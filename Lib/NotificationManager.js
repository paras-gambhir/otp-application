'use strict';

var Config = require('../Config');
var async = require('async');

var client = require('twilio')(Config.smsConfig.twilioCredentials.accountSid, Config.smsConfig.twilioCredentials.authToken);


var sendSMSToUser = function (messageBody, countryCode, phoneNo, externalCB) {


    var smsOptions = {
        from: Config.smsConfig.twilioCredentials.smsFromNumber,
        To: countryCode + phoneNo.toString(),
        Body: null
    };

    async.series([
        function (internalCallback) {
            smsOptions.Body = messageBody
            internalCallback();
        }, function (internalCallback) {
            sendSMS(smsOptions, function (err, res) {
                internalCallback(err, res);
            })
        }
    ], function (err, responses) {
        if (err) {
            externalCB(err);
        } else {
            externalCB(null,{});
        }
    });
};


function renderMessageFromTemplateAndVariables(templateData, variablesData) {
    var Handlebars = require('handlebars');
    return Handlebars.compile(templateData)(variablesData);
}

/*
 @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 @ sendSMS Function
 @ This function will initiate sending sms as per the smsOptions are set
 @ Requires following parameters in smsOptions
 @ from:  // sender address
 @ to:  // list of receivers
 @ Body:  // SMS text message
 @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 */
function sendSMS(smsOptions, cb) {
    client.messages.create(smsOptions, function (err, message) {
        if (err) {
            console.log(err)
        }
        else {
            console.log(message.sid);
        }
    });
    cb(null, null); // Callback is outside as sms sending confirmation can get delayed by a lot of time
}


module.exports = {
    sendSMSToUser: sendSMSToUser
};