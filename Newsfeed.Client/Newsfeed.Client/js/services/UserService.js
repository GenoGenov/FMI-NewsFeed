angular.module('newsfeed').service('UserService', function ($cookies) {
    var isLoggedIn = function () {
        var a = $cookies.get('connect.sid');
        return !!$cookies.get('connect.sid');
    };

    return {
        isLoggedIn: isLoggedIn
    }
});