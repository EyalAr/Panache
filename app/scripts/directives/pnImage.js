'use strict';

angular.module('Panache')
    .directive('pnImage', function() {

        var container, width, height;

        return {
            restrict: 'A',
            scope: {
                image: '=pnImageParams',
                zoom: '=pnZoom'
            },
            templateUrl: 'views/image.html',
            link: function(scope, element, attrs) {
                container = element.find('.pn-img-container');
            },
            controller: function($scope) {
                $scope.$watchCollection('image', imageDataWatchHandler);

                function imageDataWatchHandler(imData) {
                    if (imData) {
                        container.empty();
                        // set image data
                        var img = new Image();
                        img.src = 'data:image/' + imData.type + ';base64,' + imData.data;
                        width = +img.width;
                        height = +img.height;
                        container.append(img);
                        fixDisplay();
                    }
                }

                function fixDisplay() {
                    var zoom = $scope.zoom,
                        img = container.find('img'),
                        cWidth = container.width(),
                        cHeight = container.height();

                    if (zoom && zoom.type === 'fixed' && zoom.value === 'fit') {
                        _fitRatio();
                    } else if (zoom && zoom.type === 'fixed' && zoom.value === 'real') {
                        _real();
                    } else { // default
                        _fitRatio();
                    }

                    // fit image to view and keep aspect ratio
                    function _fitRatio() {
                        img.css({
                            width: cWidth <= cHeight ? '100%' : null,
                            height: cWidth > cHeight ? '100%' : null
                        });
                    }

                    // display in real size
                    function _real() {
                        img.css({
                            width: width,
                            height: height
                        });
                    }

                }

            }
        };

    });
