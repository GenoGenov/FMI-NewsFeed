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
            $location.path('/');
        }).catch(function () {
        });
    };

    $scope.$on('logged', function () {
        $scope.user.logged = true;
    });
});
