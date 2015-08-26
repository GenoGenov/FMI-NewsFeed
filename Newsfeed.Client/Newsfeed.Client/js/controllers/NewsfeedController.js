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
        console.log({ content: $scope.userMessage });
        $scope.allMessages.push({ author: 'gosho', content: 'sss' });
        $http.post('http://localhost:3030/api/messages/create', { content: $scope.userMessage })
            .then(function (res) {
                $scope.getAllMessages();
            }, function (err) {
                alert(err);
            })
    }

    $scope.like = function (id) {
        var postUrl = 'http://localhost:3030/api/likes/like/' + id;
        $http.post(postUrl)
            .then(function () {
                $scope.getAllMessages();
            }, function (err) {
                alert(err);
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


//$("a.mute").click(function () {
//    var clickedPostId = jQuery(this).attr("id");
//    var postUrl = 'http://localhost:3030/api/users/mute/' + clickedPostId;
//    $.ajax({
//        type: "PUT",
//        url: postUrl,
//        success: getMessages,
//        error: function () { alert("Failed Mute"); },
//        contentType: 'application/json',
//        dataType: 'json',
//        xhrFields: {
//            withCredentials: true
//        },
//    });
//});