'use strict';

app.controller('UserController', function LoginController($scope, $http, $location) {

    $scope.login = function () {
        $http.post('http://localhost:3030/login', $scope.vm)
        .then(function (res) {
            // go to newsfeed page
            console.log(JSON.stringify(res.data.user));
            localStorage.setItem('userData', JSON.stringify(res.data.user));
            $scope.$broadcast('logged');
            $scope.$emit('logged');
            $location.path('/newsfeed')
        }, function (err) {
            //$scope.message = err.data.message;
        });
    }

    $scope.register = function () {
        console.log(angular.fromJson($scope.vm));

        $http.post('http://localhost:3030/api/users', angular.fromJson($scope.vm))
        .then(function (res) {
            $scope.message = "Registration successful!"
            // go to newsfeed page
            console.log(res);
        }, function (err) {
            //$scope.message = err.data.message;
            console.log(err.data.message);
        });
    };
});
