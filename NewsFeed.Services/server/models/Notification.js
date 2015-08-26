/**
 * Created by Geno on 26.8.2015 ã..
 */
var mongoose = require('mongoose');

var notificationSchema = mongoose.Schema({
    content: String,
    author:{type:mongoose.Schema.Types.ObjectId, require:'{PATH} is required', ref:'User'},
    owner:{type:mongoose.Schema.Types.ObjectId, require:'{PATH} is required', ref:'User'},
    message: [{type:mongoose.Schema.Types.ObjectId, ref:'Message'}],
    read: Boolean
});


var Notification = mongoose.model('Notification', notificationSchema);

module.exports.schema = notificationSchema;