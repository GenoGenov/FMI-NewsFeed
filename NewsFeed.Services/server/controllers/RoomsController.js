var Hotel = require('mongoose').model('Hotel'),
    Room = require('mongoose').model('Room');

function createRoom(req, res, next) {

    Hotel.findOne({_id: req.params.id}).exec(function (err, hotel) {
        if (err) {
            console.log('Hotel could not be loaded: ' + err);
            res.status(404).json({
                error: 'Cannot find hotel'
            });
        }

        var room = new Room(req.body);
        hotel.rooms.push(room);
        hotel.save(function (err) {
            if (err) {
                res.status(400).json({message: err});
            }
            res.json(room);
        });
    });
}

function deleteRoom(req, res, next) {
    Hotel.findOne({_id: req.params.id}).exec(function (err, hotel) {
        if (err || !hotel) {
            console.log('Hotel could not be deleted: ' + err);
            res.status(400).json({message: err});
        }
        if (req.user._id === hotel.owner._id || req.user.roles.indexOf('admin') > -1) {

            Room.findOne({_id: req.params.roomId}).exec(function (err, room) {
                if (err || !room) {
                    console.log('Room could not be deleted: ' + err);
                    res.status(400).json({message: err});
                }
                room.remove(function () {
                    res.status(200).json({message: 'Room deleted!'});
                });
            });
        }
        else {
            res.status(400).json({message: 'You do not have permissions!'});
        }
    });
}

module.exports = {
    createRoom: createRoom,
    deleteRoom: deleteRoom
};

