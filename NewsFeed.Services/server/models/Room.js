var mongoose = require('mongoose'),
    bookingSchema = require('./Booking').schema;

var roomSchema = mongoose.Schema({
    room_type: {type: String, required: true},
    room_max_occupancy: {type: Number, required: true},
    price: {type: Number, required: true},
    pictureUrl: String,
    bookings: [bookingSchema]
});
mongoose.model('Room', roomSchema);

module.exports.schema = roomSchema;
