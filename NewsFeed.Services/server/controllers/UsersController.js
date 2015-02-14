var encryption = require('../utilities/encryption');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var grid = require('gridfs-stream');

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
    addAvatar: function (req, res, next) {
        req.pipe(req.busboy);
        req.busboy.on('file',function(fieldname, file, filename, encoding, mimetype){
            grid.mongo=mongoose.mongo;
            var gfs=grid(mongoose.connection.db);
            file.pipe(gfs.createWriteStream(
                {
                    filename:filename,
                    root:'avatars',
                    _id:req.user ? req.user._id : '1234567'
                }));
            res.status(200);
            res.end();
        })
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
                res.status(400).json({message: 'Users could not be loaded: '+err});
            }

            res.send(collection);
        })
    },
    muteUser: function (req, res, next) {
        User.findOne({_id:req.params.id}).exec(function (err, user) {
            if (err || !user) {
                console.log('User could not be muted: ' + err);
                res.status(400).json({message: 'User could not be muted: '+err});
            }
            else{
                User.findOne({_id:req.user._id}).exec(function (err, current) {
                    if (err || !current) {
                        console.log('Something went wrong: ' + err);
                        res.status(400).json({message: 'Something went wrong: '+err});
                    }else{
                        current.mutes.push(user._id);
                        current.save(function(err){
                            if(err){
                                res.status(400).json({message: 'User could not be muted: '+err});
                            }else{
                                res.status(200).json({message:'Success'})
                            }
                        })
                    }
                })
            }
        })
    }
};