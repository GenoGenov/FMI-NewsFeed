$(document).ready(function () {
    var allMessages = $("#all-messages");
    var postMessageButton = $("#submit-button");
    var userMessageInput = $("#user-message");
    var muteUserInput = $("#mute-user");
    var muteUserButton = $("#mute-button");

    var currentUser = localStorage.getItem('user');
    var currentUserName = JSON.parse(currentUser).username;

    //setInterval(getMessages, 1500);
    getMessages();

    postMessageButton.click(function () {
        var messageText = userMessageInput.val();

        var messageData = {
            //author: currentUserName,
            content: messageText
        };
        console.log(messageData);
        $.ajax({
            type: "POST",
            url: 'http://localhost:3030/api/messages/create',
            data: JSON.stringify({ content: 'test' }),
            success: getMessages,
            error: function () { alert('Error sending message') },
            contentType: 'application/json',
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            },
        });
    });

    //muteUserButton.click(function () {
    //    var muteUserName = muteUserInput.val();

    //    var muteUserId = $.get();
    //    var url = 'http://localhost:3030/api/users/mute/' + muteUserId;
    //    $.ajax({
    //        type: "PUT",
    //        url: url,
    //        success: getMessages,
    //        error: function () { alert('Error mute user') },
    //        contentType: 'application/json',
    //        dataType: 'json',
    //    });
    //});


    function getMessages() {
        $.get("http://localhost:3030/api/messages", function (data) {
            console.log(data);
            var responseMessages = data.messages;
            allMessages.text('');

            if (responseMessages) {
                responseMessages.each(function (msg) {
                    var message = '<div id="' + msg.id + '">' + msg.username + ": " + msg.msgText + "</div>";
                    allMessages.append(message);
                });
            }

        });
    }
})
