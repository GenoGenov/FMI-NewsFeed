var mongoose = require('mongoose');
var Message = mongoose.model('Message');
var Svc = require('../services/NotificationService');


module.exports = {
    like: function (req, res, next) {
        Message.update({_id: req.params.id}, {$push: {likes: req.user._id}}, {multi: false}, function (err) {
            if (err) {
                res.status(400).json({message: 'Message could not be liked: ' + err});
            } else {
                Svc.createNotification({messageId: req.params.id}, req.user._id);
                res.status(200).json({message: 'Liked message: ' + req.params.id});
            }
        });
    },
    getLastLike: function (req, res, next) {
        Message.findOne({_id: req.params.id}).populate('likes').exec(function (err, message) {
            if (err || !message) {
                res.status(400).json({message: 'Message could not be liked: ' + err});
            } else {
                res.status(200).json(message.likes[message.likes.length - 1]);
            }
        });
    },

    getAllLikes: function (req, res, next) {
        Message.findOne({_id: req.params.id}).populate('likes').exec(function (err, msg) {
            if (err || !message) {
                res.status(400).json({message: 'Message with the specified id could not be found: ' + err});
            } else {
                res.status(200).json(message.likes);
            }
        })
    }
};