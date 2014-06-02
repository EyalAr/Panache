'use strict';

angular.module('Panache')
    .directive('pnMainImageView', function() {

        return {
            restrict: 'A',
            templateUrl: 'views/mainImageView.html',
            scope: {
                current: '=pnCurrent'
            },
            controller: function($scope) {
                $scope.$watch('current.image', currentImageWatchHandler);
                $scope.imageData = null;

                function currentImageWatchHandler(imPath) {
                    if (imPath) {
                        var fs = require('fs'),
                            path = require('path');
                        $scope.imageType = path.extname(imPath).slice(1);
                        fs.readFile(imPath, {
                            encoding: 'base64'
                        }, function(err, data) {
                            $scope.$apply(function() {
                                if (err) {
                                    // TODO: handle error
                                    return $scope.imageData = null;
                                }
                                $scope.imageData = data;
                            });
                        });
                    }
                }
            }
        };

    });
