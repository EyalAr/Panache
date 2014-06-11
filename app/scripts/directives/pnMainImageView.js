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
            link: function(scope, element, attrs) {
                scope.showEdgeBars = false;
                element.mouseenter(function() {
                    scope.$apply(function() {
                        scope.showEdgeBars = true;
                    });
                });
                element.mouseleave(function() {
                    scope.$apply(function() {
                        scope.showEdgeBars = false;
                    });
                });
            },
            controller: function($scope) {
                $scope.$watch('current.image', currentImageWatchHandler);
                $scope.image = null;
                $scope.loading = false;

                function currentImageWatchHandler(imPath) {
                    if (!imPath) {
                        return $scope.image = null;
                    }
                    var fs = require('fs'),
                        path = require('path');
                    $scope.loading = true;
                    fs.readFile(path.join($scope.current.dir, imPath), {
                        encoding: 'base64'
                    }, function(err, data) {
                        $scope.$apply(function() {
                            $scope.loading = false;
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
        };

    });
