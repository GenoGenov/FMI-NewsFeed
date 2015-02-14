var mongoose = require('mongoose');

var bookingSchema = mongoose.Schema({
    bookerId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    fromDate: Date,
    toDate: Date
});
mongoose.model('Booking', bookingSchema);

module.exports.schema = bookingSchema;

