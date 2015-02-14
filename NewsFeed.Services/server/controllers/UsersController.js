var encryption = require('../utilities/encryption');
var User = require('mongoose').model('User');

module.exports = {
    createUser: function (req, res, next) {
        var newUserData = req.body;
        newUserData.salt = encryption.generateSalt();
        newUserData.hashPass = encryption.generateHashedPassword(newUserData.salt, newUserData.password);
        User.create(newUserData, function (err, user) {
            if (err) {
                console.log('Failed to register new user: ' + err);
                res.status(400).json({message: err});
                return;
            }

            req.logIn(user, function (err) {
                if (err) {
                    res.status(400).json({message: err});
                }

                res.send(user);
            })
        });
    },
    updateUser: function (req, res, next) {
        if (req.user._id == req.body._id || req.user.roles.indexOf('admin') > -1) {
            var updatedUserData = req.body;
            if (updatedUserData.password && updatedUserData.password.length > 0) {
                updatedUserData.salt = encryption.generateSalt();
                updatedUserData.hashPass = encryption.generateHashedPassword(updatedUserData.salt, updatedUserData.password);
            }

            User.update({_id: req.body._id}, updatedUserData, function () {
                res.end();
            });
        }
        else {
            res.status(400).json({message: 'You do not have permissions!'});
        }
    },
    deleteUser: function (req, res, next) {
        if (req.user.roles.indexOf('admin') > -1) {

            User.remove({_id: req.params.id}, function () {
                res.status(200).json({message: 'User deleted!'});
            });
        }
        else {
            res.status(400).json({message: 'You do not have permissions!'});
        }
    },
    getAllUsers: function (req, res) {
        User.find({}).exec(function (err, collection) {
            if (err) {
                console.log('Users could not be loaded: ' + err);
                res.status(400).json({message: err});
            }

            res.send(collection);
        })
    }
};