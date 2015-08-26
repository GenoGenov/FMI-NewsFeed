'use strict';

app.controller('UsersRatingController', function UsersRatingController($scope, $http, $location) {
    $scope.allUsers = [];

    $scope.getAllUsers = function () {
        $http.get('http://localhost:3030/api/users')
            .then(function (res) {
                console.log(res);
                $scope.allUsers = res.data;
            }, function () {

            })
    }    
});

