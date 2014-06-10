'use strict';

angular.module('Panache', ['ngAnimate', 'ngRoute', 'ui.bootstrap'])
    .run(function() {
        var gui = require('nw.gui'),
            win = gui.Window.get();
        win.show();
        win.showDevTools();
    })
    .config(function($routeProvider) {

        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'mainCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });

    });
