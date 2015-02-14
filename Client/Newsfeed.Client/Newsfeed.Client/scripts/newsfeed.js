$document.ready(function () {
    var allMessages = $("#all-messages");
    var postMessageButton = $("#submit-button");
    var userMessageInput = $("user-message");

    setInterval(getMessages, 1500);

    postMessageButton.click(function () {
        var messageText = userMessageInput.val();
        $.ajax({
            type: "POST",
            url: 'http://localhost:3030/api/posts',
            data: JSON.stringify(userData),
            success: getMessages,
            error: function () { alert('Error sending message') },
            contentType: 'application/json',
            dataType: 'json',
        });
    });


    function getMessages() {
        $.get("http://localhost:3030/api/posts", function (data) {
            var responseMessages = data.messages;
            allMessages.text('');

            responseMessages.forEach(function (msg) {
                var message = '<div>' + msg.username + ": " + msg.msgText + "</div>";
                allMessages.append(message);
            });

        });
    }
})
