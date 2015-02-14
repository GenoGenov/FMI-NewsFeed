var mongoose = require('mongoose'),
    roomSchema = require('./Room').schema,
    Room = require('mongoose').model('Room'),
    User = require('mongoose').model('User'),
    Booking = require('mongoose').model('Booking');

var hotelSchema = mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    star_rating: Number,
    address: {type: String, required: true},
    city: {type: String, required: true},
    pictureUrl: String,
    owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    rooms: [roomSchema],
    userRating : Number,
    usersWithRates : [{userId : String}]
});

var Hotel = mongoose.model('Hotel', hotelSchema);

module.exports.seedInitialHotels = function () {
    Hotel.find({}).exec(function (err, collection) {
            if (err) {
                console.log('Cannot find hotels: ' + err);
                return;
            }

            if (collection.length === 0) {
                User.findOne({username: 'kiril'}).exec(function (err, user) {
                    if (err) {
                        console.log('Cannot find user: ' + err);
                        return;
                    }

                    var hotelOne = new Hotel({
                        name: 'Hilton',
                        description: 'Nice place',
                        star_rating: 5,
                        address: 'Center',
                        city: 'Sofia',
                        pictureUrl: 'http://bucharest-guide.ro/poze/76b4d89b45fb70dc02ddf8aa4f077585.jpg',
                        owner: user,
                        usersWithRates : [],
                        userRating : 0
                    });
                    var roomOne = new Room({
                        room_type: 'Single',
                        room_max_occupancy: 1,
                        price: 30,
                        pictureUrl: 'http://www.hotelcaledonianbarcelona.com/images/single-room.png'
                    });
                    var roomTwo = new Room({
                        room_type: 'Double',
                        room_max_occupancy: 2,
                        price: 50,
                        pictureUrl: 'http://www.hotelcaledonianbarcelona.com/images/single-room.png'
                    });
                    var bookingOne = new Booking({fromDate: new Date('10/11/2014'), toDate: new Date('10/15/2014'), bookerId: user});
                    roomOne.bookings.push(bookingOne);
                    hotelOne.rooms.push(roomOne);
                    hotelOne.rooms.push(roomTwo);
                    hotelOne.save();

                    var hotelTwo = new Hotel({
                        name: 'Sheraton',
                        description: 'Elite hotel',
                        star_rating: 2,
                        address: '5th street',
                        city: 'New York',
                        pictureUrl: 'http://www.starwoodhotels.com/pub/media/421/she421ex.52616_md.jpg',
                        owner: user,
                        usersWithRates : [],
                        userRating : 0
                    });
                    var roomTwo = new Room({
                        room_type: 'Double',
                        room_max_occupancy: 2,
                        price: 150,
                        pictureUrl: 'http://indochinagoldhotel.com/wp-content/uploads/Deluxe-Double-Room-23.jpg',
                    });
                    var bookingTwo = new Booking({fromDate: new Date('11/20/2014'), toDate: new Date('11/29/2014'), bookerId: user});
                    roomTwo.bookings.push(bookingTwo);
                    hotelTwo.rooms.push(roomTwo);
                    hotelTwo.save();
                });
            }
        }
    )
};