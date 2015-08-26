/**
 * Created by Geno on 26.8.2015 ã..
 */
var mongoose = require('mongoose');
var Message = mongoose.model('Message');
var Notification = mongoose.model('Notification');
//var validators = require('../utilities/validators');

module.exports = {
    getAllNotifications: function (req, res, next) {
        Notification.find({owner: {_id: req.user._id}})
            .populate('author')
            .populate('owner')
            .populate('message')
            .exec(function (err, collection) {
                if (err) {
                    throw "Messages could not be loaded" + err;
                }
                Notification.update({$in: collection}, {$set: {read: true}}, {multi: true}, function () {
                    res.send(collection);
                });
            });

    },

    getUnreadNotifications: function (req, res, next) {
        Notification.find({owner: {_id: req.user._id}, read: false})
            .populate('author')
            .populate('owner')
            .populate('message')
            .exec(function (err, collection) {
                if (err) {
                    throw "Messages could not be loaded" + err;
                }
                Notification.update({$in: collection}, {$set: {read: true}}, {multi: true}, function () {
                    res.send(collection);
                });
            });

    }
};