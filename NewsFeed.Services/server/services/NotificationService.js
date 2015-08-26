/**
 * Created by Geno on 26.8.2015 ã..
 */
var mongoose = require('mongoose');
var Message = mongoose.model('Message');
var Notification = mongoose.model('Notification');

module.exports = {
    createNotification: function (data, authorId, callback) {
        var notificationData = {};
        notificationData.message = data.messageId;
        notificationData.author = authorId;

        Message.findOne({_id: data.messageId}).populate('author').exec(function (err, msg) {
            if (err) {
                console.log('Failed to create notification: ' + err);
                res.status(400).json({message: err});
            } else {
                notificationData.owner = msg.author._id;
                var content = msg.content.length > 10 ? msg.content.substring(0, 10) + '...' : msg.content;
                notificationData.content = data.content || 'User ' + msg.author.username + ' liked your message "' + content + '"';
                notificationData.read = false;

                Notification.create(notificationData, function (err, notification) {
                    if (err) {
                        console.log('Failed to create notification: ' + err);
                    }
                    if (callback) {
                        callback(notification);
                    }
                    ;
                });
            }
        });

    }
};