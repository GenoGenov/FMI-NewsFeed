var mongoose = require('mongoose');
var Hotel = mongoose.model('Hotel');
var Booking = mongoose.model('Booking');
var Room = mongoose.model('Room');

var newBooking;

function isReservationPossible(reservationInfo, hotel) {
    var i, j,
        room, currentBooking,
        len = hotel.rooms.length,
        isBookPossible = false,
        roomIndex;

    var reqStartDate = new Date(reservationInfo.startDate),
        reqEndDate = new Date(reservationInfo.endDate),
        bookingStartDate, bookingEndDate;

    for(i = 0; i<len; i++){

        var bookingLen = hotel.rooms[i].bookings.length;

        if(hotel.rooms[i].room_max_occupancy == reservationInfo.roomType){
            for(j = 0; j < bookingLen ; j+=1){
                currentBooking = hotel.rooms[i].bookings[j];

                bookingStartDate = new Date(currentBooking.fromDate);
                bookingEndDate = new Date(currentBooking.toDate);

                if(reqEndDate < bookingStartDate || reqStartDate > bookingEndDate){
                    isBookPossible = true;
                    roomIndex = i;
                } else {
                    isBookPossible = false;
                }
            }

            if(isBookPossible){
                break;
            }

            if(bookingLen == 0){
                isBookPossible = true;
                roomIndex = i;
                break;
            }
        }

    }

    if(isBookPossible){
        newBooking = new Booking({
            fromDate: reqStartDate,
            toDate: reqEndDate,
            bookerId: reservationInfo.userId});
        hotel.rooms[roomIndex].bookings.push(newBooking);
    }
    return isBookPossible;
}

function makeReservation(req, res, next) {

    var reservationInfo = req.body;

    Hotel.findOne({_id : reservationInfo.hotelId}, function (err, hotel) {
        if(err){
            throw err;
        }
        if(isReservationPossible(reservationInfo, hotel)){
            hotel.save(function (err) {
                if(err){
                    throw 'Error saving reservation in db' + err;
                }
                res.status(200).json(newBooking);
            });
        } else{
            res.status(200).json({
                errBookingMessage : "No available room for this period"
            })
        }
    });


}

module.exports = {
    makeReservation: makeReservation
};