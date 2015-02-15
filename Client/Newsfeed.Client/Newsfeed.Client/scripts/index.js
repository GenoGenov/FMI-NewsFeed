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
        var user = {
            username: userNameInput.val()
        }
        
        $.ajax({
            type: "POST",
            url: 'http://localhost:3030/login',
            data: JSON.stringify(userData),
            success: function () {
                //localStorage.setItem('user', JSON.stringify(user));
                window.location = "newsfeed.html"
            },
            error: function () { message.text("Login Failed!").fadeOut(3000);  },
            contentType: 'application/json',
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            },
        });
    });

    registerBtn.click(function () {
        var userData = {
            username: userNameInput.val(),
            password: passwordInput.val(),
        };
        $.ajax({
            type: "POST",
            url: 'http://localhost:3030/api/users',
            data: JSON.stringify(userData),
            success: function () { message.text("Registration Successful!").fadeOut(3000) },
            error: function () { message.text("Registration Failed!").fadeOut(3000) },
            contentType: 'application/json',
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            },
        });
    });
}());