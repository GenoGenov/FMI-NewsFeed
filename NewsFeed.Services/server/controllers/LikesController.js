var mongoose = require('mongoose');
var Message = mongoose.model('Message');


module.exports = {
    like: function (req, res, next) {
        Message.findOne({_id:req.params.id}).exec(function (err, message) {
            if(err || !message){
                res.status(400).json({message:'Message could not be liked: '+err});
            }else{
                message.likes.push(req.user._id);
                message.save(function (err) {
                    if(err){
                        res.status(400).json({message:'Message could not be liked: '+err})
                    }else{
                        res.status(200).json(message);
                    }
                });
            }
        });
    },
    getLastLike: function (req, res, next) {
        Message.findOne({_id:req.params.id}).populate('likes').exec(function (err, message) {
            if(err || !message){
                res.status(400).json({message:'Message could not be liked: '+err});
            }else{
                res.status(200).json(message.likes[message.likes.length-1]);
            }
        });
    }
};