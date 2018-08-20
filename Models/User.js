var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var Config = require('../Config');



var User = new Schema({

    firstName: {type: String, trim: true, default: null},
    lastName:{type: String,trim: true, default: null},
    countryCode: {type: String, trim: true, default: null},
    phoneNumber:{type: Number,trim: true,min:10}

});



module.exports = mongoose.model('User', User);