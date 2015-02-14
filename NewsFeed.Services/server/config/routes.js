var auth = require('./auth'),
    controllers = require('../controllers');
    //validator = require('node-validator');

module.exports = function (app) {
    app.all('/', function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        next();
    });

    app.get('/api/users', auth.isInRole(['admin']), controllers.users.getAllUsers);
    app.delete('/api/users/:id', auth.isInRole(['admin']), controllers.users.deleteUser);
    app.post('/api/users', controllers.users.createUser);
    app.put('/api/users', auth.isAuthenticated, controllers.users.updateUser);

//    app.get('/api/hotels', controllers.hotels.getAllHotels);
//    app.get('/api/hotels/available'/*, auth.isAuthenticated*/, controllers.hotels.getAvailableHotels);
//    app.get('/api/hotels/:id', auth.isAuthenticated, controllers.hotels.getHotelById);
////    app.post('/api/hotels/:id/reservations'/*, auth.isAuthenticated*/, validator.express(app.get('reservationCheck')), controllers.reservations.makeReservation);
//    app.post('/api/hotels/:id/reservation', auth.isAuthenticated, controllers.reservations.makeReservation);
//    app.post('/api/hotels', auth.isInRole(['admin', 'owner']), controllers.hotels.createHotel);
//    app.delete('/api/hotels/:id', auth.isAuthenticated, controllers.hotels.deleteHotel);
//
//    app.post('/api/hotels/:id/rooms', auth.isInRole(['admin', 'owner']), controllers.rooms.createRoom);
//    app.delete('/api/hotels/:id/rooms/:roomId', auth.isInRole(['admin', 'owner']), controllers.rooms.deleteRoom);
//
//    app.post('/api/hotels/:id/rate', controllers.rating.rateHotel);
//    app.get('/api/stats', controllers.statistics.getStatistics);
//
//    app.get('/partials/:partialArea/:partialName', function (req, res) {
//        res.render('../../public/app/' + req.params.partialArea + '/' + req.params.partialName)
//    });

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