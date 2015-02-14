var Hotel = require('mongoose').model('Hotel');
var User = require('mongoose').model('User');

function getStatistics(req, res, next) {

    var hotelsCount,
        usersCount,
        reservationsCount; //TODO

    Hotel.where({}).count(function (err, count) {
        if (err) {
            throw err;
        }
        hotelsCount = count;

        User.where({}).count(function (err, count) {
            if (err) {
                throw err;
            }
            usersCount = count;
            res.send({
                    usersCount: usersCount,
                    hotelsCount: hotelsCount,
                    reservationsCount: reservationsCount | 0
                }
            );
            res.end();
        })
    });
}

module.exports = {
    getStatistics: getStatistics
};