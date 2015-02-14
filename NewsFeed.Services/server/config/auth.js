var passport = require('passport');

module.exports = {
    login: function(req, res, next) {
        var auth = passport.authenticate('local', function(err, user) {
            if (err) return next(err);
            if (!user) {
//                res.send({success: false})
                res.status(400).json({message:'No such user exists!'});
            }

            req.logIn(user, function(err) {
                if (err) return next(err);
                res.send({success: true, user: user});
            })
        });

        auth(req, res, next);
    },
    logout: function(req, res, next) {
        req.logout();
        res.end();
    },
    isAuthenticated: function(req, res, next) {
        if (!req.isAuthenticated()) {
            res.status(403);
            res.end();
        }
        else {
            next();
        }
    },
    isInRole: function(roles) {
        return function(req, res, next) {
            var permitted = false;
            for (var i = 0; i < roles.length; i++) {
                var role = roles[i];
                if (req.isAuthenticated() && req.user.roles.indexOf(role) > -1){
                    permitted = true;
                }
            }
            if (permitted) {
                next();
            }
            else {
                res.status(403);
                res.end();
            }
        }
    }
};