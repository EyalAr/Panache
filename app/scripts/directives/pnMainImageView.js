'use strict';

angular.module('Panache')
    .directive('pnMainImageView', function() {

        return {
            restrict: 'A',
            templateUrl: 'views/mainImageView.html',
            scope: {
                current: '=pnCurrent',
                zoom: '=pnZoom'
            },
            controller: function($scope) {
                $scope.$watch('current.image', currentImageWatchHandler);
                $scope.image = null;

                function currentImageWatchHandler(imPath) {
                    if (imPath) {
                        var fs = require('fs'),
                            path = require('path');
                        fs.readFile(imPath, {
                            encoding: 'base64'
                        }, function(err, data) {
                            $scope.$apply(function() {
                                if (err) {
                                    // TODO: handle error
                                    return $scope.image = null;
                                }
                                $scope.image = {
                                    data: data,
                                    type: path.extname(imPath).slice(1)
                                };
                            });
                        });
                    }
                }
            }
        };

    });
