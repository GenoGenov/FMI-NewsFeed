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
            //.when('/add-manufacturer', {
            //    templateUrl: 'views/partials/add-manufacturer.html',
            //    controller: 'AddManufacturerController'
            //})
            //.when('/add-car', {
            //    templateUrl: 'views/partials/add-car.html',
            //    controller: 'AddCarController'
            //})
            .otherwise({ redirectTo: '/' });
    }])
