'use strict';

var mongoose = require('mongoose');
var Config = require('../Config');
var Service = require('../Services');
var async = require('async')
//Connect to MongoDB
mongoose.connect(Config.dbConfig.mongo.URI, function (err) {
    if (err) {
        console.log("DB Error: ", err);
        process.exit(1);
    } else {
        console.log('MongoDB Connected');
    }
});


exports.bootstrapContact = function (callback) {
    var contact1 = {
        firstName: 'Paras',
        lastName: 'Gambhir',
        countryCode:'+91',
        phoneNumber:9467813457
    };
    var contact2 = {
        firstName: 'Steve',
        lastName: 'Jobs',
        countryCode:'+91',
        phoneNumber:1234567890
    };
    async.parallel([
        function (cb) {
            insertData(contact1.phoneNumber, contact1, cb)
        },
        function (cb) {
            insertData(contact2.phoneNumber, contact2, cb)
        }
    ], function (err, done) {
        callback(err, 'Bootstrapping finished');
    })


};

function insertData(phone,data, callback) {
    var needToCreate = true;
    async.series([function (cb) {
        var criteria = {
            phoneNumber: phone
        };
        Service.UserService.getUser(criteria, {}, {}, function (err, data) {
            if (data && data.length > 0) {
                needToCreate = false;
            }
            cb()
        })
    }, function (cb) {
        if (needToCreate) {
            Service.UserService.createUser(data, function (err, data) {
                cb(err, data)
            })
        } else {
            cb();
        }
    }], function (err, data) {
        console.log('Bootstrapping finished for ' + phone);
        callback(err, 'Bootstrapping finished')
    })
}