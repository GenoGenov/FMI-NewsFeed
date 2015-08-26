'use strict';

app.controller('NewsfeedController', function NewsfeedController($scope, $http, $location) {
    
    $scope.getAllMessages = function () {
        $http.get('http://localhost:3030/api/messages')
            .then(function (data) {
                console.log(data);
            }, function () {

            })
    }

    //$scope.postMessage = function(){
    //    console.log({ author: 'gosho', content: $scope.userMessage });
    //    $scope.allMessages.push({ author: 'gosho', content: 'sss' });
    //    //$http.post('http://localhost:3030/api/messages/create', { content: $scope.userMessage })
    //    //    .then(function (res) {
    //    //        console.log(res);
    //    //    }, function () {
    //    //    })
    //}

    //$scope.allMessages = [
    //    { author: "asdf", content: "ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss" },
    //    { author: "asdf", content: "ggg" },
    //    { author: "asdf", content: "sdas" }
    //]
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
