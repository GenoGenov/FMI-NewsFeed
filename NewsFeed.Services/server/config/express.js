var express = require('express'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    passport = require('passport');

module.exports = function (app, config) {

    app.use(cookieParser());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(session({resave: true, saveUninitialized: true, secret: 'the newsfeed project'}));

    app.use(passport.initialize());
    app.use(passport.session());
    app.use(express.static(config.rootPath + '/public'));
};