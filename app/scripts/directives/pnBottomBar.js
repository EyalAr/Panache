'use strict';

angular.module('Panache')
    .directive('pnBottomBar', function() {

        return {
            restrict: 'A',
            templateUrl: 'views/bottomBar.html',
            scope: {
                current: '=pnCurrent'
            },
            controller: function($scope) {
                $scope.select = function(i){
                    $scope.current.image = $scope.current.images[i];
                }
            }
        };

    });
