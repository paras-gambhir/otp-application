
'use strict';

var Models = require('../Models');

var getUser= function(criteria,projection,option,callback){
    Models.User.find(criteria,projection,option,callback);
};

var createUser= function (data,callback) {
    new Models.User(data).save(callback);
};

var deleteUser = function (criteria,callback) {
    Models.User.remove(criteria,callback)
};
var updateUser = function (criteria, dataToSet, options, callback) {
    Models.User.findOneAndUpdate(criteria, dataToSet, options, callback);
};

var updateMultiUser = function (criteria, dataToSet, options, callback) {
    Models.User.update(criteria, dataToSet, options, callback);
};

var getUserPopulate = function (criteria, project, options,populateModelArr, callback) {
    Models.User.find(criteria, project, options).populate(populateModelArr).exec(function (err, docs) {
        console.log("...............err");
        if (err) {
            return callback(err, docs);
        }else{
            callback(null, docs);
        }
    });
};

var getUserAggregate = function (criteria,callback) {

    Models.User.aggregate(criteria).exec(function (err, docs) {
        console.log("...............err");
        if (err) {
            return callback(err, docs);
        }else{
            callback(null, docs);
        }
    });
};


module.exports = {
    getUser: getUser,
    createUser: createUser,
    deleteUser:deleteUser,
    updateUser:updateUser,
    getUserPopulate: getUserPopulate,
    updateMultiUser:updateMultiUser,
    getUserAggregate:getUserAggregate
};

