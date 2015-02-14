var mongoose = require('mongoose'),
    encryption = require('../utilities/encryption');

var userSchema = mongoose.Schema({
    username: { type: String, require: '{PATH} is required', unique: true },
    firstName: { type: String, require: '{PATH} is required' },
    lastName: { type: String, require: '{PATH} is required' },
    salt: String,
    hashPass: String,
    roles: [String]
});

userSchema.method({
    authenticate: function (password) {
        return encryption.generateHashedPassword(this.salt, password) === this.hashPass;
    }
});

var User = mongoose.model('User', userSchema);

module.exports.schema = userSchema;
module.exports.seedInitialUsers = function () {
    User.find({}).exec(function (err, collection) {
        if (err) {
            console.log('Cannot find users: ' + err);
            return;
        }

        if (collection.length === 0) {
            var salt;
            var hashedPwd;

            salt = encryption.generateSalt();
            hashedPwd = encryption.generateHashedPassword(salt, 'Kiril');
            User.create({username: 'kiril', firstName: 'Kiril', lastName: 'Tsarnakliyski', salt: salt, hashPass: hashedPwd, roles: ['admin']});
            User.create({username: 'simo', firstName: 'Simo', lastName: 'Bidjev', salt: salt, hashPass: hashedPwd, roles: ['hotelOwner']});
            console.log('Users added to database...');
        }
    });
};