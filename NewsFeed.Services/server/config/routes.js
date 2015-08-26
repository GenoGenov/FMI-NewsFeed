var auth = require('./auth'),
    controllers = require('../controllers');
    //validator = require('node-validator');

module.exports = function (app) {

    app.get('/api/users', auth.isInRole(['admin']), controllers.users.getAllUsers);
    app.delete('/api/users/:id', auth.isInRole(['admin']), controllers.users.deleteUser);
    app.post('/api/users', controllers.users.createUser);
    app.post('/api/users/avatar', controllers.users.addAvatar);
    app.put('/api/users', auth.isAuthenticated, controllers.users.updateUser);
    app.put('/api/users/mute/:id', auth.isAuthenticated, controllers.users.muteUser);

    app.get('/api/messages',controllers.messages.getMessages);
    app.post('/api/messages/create',controllers.messages.createMessage);

    app.post('/api/likes/like/:id',controllers.likes.like);
    app.get('/api/likes/last/:id',controllers.likes.getLastLike);
    app.get('/api/likes/:id',controllers.likes.getAllLikes);

    app.get('/api/notifications',controllers.notifications.getAllNotifications);
    app.get('/api/notifications/unread',controllers.notifications.getUnreadNotifications);

    app.post('/login', auth.login);
    app.post('/logout', auth.logout);

    app.get('/api/*', function (req, res) {
        res.status(404);
        res.end();
    });

    app.get('*', function (req, res) {
        res.render('index', {currentUser: req.user});
    });


};