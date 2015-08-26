'use strict';

var app = angular.module('newsfeed', ['ngRoute', 'ngResource'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/login', {
                templateUrl: 'views/login.html',
                controller: 'LoginController'
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
