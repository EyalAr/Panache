'use strict';

angular.module('Panache')
    .directive('pnTopBar', function() {

        return {
            restrict: 'A',
            templateUrl: 'views/topBar.html',
            scope: {
                current: '=pnCurrent'
            },
            controller: function($scope) {
            }
        };

    });
