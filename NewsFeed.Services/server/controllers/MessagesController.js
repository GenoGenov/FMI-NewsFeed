var mongoose = require('mongoose');
var Message = mongoose.model('Message');
var User = mongoose.model('User');
var validators = require('../utilities/validators');

var ITEMS_LIMIT = 20;

module.exports = {
    createMessage: function (req, res, next) {
        var messageData = req.body;
        messageData.author=req.user._id;
        Message.create(messageData, function (err, message) {
            if (err) {
                console.log('Failed to create message: ' + err);
                res.status(400).json({message: err});
            }

            res.status(200).json(message);
        });
    },
    getMessages:function(req,res,next) {
        var page = validators.validatePage(req.query.page);
        User.findOne({_id:req.user._id}).populate('mutes').exec(function (err, current){
            var arr = [];
            for( var i=0; i<current.mutes.length; i+=1 ) {
                arr.push(current.mutes[i]._id);
            }
            Message.find(
                {
                    author: {
                        $nin: arr
                    }
                })
                .skip((page - 1) * ITEMS_LIMIT)
                .limit(ITEMS_LIMIT)
                .populate('author')
                .populate('likes')
                .exec(function (err, collection) {
                    if (err) {
                        throw "Messages could not be loaded" + err;
                    }

                    res.send(collection);
                })
        })

    }
};