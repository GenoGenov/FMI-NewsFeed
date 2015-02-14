var usersController = require('../controllers/usersController');
var likesController = require('../controllers/LikesController');
var messagesController = require('../controllers/MessagesController');


module.exports = {
    users: usersController,
    likes: likesController,
    messages:messagesController
    //reservations: reservationsController,
    //rooms: roomsController,
    //statistics : statisticsController,
    //rating : ratingController
};