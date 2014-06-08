'use strict';

angular.module('Panache')
    .directive('pnLoadingProgress', function() {

        return {
            restrict: 'A',
            scope: {
                data: "=pnLoading"
            },
            templateUrl: 'views/loading.html',
            controller: function($scope) {
                $scope.precentage = null;
                $scope.$watch('data', function(data) {
                    if (data) {
                        if (!data.total) {
                            $scope.precentage = 100;
                        } else {
                            $scope.precentage = 0 | data.finished / data.total * 100;
                        }
                    }
                }, true);
            }
        };

    });
