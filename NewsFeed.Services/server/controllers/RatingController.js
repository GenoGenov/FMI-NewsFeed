var Hotel = require('mongoose').model('Hotel');
var User = require('mongoose').model('User');

function isUserRated(allUsers, currentUserId) {
    var i, len = allUsers.length;

    for (i = 0; i < len; i += 1) {
        if (allUsers[i]._id.toString() === currentUserId.toString()) {
            return true;
        }
    }
    return false;
}

function rateHotel(req, res, next) {
    var rateData = req.body;

    Hotel.findOne({_id: rateData.hotelId}, function (err, hotel) {
        if (err) {
            res.status(400).json({message: err});
        }
        console.log(hotel.rooms);

        if (!isUserRated(hotel.usersWithRates, rateData.userId)) {
            hotel.usersWithRates.push(rateData.userId);
            hotel.userRating += rateData.rate;

            hotel.save(function (err, hotel) {
                if (err) {
                    res.status(400).json({message: err});
                }
                res.status(200).json({
                    userRating: hotel.userRating,
                    isAlreadyRated: false
                });
            })
        } else {
            res.status(200).json({
                userRating: hotel.userRating,
                isAlreadyRated: true
            });
        }
    });
}

module.exports = {
    rateHotel: rateHotel
};