'use strict';

angular.module('Panache')
    .directive('pnImage', function() {

        return {
            restrict: 'A',
            scope: {
                image: '=pnImageParams',
                zoom: '=pnZoom'
            },
            templateUrl: 'views/image.html',
            link: function(scope, element, attrs) {
                scope.container = element.find('.pn-img-container');
            },
            controller: function($scope) {
                $scope.$watchCollection('image', imageDataWatchHandler);

                function imageDataWatchHandler(imData) {
                    if (imData) {
                        $scope.container.empty();
                        // set image data
                        var img = new Image();
                        img.src = 'data:image/' + imData.type + ';base64,' + imData.data;
                        $scope.width = +img.width;
                        $scope.height = +img.height;
                        $scope.container.append(img);
                        fixDisplay();
                    }
                }

                function fixDisplay() {
                    var zoom = $scope.zoom,
                        img = $scope.container.find('img'),
                        cWidth = $scope.container.width(),
                        cHeight = $scope.container.height(),
                        iWidth = $scope.width,
                        iHeight = $scope.height,
                        wRatio = iWidth / cWidth,
                        hRatio = iHeight / cHeight;

                    if (zoom && zoom.type === 'fixed' && zoom.value === 'fit') {
                        _fitRatio();
                    } else if (zoom && zoom.type === 'fixed' && zoom.value === 'fitDown') {
                        _fitRatioDown();
                    } else if (zoom && zoom.type === 'fixed' && zoom.value === 'real') {
                        _real();
                    } else { // default
                        _fitRatio();
                    }

                    // fit image to view and keep aspect ratio
                    function _fitRatio() {
                        img.css({
                            width: (wRatio >= 1 && wRatio >= hRatio) || (wRatio < 1 && hRatio < 1 && wRatio >= hRatio) ? '100%' : null,
                            height: (wRatio >= 1 && wRatio >= hRatio) || (wRatio < 1 && hRatio < 1 && wRatio >= hRatio) ? null : '100%'
                        });
                    }

                    // fit image to view, but only if scaling down, and keep aspect ratio
                    function _fitRatioDown() {
                        img.css({
                            width: wRatio > 1 && wRatio >= hRatio ? '100%' : null,
                            height: hRatio > 1 && hRatio > wRatio ? '100%' : null
                        });
                    }

                    // display in real size
                    function _real() {
                        img.css({
                            width: $scope.width,
                            height: $scope.height
                        });
                    }

                }

            }
        };

    });
