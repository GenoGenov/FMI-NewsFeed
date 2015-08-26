var mongoose = require('mongoose');
var Message = mongoose.model('Message');
var Svc = require('NotificationService');


module.exports = {
    like: function (req, res, next) {
        Message.findOne({_id: req.params.id}).exec(function (err, message) {
            if (err || !message) {
                res.status(400).json({message: 'Message could not be liked: ' + err});
            } else {
                message.likes.push(req.user._id);
                message.save(function (err, msg) {
                    if (err) {
                        res.status(400).json({message: 'Message could not be liked: ' + err})
                    } else {
                        Svc.createNotification({messageId: msg._id}, req.user._id);
                        res.status(200).json(msg);
                    }
                });
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