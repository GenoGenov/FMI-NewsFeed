var usersController = require('../controllers/usersController');
var likesController = require('../controllers/LikesController');
var messagesController = require('../controllers/MessagesController');
var notificationsController = require('../controllers/NotificationsController');


module.exports = {
    users: usersController,
    likes: likesController,
    messages:messagesController,
    notifications:notificationsController
};