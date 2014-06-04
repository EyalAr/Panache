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
                $scope.images = [];
                $scope.$watchCollection('current.images', currentImagesWatchHandler);
                $scope.select = function(imPath) {
                    $scope.current.image = imPath;
                }

                function currentImagesWatchHandler(paths) {
                    if (paths) {
                        var fs = require('fs'),
                            path = require('path');
                        async.map(paths, function(imPath, done) {
                            var image = {
                                path: imPath
                            };
                            fs.readFile(imPath, {
                                encoding: 'base64'
                            }, function(err, data) {
                                if (err) {
                                    return done(err);
                                }
                                image.data = data;
                                image.type = path.extname(imPath).slice(1);
                                done(null, image);
                            });
                        }, function(err, images) {
                            $scope.$apply(function() {
                                if (err) {
                                    // TODO: handle error
                                    return $scope.images = null;
                                }
                                angular.copy(images, $scope.images);
                            });
                        });
                    }
                }
            }
        };

    });
