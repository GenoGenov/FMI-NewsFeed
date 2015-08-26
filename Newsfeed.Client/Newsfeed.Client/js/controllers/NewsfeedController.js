'use strict';

app.controller('NewsfeedController', function NewsfeedController($scope, $http, $location) {
    $scope.allMessages = [];
    $scope.getAllMessages = function () {
        $http.get('http://localhost:3030/api/messages')
            .then(function (res) {
                console.log(res);
                $scope.allMessages = res.data;
            }, function () {
            })
    }

    $scope.postMessage = function(){
        $http.post('http://localhost:3030/api/messages/create', { content: $scope.userMessage })
            .then(function (res) {
                $scope.getAllMessages();
            }, function (err) {
                console.log(err);
            })
    }

    $scope.like = function (id) {
        var postUrl = 'http://localhost:3030/api/likes/like/' + id;
        $http.post(postUrl)
            .then(function () {
                $scope.getAllMessages();
            }, function (err) {
                console.log(err);
            });
    }

    $scope.mute = function (id) {
        var putUrl = 'http://localhost:3030/api/users/mute/' + id;
        $http.put(putUrl)
            .then(function () {
                $scope.getAllMessages();
            }, function (err) {
                console.log(err);
            });
    }
});
