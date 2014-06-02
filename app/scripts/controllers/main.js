'use strict';

angular.module('Panache')
    .controller('mainCtrl', function($scope) {

        $scope.current = {
            dir: process.cwd(),
            images: [],
            selected: [],
            image: null
        };

    });
