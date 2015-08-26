'use strict';

app.controller('NewsfeedController', function NewsfeedController($scope, $http, $location) {

    var userData = JSON.parse(localStorage.getItem('userData'));

    $scope.getAllMessages = function () {
        $http.get('http://localhost:3030/api/messages', {withCredentials: true})
            .then(function (data) {
                console.log(data);
            }, function () {

            })
    }

    $scope.postMessage = function(){
        console.log({ content: $scope.userMessage });
        $http.post('http://localhost:3030/api/messages/create', { content: $scope.userMessage })
            .then(function (res) {
                console.log(res);
            }, function () {
            })
    }
});


//var messageData = {
//    //author: currentUserName,
//    content: messageText
//};
//console.log(messageData);
//$.ajax({
//    type: "POST",
//    url: 'http://localhost:3030/api/messages/create',
//    data: JSON.stringify(messageData),
//    success: getMessages,
//    error: function () { alert('Error sending message') },
//    contentType: 'application/json',
//    dataType: 'json',
//    xhrFields: {
//        withCredentials: true
//    },
//});


//function getMessages() {
//    $.ajax({
//        type: "GET",
//        url: "http://localhost:3030/api/messages",
//        success: function (data) { updateMessages(data) },//updateMessages(data),
//        contentType: 'application/json',
//        dataType: 'json',
//        xhrFields: {
//            withCredentials: true
//        }
//    });
//}
