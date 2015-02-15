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
            data: JSON.stringify(messageData),
            success: getMessages,
            error: function () { alert('Error sending message') },
            contentType: 'application/json',
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            },
        });
    });
    
    function getMessages() {
        $.ajax({
            type: "GET",
            url: "http://localhost:3030/api/messages",
            success: function (data) { updateMessages(data) },//updateMessages(data),
            contentType: 'application/json',
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            }
        });
    }

    function updateMessages(data) {
        console.log(data);
        allMessages.html(' ');

        for (var i = 0; i < data.length; i++) {
            var msgId = data[i]._id;
            var authorId = data[i].author._id;
            var author = data[i].author.username;
            var msg = data[i].content;
            var likesCount = data[i].likes.length;

            var hrefLike = '<a href = "#" class = "like" id="' + msgId + '"> Like </a>'
            var hrefMute = '<a href = "#" class = "mute" id="' + authorId + '"> Mute </a>'
            var message = '<div id="' + msgId + '">'
                + "<strong>" + author + " said: </strong>" + msg //+ ' | '
                + '<br />likes: ' + likesCount + ' | '
                + hrefLike + ' | '
                + hrefMute
                + "</div>";
            allMessages.append(message);
        }

        $("a.like").click(function () {
            var clickedPostId = jQuery(this).attr("id");
            var postUrl = 'http://localhost:3030/api/likes/like/' + clickedPostId;
            $.ajax({
                type: "POST",
                url: postUrl,
                success: getMessages,
                error: function () { alert("Failed Like"); },
                contentType: 'application/json',
                dataType: 'json',
                xhrFields: {
                    withCredentials: true
                },
            });

        });

        $("a.mute").click(function () {
            var clickedPostId = jQuery(this).attr("id");
            var postUrl = 'http://localhost:3030/api/users/mute/' + clickedPostId;
            $.ajax({
                type: "PUT",
                url: postUrl,
                success: getMessages,
                error: function () { alert("Failed Mute"); },
                contentType: 'application/json',
                dataType: 'json',
                xhrFields: {
                    withCredentials: true
                },
            });
        });
    };
   
})
