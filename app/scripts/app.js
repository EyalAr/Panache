'use strict';

angular.module('Panache', ['ngRoute', 'ui.bootstrap'])
    .config(function($routeProvider) {

        $routeProvider
            .when('/', {
                templateUrl: 'views/welcome.html',
                controller: 'welcomeCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });

    });
