var express = require('express'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    passport = require('passport'),
    busboy = require('connect-busboy');

module.exports = function (app, config) {

    app.use(cookieParser());
    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", req.headers.origin);
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.header("Access-Control-Allow-Methods", "GET, POST, PUT, OPTIONS, DELETE");
        res.header("Access-Control-Allow-Credentials", "true");
        next();
    });

    app.use(busboy());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(session({resave: true, saveUninitialized: true, secret: 'the newsfeed project'}));

    app.use(passport.initialize());
    app.use(passport.session());
    app.use(express.static(config.rootPath + '/public'));
};