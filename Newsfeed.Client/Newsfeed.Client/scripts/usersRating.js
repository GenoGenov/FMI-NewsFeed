$(document).ready(function () {

    var allUsers = $("#users-rating");

    $.get("http://localhost:3030/api/users", function (data) {
        var responseUsers = data.users;
        allUsers.text('');

        responseUsers.forEach(function (user) {
            var userItem = '<div>' + user.username + "</div>";
            allUsers.append(userItem);
        });

    });
});