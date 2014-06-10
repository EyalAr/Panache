'use strict';

angular.module('Panache')
    .directive('pnBottomBar', function() {

        function resizeImageBase64(dataUrl, height) {
            var img = new Image(),
                canvas = document.createElement('canvas'),
                ctx = canvas.getContext('2d');
            img.src = dataUrl;
            var ratio = img.width / img.height;
            canvas.width = height * ratio;
            canvas.height = height;
            ctx.drawImage(img, 0, 0, height * ratio, height);
            return canvas.toDataURL();
        }

        return {
            restrict: 'A',
            templateUrl: 'views/bottomBar.html',
            scope: {
                current: '=pnCurrent',
                loading: '=pnLoading'
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
                        $scope.loading.total += paths.length;
                        async.mapLimit(paths, 1, function(imPath, done) {
                            var image = {
                                path: imPath
                            };
                            fs.readFile(path.join($scope.current.dir, imPath), {
                                encoding: 'base64'
                            }, function(err, data) {
                                if (err) {
                                    $scope.$apply(function() {
                                        $scope.loading.finished++;
                                    });
                                    return done(err);
                                }
                                var dataUrl = resizeImageBase64('data:image/' + path.extname(imPath).slice(1) + ';base64,' + data, 75),
                                    dataUrlParts = dataUrl.match(/^data:image\/(.*);base64,(.*)$/);
                                image.data = dataUrlParts[2];
                                image.type = dataUrlParts[1];
                                $scope.$apply(function() {
                                    $scope.loading.finished++;
                                });
                                done(null, image);
                            });
                        }, function(err, images) {
                            // $scope.$apply(function() {
                                if (err) {
                                    // TODO: handle error
                                    console.error(err);
                                    return $scope.images = null;
                                }
                                angular.copy(images, $scope.images);
                            // });
                        });
                    }
                }
            }
        };

    });
