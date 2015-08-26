'use strict';

app.controller('NotificationsController', function NotificationsController($scope, $http, $location) {
    $scope.unreadNotifications = [];

    $scope.getUnreadNotifications = function () {
        $http.get('http://localhost:3030/api/notifications/unread')
            .then(function (res) {
                console.log(res);
                $scope.unreadNotifications = res.data;
            }, function () {

            })
    }

    $scope.read = function (id) {
        var postUrl = 'http://localhost:3030/api/notifications/read' + id;
        $http.post(postUrl).then(function (res) { console.log(res); }, function () { });
    }
});

