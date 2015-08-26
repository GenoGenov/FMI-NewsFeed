'use strict';

angular.module('newsfeed').controller('NavController', function NavController($scope, $http, $location, UserService) {

    $scope.user = {};

    if (UserService.isLoggedIn()) {
        $scope.user.logged;
        $location.path('/newsfeed');
    }

    $scope.logout = function () {
        $http.post('http://localhost:3030/logout', {}).then(function () {
            $scope.user.logged = false;
        }).catch(function () {
        });
    };

    $scope.$on('logged', function () {
        $scope.user.logged = true;
    });
});


//$.ajax({
//    type: "POST",
//    url: 'http://localhost:3030/api/users',
//    data: JSON.stringify(userData),
//    success: function () { message.text("Registration Successful!").fadeOut(3000) },
//    error: function () { message.text("Registration Failed!").fadeOut(3000) },
//    contentType: 'application/json',
//    dataType: 'json',
//    xhrFields: {
//        withCredentials: true
//    },
//});