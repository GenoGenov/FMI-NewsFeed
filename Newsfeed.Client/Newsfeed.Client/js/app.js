'use strict';

var app = angular.module('newsfeed', ['ngRoute', 'ngResource'])
    .config(['$routeProvider', '$httpProvider', function ($routeProvider, $httpProvider) {
        $httpProvider.defaults.withCredentials = true;
        $routeProvider
            .when('/login', {
                templateUrl: 'views/login.html',
                controller: 'LoginController'
            })
            .when('/newsfeed', {
                templateUrl: 'views/newsfeed.html',
                controller: 'NewsfeedController'
            })
            .when('/users-rating', {
                templateUrl: 'views/users-rating.html',
                controller: 'UsersRatingController'
            })
            //.when('/add-car', {
            //    templateUrl: 'views/partials/add-car.html'
            //    controller: 'AddCarController'
            //})
            .otherwise({ redirectTo: '/' });
    }])
