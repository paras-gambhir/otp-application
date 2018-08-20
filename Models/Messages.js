

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Config = require('../Config');


var Messages = new Schema({
    userId:{type: Schema.ObjectId, ref:'User',required: true},
    text:{type: String, trim: true, required: true},
    insertedAt:{type: Date, default: Date.now}
});


module.exports = mongoose.model('Messages', Messages);