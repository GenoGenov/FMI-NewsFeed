var mongoose = require('mongoose');

var messageSchema = mongoose.Schema({
    content: String,
    author:{type:mongoose.Schema.Types.ObjectId, require:'{PATH} is required', ref:'User'},
    likes: [{type:mongoose.Schema.Types.ObjectId, ref:'User'}]
});

messageSchema.method({
    //authenticate: function (password) {
    //    return encryption.generateHashedPassword(this.salt, password) === this.hashPass;
    //}
});

var Message = mongoose.model('Message', messageSchema);

module.exports.schema = messageSchema;