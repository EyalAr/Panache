'use strict';

angular.module('Panache')
    .controller('mainCtrl', function($scope, $timeout) {

        var exts = ['.jpg', '.jpeg', '.png', '.gif'];

        $scope.current = {
            dir: process.cwd(),
            images: [],
            selected: [],
            image: null
        };

        $scope.loading = {
            total: 0,
            finished: 0
        };

        $scope.zoom = {
            type: 'fixed',
            value: 'fitDown'
        };

        $scope.$watch('loading', loadingWatchHandler, true);
        $scope.$watch('current.dir', currentDirWatchHandler);

        $(document).keydown(function(e) {
            if (e.keyCode === 39) {
                // right
                var i = $scope.current.images.indexOf($scope.current.image);
                if (i + 1 < $scope.current.images.length) {
                    $scope.$apply(function() {
                        $scope.current.image = $scope.current.images[i + 1];
                    });
                }
            } else if (e.keyCode == 37) {
                // left
                var i = $scope.current.images.indexOf($scope.current.image);
                if (i - 1 >= 0) {
                    $scope.$apply(function() {
                        $scope.current.image = $scope.current.images[i - 1];
                    });
                }
            }
        });

        var tLock, wheelLocked = false;

        function lockWheelFor(ms) {
            wheelLocked = true;
            if (tLock) clearTimeout(tLock);
            tLock = setTimeout(function() {
                wheelLocked = false;
            }, ms);
        }

        $(".main-image-view-container").on('wheel', function(e) {
            if (!wheelLocked) {
                lockWheelFor(150);
                if (e.originalEvent.deltaX < -50) {
                    // right
                    var i = $scope.current.images.indexOf($scope.current.image);
                    if (i + 1 < $scope.current.images.length) {
                        $scope.$apply(function() {
                            $scope.current.image = $scope.current.images[i + 1];
                        });
                    }
                } else if (e.originalEvent.deltaX > 50) {
                    // left
                    var i = $scope.current.images.indexOf($scope.current.image);
                    if (i - 1 >= 0) {
                        $scope.$apply(function() {
                            $scope.current.image = $scope.current.images[i - 1];
                        });
                    }
                }
            }
        });

        function loadingWatchHandler(loading) {
            $timeout(function() {
                if (loading.total === loading.finished) {
                    loading.total = loading.finished = 0;
                }
            }, 50);
        }

        function currentDirWatchHandler(dirPath) {
            if (dirPath) {
                var fs = require('fs'),
                    path = require('path');
                fs.readdir(dirPath, function(err, list) {
                    if (err) {
                        // TODO: handle error
                        console.error(err);
                        return $scope.current.images = [];
                    }
                    $scope.current.images = list.filter(function(i) {
                        return exts.indexOf(path.extname(i).toLowerCase()) !== -1;
                    });
                    if ($scope.current.images.length > 0) {
                        $scope.current.image = $scope.current.images[0];
                    }
                });
            }
        }

    });
