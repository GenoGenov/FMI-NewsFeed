(function () {
    var loginBtn = $("#login-button");
    var registerBtn = $("#register-button");

    var message = $("#message");

    var userNameInput = $("#user-name");
    var passwordInput = $("#password");

    loginBtn.click(function () {
        var userData = {
            username: userNameInput.val(),
            password: passwordInput.val()
        };
        $.ajax({
            type: "POST",
            url: 'login',
            data: JSON.stringify(userData),
            success: function () { window.location = "newsfeed.html" },
            contentType: 'application/json'
        });
    });

    registerBtn.click(function () {
        var userData = {
            username: userNameInput.val(),
            password: passwordInput.val(),
        };
        $.ajax({
            type: "POST",
            url: 'api/users',
            data: JSON.stringify(userData),
            success: function () { message.text("Registration Successful!").fadeOut(3000) },
            error: function () { message.text("Registration Failed!").fadeOut(3000) },
            contentType: 'application/json'
        });
    });
}());