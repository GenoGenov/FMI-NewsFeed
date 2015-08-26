'use strict';

var app = angular.module('newsfeed', ['ngRoute', 'ngResource','ngCookies'])
    .config(['$routeProvider', '$httpProvider', function ($routeProvider, $httpProvider) {
        $httpProvider.defaults.withCredentials = true;
        $routeProvider
            .when('/login', {
                templateUrl: 'views/login.html',
                controller: 'UserController'
            })
            .when('/newsfeed', {
                templateUrl: 'views/newsfeed.html',
                controller: 'NewsfeedController'
            })
            .when('/users-rating', {
                templateUrl: 'views/users-rating.html',
                controller: 'UsersRatingController'
            })
            .otherwise({ redirectTo: '/' });
    }])
