'use strict';

app.controller('LoginController', function LoginController($scope, $http, $location) {

    $scope.login = function () {
        $http.post('http://localhost:3030/login', $scope.vm)
        .then(function (res) {
            // go to newsfeed page
            $location.path('/newsfeed')
        }, function (err) {
            $scope.message = err.data.message;
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
            $scope.message = err.data.message;
            console.log(err.data.message);
        });
    }
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