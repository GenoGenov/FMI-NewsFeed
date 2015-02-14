var Hotel = require('mongoose').model('Hotel');
var Room = require('mongoose').model('Room');
var validators = require('../utilities/validators');

var ALLOWED_SORT_HOTELS = ['name']; //TODO: Fill
var ITEMS_LIMIT = 10;

function getAllHotels(req, res, next) {

    var page = validators.validatePage(req.query.page);
    var sortBy = validators.validateSort(req.query.sortBy, ALLOWED_SORT_HOTELS);

    Hotel.find({}).skip((page - 1) * ITEMS_LIMIT).limit(ITEMS_LIMIT).populate('owner').exec(function (err, collection) {
        if (err) {
            throw "Hotels could not be loaded" + err;
        }

        res.send(collection);
    })
}
function createHotel(req, res, next) {
    var hotel = new Hotel(req.body);
    var roomsCount = req.body.roomsCount;

    hotel.owner = req.user;
    console.log(hotel);
    generateRooms(hotel, roomsCount);
    console.log(hotel.rooms);

    hotel.save(function (err) {
        if (err) {
            res.status(400).json({message: err});
        }
        res.status(201).json(hotel);
    });
}

function generateRooms(hotel, count) {
    var i;
    console.log('here');
    for (i = 0; i < count; i += 1) {
        var room = new Room({
            room_type: 'Double',
            room_max_occupancy: 2,
            price: 30,
            pictureUrl: ''
        });
        hotel.rooms.push(room);
        console.log(hotel.rooms);
    }
}

function getHotelById(req, res, next) {
    Hotel.findOne({_id: req.params.id}).populate('owner').exec(function (err, hotel) {
        if (err || !hotel) {
            console.log('Hotel could not be loaded: ' + err);
            res.status(400).json({message: err});
        }

        res.send(hotel);
    })
}

function getAvailableHotels(req, res, next) {
    var page = validators.validatePage(req.query.page),
        sortBy = validators.validateSort(req.query.sortBy, ALLOWED_SORT_HOTELS),
        star_rating = req.query.star_rating || 1,
        city = req.query.city || /.+/,
        room_type = req.query.room_type || /.+/,
        room_max_occupancy = req.query.room_max_occupancy || 1,
        price = req.query.price || 1,
        reqFromDate = new Date(req.query.fromDate),
        reqToDate = new Date(req.query.toDate);

    if (reqToDate <= reqFromDate) {
        return res.status(400).json({message: 'Departure date must be after the arrival date!'});
    }

    Hotel.find({})
        .where('star_rating').gte(star_rating)
        .where({city: city})
        .where('rooms.room_max_occupancy').gte(room_max_occupancy)
        .where('rooms.price').gte(price)
        .where({'rooms.room_type': room_type})
        .populate('owner').exec(function (err, hotels) {
            if (err) {
                throw "Hotels could not be loaded" + err;
            }
            var availableHotels = filterAvailableRooms(hotels, reqToDate, reqFromDate);
            var availableHotels = availableHotels.slice((page - 1) * ITEMS_LIMIT, ((page - 1) * ITEMS_LIMIT) + ITEMS_LIMIT);
            res.send(availableHotels);
        });
}

function deleteHotel(req, res, next) {
    Hotel.findOne({_id: req.params.id}).exec(function (err, hotel) {
        if (err || !hotel) {
            console.log('Hotel could not be deleted: ' + err);
            res.status(400).json({message: err});
        }
        else if (req.user._id === hotel.owner._id || req.user.roles.indexOf('admin') > -1) {

            hotel.remove(function () {
                res.status(200).json({message: 'Hotel deleted!'});
            });
        }
        else {
            res.status(400).json({message: 'You do not have permissions!'});
        }
    });
}

function filterAvailableRooms(hotels, reqToDate, reqFromDate) {
    var availableHotels = [];
    for (var i = 0; i < hotels.length; i++) {
        var hotel = hotels[i];
        var availableRooms = [];
        for (var j = 0; j < hotel.rooms.length; j++) {
            var isAvailable = true;
            var room = hotel.rooms[j];
            var bookings = room.bookings;
            for (var k = 0; k < bookings.length; k++) {
                var bookingFromDate = new Date(bookings[k].fromDate);
                var bookingToDate = new Date(bookings[k].toDate);
                if (bookingFromDate < reqToDate && reqFromDate < bookingToDate) {
                    isAvailable = false;
                    break;
                }
            }
            if (isAvailable) {
                availableRooms.push(room);
            }
        }
        if (availableRooms.length > 0) {
            hotel.rooms = availableRooms;
            availableHotels.push(hotel);
        }
    }
    return availableHotels;
}

module.exports = {
    getAllHotels: getAllHotels,
    getHotelById: getHotelById,
    createHotel: createHotel,
    deleteHotel: deleteHotel,
    getAvailableHotels: getAvailableHotels
};